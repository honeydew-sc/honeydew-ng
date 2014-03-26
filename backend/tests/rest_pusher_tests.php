<?php
error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));
ini_set("display_errors", 1);
require(dirname(__FILE__) . './../vendor/autoload.php');
require_once(dirname(__FILE__) . './../vendor/simpletest/simpletest/autorun.php');

class pusherTests extends UnitTestCase {
    protected $baseUrl = "http://localhost/rest.php/pusher";
    protected $basePath = "/opt/honeydew/";

    function testCanAuthCorrectly() {
        /* fake sample data from http://pusher.com/docs/auth_signatures */
        $key = '278d425bdf160c739803';
        $fakeAuth = json_encode(array(
            pusher_auth_key => $key,
            pusher_secret => '7ad3773142a6692b25b8',
        ));

        $response = \Httpful\Request::post($this->baseUrl . "/auth?channel_name=private-foobar&socket_id=1234.1234")
                                                ->body($fakeAuth)
                                                ->send();

        $this->assertEqual($response->body->auth, $key . ':58df8b0c36d6982b82c3ecf6b4662e34fe8c25bba48f5369f135bf843651c3a4', "auth is right!");
    }
}

?>
