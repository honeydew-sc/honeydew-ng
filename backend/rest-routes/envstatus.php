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
        $results['webpub'] = checkHealth( $url );

        $results['summary'] = array_reduce(
            array_keys( $results ), function ( $acc, $key ) use ( $results ) {
                return $acc && $results[$key];
            }, true);

        return $results;
    }

    function checkHealth ( $url ) {
        if ( canConnect( urlToDomain( $url ) ) ) {
            $headers = get_headers( $url );
            return !!preg_match( '/20\d/', $headers[0] );
        }
        else {
            return false;
        }
    }

    function canConnect ( $domain ) {
        $connection = fsockopen($domain, 80, $errno, $errstr, 10);

        return is_resource($connection);
    }

    function urlToDomain ( $url ) {
        return preg_replace('/https?:\/\/(.*)\/.*/', "$1", $url);
    }

});
