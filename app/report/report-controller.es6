'use strict';

angular.module('honeydew')
    .controller('ReportCtrl', function ($stateParams, $localStorage, BackgroundStatus, cmReportMode, liveReport, Jobs, Report) {
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


        this.replaceReportInSet = () => {
            var job = new Jobs({
                browser: this.record.browser,
                reportId: this.record.id,
                host: this.record.host,
                userId: this.record.userId,
                channel: liveReport.switchChannel()
            });
            job.$execute();

            // job.$execute.then( res => {
            //     this.output = liveReport.output;
            // });
        };
    });
