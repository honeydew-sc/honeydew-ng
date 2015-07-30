class SetReportService {
    constructor ( Files, SetReport, alerts, HoneydewJob, randomString, liveReport, QueueWorker ) {
        this.Files = Files;
        this.SetReport = SetReport;
        this.alerts = alerts;
        this.HoneydewJob = HoneydewJob;
        this.rand = randomString.string;
        this.LiveReport = liveReport;
        this.QueueWorker = QueueWorker;
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
                .catch( this.alerts.catcher );

        return setReportData;
    }

    getSetHostnames ( name ) {
        let setHostnames = this.SetReport.getHostnames({ name })
                .$promise
                .catch( this.alerts.catcher );

        return setHostnames;
    }

    reorganizeReportData ( [ { features }, { reports } ] ) {
        let setData = this._collectSetsFromReports( reports );

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

        setData = this._addRerunCandidatesToSetData( setData, reportData );

        return { setData, reportData };
    }

    _collectSetsFromReports( reports ) {
        let setIds = {},
            setData = [];

        reports = reports || [];

        // group the unique set ids to be used as table headers into
        // the `setData` var
        reports.forEach( ({ setRunId, startDate, browser, host, user }) => {
            setRunId = parseInt(setRunId);
            if ( ! setIds.hasOwnProperty(setRunId) ) {
                // collect set IDs we've already seen in a hash for
                // speed ?
                setIds[setRunId]++;
                startDate = new Date(startDate);

                setData.push( { setRunId, startDate, browser, host, user } );
            }
        });

        return setData;
    }

    _addRerunCandidatesToSetData( setData, reportData ) {
        setData.forEach( (set) => {
            set.missing = this.missingOrFailed( set.setRunId, reportData );
            set.hasFailures = !!set.missing.length;
        });

        return setData;
    }

    missingOrFailed ( setRunId, reportData ) {
        let reports = angular.copy(reportData);
        let features = Object.keys(reports);

        return features
            .map( feature => {
                return reports[feature]
                    .map( it => { it.feature = feature; return it; } )
                    .find( report => report.setRunId === setRunId );
            })
            .filter( report => {
                return report.status === 'failure' ||
                    !report.hasOwnProperty('reportId');
            })
            .map( ({ feature, reportId }) => {
                if ( reportId ) {
                    return { feature, reportId };
                }
                else {
                    return { feature };
                }
            });
    }

    rerun ( features, jobData, setName ) {
        let jobMetadata = this._sanitizeRerunAttributes( jobData );
        jobMetadata.channel = this._getRerunChannel( setName );

        let jobs = features.map( ({ feature, reportId }) => {
            let job = angular.copy(jobMetadata);
            job.file = feature;
            job.setName = setName;
            if ( reportId ) {
                job.reportId = reportId;
            }
            return new this.HoneydewJob( job );
        });

        if ( jobs.length ) {
            let spawnWorker = this.QueueWorker
                    .spawn({ channel: jobMetadata.channel })
                    .$promise;

            let promises = spawnWorker.then( () => {
                return jobs.map( job => job.$execute() );
            });

            return { jobs, promises, spawnWorker };
        }
        else {
            return { jobs };
        }
    }

    _getRerunChannel( setName ) {
        let channel = [
            'private',
            this.rand(),
            setName.replace(/\.set$/, ''),
            'rerun'
        ].join('-');

        this.LiveReport.switchChannel( channel );

        return channel;
    }

    _sanitizeRerunAttributes ( jobData ) {
        let sanitizedAttrs = angular.copy(jobData);
        // we don't want to set the user or startDate
        delete sanitizedAttrs.user;
        delete sanitizedAttrs.startDate;

        // Queue the rerun jobs so we don't flood the backend
        sanitizedAttrs.queue = true;

        return sanitizedAttrs;
    }
}

angular.module('honeydew')
    .service('SetReportService', SetReportService);
