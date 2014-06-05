<?php
error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));
ini_set("display_errors", 1);
require(dirname(__FILE__) . './../vendor/autoload.php');
require_once('/opt/honeydew-ui/htdocs/hdewdb_connect.php');
require_once(dirname(__FILE__) . './../vendor/simpletest/simpletest/autorun.php');

class reportTests extends UnitTestCase {
    protected $baseUrl = "http://127.0.0.1/rest.php/report";

    public function __construct() {
        $this->pdo = hdewdb_connect();
    }

    function testSetup() {
        $setup = 'insert into setRun (setName, setRunUnique, userId, host, browser, status, startDate, endDate) values("testing.set", "_unique_", 2, "test-host", "test-browser", "success", NOW(), NOW());';
        $this->pdo->prepare($setup)->execute();
    }

    function testSetReport() {
        $response = \Httpful\Request::get($this->baseUrl . '/set/testing.set')->send();
        $report = $response->body->report[0];

        $this->assertEqual($report->status, 'success', "status matches");
        $this->assertEqual($report->browser, 'test-browser', "browser matches");
        $this->assertEqual($report->host, 'test-host', "host matches");
    }

    function testCleanUp() {
        $cleanup = 'delete from setRun where `setRunUnique` = "_unique_"';
        $this->pdo->prepare($cleanup)->execute();
    }
}

?>
