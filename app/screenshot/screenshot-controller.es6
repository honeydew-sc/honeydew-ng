'use strict';

angular.module('honeydew')
    .controller('ScreenshotCtrl', function ($scope, $stateParams) {
        var candidate = $stateParams.screenshot;

        // ^(\w+\-) - starts with a word, followed by a dash
        // (.*\d{4}) - the build number is anything ending in 4 numbers [-.]HHMM
        // ([\w-]* - an optional secction for a user input name
        // \-\d+x) - the screenshot size
        var knownGood = candidate.replace(/^(\w+\-)(.*\d{4})([\w-]*\-\d+x)/, '$1known-good$3');
        var diff = candidate.replace(/\.png$/, '-diff.png');

        this.awsBucket = '/screenshots';
        this.images = [
            {
                label: 'known good',
                src: knownGood
            },

            {
                label: 'candidate',
                src: candidate
            },

            {
                label: 'diff',
                src: diff
            },
        ];
    });
