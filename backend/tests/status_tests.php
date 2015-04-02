<?php
error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));
ini_set("display_errors", 1);
require(dirname(__FILE__) . './../vendor/autoload.php');
require_once('/opt/honeydew-ui/htdocs/hdewdb_connect.php');
require_once(dirname(__FILE__) . './../vendor/simpletest/simpletest/autorun.php');

class reportTests extends UnitTestCase {
    protected $baseUrl = "http://127.0.0.1/rest.php/status";

    public function __construct() {
        $this->pdo = hdewdb_connect();
    }

    function testLocalDefault() {
        $res = \Httpful\Request::get($this->baseUrl)->send();
        $wd_status = $res->body[1];
        $this->assertEqual($wd_status->{'name'}, 'your webdriver');
        $this->assertEqual($wd_status->{'remote_server_address'}, '127.0.0.1');
    }

    function testProxyStatus() {
        $res = \Httpful\Request::get($this->baseUrl)->send();
        $this->assertEqual($res->body[0]->{'name'}, 'proxy');
    }

    function testLocalManual() {
        $res = \Httpful\Request::get($this->baseUrl . '?local=1.2.3.4')->send();
        $wd_status = $res->body[1];
        $this->assertEqual($wd_status->{'remote_server_address'}, '1.2.3.4');
    }

    function testBrowsermobStatus() {
        $res = \Httpful\Request::get($this->baseUrl . '/proxy')->send();
        $this->assertEqual( $res->body->{'name'}, 'proxy' );
        $this->assertEqual( $res->body->{'success'}, true );
    }

}

?>
