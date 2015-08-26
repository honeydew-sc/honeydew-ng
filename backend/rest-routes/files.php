<?php
$app->group('/files', function () use ($app) {

    $app->map('/:folder(/:filename+)', function ($folder, $filename = "") use ($app) {
        if (preg_match("/features|phrases|sets/", $folder)) {
            $app->pass();
        }
        else {
            $app->halt(403, errorMessage(array("filename" => $folder . "/" . $filename . " is an invalid filename")));
        }
    })->via('GET', 'POST', 'PUT', 'DELETE');

    $app->get('/:filename+', function ($filename) use ($app) {
        try {
            $filename = resolveFilename($filename);

            if (endswith($filename, '.set')) {
                refreshSet($filename);
            }

            echo json_encode(array(
                "file" => encodeFilename($filename),
                "contents" => file_get_contents($filename)
            ));
        }
        catch (Exception $e) {
            $app->halt(404, errorMessage($e->getMessage()));
        };
    });

    $app->post('/:filename+', function ($filename) use ($app) {
        $body = json_decode($app->request()->getBody());
        $body->file = resolveFilename($filename);
        try {
            saveFile($body->file, $body->contents);
            $body->file = encodeFilename($body->file);
            echo successMessage($body);
        }
        catch (Exception $e) {
            $app->halt(418, errorMessage($e->getMessage()));
        }
    });

    $app->put('/:filename+', function ($filename, $msg = "", $notes = "Changes commited") use ($app) {
        try {
            $body = json_decode($app->request()->getBody());

            if (isset($body->msg)) {
                $msg = $body->msg;
            }

            $filename = resolveFilename($filename);
            $gitOutput = commitChanges($filename, $msg);
            if (preg_match('/\[master (.*)\]/i', $gitOutput[0] , $matches)) {
                $notes .= ": " . $matches[1];
            }

            echo successMessage(array(
                "notes" => $notes,
                "git" => $gitOutput
            ));
        }
        catch (Exception $e) {
            $app->halt(418, errorMessage("Commit error: " . $e->getMessage()));
        };

    });

    $app->delete('/:filename+', function ($filename) use ($app) {
        $filename = resolveFilename($filename);
        try {
            unlink($filename);
            echo successMessage();
        }
        catch (Exception $e) {
            $app->halt(503, errorMessage($e->getMessage()));
        }
    });

    function encodeFilename( $filename ) {
        $config = get_config();
        $hdBase = $config['honeydew']['basedir'];
        return urlencode(str_replace($hdBase, '', $filename));
    }

    function saveFile( $filename, $featureData ) {
        $featureData = str_replace("\r", "", $featureData);

        $newMD5 = hash('md5', $featureData);
        $oldMD5 = hash('md5', @file_get_contents($filename));

        if($oldMD5 != $newMD5) {
            $dir = dirname($filename);
            if(!is_dir($dir)) {
                $old = umask(0);
                mkdir($dir, 0777, true);
                umask($old);
            }

            /* encode the data to avoid problems with (char-to-string 160)
             */
            file_put_contents($filename, utf8_encode($featureData));
            chmod_safely( $filename );
        }
    }

    function commitChanges($filename, $msg) {
        $username = getUser();
        $config = get_config();
        $hdBase = $config['honeydew']['basedir'];
        $filename = str_replace($hdBase, "", $filename);

        $message = '"' . $username  . ' ' . $msg . '"';
        $command = "sh /opt/honeydew-ui/user-push.sh " . $filename . " " . $message;
        $ret = $command;

        if (isProduction()) {
            exec($command, $output);
        }

        $ret .= "\n" . $output;

        return $ret;
    }
});

?>
