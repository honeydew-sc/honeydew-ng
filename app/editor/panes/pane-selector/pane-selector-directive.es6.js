'use strict';

angular.module('honeydew')
    .directive('paneSelector', function (panes, $compile, $localStorage) {
        return {
            templateUrl: 'editor/panes/pane-selector/pane-selector.html',
            replace: true,
            restrict: 'E',
            link: function (scope, element) {
                scope.panes = panes;
                panes.closePane();

                scope.togglePaneWithScope = function (pane) {
                    if (pane.include) {
                        scope.panes.togglePane(pane);
                    }
                    else {
                        var contents = $compile( pane.template )( scope );
                        scope.panes.togglePane(pane, contents);
                    };
                };

                scope.report = { failure: '' };
                scope.$on('report:reset', () => {
                    scope.report.failure = '';
                });

                scope.$on('report:failure', () => {
                    scope.report.failure = 'failure';
                });

                // open a pane manually
                scope.togglePaneWithScope(panes.panes[0]);
            }
        };
    });
