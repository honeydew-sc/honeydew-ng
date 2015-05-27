'use strict';

angular.module('honeydew')
    .controller('SetController', function ($scope, $stateParams, Files, alerts, SetReport, $timeout, CmDomHelpers) {
        $scope.editorOptions = {
            lineWrapping : false,
            lineNumbers: true,
            readOnly: "nocursor",
            mode: 'set-mode',
            onLoad: function (cm) {
                CmDomHelpers.compileRenderedLines(cm, $scope);
                CmDomHelpers.focus(cm, $scope);
            }
        };

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

        $scope.gridOptions = {
            data: 'setHistory.report',
            columnDefs: [
                {
                    field: 'start',
                    displayName: 'Start Date',
                    cellTemplate:
                    '    <div class="ngCellText" ng-class="col.colIndex()">' +
                        '    <a href="/dashboard/sets/?setId={{ row.entity.id }}" target="_blank">' +
                        '        <span ng-cell-text>{{row.getProperty(col.field) | date: "medium" }}</span>' +
                        '    </a>' +
                        '</div>'
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


        $scope.$on('filetreeToggle', function (event, data) {
            $timeout(function () {
                $(window).resize();
                $(window).resize();
            });
        });
    });
