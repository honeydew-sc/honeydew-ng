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
                        .filter( str => str )
                        .sort();

                    return res;
                })
                .catch(this.alerts.catcher);

        return files;
    }

    getSetHistory ( name ) {
        let setReportData = this.SetReport.get({ name })
                .$promise
                .catch( this.alerts.catcher);

        return setReportData;
    }

    reorganizeReportData ( [ { features }, { reports } ] ) {
        let setIds = {},
            setData = [];

        reports = reports || [];

        // group the unique set ids to be used as table headers into
        // the `setData` var
        reports.forEach( ({ setRunId, startDate, browser }) => {
            if ( ! Object.keys(setIds).some( id => id === setRunId) ) {
                // collect set IDs we've already seen in a hash for
                // speed ?
                setIds[setRunId]++;
                setRunId = parseInt(setRunId);
                setData.push( { setRunId, startDate, browser } );
            }
        });

        let setRunIdOrder = setData.map( ({ setRunId }) => parseInt(setRunId) ),
            reportsByFeature = features.map( feature => {
                let featureReports = reports.filter( ({ featureFile }) => {
                    return featureFile.match( new RegExp(feature) );
                }).map( report => {
                    report.setRunId = parseInt(report.setRunId);
                    report.reportId = parseInt(report.reportId);
                    return report;
                });

                return featureReports;
            }),
            reportData = {};

        reportsByFeature.forEach( (reports, index) => {
            let featureFile = features[index];
            let reportsByFeatureAndSet = setRunIdOrder.map( correctSetRunId => {
                let matchingReport = reports.find( ({
                    setRunId
                }) => correctSetRunId === setRunId );

                if ( matchingReport ) {
                    let { setRunId, status, reportId } = matchingReport;
                    return { setRunId, status, reportId };
                }
                else {
                    return { setRunId: correctSetRunId };
                }
            });

            reportData[featureFile] = reportsByFeatureAndSet;
        });

        return { setData, reportData };
    }
}

angular.module('honeydew')
    .service('SetReportService', SetReportService);
