'use strict';

angular.module('honeydew')
    .controller('ReportLiveCtrl', function ($scope, $stateParams, Pusher) {
        $scope.report = {
            channel: $stateParams.channel,
            output: ''
        };

        // (channel, event, data)
        Pusher.subscribe($scope.report.channel, 'rule', function (item) {
            console.log(item);
            console.log(Pusher);
            $scope.report.output += item;
        });
    });
