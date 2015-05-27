class SetReportController {
    constructor ($q, SetReportService) {
        this.$q = $q;
        this.SetReport = SetReportService;

        console.log('hi');
        this.getSetHistoryData();
    }

    getSetHistoryData () {
        this.$q.all( [
            this.setReport.getSetFeatures( this.set ),
            this.setReport.getSetHistory( this.set )
        ] )
            .then( this.setReport.reorganizeReportData )
            .then( ({ setData, reportData }) => {
                this.setData = setData;
                this.reportData = reportData;
            });
    }
}

angular.module('honeydew')
    .directive('SetReport', function () {
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
