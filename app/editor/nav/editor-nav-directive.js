'use strict';

angular.module('honeydew')
    .directive('editorNav', [
        function () {
            return {
                templateUrl: 'scripts/editor/directives/editorNav.html',
                scope: {
                    filename: '@',
                    control: '='
                },
                replace: true,
                restrict: 'E'
            };
        }]);
