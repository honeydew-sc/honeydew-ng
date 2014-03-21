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

    .directive('liveReport', function () {
        return {
            templateUrl: 'editor/panes/live-report/live-report.html',
            replace: true,
            scope: {},
            restrict: 'E',
            controller: LiveReportDirectiveCtrl
        };
    });

var LiveReportDirectiveCtrl = function ($scope, liveReport, Pusher) {
    $scope.report = liveReport;

    $scope.tail = function (channel) {
        // we don't want input from two channels at once
        if (liveReport.oldChannel !== '') {
            try {
                Pusher.unsubscribe(liveReport.oldChannel);
            }
            catch (e) {
                console.log('sorry, couldn\'t unsub: ', e);
            };
        }

        // need a placeholder while the job starts
        liveReport.output = 'Loading...' + "\n";
        liveReport.placeHolder = true;

        // subscribe takes the args: (channel, event, callback(message))
        Pusher.subscribe(channel, 'rule', function (item) {
            if ($scope.report.placeHolder) {
                $scope.report.output = item;
                $scope.report.placeHolder = false;
            }
            else {
                $scope.report.output += item;
            }
        });
    };

    if (liveReport.registered === false) {
        // we haven't registered a listener yet, and we might need to
        // subscribe to a channel if the report tab hasn't been opened
        // and the execute button is clicked
        liveReport.registered = true;
        if (liveReport.channel !== '') {
            $scope.tail(liveReport.channel);
        }

        $scope.$on('pusher:channel', function (event, newChannel) {
            // our new channel will now be our old channel
            liveReport.oldChannel = newChannel;

            $scope.tail(newChannel);
        });
    }
};

// ng-min doesn't uglify controller this correctly, I guess as it
// isn't defined in the usual fashion
LiveReportDirectiveCtrl.$inject = ['$scope', 'liveReport', 'Pusher'];
