'use strict';

angular.module('honeydew')
    .directive('centerPane', [
        'panes',
        function (panes) {
            return {
                templateUrl: 'scripts/editor/directives/pane.html',
                replace: true,
                restrict: 'E',
                link: function (scope, el, attrs) {
                    scope.panes = panes;
                }
            };
        }]);
