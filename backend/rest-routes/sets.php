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

    $app->put('/:newSetName', function ( $newSetName ) use ( $app ) {
        try {
            $sourceSetName = json_decode( $app->request()->getBody() )->sourceSetName;
            $oldPath = resolveFilename( array( 'sets', $sourceSetName  ) );

            if ( ! file_exists ($oldPath ) ) {
                throw new Exception( 'The source set does not exist: ' . $oldPath );
            }
            else {
                $features = array_filter( explode("\n", refreshSet( $oldPath ) ), 'strlen' );
            }

            $newPath = resolveFilename( array( 'sets', $newSetName ) );

            $oldShortSetName = preg_replace( '/\.set$/', '', $sourceSetName );
            $newShortSetName = preg_replace( '/\.set$/', '', $newSetName );
            copySet( $oldShortSetName, $newShortSetName, $features );
            $contents = refreshSet( $newPath );

            echo successMessage(array(
                'newSetName' => $newShortSetName,
                'contents' => $contents
            ));
        }
        catch ( Exception $e ) {
            $app->halt(418, errorMessage("Set copy error: " . $e->getMessage()));
        }
    });

    function copySet( $old, $new, $features ) {
        validateSetName( $new );

        $search = '(Set(?::|: |:.* )\@' . $old . '(?:$| ).*)';
        $replace = '$1 \@' . $new;

        return findAndReplaceInFiles( $search, $replace, $features );
    }

    function renameSet( $old, $new, $features ) {
        validateSetName( $new );

        $search = '(Set(?::|: |:.* ))\@' . $old . '($| )';
        $replace = '$1\@' . $new . '$2';
        return findAndReplaceInFiles( $search, $replace, $features );
    }

    function validateSetName( $name ) {
        if ( preg_match( '/[^A-z0-9-._]/', $name ) ) {
            throw new Exception( 'The new filename is funky?: ' . $name );
        }
    }

    function findAndReplaceInFiles( $search, $replace, $files ) {
        $rewrite_command_base = "perl -wpi -e 's/$search/$replace/'";

        $features_arg = expandFeaturePath( $files );

        $rewrite_cmd = $rewrite_command_base . ' ' . $features_arg;
        exec( $rewrite_cmd, $output );

        return $output;
    }

    function expandFeaturePath( $features ) {
        $config = get_config();
        $hdFeaturesBase = $config['honeydew']['basedir'] . 'features/';

        $fullpathFeatures = implode( ' ', array_map( function( $it ) use ( $hdFeaturesBase ) {
            return $hdFeaturesBase . $it;
        }, $features ) );

        return $fullpathFeatures;
    }

});
