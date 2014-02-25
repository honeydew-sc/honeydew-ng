'use strict';

angular.module('honeydew')
    .directive('centerPane', [
        'panes',
        function (panes) {
            return {
                templateUrl: 'editor/panes/pane.html',
                replace: true,
                restrict: 'E',
                link: function (scope) {
                    scope.panes = panes;
                }
            };
        }
    ]);
