'use strict';

angular.module('honeydew')
    .config(function(PusherServiceProvider) {
        // as this is during the config phase, we can't use services
        // like $http :( I just don't want to commit the token to the
        // public repo.
        var getPusherToken = new XMLHttpRequest();
        getPusherToken.onload = function (res) {
            PusherServiceProvider.setToken(getPusherToken.response);
        };
        getPusherToken.open("get", "/rest.php/pusher/token", true);
        getPusherToken.send();
    })
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
