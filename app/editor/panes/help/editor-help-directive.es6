'use strict';

angular.module('honeydew')
    .directive('editorHelp', function () {
        return {
            templateUrl: 'editor/panes/help/editor-help.html',
            scope: {
                options: '=',
                map: '='
            },
            replace: true,
            restrict: 'E',
            controller: function ($scope) {
                $scope.shortcuts = {
                    extra: [],
                    search: []
                };

                for (var key in $scope.options.extraKeys) {
                    $scope.shortcuts.extra.push({
                        key: key,
                        command: $scope.options.extraKeys[key]
                    });
                };

                $scope.searchAndReplaceCommands = [
                    "find",
                    "findNext",
                    "findPrev",
                    "replace",
                    "replaceAll"
                ];

                for (var searchKey in $scope.map) {
                    if ($scope.map.hasOwnProperty(searchKey)) {
                        var command = $scope.map[searchKey];
                        if ( $scope.searchAndReplaceCommands.indexOf(command) !== -1) {
                            $scope.shortcuts.search.push({
                                key: searchKey,
                                command: command
                            });
                        }
                    }
                };

                $scope.gridOptions = {
                    search: {
                        data: 'shortcuts.search'
                    },
                    extra: {
                        data: 'shortcuts.extra'
                    }
                };
            }
        };
    });
