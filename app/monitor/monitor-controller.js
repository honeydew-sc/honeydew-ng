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
                newMonitor.$save( function ( u ) {
                    $scope.monitors.push(u);
                });
            }
            else {
                alerts.addAlert({
                    msg: 'Sorry, that monitor already exists. Maybe you want to edit it?',
                    type: 'warning'
                }, 7500);
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
            var isUnique = true;
            angular.forEach($scope.monitors, function ( monitor, index ) {
                if (newMonitor.set === monitor.set &&
                    newMonitor.host === monitor.host &&
                    newMonitor.browser === monitor.browser) {
                    isUnique = false;
                }
            });

            return isUnique;
        };

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
                cellTemplate: '<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-model="COL_FIELD" ng-change="toggleEnabled(row)"/></div>'
            }, {
                field:'set',
                displayName:'Set'
            }, {
                field:'host',
                displayName:'Host'
            }, {
                field:'browser',
                displayName:'Browser'
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
            filterOptions: $scope.filterOptions
        };
    });
