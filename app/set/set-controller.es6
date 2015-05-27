angular.module('honeydew')
    .controller('SetController', function ($scope, $stateParams, Files, alerts, SetReport, $timeout, CmDomHelpers) {
        var filename = 'sets/' + $stateParams.set;
        $scope.file = Files.get({file: Files.encode(filename)}, function () {}, alerts.catcher);

        $scope.setHistory = SetReport.get({ name: $stateParams.set }, function ( res ) {
            // Angular's date filter expects milliseconds, but the
            // "start" field is only given in seconds.
            res.report.forEach(function ( it ) {
                it.start *= 1000;
            });

            return res;
        }, alerts.catcher);


        });
    });
