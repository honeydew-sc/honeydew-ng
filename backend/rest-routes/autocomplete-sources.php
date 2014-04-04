<?php

$app->group('/autocomplete', function () use ($app) {

    $app->get('/', function () {
        $rules = json_decode(file_get_contents('rest-routes/sources/rules.json'));
        $phrases = json_decode(file_get_contents('rest-routes/sources/phrases.json'));
        exec('/usr/bin/perl -w /opt/honeydew/bin/parseRules.pl > /dev/null 2>&1 &');
        exec('/usr/bin/perl -w /opt/honeydew/bin/parsePhrases.pl > /dev/null 2>&1 &');
        echo json_encode(array(
            'suggestRules' => $rules[0],
            'regexRules' => $rules[1],
            'phrases' => $phrases
        ));
    });
});

?>
