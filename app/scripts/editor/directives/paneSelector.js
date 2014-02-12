'use strict';

angular.module('honeydew')
    .directive('paneSelector', [
        'panes',
        function (panes) {
            return {
                templateUrl: 'scripts/editor/directives/paneSelector.html',
                replace: true,
                restrict: 'E',
                link: function (scope, el, attrs) {
                    scope.panes = panes;
                }
            };
        }]);
