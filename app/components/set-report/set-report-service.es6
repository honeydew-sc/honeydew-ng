class SetReportService {
    constructor ( Files, SetReport, alerts ) {
        this.Files = Files;
        this.SetReport = SetReport;
        this.alerts = alerts;
    }

    getSetFeatures ( set ) {
        let filename = 'sets/' + set;
        let files = this.Files.get({file: this.Files.encode(filename)})
                .$promise
                .then( res => {
                    res.features = res.contents
                        .split("\n")
                        .map( str => str.trim() )
                        .filter( str => str );

                    return res;
                })
                .catch(this.alerts.catcher);

        return files;
    }

    getSetHistory ( name ) {
        let setReportData = this.SetReport.get({ name })
                .$promise
                .then( res => {
                    res.reports = res.reports.map( report => {
                        // Angular's date filter expects milliseconds, but the
                        // "start" field is only given in seconds.
                        report.startDate *= 1000;

                        return report;
                    });

                    return res;
                }).catch( this.alerts.catcher);

        return setReportData;
    }

    // reorganizeReportData ( [ { features }, { reports } ] ) {
    //     let setHistory = features.map( feature => {
    //         return {
    //             13: {
    //                 status: true,
    //                 reportId: 5
    //             }
    //         };
    //     });
    // }
}

angular.module('honeydew')
    .service('SetReportService', SetReportService);
