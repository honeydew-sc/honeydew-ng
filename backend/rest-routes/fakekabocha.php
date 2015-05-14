<?php

$app->group( '/fakekabocha', function () use ($app) {
    $app->get('/', function () {
        echo '{"result":"SUCCESS","data":{"stage":{"status":"ok"},"dw2":{"status":"ok"},"al2":{"status":"ok"},"cm2":{"status":"ok"},"kms":{"status":"ok"},"mservices":{"status":"ok"},"jd":{"status":"ok"},"dw":{"status":"ok"},"al":{"status":"ok"},"cm":{"status":"ok"}}}';
    });
});
