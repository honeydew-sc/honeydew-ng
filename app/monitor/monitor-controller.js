'use strict';

angular.module('honeydew')
    .controller('MonitorCtrl', function ($scope, $timeout, Monitor, alerts) {
        $scope.query = function () {
            $scope.monitors = Monitor.query( function ( u ) {
                $timeout(function () {
                    $(window).resize();
                    $(window).resize();
                });
            });
        };

        $scope.create = function(newMonitor) {
            if ($scope.isMonitorUnique(newMonitor)) {
                newMonitor.$save( function ( res ) {
                    $scope.monitors.push(res);
                }).catch( alerts.catcher );
            }
        };

        $scope.delete = function(row) {
            var targetId = row.entity.id;
            Monitor.delete( { id: targetId }, function (res) {
                angular.forEach($scope.monitors, function (monitor, index) {
                    if ( monitor.id === targetId ) {
                        $scope.monitors.splice(index, 1);
                    }
                });
            });
        };

        $scope.toggleEnabled = function(row) {
            var id = row.entity.id;
            angular.forEach($scope.monitors, function ( monitor, index ) {
                if (monitor.id === id) {
                    monitor.$save({ id: id});
                }
            });
        };

        $scope.isMonitorUnique = function (newMonitor) {
            var isDuplicated = $scope.monitors.some(function ( element ) {
                return newMonitor.set === element.set &&
                    newMonitor.host === element.host &&
                    newMonitor.browser === element.browser;
            });

            if (isDuplicated) {
                alerts.addAlert({
                    msg: 'Sorry, that monitor (' + newMonitor.set + ' on ' + newMonitor.host + ' in ' + newMonitor.browser + ') already exists. Maybe you want to edit it?',
                    type: 'warning'
                }, 7500);
            }

            return !isDuplicated;
        };


        $scope.$on('ngGridEventStartCellEdit', function(evt){
            $scope.currentEdit = angular.copy(evt.targetScope.row.entity);
        });

        $scope.$on('ngGridEventEndCellEdit', function(evt){
            var monitor = evt.targetScope.row.entity;

            monitor.$save().catch( function (res) {
                alerts.addAlert(res);
                monitor.host = $scope.currentEdit.host;
            });
        });

        $scope.query();

        $scope.filterOptions = {
            filterText: ''
        };

        $scope.gridOptions = {
            data: 'monitors',
            columnDefs: [{
                field: 'on',
                displayName: 'On',
                width: 30,
                cellTemplate: '<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-model="COL_FIELD" ng-change="toggleEnabled(row)"/></div>',
                enableCellEdit: false
            }, {
                field:'set',
                displayName:'Set',
                enableCellEdit: false
            }, {
                field:'host',
                displayName:'Host',
                enableCellEdit: true
            }, {
                field:'browser',
                displayName:'Browser',
                enableCellEdit: false
            }, {
                field:'',
                width: 40,
                cellTemplate: '<button class="btn btn-mini btn-danger" ng-click="delete(row)"><i class="fa fa-trash-o"></i></button>'
            }],
            enableSorting: true,
            sortInfo: {
                fields: ['set'],
                directions: ['asc']
            },
            multiSelect: false,
            filterOptions: $scope.filterOptions,
            showGroupPanel: true,
            jqueryUIDraggable: true,
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEdit: true
        };
    });
