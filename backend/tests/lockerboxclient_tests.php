<?php
error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));
ini_set("display_errors", 1);
require(dirname(__FILE__) . './../vendor/autoload.php');
require_once(dirname(__FILE__) . './../vendor/simpletest/simpletest/autorun.php');
require_once dirname(__FILE__) . './../rest-routes/envstatus/lockerboxclient.php';

function readInConfSettings($file = "/opt/honeydew/honeydew.ini") {
    $contents = file($file);

    foreach ($contents as $row) {
        if (preg_match("/^\s*#/", $row) || !preg_match('/=/', $row)) {
            continue;
        }
        else {
            list($name, $value) = explode("=", trim($row));
            $settings[$name] = $value;
        }
    }
    return $settings;
}

class LockerboxClient extends UnitTestCase {
    function test_build_number () {
        $combos = array(
            array( 'prod', 'sc' ),
            array( 'prod', 'droz' ),
            array( 'prod', 'hca' ),
            array( 'prod', 'ds' ),
            array( 'prod', 'army'),
            array( 'prod', 'tma')
        );

        foreach ($combos as $args) {
            $build = call_user_func_array( 'get_build' , $args );
            $this->assertPattern( '/\d{8}[-.]\d{4}/', $build );
        }
    }
}
