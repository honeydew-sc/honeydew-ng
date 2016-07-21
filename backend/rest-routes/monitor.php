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
        $config = get_config();
        $hdSets = $config['honeydew']['basedir'] . 'sets/';

        $monitors = array_map( function ( $it ) use ($pdo, $hdSets) {
            if (!file_exists($hdSets . $it['set'])) {
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
            validate_new_monitor($body);

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
            $status = validate_new_monitor($body);

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

function validate_new_monitor($monitor) {
    validate_host( $monitor->{'host'} );
    validate_set( $monitor->{'set'} );
    validate_browser( $monitor->{'browser'} );
}

function validate_host( $host ) {
    if (!preg_match("/sharecare|doctoroz|army|ultimateme|bactes|dailystrength/", $host)) {
        throw new Exception('Error: invalid host selection: ' . $host);
    }
}

function validate_set( $set, $retry = false ) {
    /* when validating a new monitor, ensure that the set exists, or
    try to create it! */
    $set_filename = abs_set_path( $set );

    if ( ! file_exists( $set_filename ) ) {
        if ( $retry ) {
            throw new Exception( 'Error: the set does not exist: ' . $set_filename );
        }
        else {
            refreshSet( $set_filename );
            validate_set( $set, true );
        }
    }
}

function validate_browser( $browser ) {
    if ( preg_match( '/localhost/i', $browser ) ) {
        throw new Exception( 'Error: you probably do not want to schedule a LOCALHOST monitor' );
    }
}

function abs_set_path( $set ) {
    if ( strpos($set, '/') === 0) {
        return $set;
    }
    else {
        $config = readInConfSettings();
        $sets_dir = $config['basedir'] . 'sets/';
        return $sets_dir . $set;
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
