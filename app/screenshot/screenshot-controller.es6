'use strict';

angular.module('honeydew')
    .controller('ScreenshotCtrl', function ($scope, $stateParams, awsConfig) {
        var opponent = $stateParams.screenshot;

        // ^(\w+\-) - starts with a word, followed by a dash
        // (.*\d{4}) - the build number is anything ending in 4 numbers [-.]HHMM
        // ([\w-]* - an optional secction for a user input name
        // \-\d+x) - the screenshot size
        var knownGood = opponent.replace(/^(\w+\-)(.*\d{4})([\w-]*\-\d+x)/, '$1known-good$3');
        var diff = opponent.replace(/\.png$/, '-diff.png');

        this.awsBucket = 'http://' + awsConfig.aws_bucket + '/honeydew/screenshots';
        this.images = [
            {
                label: 'known good',
                src: knownGood
            },

            {
                label: 'opponent',
                src: opponent
            },

            {
                label: 'diff',
                src: diff
            },
        ];
    });
