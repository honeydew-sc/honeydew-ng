angular.module('honeydew')
    .controller('ReportCtrl', function ($stateParams, Settings, BackgroundStatus, cmReportMode, liveReport, HoneydewJob, Report) {
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
                    'End Date: ' + res.endDate
                ]).join("\n");

                this.result = {
                    output: cmReportMode.highlight(report).split("\n").map( it => it + "\n")
                };
                this.record = res;
            });

        this.theme = 'cm-s-' + Settings.get('theme');
        this.navClass = Settings.get('navClass');


        this.replaceReportInSet = () => {
            var job = new HoneydewJob({
                browser: this.record.browser,
                file: this.record.featureFile,
                host: this.record.host,
                userId: this.record.userId,
                reportId: this.record.id,
                channel: liveReport.switchChannel()
            });

            this.result = liveReport;
            job.$execute();
        };
    });
