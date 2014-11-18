'use strict';

angular.module('honeydew')
    .controller('ScreenshotCtrl', function ($scope, $stateParams, awsConfig) {
        var opponent = $stateParams.screenshot;


        var knownGood = opponent.replace(/(\d\.){3}\d{8}-\d{4}/, 'known-good');
        var diff = opponent.replace(/\.png$/, '-diff.png');

        this.awsBucket = 'http://' + awsConfig.aws_bucket + '/honeydew/screenshots';
        this.images = [ knownGood, opponent, diff ];
    });
