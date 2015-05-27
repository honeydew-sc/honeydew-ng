class SetController {
    constructor ($stateParams, $q, SetReportService, SetReport) {
        this.stateParams = $stateParams;

        this.setHistory = $q.all( [
            SetReportService.getSetFeatures( this.stateParams.set ),
            // this.getSetHistory()
        ] )
    reorganizeReportData ( [ { features }, { reports } ] ) {
        let setHistory = features.map( feature => {
            return {
                13: {
                    status: true,
                    reportId: 5
                }
            };
        });
    }
}


angular.module('honeydew')
    .controller('SetController', SetController );
