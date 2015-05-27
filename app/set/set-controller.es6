class SetController {
    constructor ($stateParams, $q, SetReportService) {
        this.stateParams = $stateParams;

        $q.all( [
            SetReportService.getSetFeatures( this.stateParams.set ),
            SetReportService.getSetHistory( this.stateParams.set )
        ] )
            .then( SetReportService.reorganizeReportData )
            .then( ({ setData, reportData }) => {
                this.setData = setData;
                this.reportData = reportData;
            });
    }
}

angular.module('honeydew')
    .controller('SetController', SetController );
