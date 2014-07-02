<?php
$app->group('/process', function () use ($app) {

    $app->get('/', function() use ($app) {

        echo json_encode(
            array(
                array(
                    "name" => "saucelabs",
                    "status" => "on"
                ),
                array(
                    "name" => "browsermob",
                    "status" => "on"
                )
            ));

    });

    $app->get('/saucelabs', function () use ($app) {
        echo successMessage(array(
            "name" => "saucelabs",
            "status" => "on"
        ));
    });

});
