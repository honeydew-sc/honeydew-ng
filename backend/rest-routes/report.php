<?php
$app->group('/report', function () use ($app, $setsDir) {

    $app->get('/set/:name', function ($name) use ($app) {
        $pdo = hdewdb_connect();
        $host = $app->request()->params('host');


        if ( isset($host) && $host ) {
            $host_filter = 'AND s.host LIKE ?';
            $sql_args = array($name, host_as_sql_like_param( $host ));
        }
        else {
            $host_filter = '';
            $sql_args = array($name);
        }

        $limit = 100;
        $sql = 'SELECT r.id as reportId, r.status, r.featureFile, s.startDate, s.browser, s.id as setRunId
        FROM report r
        INNER JOIN setRun s
        ON s.id = r.setRunId
        WHERE s.setName LIKE ?'
        . $host_filter .
        'ORDER BY s.id DESC
        LIMIT ' . $limit;

        $sth = $pdo->prepare( $sql );
        $sth->execute($sql_args);
        $res = $sth->fetchAll(PDO::FETCH_ASSOC);

        echo successMessage( array( "reports" => $res ) );
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
});

?>
