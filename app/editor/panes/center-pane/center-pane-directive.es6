'use strict';

angular.module('honeydew')
    .directive('centerPane', function (panes) {
        return {
            templateUrl: 'editor/panes/center-pane/center-pane.html',
            replace: true,
            restrict: 'E',
            link: function (scope) {
                scope.panes = panes;
            }
        };
    });
