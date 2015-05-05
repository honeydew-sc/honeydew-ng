<?php
$app->group('/envstatus', function () use ($app) {

    $app->get('/app/:appName/env/:env', function ( $appName, $env ) use ( $app ) {
        echo json_encode(array(
            /* 'args' => "$appName, $env", */
            'healthcheck' => healthcheck( $appName, $env )
        ));
    });

    function healthcheck ( $app, $env ) {
        $boxTypes = array( 'webpub' => 'www' );
        $results = array();
        foreach ( array_keys($boxTypes) as $box ) {
            $results[$box] = checkHealth( $boxTypes[$box], $app, $env );
        }

        $results['summary'] = array_reduce(
            array_keys( $results ), function ( $acc, $key ) use ( $results ) {
                return $acc && $results[$key];
            }, true);

        return $results;
    }

    function checkHealth ( $prefix, $app, $env ) {
        $app = appToName( $app );
        $domain = $prefix . '.' . $app . '.com';
        if ( canConnect( $domain ) ) {
            $headers = get_headers( 'http://' . $domain . '/healthcheck' );
            return !!preg_match( '/20\d/', $headers[0] );
        }
        else {
            return false;
        }
    }

    function canConnect ( $domain ) {
        $connection = fsockopen($domain, 80, $errno, $errstr, 5);

        return is_resource($connection);
    }

    function appToName ( $app ) {
        $appNames = array(
            'SC' => 'sharecare'
        );

        return $appNames[$app];
    }
});
