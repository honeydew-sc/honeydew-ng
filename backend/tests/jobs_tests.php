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
    protected $testUser = 'php_backend_tester';

    function testCanPost() {
        $response = \Httpful\Request::post($this->baseUrl)->send();
        $this->assertNotEqual($response->code, 200, 'fails without required parts: host, browser, filename');
        $this->assertPattern('/file/i', $response->body->reason, 'fails without filename');

        touch($this->basePath . $this->tempPath);
        $contents = array(
            'host' => 'http://www.google.com',
            'browser' => array('phantomjs local'),
            'file' => $this->tempPath,
            'username' => $this->testUser,
            'test' => true
        );

        $response = \Httpful\Request::post($this->baseUrl)
             ->sendsJson()
             ->body(json_encode($contents))
             ->send();
        $this->assertTrue($response->body->success == 'true', 'posting a well formed job gets successMessage back');
        unlink($this->basePath . $this->tempPath);
    }

    function testCanQueueJobs() {
        touch($this->basePath . $this->tempPath);
        $contents = array(
            'host' => 'http://www.google.com',
            'browser' => array('phantomjs local'),
            'file' => $this->tempPath,
            'username' => $this->testUser,
            'test' => true,
            'queue' => true
        );

        $response = \Httpful\Request::post($this->baseUrl)
             ->sendsJson()
             ->body(json_encode($contents))
             ->send();
        $this->assertPattern('/hd-queue-job/', $response->body->command[0], 'including queue as a kv pair queues the job');
        unlink($this->basePath . $this->tempPath);
    }

    function testSerialBatchJobs() {
        touch($this->basePath . $this->tempPath);
        $contents = array(
            'host' => 'http://www.google.com',
            'browser' => array('phantomjs local', 'phantomjs local again'),
            'file' => $this->tempPath,
            'username' => $this->testUser,
            'serial' => 'test',
            'test' => true
        );

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

    function testCanDeleteSetRun() {
        $pdo = hdewdb_connect();
        $sth = $pdo->prepare('insert into setRun (setRunUnique, setName, userId, host, browser, status, startDate, endDate) values("setRunUn", "setName", 1, "host", "browser", "success", NOW(), NOW());');
        $sth->execute();
        $id1 = $pdo->lastInsertId();

        $sth2 = $pdo->prepare('insert into setRun (setRunUnique, setName, userId, host, browser, status, startDate, endDate) values("setRunU2", "setName", 1, "host", "browser", "success", NOW(), NOW());');
        $sth2->execute();
        $id = $pdo->lastInsertId();

        $response = \Httpful\Request::delete($this->baseUrl . '/sets/' . $id)->send();
        $sth = $pdo->prepare('select id from setRun where deleted = 1');
        $sth->execute();
        $res = $sth->fetchAll();
        $this->assertEqual($res[0]["id"], $id);

        $sth = $pdo->prepare('delete from setRun where id = ?');
        $sth->execute(array($id1));
        $sth->execute(array($id));
    }

    function testCanStartWorker() {
        $body = array( 'channel' => 'chan' );
        $response = \Httpful\Request::post($this->baseUrl . '/worker?work=false')
            ->sendsJson()
            ->body(json_encode($body))
            ->send();

        $cmd = $response->body->command;
        $this->assertPattern('/manual_set_worker.* chan-honeydoer .*&/', $cmd, 'command has proper binary and async stuff');
        $this->assertEqual($response->body->output, 0, 'we get the pid afterwards');
        $this->assertEqual($response->body->queue, 'chan-honeydoer', 'we derive the channel properly');
    }
}
?>
