<?php
$app->group('/envstatus', function () use ($app) {
    require_once 'rest-routes/envstatus/lockerboxclient.php'; # provides getBuildOnEnv

    $app->get('/app/:appName/env/:env', function ( $appName, $env ) use ( $app ) {
        $checkUrl = $app->request()->get('check');
        $build = getBuildOnEnv( $env, $appName );

        echo json_encode(array(
            'healthcheck' => healthcheck( $checkUrl ),
            'build' => array ( 'webpub' => $build ),
        ));
    });

    function healthcheck ( $url ) {
        $results = array();
        $results['webpub'] = array(
            'status' => check_health( $url ),
            'url' => $url
        );

        $results['summary'] = array_reduce(
            array_keys( $results ), function ( $acc, $key ) use ( $results ) {
                return $acc && $results[$key]['status'];
            }, true);

        return $results;
    }

    function check_health ( $url ) {
        if ( can_connect( $url ) ) {
            $health = file_get_contents( $url );
            return strpos( $health, 'successful' ) !== false;
        }
        else {
            return false;
        }
    }

    function can_connect ( $url ) {
        if ( strpos($url, 'https') === false ) {
            $port = 80;
        }
        else {
            $port = 443;
        }

        $timeout = 8;
        $domain = url_to_domain( $url );
        $connection = @fsockopen($domain, $port, $errno, $errstr, $timeout);

        return is_resource($connection);
    }

    function url_to_domain ( $url ) {
        return preg_replace('/https?:\/\/(.*)\/.*/', "$1", $url);
    }

});
