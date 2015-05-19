<?php
$app->group('/envstatus', function () use ($app) {
    require_once 'rest-routes/envstatus/lockerboxclient.php'; # provides get_build

    $app->get('/app/:appName/env/:env', function ( $appName, $env ) use ( $app ) {
        $checkUrl = $app->request()->get('check');
        $build = get_build( $env, $appName );

        echo json_encode(array(
            'healthcheck' => healthcheck( $checkUrl ),
            'build' => array ( 'webpub' => $build ),
            'honeydew' => honeydew_status( $build, url_to_domain( $checkUrl ) )
        ));
    });

    function healthcheck ( $url ) {
        $results = array();
        $results['webpub'] = array(
            'status' => check_health( $url )
        );

        $results['summary'] = array_reduce(
            array_keys( $results ), function ( $acc, $key ) use ( $results ) {
                return $acc && $results[$key]['status'];
            }, true);

        return $results;
    }

    function check_health ( $url ) {
        if ( can_connect( $url ) ) {
            $health = @file_get_contents( $url );
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

        $timeout = 3;
        $domain = url_to_domain( $url );
        $connection = @fsockopen($domain, $port, $errno, $errstr, $timeout);

        return is_resource($connection);
    }

    function url_to_domain ( $url ) {
        return preg_replace('/https?:\/\/(.*)\/.*/', "$1", $url);
    }

    function honeydew_status ( $build, $url) {
        $host = '%' . $url . '%';
        $sql = '
        SELECT COUNT( IF ( status != "failure", 1, NULL ) ) AS success,
        count(*) AS total
        FROM report
        WHERE buildNumber = ?
        AND setRunId IS NOT NULL
        AND HOST like ?
        AND endDate >= now() - INTERVAL 2 DAY';

        $pdo = hdewdb_connect();
        $query = $pdo->prepare($sql);
        $query->execute( array( $build, $host ) );
        $status = $query->fetchAll(PDO::FETCH_ASSOC);

        /* returns { success: $count, total: $count } */
        return $status[0];
    }
});
