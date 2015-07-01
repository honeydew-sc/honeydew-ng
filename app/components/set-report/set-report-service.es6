class SetReportService {
    constructor ( Files, SetReport, alerts, HoneydewJob, randomString, liveReport ) {
        this.Files = Files;
        this.SetReport = SetReport;
        this.alerts = alerts;
        this.HoneydewJob = HoneydewJob;
        this.rand = randomString.string;
        this.LiveReport = liveReport;
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

    getSetHistory ( name, host ) {
        let setReportData = this.SetReport.get({ name, host })
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
        reports.forEach( ({ setRunId, startDate, browser, host, user }) => {
            if ( ! Object.keys(setIds).some( id => id === setRunId) ) {
                // collect set IDs we've already seen in a hash for
                // speed ?
                setIds[setRunId]++;

                setRunId = parseInt(setRunId);
                startDate = new Date(startDate);

                setData.push( { setRunId, startDate, browser, host, user } );
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
                let matchingReport = reports.find(
                    ({setRunId}) => correctSetRunId === setRunId
                );

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

    missingOrFailed ( setRunId, reportData ) {
        let features = Object.keys(reportData);

        return features
            .map( feature => {
                return reportData[feature]
                    .map( it => { it.feature = feature; return it; } )
                    .find( report => report.setRunId === setRunId );
            })
            .filter( report => {
                return report.status === 'failure' ||
                    !report.hasOwnProperty('reportId');
            })
            .map( report => report.feature );
    }

    rerun ( features, jobData ) {
        let jobMetadata = angular.copy(jobData);
        // we don't want to set the user or startDate
        delete jobMetadata.user;
        delete jobMetadata.startDate;

        // we want all the jobs on the same channel in case the user
        // wants to watch them
        jobMetadata.channel = 'private-' + this.rand();
        this.LiveReport.switchChannel( jobMetadata.channel );

        // Queue these so we don't flood the backend
        jobMetadata.queue = true;

        let jobs = features.map( feature => {
            let job = jobMetadata;
            job.file = feature;
            return new this.HoneydewJob( job );
        });

        let promises = jobs.map( job => job.$execute() );
        return { jobs, promises };
    }
}

angular.module('honeydew')
    .service('SetReportService', SetReportService);
