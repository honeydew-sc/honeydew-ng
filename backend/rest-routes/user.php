<?php

$app->get('/user', function () {
    echo successMessage(array('user' => getUser()));
});

?>
