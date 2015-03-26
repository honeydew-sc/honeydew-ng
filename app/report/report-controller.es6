'use strict';

angular.module('honeydew')
    .controller('ReportCtrl', function ($stateParams, $localStorage, Report, cmReportMode) {
        var headers = {
            startDate: 'Start Date',
            host: 'Host',
            buildNumber: 'Build',
            browser: 'Browser',
            featureFile: 'Feature File',
            jobId: 'Job ID'
        },
            all_headers = Object.keys(headers);

        Report.get( { report: $stateParams.report } )
            .$promise.then( res => {
                var res_headers = all_headers.filter( h => res.hasOwnProperty(h) );
                var formatted_headers = res_headers.map( h => {
                    return headers[h] + ': ' + res[h];
                });

                var report = formatted_headers.concat([
                    res.result,
                    '',
                    'End Date ' + res.endDate
                ]).join("\n");

                this.output = cmReportMode.highlight(report);
                this.record = res;
            });

        this.theme = 'cm-s-' + $localStorage.settings.theme;
    });
