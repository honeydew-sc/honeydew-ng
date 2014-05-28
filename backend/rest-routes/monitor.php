<?php

$app->group('/monitor', function () use ($app) {

    $monitorGetQuery = 'SELECT `id` as "id",
    `set` as "set",
    `browser` as "browser",
    `host` as "host",
    `on` as "on"
    FROM `monitor`';

    $app->get('/', function () use ($monitorGetQuery) {
        $pdo = hdewdb_connect();
        $query = $pdo->prepare($monitorGetQuery);
        $query->execute();
        $monitors = $query->fetchAll(PDO::FETCH_ASSOC);
        $monitors = array_map( function ( $it ) use ($pdo) {
            if (!file_exists("/opt/honeydew/sets/" . $it['set'])) {
                deleteFromDB( $it['id'], $pdo );
            }
            else {
                $it["on"] = $it["on"] ? true : false;
                return $it;
            }
        }, $monitors);

        echo json_encode($monitors);
    });

    $app->get('/reload', function () use ($app) {
        $params = $app->request->get();

        if ($params['security'] == 'obscurity') {
            createMonitorTable(true);
            convertJsonToSQL();
            echo successMessage();
        }
        else {
            echo errorMessage();
        }
    });

    $app->get('/:id', function ($id) use ($monitorGetQuery) {
        $pdo = hdewdb_connect();
        $query = $pdo->prepare(
            $monitorGetQuery . ' WHERE id = ?');
        $query->execute(array($id));

        echo json_encode($query->fetchAll(PDO::FETCH_ASSOC));
    });

    $app->post('/', function() use ($app) {
        $body = json_decode($app->request()->getBody());

        try {
            validateNewMonitor($body);

            $pdo = hdewdb_connect();
            /* new entries are "on" by default */
            $body->{"on"} = true;

            $sql = "INSERT INTO `monitor` (`set`, `browser`, `host`, `on` ) VALUES( ?, ?, ?, ? );";
            $query = $pdo->prepare($sql);

            $query->execute(Array(
                $body->{"set"},
                $body->{"browser"},
                $body->{"host"},
                $body->{"on"}
            ));

            $sql = "SELECT LAST_INSERT_ID();";
            $query = $pdo->prepare($sql);
            $query->execute();
            $id = $query->fetchAll();
            $body->{"id"} = $id[0][0];
            echo successMessage($body);
        }
        catch (Exception $e) {
            $app->halt('418', errorMessage($e->getMessage()));
        }
    });

    $app->post('/:id', function ($id) use ($app) {
        $body = json_decode($app->request()->getBody());

        try {
            $status = validateNewMonitor($body);

            $pdo = hdewdb_connect();

            $sql = "UPDATE `monitor` SET `set` = ?, `browser` = ?, `host` = ?, `on` = ? WHERE `id` = ?;";
            $query = $pdo->prepare($sql);
            $query->execute(Array(
                $body->{"set"},
                $body->{"browser"},
                $body->{"host"},
                $body->{"on"} ? 1 : 0,
                $body->{"id"}
            ));

            echo successMessage($body);
        }
        catch (Exception $e) {
            $app->halt('418', errorMessage($e->getMessage()));
        }
    });

    $app->delete('/:id', function($id) {
        if (is_numeric($id)) {
            deleteFromDB($id);
            echo successMessage();
        }
        else {
            $app->halt('418', Array(
                'request' => $body,
                'id' => 'Invalid id: ' . $id
            ));
        }
    });

});

function createMonitorTable ( $deleteFirst = false ) {
    $pdo = hdewdb_connect();

    if ($deleteFirst) {
        $query = $pdo->prepare('DROP TABLE IF EXISTS `monitor`');
        $query->execute();
    }

    $query = $pdo->prepare('
    CREATE TABLE `monitor` (
      `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
      `set` VARCHAR(128) NOT NULL,
      `browser` VARCHAR(128) NOT NULL,
      `host` VARCHAR(128) NOT NULL,
      `on` BOOLEAN NOT NULL,
      PRIMARY KEY (`id`)
    ) engine = InnoDB;
    ');

    $query->execute();
}

function convertJsonToSQL( $monitorFile = "/opt/honeydew/sets/setInfo" ) {
    $pdo = hdewdb_connect();
    $contents = unserialize(file_get_contents($monitorFile));

    $sql = 'INSERT INTO `monitor` ( `set`, `browser`, `host`, `on` ) VALUES (?, ?, ?, 1);';
    $query = $pdo->prepare($sql);
    foreach( $contents as $set => $options ) {
        if ($options['selected'] == 1 &&
            isset($options['browser']) && $options['browser'] != "" &&
            isset($options['host']) && $options['host'] != "") {
            $query->execute(array($set, $options['browser'], $options['host']));
        }
    }
}

function validateNewMonitor($monitor) {
    $reason = "";
    if (!file_exists($monitor->{"set"}) &&
        !file_exists("/opt/honeydew/sets/" . $monitor->{"set"})) {
        $reason = "Error: set file not found: " . $monitor->{"set"};
    }

    if (!preg_match("/sharecare|doctoroz|army|ultimateme|bactes|dailystrength/", $monitor->{"host"})) {
        $reason = "Error: invalid host selection: " . $monitor->{'host'};
    }

    if ($reason != "") {
        throw new Exception($reason);
    }
}

function deleteFromDB ( $id, $pdo = "" ) {
    if ($pdo == "") {
        $pdo = hdewdb_connect();
    }

    $query = $pdo->prepare('DELETE FROM `monitor` WHERE `id` = ?');
    $query->execute(array($id));
}


?>
