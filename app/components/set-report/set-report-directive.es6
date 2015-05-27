class SetReportController {
    constructor ($q, SetReportService) {
        this.$q = $q;
        this.SetReport = SetReportService;

        this.getSetHistoryData();
    }

    getSetHistoryData () {
        let { set, SetReport } = this;

        return this.$q.all( [
            SetReport.getSetFeatures( set ),
            SetReport.getSetHistory( set )
        ] )
            .then( SetReport.reorganizeReportData )
            .then( ({ setData, reportData }) => {
                this.setData = setData;
                this.reportData = reportData;
            });
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
