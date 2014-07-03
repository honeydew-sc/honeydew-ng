<?php
$app->group('/process', function () use ($app) {

    $app->get('/', function() use ($app) {

        echo json_encode(
            array(
                array(
                    "name" => "saucelabs",
                    "status" => sauceTunnelStatus()
                ),
                array(
                    "name" => "browsermob",
                    "status" => browsermobStatus()
                )
            ));

    });

    function sauceTunnelStatus() {
        $account = 'arnoldmedia';
        $endpoint = "@saucelabs.com/rest/$account/tunnels";
        $settings = readInConfSettings();
        $auth = $account . ':' . $settings[$account];
        $tunnel = "https://" . $auth . $endpoint;

        $res = json_decode(file_get_contents($tunnel));
        return @$res[0];
    }

    function browsermobStatus() {
        $command = 'ps aux | grep [b]rowsermob | awk \'{print $2}\'';
        exec($command, $output);
        return @$output[0];
    }

});
