angular.module('honeydew')
    .directive('liveReport', function () {
        return {
            templateUrl: 'components/live-report/live-report.html',
            replace: true,
            scope: {},
            restrict: 'E',
            controller: LiveReportDirectiveCtrl,
            controllerAs: 'ReportPane'
        };
    });

var LiveReportDirectiveCtrl = function (Settings, liveReport) {
    this.theme = Settings.get('theme');
    this.report = liveReport;

    if (liveReport.registered === false && liveReport.channel !== '') {
        // we might need to subscribe to a channel if the report tab
        // hasn't been opened and the execute button is clicked
        liveReport.registered = true;
    }
};
