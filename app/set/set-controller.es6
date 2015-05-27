angular.module('honeydew')
    .controller('SetController', function ($scope, $stateParams, Files, alerts, SetReport, $timeout, CmDomHelpers) {
        var filename = 'sets/' + $stateParams.set;
        var files = Files.get({file: Files.encode(filename)}).$promise
                .then( res => {
                    res.contents = res.contents
                        .split("\n")
                        .map( str => str.trim() )
                        .filter( str => str );

                    return res;
                })
                .catch(alerts.catcher);

        var setReportData = SetReport.get({ name: $stateParams.set }).$promise
                .then( res => {
                    // Angular's date filter expects milliseconds, but the
                    // "start" field is only given in seconds.

                    return res;
                }).catch( alerts.catcher);

        });
    });
