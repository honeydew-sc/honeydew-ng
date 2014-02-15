'use strict';

angular.module('honeydew')
    .directive('paneSelector', [
        'panes',
        function (panes) {
            return {
                templateUrl: 'editor/panes/pane-selector.html',
                replace: true,
                restrict: 'E',
                link: function (scope, el, attrs) {
                    scope.panes = panes;
                }
            };
        }]);
