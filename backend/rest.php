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
require_once 'rest-routes/sets.php';
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
        $_SERVER['PHP_AUTH_USER'] = 'honeydoer';
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

function debug_sql( $sql, $args ) {
    $sql_parts = explode( '?', $sql );

    $debugged_sql = '';
    foreach ($sql_parts as $sql_part) {
        $debugged_sql .= $sql_part;

        $replacement = '"' . array_shift( $args ) . '"';
        if ( $replacement != '""' ) {
            $debugged_sql .= $replacement ;
        }
    }

    return preg_replace( '/\s+/', ' ', $debugged_sql );
}

function get_config($file = "/opt/honeydew/honeydew.ini") {
    $contents = file($file);

    $group = '';
    foreach ($contents as $row) {
        if (preg_match("/^\s*#/", $row) || !preg_match('/(?:^\[|=)/', $row)) {
            continue;
        }
        else if (preg_match('/^\[(.*)\]$/', $row, $matches) ) {
            $group = $matches[1];
        }
        else {
            list($name, $value) = explode("=", trim($row));
            $settings[$group][$name] = $value;
        }
    }

    return $settings;
}

function refreshSet( $setName ) {
    $shortName = escapeshellcmd(substr(array_pop(explode('/', $setName)), 0, -4));

    $escape = false;
    $features = grepDirectory(
        'features',
        'Set:.*?\b' . $shortName . '\b',
        '-rl -P',
        $escape
    );
    $contents = array_reduce($features, function ($acc, $it) {
        return $acc . substr($it, 9) . "\n";
    });

    if ($contents != "") {
        file_put_contents($setName, $contents);
        chmod_safely( $setName );
    }
}

function chmod_safely( $filename, $mask = 0666 ) {
    $processOwner = posix_getpwuid(posix_geteuid());
    $fileOwner = posix_getpwuid(fileowner($filename));
    if ($fileOwner == $processOwner) {
        chmod($filename, $mask);
    }

}

?>
