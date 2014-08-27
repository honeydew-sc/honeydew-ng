<?php
$app->group('/status', function () use ($app) {

    $app->get('/', function() use ($app) {

        $wd = localWebdriverStatus();
        echo json_encode(
            array(
                array(
                    'name' => 'saucelabs',
                    'status' => sauceTunnelStatus()
                ),
                array(
                    'name' => 'browsermob',
                    'status' => browsermobStatus()
                ),
                array(
                    'name' => 'your webdriver',
                    'status' => $wd['status']
                ),
            ));

    });

    $app->get('/webdriver', function () use ($app) {
        /* We try to use the server address in the local query parameter. */
        $wd_server = $app->request()->params('local');

        /* If it's unavailable, try to use HTTP_X_FORWARDED_FOR header. */
        if (!isset($wd_server) || !$wd_server) {
            $wd_server = $_SERVER['REMOTE_ADDR'];
            if (array_key_exists("HTTP_X_FORWARDED_FOR", $_SERVER) || $wd_serverAddress == "192.168.169.9") {
                $wd_server = $_SERVER["HTTP_X_FORWARDED_FOR"];
            }
        }
        $wd = localWebdriverStatus($wd_server);

        echo successMessage(array(
            'webdriverStatus' => $wd['status'],
            'serverAddress' => $wd['remote_server_address']
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

    function localWebdriverStatus($local = '127.0.0.1') {
        $port = 4444;
        $connection = @fsockopen($local, $port, $errno, $errstr, 1);

        return array(
            'status' => is_resource($connection),
            'remote_server_address' => $local
        );
    }

});
