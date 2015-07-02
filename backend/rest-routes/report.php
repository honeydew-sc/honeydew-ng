<?php
$app->group('/report', function () use ($app, $setsDir) {

    $app->get('/set/:name', function ($name) use ($app) {
        $pdo = hdewdb_connect();

        $host = $app->request()->params('host');
        $host_filter = get_host_filter( $host );
        $sql_args = get_set_report_sql_args( $name, $host );

        $date_filter = get_date_filter( $app->request()->params('date') );
        $sql = 'SELECT r.id as reportId, r.status, r.featureFile,
                       s.startDate, s.browser, s.id as setRunId, s.host,
                       u.name as user
        FROM report r
        INNER JOIN setRun s
        ON s.id = r.setRunId
        JOIN user u on u.id = s.userId
        WHERE s.setName LIKE ?
        ' . $host_filter . '
        ' . $date_filter . '
        ORDER BY s.id DESC';

        $sth = $pdo->prepare( $sql );

        $sth->execute($sql_args);
        $res = $sth->fetchAll(PDO::FETCH_ASSOC);

        $ret = array( "reports" => $res );
        if ( $app->request()->params('debug') ) {
            $ret['sql'] = debug_sql( $sql, $sql_args );
        }

        echo successMessage( $ret );
    });

    $app->get('/set/:name/host', function ( $name ) use ( $app ) {
        $pdo = hdewdb_connect();

        $sql_args = array( $name );
        $date_filter = get_date_filter();

        $sql = 'SELECT s.host
        FROM setRun s
        WHERE s.setName LIKE ?
        ' . $date_filter . '
        ORDER BY s.id DESC';

        $sth = $pdo->prepare( $sql );

        $sth->execute($sql_args);
        $res = $sth->fetchAll(PDO::FETCH_ASSOC);

        $ret = array( "hostnames" => $res );
        if ( $app->request()->params('debug') ) {
            $ret['sql'] = debug_sql( $sql, $sql_args );
        }

        echo successMessage( $ret );
    });


    $app->get('/:id', function ($id) use ($app) {
        $pdo = hdewdb_connect();
        $sth = $pdo->prepare('SELECT * from report where id = ?');

        $sth->execute(array($id));

        $res = $sth->fetchAll(PDO::FETCH_ASSOC);

        echo successMessage($res[0]);
    });

    function host_as_sql_like_param ( $host = '' ) {
        $host = preg_replace( '{^https?://}', '%', $host );
        return $host;
    }

    function get_host_filter ( $host ) {
        if ( isset( $host ) && $host ) {
            return 'AND s.host LIKE ?';
        }
        else {
            return '';
        }
    }

    function get_date_filter ( $date ) {
        if ( isset( $date ) && $date == 'all' ) {
            return '';
        }
        else {
            return 'AND s.startDate >= NOW() - INTERVAL 1 MONTH';
        }
    }

    function get_set_report_sql_args ( $name, $host ) {
        if ( isset( $host ) && $host !== '' ) {
            return array( $name, host_as_sql_like_param( $host ) );
        }
        else {
            return array( $name );
        }
    }
});

?>
