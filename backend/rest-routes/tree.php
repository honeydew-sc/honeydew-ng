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
    $basedir_length = strlen($basedir);

    if ($fh = opendir( $start_dir )) {
        while(($file = readdir( $fh )) !== false){
            # loop through the files, skipping . and ..
            if (strcmp($file, '.')==0 || strcmp($file, '..')==0) {
                continue;
            }

            $filepath = $start_dir . '/' . $file;

            $candidate = array(
                'label' => $file,
                'order' => ord($file)
            );

            if (is_dir( $filepath )) {
                /* exclude empty folders */
                $children = listFeaturesDir($filepath, $basedir);
                if (!empty($children)) {
                    $candidate['children'] = $children;
                    $files[] = $candidate;
                }
            }
            else {
                if (endswith($file, "feature")
                    || endswith($file, "phrase")
                    || endswith($file, "set")) {
                    $candidate['children'] = array();

                    /* pop off basedir from the folder */
                    $candidate['folder'] = substr($start_dir, $basedir_length - 1);
                    $files[] = $candidate;
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
