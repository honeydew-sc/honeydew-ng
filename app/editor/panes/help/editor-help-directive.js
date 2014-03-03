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
                $scope.shortcuts = [];
                for (var key in $scope.options.extraKeys) {
                    $scope.shortcuts.push({
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
                            $scope.shortcuts.push({
                                key: searchKey,
                                command: command
                            });
                        }
                    }
                };

                $scope.gridOptions = {
                    data: 'shortcuts'
                };
            }
        };
    });
