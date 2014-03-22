'use strict';

angular.module('honeydew')
    .directive('liveReport', function () {
        return {
            templateUrl: 'components/live-report/live-report.html',
            replace: true,
            scope: {},
            restrict: 'E',
            controller: LiveReportDirectiveCtrl
        };
    });

var LiveReportDirectiveCtrl = function ($scope, liveReport) {
    $scope.report = liveReport;

    if (liveReport.registered === false && liveReport.channel !== '') {
        // we might need to subscribe to a channel if the report tab
        // hasn't been opened and the execute button is clicked
        liveReport.registered = true;
    }
};

// ng-min doesn't uglify controller this correctly, I guess as it
// isn't defined in the usual fashion
LiveReportDirectiveCtrl.$inject = ['$scope', 'liveReport'];
