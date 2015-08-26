<?php

$setsDir = "/opt/honeydew/sets";

$app->group('/sets', function () use ($app, $setsDir) {

    $app->get('/', function () use ($setsDir) {
        echo '{ "sets" : ' . json_encode(
            array_values(array_filter(scandir($setsDir), function ($it) {
                return preg_match("/\w+\.set$/", $it);
            }))) . '}';
    });

    $app->get('/count', function () use ($setsDir) {
        $search = 'find ' . $setsDir . '/ -name "*.set" | xargs -I{} grep -Hc "feature$" {}';

        exec($search, $output);
        $count = array();

        foreach ($output as $line) {
            if (preg_match('%sets/+(.*?\.set):(\d+)%', $line, $matches)) {
                $count[$matches[1]] = $matches[2];
            }
        }

        echo successMessage(array(
            "setCount" => $count
        ));
    });
});
