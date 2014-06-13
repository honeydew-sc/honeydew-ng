<?php
$app->group('/report', function () use ($app, $setsDir) {

    $app->get('/set/:name', function ($name) use ($app) {
        $pdo = hdewdb_connect();

        $sth = $pdo->prepare('SELECT s.id, UNIX_TIMESTAMP(s.startDate), s.host, s.browser, s.status, u.name
 FROM setRun s
 JOIN user u
 ON u.id = s.userId
 WHERE setName = ?
 ORDER by id desc
 LIMIT 10' );

        $sth->execute(array($name));

        $res = $sth->fetchAll(PDO::FETCH_FUNC, function ($id, $start, $host, $browser, $status, $user) {
            return array(
                'id' => $id,
                'start' => $start,
                'host' => $host,
                'browser' => $browser,
                'status' => $status,
                'user' => $user
            );
        });

        echo successMessage(array('report' => $res));
    });
});

?>
