<?php

$app->post('/jobs', function () use ($app) {
    $jobData = (array) json_decode($app->request()->getBody());

    try {
        validateJobData($jobData);
        // although jobs.php is in /rest-routes, it's required by
        // rest.php, which a sibling of HoneydewJob.
        require_once('HoneydewJob.php');

        $jobData['filename'] = $jobData['file'];

        foreach ($jobData['browser'] as $browser) {
            $data = $jobData;
            $data['browser'] = $browser;
            $job = new HoneydewJob($data);
            $jobs[] = $job;
            $cmds[] = $job->syncShellCommand();
        }

        if (array_key_exists('serial', $jobData) && $jobData['serial']) {
            $cmd = implode(' && ', $cmds) . ' > /dev/null 2>&1 &';
            system($cmd);
        }
        else {
            foreach ($jobs as $job) {
                $cmd[] = $job->addToQueue();
            }
        }

        echo successMessage(array(
            "command" => $cmd
        ));
    }
    catch (Exception $e) {
        $app->halt('418', errorMessage($e->getMessage()));
    }
});

function validateJobData( $jobData ) {
    $required = array('file', 'host', 'browser');

    array_walk($required, function ($it) use ($jobData) {
        if ($jobData[$it] == '') {
            throw new Exception('Your ' . $it . ' is invalid: [' . $jobData[$it] . ']');
        }
    });
}


?>
