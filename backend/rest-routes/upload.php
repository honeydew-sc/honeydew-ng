<?php
$app->group('/upload', function () use ($app) {

    $app->post('/android', function () use ($app) {
        try {
            $conf = readInConfSettings();
            date_default_timezone_set('America/New_York');

            $filename = $_FILES['file']['name'];
            $tmp_name = $_FILES['file']['tmp_name'];
            if ( is_uploaded_file($tmp_name) && preg_match('/\\.(?:apk|zip)$/', $filename)) {
                $s3 = new S3($conf['aws_access_key'], $conf['aws_secret_key']);

                $s3->putObject($tmp_name, $conf['aws_bucket'], $conf['aws_android'], S3::ACL_PUBLIC_READ);
            }
            echo successMessage();
        }
        catch (Exception $e) {
            $app->halt(418, errorMessage($e->getMessage()));
        }
    });


});

?>
