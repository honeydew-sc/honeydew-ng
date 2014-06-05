'use strict';

angular.module('honeydew')
    .controller('SetCtrl', function ($scope, $stateParams, Files, alerts, SetReport) {
        $scope.editorOptions = {
            lineWrapping : false,
            lineNumbers: true,
            readOnly: true
        };

        var filename = 'sets/' + $stateParams.set;
        $scope.file = Files.get({file: Files.encode(filename)}, function () {}, alerts.catcher);

        $scope.setHistory = SetReport.get({ name: $stateParams.set }, function () { }, alerts.catcher);
        console.log($scope.setHistory);

        $scope.gridOptions = {
            data: 'setHistory.report',
            columnDefs: [
                {
                    field: 'start',
                    displayName: 'Start Date',
                    cellFilter: 'date:\'MM/dd/yyyy\''
                },
                {
                    field: 'host',
                    displayName: 'Host'
                },
                {
                    field: 'browser',
                    displayName: 'Browser'
                },
                {
                    field: 'status',
                    displayName: 'Status'
                }
            ],
            multiSelect: false,
            enableRowSelection: true
        };


    });
