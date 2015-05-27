class SetController {
    constructor ($stateParams, $q, SetReportService, SetReport) {
        this.stateParams = $stateParams;

        this.setHistory = $q.all( [
            this.getSetHistory()
            SetReportService.getSetFeatures( this.stateParams.set ),
        ] )
            .then( this.reorganizeReportData );
    }


    getSetHistory () {
        this.setReportData = this.SetReport.get({ name: this.stateParams.set })
            .$promise
            .then( res => {
                // Angular's date filter expects milliseconds, but the
                // "start" field is only given in seconds.

                return res;
            }).catch( this.alerts.catcher);

        return this.setReportData;
    }

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
