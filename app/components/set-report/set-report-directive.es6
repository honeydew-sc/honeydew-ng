class SetReportController {
    constructor ($scope, $q, SetReportService, hostname) {
        this.$q = $q;
        this.SetReport = SetReportService;
        this.hostname = hostname;
        this.$scope = $scope;

        this.getSetHistoryData();
        this.refreshDataOnHostnameChange();

        this.wrongHostMessage = 'This page filters by the hostname above! Please choose the appropriate hostname if you\'re expecting results and not seeing any :)';
    }

    getSetHistoryData () {
        let { set, SetReport, hostname } = this;

        return this.$q.all( [
            SetReport.getSetFeatures( set ),
            SetReport.getSetHistory( set, hostname.host )
        ] )
            .then( SetReport.reorganizeReportData )
            .then( ({ setData, reportData }) => {
                this.setData = setData;
                this.reportData = reportData;
            });
    }

    refreshDataOnHostnameChange () {
        this.$scope.$on('hostname:changed', ( ) => {
            this.getSetHistoryData();
        });
    }

    isSetRunOld( startDate ) {
        let oneWeekAgo = 1000 * 60 * 60 * 24 * 7,
            now = new Date();

        return now - startDate > oneWeekAgo;
    }
}

angular.module('honeydew')
    .directive('setReport', function () {
        return {
            templateUrl: 'components/set-report/set-report.html',
            replace: true,
            restrict: 'E',
            scope: {
                set: '@'
            },
            bindToController: true,
            controller: SetReportController,
            controllerAs: 'SetReport'
        };
    });
