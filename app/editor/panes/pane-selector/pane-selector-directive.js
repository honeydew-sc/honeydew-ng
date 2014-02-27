'use strict';

angular.module('honeydew')
    .directive('paneSelector', function (panes) {
        return {
            templateUrl: 'editor/panes/pane-selector/pane-selector.html',
            replace: true,
            restrict: 'E',
            link: function (scope) {
                scope.panes = panes;

                scope.togglePaneWithScope = function (pane) {
                    scope.panes.togglePane(pane, scope);
                };
            }
        };
    });
