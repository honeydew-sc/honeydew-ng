'use strict';

angular.module('honeydew')
    .controller('ReportCtrl', function ($stateParams, Report, cmReportMode) {
        Report.get( { report: $stateParams.report } )
            .$promise.then( res => {
                var report = [
                    'Start Date: ' + res.startDate,
                    'Host: ' + res.host,
                    'Build: ' + res.buildNumber,
                    'Browser: ' + res.browser,
                    'Feature File: ' + res.featureFile,
                    'JobID: ' + res.jobId,
                    res.result,
                    'End Date ' + res.endDate
                ].join("\n");

                this.output = cmReportMode.highlight(report);
            });
    });
