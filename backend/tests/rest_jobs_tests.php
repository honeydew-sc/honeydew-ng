<?php
error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));
ini_set("display_errors", 1);
require(dirname(__FILE__) . './../vendor/autoload.php');
require_once(dirname(__FILE__) . './../vendor/simpletest/simpletest/autorun.php');

class jobsTests extends UnitTestCase {
    protected $baseUrl = "http://localhost/rest.php/jobs";
    protected $basePath = "/opt/honeydew/";
    protected $tempPath = "features/fake.feature";

    function testCanPost() {
        $response = \Httpful\Request::post($this->baseUrl)->send();
        $this->assertNotEqual($response->code, 200, 'fails without required parts: host, browser, filename');
        $this->assertPattern('/file/i', $response->body->reason, 'fails without filename');

        touch($this->basePath . $this->tempPath);
        $contents = array(
            'host' => 'http://www.google.com',
            'browser' => 'phantomjs local',
            'file' => $this->tempPath,
            'username' => 'tests',
        );

        /* these tests will never run because the 'local' parameter is
        set to ::1 instead of 127.0.0.1; the webdriver standalone
        doesn't receive requests at ::1 */
        $response = \Httpful\Request::post($this->baseUrl)
                                                ->sendsJson()
                                                ->body(json_encode($contents))
                                                ->send();
        $this->assertTrue($response->body->success == 'true', 'posting a well formed job gets successMessage back');
        unlink($this->basePath . $this->tempPath);
    }
}
?>
