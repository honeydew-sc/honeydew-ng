'use strict';

angular.module('honeydew')
    .controller('ReportCtrl', function ($stateParams, Report, cmReportMode) {
        this.output = Report.get( { report: $stateParams.report } )
            .$promise.then( res => {
                this.output = cmReportMode.highlight(res.report);
            });
    });
