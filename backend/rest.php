<?php
require 'vendor/autoload.php';
require 'hdewdb_connect.php';

$app = new \Slim\Slim();
$app->contentType('application/json');

require_once 'rest-routes/autocomplete-sources.php';
require_once 'rest-routes/envstatus.php';
require_once 'rest-routes/files.php';
require_once 'rest-routes/job/HoneydewJob.php';
require_once 'rest-routes/jobs.php';
require_once 'rest-routes/monitor.php';
require_once 'rest-routes/pusher.php';
require_once 'rest-routes/status.php';
require_once 'rest-routes/report.php';
require_once 'rest-routes/tree.php';
require_once 'rest-routes/user.php';
require_once 'rest-routes/fakekabocha.php';

$app->run();

function errorMessage( $reason = Array(), $json_encode = 1 ) {
    $msg = array(
        "success" => "false",
        "message" => "There was a problem with the request.",
        "reason" => $reason
    );

    if ($json_encode) {
        return json_encode($msg);
    }
    else {
        return $msg;
    }
}

function successMessage( $notes = "" ){
    $res = array("success" => "true" );
    if ( $notes != "" ) {
        if (is_array($notes) || is_object($notes)) {
            $res = array_merge( (array) $res, (array) $notes );
        }
        else {
            $res["notes"] = $notes;
        }
    }

    return json_encode($res);
}

function getUser() {
    if (!isset($_SERVER['PHP_AUTH_USER'])) {
        $_SERVER['PHP_AUTH_USER'] = 'default';
    }

    return $_SERVER['PHP_AUTH_USER'];
}

function isProduction() {
    $hostname = gethostname();
    return !preg_match('/local/', $hostname);
}

function endswith( $string, $test ) {
    $strlen = strlen($string);
    $testlen = strlen($test);
    if ($testlen > $strlen) return false;
    return substr_compare($string, $test, -$testlen) === 0;
}

function grepDirectory($dir, $filter, $args = "-iRl", $escape = true) {
    $basedir = "/opt/honeydew/";
    $grep = "cd $basedir && grep";
    if ($escape) {
        $filter = '"' . escapeshellcmd($filter) . '" ';
    }
    else {
        $filter = '"' . $filter . '"';
    }
    $query = "$grep $args $filter $dir";

    exec($query, $result);

    return $result;
}

?>
