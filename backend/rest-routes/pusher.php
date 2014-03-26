<?php
$app->group('/pusher', function () use ($app) {

    $settings = readInConfSettings();
    $app->get('/token', function () use ($settings) {
        print_r($settings['pusher_auth_key']);
    });

    $app->post('/auth', function () use ($settings, $app) {
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

        $signature = hash_hmac('sha256', $plainSignature, $settings['pusher_secret'], false);
        echo json_encode(array('auth' => $settings['pusher_auth_key'] . ":" . $signature));
    });
});

?>
