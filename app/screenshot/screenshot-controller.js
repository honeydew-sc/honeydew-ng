'use strict';

angular.module('honeydew')
    .controller('ScreenshotCtrl', function ($scope, $stateParams, awsConfig) {
        var opponent = $stateParams.screenshot;

        var knownGood = opponent.replace(/(\w+\-)(.*)(\-\d+x)/, '$1known-good$3');
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
