'use strict';

angular.module('honeydew')
    .directive('centerPane', [
        function () {
            return {
                templateUrl: 'scripts/editor/directives/panes.html',
                restrict: 'E'
            };
        }]);
