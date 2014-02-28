'use strict';

angular.module('honeydew')
    .directive('paneSelector', function (panes, $compile) {
        return {
            templateUrl: 'editor/panes/pane-selector/pane-selector.html',
            replace: true,
            restrict: 'E',
            link: function (scope, element) {
                scope.panes = panes;

                scope.togglePaneWithScope = function (pane) {
                    if (pane.name.match(/report|samples|rules/)) {
                        scope.panes.togglePane(pane);
                    }
                    else {
                        var contents = $compile(pane.html)( scope );
                        scope.panes.togglePane(pane, contents);
                    };
                };
            }
        };
    });
