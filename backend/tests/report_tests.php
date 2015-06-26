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
        $setRunSetup = 'insert into setRun (setName, setRunUnique, userId, host, browser, status, startDate, endDate)
                               values("testing.set", "_unique_", 2, "test-host", "test-browser", "success", NOW(), NOW());';
        $this->pdo->prepare($setRunSetup)->execute();
        $this->setRunId = $this->pdo->lastInsertId();

        $reportSetup = 'insert into report ( startDate, endDate, host, browser, featureFile, jobId, result, status, userId, setRunId ) values ( NOW(), NOW(), "test-host", "test-browser", "features/testing.feature", "_unique_", "result", "success", 2, ?)';
        $this->pdo->prepare($reportSetup)->execute( array( $this->setRunId ) );
    }

    function testSetReport() {
        $response = \Httpful\Request::get($this->baseUrl . '/set/testing.set')->send();
        $report = $response->body->reports[0];

        $this->assertEqual($report->setRunId, $this->setRunId, "setRunId matches");
        $this->assertEqual($report->status, 'success', "status matches");
        $this->assertEqual($report->browser, 'test-browser', "browser matches");
    }

    function testFoundSetReportHostFilter() {
        $response = \Httpful\Request::get($this->baseUrl . '/set/testing.set?host=http://test-host')->send();
        $report = $response->body->reports[0];

        $this->assertEqual($report->setRunId, $this->setRunId, "setRunId matches");
        $this->assertEqual($report->status, 'success', "status matches");
        $this->assertEqual($report->browser, 'test-browser', "browser matches");
    }

    function testMissedSetReportHostFilter() {
        $response = \Httpful\Request::get($this->baseUrl . '/set/testing.set?host=http://wrong-host')->send();
        $this->assertTrue( empty($response->bodyreports) );
    }

    function testDefaultDateFilter() {
        $response = \Httpful\Request::get($this->baseUrl . '/set/testing.set?debug=1')->send();
        $sql = $response->body->sql;
        $this->assertPattern( '/startDate.*INTERVAL/', $sql, 'date filter is applied by default');
    }

    function testRemoveDateFilter() {
        $response = \Httpful\Request::get($this->baseUrl . '/set/testing.set?date=all&debug=1')->send();
        $sql = $response->body->sql;
        $this->assertNoPattern( '/startDate.*INTERVAL/', $sql, 'date filter can be removed');
    }


    function testCleanUp() {
        $cleanup = 'delete from setRun where `setRunUnique` = "_unique_"';
        $this->pdo->prepare($cleanup)->execute();

        $cleanupReports = 'delete from report where `setRunId` = ?';
        $this->pdo->prepare($cleanupReports)->execute(array( $this->setRunId ) );
    }
}

?>
