<?php
$app->group('/envstatus', function () use ($app) {
    require_once 'rest-routes/envstatus/lockerboxclient.php'; # provides get_build

    $app->group('/app/:appName/env/:env', function ( ) use ( $app ) {

        $app->get('/', function ( $appName, $env ) use ( $app ) {
            $check_url = $app->request()->get('check');
            $build_data = build_data( $env, $appName );

            echo json_encode(array(
                'healthcheck' => healthcheck( $appName, $check_url ),
                'build' => $build_data,
                'honeydew' => honeydew_status( $build_data['webpub'], url_to_domain( $check_url ) )
            ));
        });

        $app->get('/build', function ( $appName, $env ) use ( $app ) {
            echo successMessage(build_data( $env, $appName ));
        });
    });


    function build_data ( $env, $app ) {
        $build_number = get_build( $env, $app );

        $ret = array( 'webpub' => $build_number );
        if ( isSharecare( $app ) ) {
            $ret['branch'] = get_branch( $build_number );
        }

        return $ret;
    }

    function get_branch ( $build_number ) {
        $sql = 'SELECT `branch` FROM `jenkins` where build_number = ? LIMIT 1';

        $pdo = hdewdb_connect();
        $query = $pdo->prepare($sql);
        $query->execute( array( $build_number ) );
        $branch = $query->fetchAll(PDO::FETCH_ASSOC);
        if ( count( $branch ) ) {
            return $branch[0]['branch'];
        }
        else {
            return;
        }
    }

    function isSharecare ( $app ) {
        return $app === 'SC';
    }

    function healthcheck ( $app, $url ) {
        $results = array();
        $boxes = array( 'webpub' );

        if ( isSharecare( $app ) ) {
            array_push($boxes, 'author', 'data');
        }

        foreach ( $boxes as $name ) {
            if ( $name !== 'webpub' ) {
                $check_url = preg_replace( '/www/', $name, $url );
            }
            else {
                $check_url = $url;
            }

            $results[$name] = array(
                'status' => check_health( $check_url )
            );
        }

        $results['summary'] = array_reduce(
            array_keys( $results ), function ( $acc, $key ) use ( $results ) {
                return $acc && $results[$key]['status'];
            }, true);

        return $results;
    }

    function check_health ( $url ) {
        /* some healthchecks are misbehaving when we check via http,
        so we're experimeting with https for all of them. */
        $url = preg_replace('/http:/', 'https:', $url);
        if ( can_connect( $url ) ) {
            $opts = array(
                'http' => array(
                    'header' => "X-Forwarded-For: 50.232.112.210"
                )
            );

            $context = stream_context_create($opts);
            $health = @file_get_contents( $url, false, $context );
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
        $strip_origin = preg_replace( '/origin\.doctoroz/', 'doctoroz', $url );
        return preg_replace('/https?:\/\/(.*)\/.*/', "$1", $strip_origin);
    }

    function honeydew_status ( $build, $url) {
        $host = '%' . $url . '%';
        $sql = 'SELECT COUNT( IF ( r.status != "failure", 1, NULL ) ) AS success,
        COUNT( r.id ) AS total, s.id, s.setName
        FROM setRun s
        INNER JOIN report r
        ON r.setRunId = s.id
        WHERE r.buildNumber = ?
        AND s.endDate >= now() - INTERVAL 1 DAY
        AND s.host LIKE ?
        AND s.deleted = 0
        GROUP BY s.setName, s.startDate;';

        $pdo = hdewdb_connect();
        $query = $pdo->prepare($sql);
        $query->execute( array( $build, $host ) );
        $sets = $query->fetchAll(PDO::FETCH_ASSOC);

        $ret['details'] = $sets;
        if ( isset($_REQUEST['DEBUG']) && $_REQUEST['DEBUG'] ) {
            $with_build = preg_replace('/buildNumber = \?/', "buildNumber = \"$build\"", $sql);
            $with_host = preg_replace('/host LIKE \?/', "host LIKE \"$host\"", $with_build);
            $readable_sql = preg_replace('/\s+/', ' ', $with_host);

            $ret['query'] = $readable_sql;
        }

        return $ret;
    }
});
