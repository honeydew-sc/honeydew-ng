<?php
error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));
ini_set("display_errors", 1);
require(dirname(__FILE__) . './../vendor/autoload.php');
require_once(dirname(__FILE__) . './../vendor/simpletest/simpletest/autorun.php');

class monitorTests extends UnitTestCase {
    protected $base = "http://localhost/rest.php";

    public function __construct() {
        $this->monitorUri = $this->base . "/monitor";
        $seed = \Httpful\Request::get($this->monitorUri . "/reload?security=obscurity")->send();

        $this->fakeSet = "/opt/honeydew/sets/fake.set";
    }

    function setUp() {
        touch($this->fakeSet);
    }

    function tearDown() {
        unlink($this->fakeSet);
    }

    function testListOfSets() {
        $response = \Httpful\Request::get($this->base . "/sets")->send();
        $this->assertEqual($response->code, 200, "get /sets passes");
        $this->assertTrue(gettype($response->body) == "object", "returns a json object");
        $sets = $response->body->{"sets"};
        $this->assertTrue(preg_match("/\.set$/", $sets[array_rand($sets)]), "of sets");
    }

    function testQuery() {
        $validMonitor = array(
            "set" => 'fake.set',
            "browser" => "Chrome",
            "host" => "https://www.sharecare.com"
        );

        $response = \Httpful\Request::post($this->monitorUri)
            ->sendsJson()
            ->body(json_encode($validMonitor))
            ->send();

        $response = \Httpful\Request::get($this->monitorUri)
            ->send();

        $monitors = $response->body;
        $this->assertEqual($response->code, 200, "get passes");
        $this->assertPattern("/\.set/", $monitors[0]->{'set'}, "has sets in it");
        $this->assertTrue(isset($monitors[0]->{'browser'}), "has browser in it");
        $this->assertPattern("/https?:\/\//", $monitors[0]->{'host'}, "has host in it");
    }

    function testNewMonitor() {
        $invalidMonitor = array(
            "set" => "fakeThing.set",
            "browser" => "TestBrowser",
            "host" => "http://localhost"
        );

        $response = \Httpful\Request::post($this->monitorUri)
            ->sendsJson()
            ->body(json_encode($invalidMonitor))
            ->send();

        $res = $response->body;
        $this->assertEqual($res->{"success"}, "false", "bad monitor post fails");
        $this->assertTrue($response->code != 200, 'bad monitor post fails code');
        $this->assertNoPattern("/filename/", $res->{"reason"}, "missing file gets rejected");
        $this->assertPattern("/Error: invalid host/", $res->{"reason"}, "bad host gets rejected");

        $fakeSet = "/tmp/fake.set";
        $validMonitor = array(
            "set" => $fakeSet,
            "browser" => "Chrome",
            "host" => "sharecare"
        );

        $response = \Httpful\Request::post($this->monitorUri)
            ->sendsJson()
            ->body(json_encode($validMonitor))
            ->send();

        $res = $response->body;
        $this->assertEqual($res->{"success"}, "true", "good post succeeds");
        $this->assertTrue(isset($res->{"id"}), "new post comes back with id");
    }

    function testForceExistNewMonitor() {
        $fakeSet = "/tmp/fake.set";
        unlink($fakeSet);

        $validMonitor = array(
            "set" => $fakeSet,
            "browser" => "Chrome",
            "host" => "sharecare"
        );

        $response = \Httpful\Request::post($this->monitorUri)
            ->sendsJson()
            ->body(json_encode($validMonitor))
            ->send();

        $res = $response->body;
        $this->assertTrue( file_exists( $fakeSet ) );
        unlink($fakeSet);
    }

    function testUpdateExisting() {
        $response = \Httpful\Request::get($this->monitorUri)->send();
        $monitor = $response->body[0];
        $id = $monitor->{"id"};
        $monitor->{"on"} = !$monitor->{"on"};

        $response = \Httpful\Request::post($this->monitorUri . "/" . $id)
            ->sendsJson()
            ->body(json_encode($monitor))
            ->send();

        $res = $response->body;
        $this->assertEqual($res->{"success"}, "true", "good post succeeds");

        $response = \Httpful\Request::get($this->monitorUri . "/" . $id)->send();
        $this->assertEqual($response->body[0]->{"on"}, $monitor->{"on"});
    }

    function testDelete() {
        $id = "57";
        $response = \Httpful\Request::delete($this->monitorUri . "/" . $id)
            ->send();

        $res = $response->body;
        $this->assertEqual($res->{"success"}, "true", "it no longer exists");
    }
}

?>
