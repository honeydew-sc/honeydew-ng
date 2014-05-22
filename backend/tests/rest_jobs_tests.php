<?php
error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));
ini_set("display_errors", 1);
require(dirname(__FILE__) . './../vendor/autoload.php');
require_once(dirname(__FILE__) . './../vendor/simpletest/simpletest/autorun.php');
require_once('/opt/honeydew-ui/htdocs/hdewdb_connect.php');

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
            'browser' => array('phantomjs local'),
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

    function testSerialBatchJobs() {
        touch($this->basePath . $this->tempPath);
        $contents = array(
            'host' => 'http://www.google.com',
            'browser' => array('phantomjs local', 'phantomjs local again'),
            'file' => $this->tempPath,
            'username' => 'tests',
            'serial' => 'test'
        );

        /* these tests will never run because the 'local' parameter is
        set to ::1 instead of 127.0.0.1; the webdriver standalone
        doesn't receive requests at ::1 */
        $response = \Httpful\Request::post($this->baseUrl)
             ->sendsJson()
             ->body(json_encode($contents))
             ->send();
        $this->assertTrue($response->body->success == 'true', 'posting a well formed job gets successMessage back');

        $cmd = $response->body->command;
        $this->assertTrue(preg_match('/jobRunner\.pl.*jobRunner\.pl/', $cmd), 'appends jobs together, in serial');
        $this->assertTrue(preg_match('/ && p/', $cmd), 'appends jobs together, in serial');
        $this->assertTrue(preg_match('/&$/', $cmd), 'backgrounds the job');

        unlink($this->basePath . $this->tempPath);
    }

    function testSetsOnlyTakeInts() {
        $response = \Httpful\Request::post($this->baseUrl . '/sets/rerunfailed/d')->send();
        $this->assertTrue($response->body->success == 'false', 'rerunning sets must take integers');
    }

    function testCanRerunFailedSet() {
        $pdo = hdewdb_connect();
        $sth = $pdo->prepare('UPDATE report set browser = "*firefox wd local", host = "http://www.realage.com", featureFile = "test/dan.feature", status = "failure" WHERE setRunId = 3 and id > 15;');
        $sth->execute();

        /* these tests will never run because the 'local' parameter is
        set to ::1 instead of 127.0.0.1; the webdriver standalone
        doesn't receive requests at ::1 */
        $response = \Httpful\Request::post($this->baseUrl . '/sets/rerunfailed/3')->send();

        $cmd = $response->body->command;
        $this->assertTrue(preg_match('/17/', $cmd), 'rerun all failed jobs');
    }
}
?>
