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

    .directive('liveReport', function ($localStorage, Pusher) {
        return {
            templateUrl: 'editor/panes/live-report/live-report.html',
            replace: true,
            scope: {},
            restrict: 'E',
            controller: 'LiveReportCtrl'
        };
    });

var LiveReportCtrl = function ($scope, $localStorage, Pusher) {
    $scope.$storage = $localStorage;

    $scope.$watch('$storage.channel', function () {
        $scope.tail($scope.$storage.channel);
    });

    $scope.tail = function (channel) {
        $scope.report = {
            channel: channel,
            output: 'Loading...' + "\n"
        };

        // (channel, event, data)
        Pusher.subscribe(channel, 'rule', function (item) {
            $scope.report.output += item;
        });
    };
};
