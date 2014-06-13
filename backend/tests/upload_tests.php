<?php
error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));
ini_set("display_errors", 1);
require(dirname(__FILE__) . './../vendor/autoload.php');
require_once(dirname(__FILE__) . './../vendor/simpletest/simpletest/autorun.php');

class uploadFileTests extends UnitTestCase {
    protected $baseUrl = "http://localhost/rest.php/upload";

    function testFileUpload() {
        /* I don't have a good idea how I would integration test the
        file upload endpoint with \Httpful\Restful like I'm doing in
        the other _tests.php files. Since s3 uploads and reads cost
        money, I'm not really willing to write a test that actually
        does the upload and checks for the existence of a file. But,
        since I'm doing an integration test, I can't mock the S3 class
        from out here. The solution is probably to unit test it, but
        I don't know how to mock the S3 class.

        The following bash commands, assuming a properly configured
        s3cmd, will do a live integration test, when necessary: */


        /*
        $ touch test.apk
        $ curl -F "file=@test.apk" http://localhost/rest.php/upload/android
        $ s3cmd ls $BUCKET
        $ s3cmd del $BUCKET/sc_android2.apk
        */
    }

}
?>
