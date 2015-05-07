<?php
$app->group('/envstatus', function () use ($app) {

    $app->get('/app/:appName/env/:env', function ( $appName, $env ) use ( $app ) {
        $checkUrl = $app->request()->get('check');
        echo json_encode(array(
            'healthcheck' => healthcheck( $checkUrl )
        ));
    });

    function healthcheck ( $url ) {
        $results = array();
        $results['webpub'] = array(
            'status' => check_health( $url ),
            'build' => '',
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

    function canConnect ( $domain ) {
        /* we'll need to fiddle with this timeout time, as 1 second
        might be too slow... */
        $connection = @fsockopen($domain, 80, $errno, $errstr, 10);

        return is_resource($connection);
    }

    function url_to_domain ( $url ) {
        return preg_replace('/https?:\/\/(.*)\/.*/', "$1", $url);
    }

});
