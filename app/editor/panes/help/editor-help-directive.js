'use strict';

angular.module('honeydew')
    .directive('editorHelp', function ($compile) {
        return {
            templateUrl: 'editor/panes/help/editor-help.html',
            scope: {
                options: '='
            },
            restrict: 'E',
            controller: function ($scope) {
                $scope.shortcuts = [];
                for (var key in $scope.options.extraKeys) {
                    $scope.shortcuts.push({
                        key: key,
                        command: $scope.options.extraKeys[key]
                    });
                };

                $scope.gridOptions = {
                    data: 'shortcuts'
                };
            }
        };
    });
