<?php
error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));
ini_set("display_errors", 1);
require(dirname(__FILE__) . './../vendor/autoload.php');
require_once(dirname(__FILE__) . './../vendor/simpletest/simpletest/autorun.php');

class filesTests extends UnitTestCase {
    protected $baseUrl = "http://localhost/rest.php/files";
    protected $basePath = "/opt/honeydew";
    protected $featurePath = "/features/fake.feature";

    public function __construct() {
        $this->contents = time();
        $this->tempUrl = $this->baseUrl . $this->featurePath;
        $this->tempFile = $this->basePath . $this->featurePath;
        file_put_contents($this->tempFile, $this->contents);
    }

    function postNew ($path = "") {
        if ($path == "") {
            $path = $this->baseUrl . $this->featurePath;
        }

        $contents = array(contents => $this->contents);
        $response = \Httpful\Request::post($path)
                                           ->sendsJson()
                                           ->body(json_encode($contents))
                                           ->send();
        return $response;
    }

    function cleanUp () {
        unlink($this->tempFile);
    }

    function testGet() {
        $response = \Httpful\Request::get($this->tempUrl)->send();
        $this->assertEqual($response->body->contents, $this->contents, "contents match up!");
        $this->cleanUp();

        $response = \Httpful\Request::get($this->baseUrl . "/whee")->send();
        $this->assertEqual($response->code, '403', 'forbidden to write elsewhere!');

        $response = \Httpful\Request::get($this->baseUrl . "/whee/file.feature")->send();
        $this->assertEqual($response->code, '403', 'forbidden to write elsewhere!');
    }

    function testPostNew() {
        $response = $this->postNew();

        $this->assertTrue(file_exists($this->tempFile), "post new makes a new file");
        $this->assertEqual(file_get_contents($this->tempFile), $this->contents, "contents of post are in file");

        $this->cleanUp();
    }

    function testPostExisting() {
        $response = $this->postNew();

        $modifiedContents = array(contents => "modified");
        $response = \Httpful\Request::post($this->tempUrl)
                                                ->sendsJson()
                                                ->body(json_encode($modifiedContents))
                                                ->send();

        $this->assertEqual(file_get_contents($this->tempFile), "modified", "contents of existing file are modified");

        $this->cleanUp();
    }

    function testPostFailure() {
        $failFile = $this->tempFile . "2";
        $failUrl = $this->tempUrl . "2";
        file_put_contents($failFile, "test");
        chmod($failFile, 0600);

        $response = $this->postNew($failUrl);
        $this->assertNotEqual($response->code, 200, 'server error if we have a problem!');
        $this->assertPattern('/Permission denied/', $response->body->reason, 'because of permissions!');
        unlink($failFile);
    }

    function testDeleteFile() {
        $response = $this->postNew();
        $response = \Httpful\Request::delete($this->tempUrl)->send();

        $this->assertFalse(file_exists($this->tempFile));
    }

    function testGithub() {
        $response = \Httpful\Request::put($this->tempUrl)
                                               ->body(json_encode(array("msg" => "SC-12345 SC-54321")))
                                               ->send();

        $this->assertPattern('/user-push/', $response->body->git, "shell script is mentioned in git commit");
        $this->assertPattern('/fake.feature/', $response->body->git, "filename is mentioned in git commit");
        $this->assertPattern('/default/', $response->body->git, "username is mentioned in git commit");

        $this->assertPattern('/SC-12345/', $response->body->git, "jira ticket is mentioned in git commit");
    }
}
?>
