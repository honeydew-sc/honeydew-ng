'use strict';

angular.module('honeydew')
    .controller('SetCtrl', function ($scope, $stateParams, Files, alerts) {
        var filename = 'sets/' + $stateParams.set;
        $scope.file = Files.get({file: Files.encode(filename)}, function ( res ) {
            console.log(res);
        }, alerts.catcher);

        console.log($stateParams);
    });
