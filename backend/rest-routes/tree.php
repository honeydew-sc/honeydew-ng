<?php

$app->group('/tree', function () use ($app) {

    $app->get('/:folder+', function ($folder) use ($app) {
        try {
            $basedir = "/opt/honeydew/";
            $folder = implode("/", $folder);
            $tree = listFeaturesDir($basedir . $folder, $basedir);
            echo successMessage(array(tree => $tree));
        }
        catch (Exception $e) {
            $app->halt(404, errorMessage($e->getMessage()));
        };
    });
});


function listFeaturesDir( $start_dir='.', $basedir ) {
    $files = array();

    if ($fh = opendir( $start_dir )) {
        while(($file = readdir( $fh )) !== false){
            # loop through the files, skipping . and ..
            if (strcmp($file, '.')==0 || strcmp($file, '..')==0) {
                continue;
            }

            $filepath = $start_dir . '/' . $file;

            if (is_dir( $filepath )) {
                $files[] = array(
                    'label' => $file,
                    'children' => listFeaturesDir($filepath, $basedir)
                );
            }
            else {
                if (endswith($file, "feature")
                    || endswith($file, "phrase")
                    || endswith($file, "set")) {
                    $files[] = array(
                        'label' => $file,
                        'children' => array()
                    );
                }
            }
        }
        closedir($fh);
    }else{
        $files = false;
    }
    return($files);
}

?>
