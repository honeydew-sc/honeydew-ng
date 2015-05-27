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
                .catch( this.alerts.catcher);

        return setReportData;
    }

    reorganizeReportData ( [ { features }, { reports } ] ) {
        let setIds = {},
            setData = [],
            reportData = [];

        // group the unique set ids to be used as table headers into
        // the `setData` var
        reports.forEach( ({ setRunId, startDate, browser }) => {
            if ( ! Object.keys(setIds).some( id => id === setRunId) ) {
                // collect set IDs we've already seen in a hash for
                // speed ?
                setIds[setRunId]++;
                setData.push( { [setRunId] : {startDate, browser} } );
            }
        });

        // Collect the feature reports from the sets into reportData
        reportData = features.map( feature => {
            let featureReports = reports.filter( ({ featureFile }) => {
                return featureFile.match( new RegExp(feature) );
            });

            let reportSummaryBySet = featureReports.map( ({ setRunId, status, reportId }) => {
                reportId = parseInt(reportId);
                return { [setRunId]: { status, reportId } };
            });

            return { [feature]: reportSummaryBySet };
        });

        return { setData, reportData };
    }
}

angular.module('honeydew')
    .service('SetReportService', SetReportService);
