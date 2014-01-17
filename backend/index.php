<?php
/* require('/opt/honeydew-ui/htdocs/features_action.php'); */
require 'vendor/autoload.php';

$app = new \Slim\Slim();
$app->contentType('application/json');

$app->get('/:filename+', function ($filename) {
    echo json_encode(Array("contents" => file_get_contents(resolveFilename($filename))));
});

$app->put('/:filename+', function ($filename) use ($app) {
    $filename = resolveFilename($filename);
    $body = json_decode($app->request()->getBody());
    if (function_exists('saveFile')) {
        saveFile($filename, $body->contents);
    }
    else {
        file_put_contents($filename, $body->contents);
    }
});

$app->delete('/:filename+', function ($filename) {
    echo unlink(resolveFilename($filename));
});

function resolveFilename($filename) {
    $base = "/opt/honeydew/";
    $filename = implode("/", $filename);
    $filename = preg_replace("/%2F/", "/", $filename);
    if (preg_match("/\.(feature|set|phrase)$/", $filename, $matches)) {
        $type = $matches[1] . "s/";
    }

    return $base . $type . $filename;
}

$app->run();
?>