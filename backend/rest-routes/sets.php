<?php

$config = get_config();
$setsDir = $config['honeydew']['basedir'] . 'sets/';

$app->group('/sets', function () use ($app, $setsDir) {

    $app->get('/', function () use ($setsDir) {
        echo '{ "sets" : ' . json_encode(
            array_values(array_filter(scandir($setsDir), function ($it) {
                return preg_match("/\w+\.set$/", $it);
            }))) . '}';
    });

    $app->get('/count', function () use ($setsDir) {
        $search = 'find ' . $setsDir . '/ -name "*.set" | xargs -I{} grep -Hc "feature$" {}';

        exec($search, $output);
        $count = array();

        foreach ($output as $line) {
            if (preg_match('%sets/+(.*?\.set):(\d+)%', $line, $matches)) {
                $count[$matches[1]] = $matches[2];
            }
        }

        echo successMessage(array(
            "setCount" => $count
        ));
    });

    /* rename an existing set */
    $app->post('/:setFilename', function ( $setFilename ) use ( $app ) {
        try {
            /* resolveFilename expects an exploded array of file path
            parts */

            $oldPath = resolveFilename( array( 'sets', $setFilename ) );
            $contents = refreshSet( $oldPath );
            $features = array_filter( explode("\n", $contents), 'strlen' );

            $oldShortSetName = preg_replace( '/\.set$/', '', $setFilename );
            $newShortSetName = json_decode( $app->request()->getBody() )->newSetName;

            renameSet( $oldShortSetName, $newShortSetName, $features );

            unlink( $oldPath );
            echo successMessage(array( 'newSetName' => $newShortSetName ) );
        }
        catch ( Exception $e ) {
            $app->halt(418, errorMessage("Set rename error: " . $e->getMessage()));
        }
    });

    function renameSet( $old, $new, $features ) {
        if ( preg_match( '/[^A-z0-9-._]/', $new ) ) {
            throw new Exception( 'The new filename is funky?: ' . $new );
        }

        $rewrite_command_base = 'perl -wpi -e \'s/(Set(?::|: |:.* ))\@' . $old . '($| )/$1\@' . $new . '$2/\'';

        $config = get_config();
        $hd_features_base = $config['honeydew']['basedir'] . 'features/';

        $features_arg = implode( ' ', array_map( function( $it ) use ( $hd_features_base ) {
            return $hd_features_base . $it;
        }, $features ) );
        $rewrite_cmd = $rewrite_command_base . ' ' . $features_arg;
        return exec($rewrite_cmd);
    }
});
