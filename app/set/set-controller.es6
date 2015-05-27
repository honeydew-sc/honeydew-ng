class SetController {
    constructor ($stateParams, $q, Files, alerts, SetReport) {
        this.stateParams = $stateParams;
        this.Files = Files;
        this.SetReport = SetReport;
        this.alerts = alerts;

        this.setHistory = $q.all( [
            this.getSetFeatures(),
            this.getSetHistory()
        ] )
            .then( this.reorganizeReportData );
    }

    getSetFeatures () {
        let filename = 'sets/' + this.stateParams.set;
        this.files = this.Files.get({file: this.Files.encode(filename)})
            .$promise
            .then( res => {
                res.features = res.contents
                    .split("\n")
                    .map( str => str.trim() )
                    .filter( str => str );

                return res;
            })
            .catch(this.alerts.catcher);

        return this.files;
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
