'use strict';

angular.module('honeydew')
    .directive('centerPane', function (panes) {
        return {
            templateUrl: 'editor/panes/center-pane/center-pane.html',
            replace: true,
            restrict: 'E',
            link: function (scope) {
                scope.panes = panes;

                scope.shortcuts = [];
                for (var key in scope.editorOptions.extraKeys) {
                    scope.shortcuts.push({
                        key: key,
                        command: scope.editorOptions.extraKeys[key]
                    });
                };

                scope.gridOptions = {
                    data: 'shortcuts'
                };

                scope.panes.openPane('help');
            }
        };
    });
