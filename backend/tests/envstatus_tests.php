<?php
error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));
ini_set("display_errors", 1);
require(dirname(__FILE__) . './../vendor/autoload.php');
require_once(dirname(__FILE__) . './../vendor/simpletest/simpletest/autorun.php');

class reportTests extends UnitTestCase {
    protected $baseUrl = "http://127.0.0.1/rest.php/envstatus";

    function testHealthcheckStatus () {
        $res = \Httpful\Request::get($this->baseUrl . '/app/test/env/prod?check=http:%2F%2localhost%2F404')->send();
        $healthcheck = $res->body->healthcheck;
        $this->assertFalse($healthcheck->{'webpub'});
        $this->assertFalse($healthcheck->{'summary'});
    }
}
