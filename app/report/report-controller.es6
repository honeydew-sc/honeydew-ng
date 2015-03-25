'use strict';

angular.module('honeydew')
    .controller('ReportCtrl', function ($stateParams, Report) {
        this.output = Report.get( { report: $stateParams.report } )
            .$promise.then( res => {
                this.output = res.report;
            });
    });
