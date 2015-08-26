<?php
error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));
ini_set("display_errors", 1);
require(dirname(__FILE__) . './../vendor/autoload.php');
require_once(dirname(__FILE__) . './../vendor/simpletest/simpletest/autorun.php');

class filesTests extends UnitTestCase {
    protected $baseUrl = "http://localhost/rest.php/sets";
    protected $basePath = "/opt/honeydew";

    function testGet() {
        $response = \Httpful\Request::get($this->baseUrl)->send();
        $this->assertFalse( in_array( '-.set', $response->body->sets ) );
        $this->assertFalse( in_array( '.set', $response->body->sets ) );
    }


}
