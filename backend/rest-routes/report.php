<?php
$app->group('/report', function () use ($app, $setsDir) {

    $app->get('/set/:name', function ($name) use ($app) {
        $pdo = hdewdb_connect();

        $sql = 'SELECT r.id as reportId, r.status, r.featureFile, s.startDate, s.browser, s.id as setRunId
        FROM report r
        INNER JOIN setRun s
        ON s.id = r.setRunId
        WHERE s.setName LIKE ?
        ORDER BY s.id DESC';

        $sth = $pdo->prepare( $sql );
        $sth->execute(array($name));
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
});

?>
