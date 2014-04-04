<?php
$app->group('/pusher', function () use ($app) {


    $app->post('/auth', function () use ($app) {
        /* pusher puts the socket id and channel name in the URL as
        query params instead of as a proper form POST body */
        $body = json_decode($app->request()->getBody());
        $plainSignature = $_REQUEST['socket_id'] . ":" . $_REQUEST['channel_name'];

        /* allow key and secret to be passed in the post body for
        testing */
        if (isset($body->pusher_auth_key)) {
            $settings['pusher_auth_key'] = $body->pusher_auth_key;
            $settings['pusher_secret'] = $body->pusher_secret;
        }
        else {
            $settings = readInConfSettings();
        }

        $signature = hash_hmac('sha256', $plainSignature, $settings['pusher_secret'], false);
        echo json_encode(array('auth' => $settings['pusher_auth_key'] . ":" . $signature));
    });

});

?>
