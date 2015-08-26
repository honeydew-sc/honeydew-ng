<?php

$app->group('/autocomplete', function () use ($app) {

    $app->get('/', function () {
        $rules = json_decode(file_get_contents('rest-routes/sources/rules.json'));
        $phrases = json_decode(file_get_contents('rest-routes/sources/phrases.json'));

        /* as a reminder, this file is included in rest.php, which
        handles the inclusion of hdewdb_connect.php, where in this fn
        is defined. */
        $keywords = getKeyWords();

        $config = get_config();
        $hdBin = $config['honeydew']['basedir'] . 'bin/';
        exec('/usr/bin/perl -w ' . $hdBin . 'parseRules.pl > /dev/null 2>&1 &');
        exec('/usr/bin/perl -w ' . $hdBin . 'parsePhrases.pl > /dev/null 2>&1 &');
        echo json_encode(array(
            'suggestRules' => $rules[0],
            'regexRules' => $rules[1],
            'phrases' => $phrases,
            'keywords' => $keywords
        ));
    });
});

?>
