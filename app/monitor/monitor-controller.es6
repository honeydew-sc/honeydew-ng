angular.module('honeydew')
    .controller('MonitorCtrl', function ($scope, $timeout, Monitor, alerts) {
        var self = this,
            monitors = [];
        $scope.monitors = monitors;

        self.query = function () {
            $scope.$emit('progress:loading');
            var query = Monitor.query( forceRedraw );

            // couldn't figure out how to use gridOptions for monitors on
            // self instead of $scope, so.
            $scope.monitors = monitors = self.queryResults = query;

            return query.$promise
                .then( () => $scope.$emit( 'progress:value', { value: 100 } ) )
                .catch( () => $scope.$emit('progress:done') );
        };

        self.delete = function ( row ) {
            var targetId = row.entity.id;
            Monitor.delete( { id: targetId }, function (res) {
                angular.forEach(monitors, function (monitor, index) {
                    if ( monitor.id === targetId ) {
                        monitors.splice(index, 1);
                    }
                });
            });
        };

        self.toggleEnabled = function(row) {
            var id = row.entity.id;
            angular.forEach(monitors, function ( monitor, index ) {
                if (monitor.id === id) {
                    monitor.$save({ id: id});
                }
            });
        };

        self.resetQuery = function () {
            // store the already-queried results so we can restore
            // them when the user searches again
            self.queryResults = $scope.monitors;
            $scope.monitors = [];
            self.filterOptions.filterText = '';
        };

        $scope.$on('ngGridEventStartCellEdit', function(evt){
            self.currentEdit = angular.copy(evt.targetScope.row.entity);
        });

        $scope.$on('ngGridEventEndCellEdit', function(evt){
            var monitor = evt.targetScope.row.entity;

            monitor.$save().catch( function (res) {
                alerts.addAlert(res);
                monitor.host = self.currentEdit.host;
            });
        });

        $scope.$on('monitor:create', (event, monitor) => {
            create(monitor);
        });

        function create ( newMonitor ) {
            if ( isMonitorUnique(newMonitor) ) {
                newMonitor.$save( function ( res ) {
                    monitors.push(res);
                }).catch( alerts.catcher );
            }
        };

        function isMonitorUnique ( newMonitor ) {
            var isDuplicated = monitors.some(function ( element ) {
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

        self.filterOptions = {
            filterText: ''
        };

        // wait for user to search for something
        $scope.$watch(
            () => self.filterOptions.filterText,
            userInitializesQuery
        );
        function userInitializesQuery (newValue, oldValue) {
            let QUERY_LENGTH = 1;
            let hasCachedQuery = self.hasOwnProperty('queryResults') && self.queryResults;

            if ( hasCachedQuery && newValue === '' ) {
                self.resetQuery();
            }
            else if (newValue.length > QUERY_LENGTH) {
                if ( hasCachedQuery ) {
                    $scope.monitors = self.queryResults;
                }
                else {
                    self.query();
                }
            }
        }

        // Working around redraw bug: in the case where the user's
        // search query doesn't render anything, the forced redraw
        // won't do anything. So, we need to watch the search query
        // and just keep redrawing the view to make sure that we
        // eventually resize to trigger that redraw.
        $scope.$watch(() => self.filterOptions.filterText, forceRedraw);

        function forceRedraw () {
            $timeout( () => {
                $(window).resize();
                $(window).resize();
            });
        }

        self.gridOptions = {
            data: 'monitors',
            columnDefs: [{
                field: 'on',
                displayName: 'On',
                width: 30,
                cellTemplate: '<div class="ngSelectionCell"><input tabindex="-1" class="ngSelectionCheckbox" type="checkbox" ng-model="COL_FIELD" ng-change="Monitor.toggleEnabled(row)"/></div>',
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
                cellTemplate: '<button class="btn btn-mini btn-danger" ng-click="Monitor.delete(row)"><i class="fa fa-trash-o"></i></button>'
            }],
            enableSorting: true,
            sortInfo: {
                fields: ['set'],
                directions: ['asc']
            },
            multiSelect: false,
            filterOptions: self.filterOptions,
            showGroupPanel: true,
            jqueryUIDraggable: true,
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEdit: true
        };
    });
