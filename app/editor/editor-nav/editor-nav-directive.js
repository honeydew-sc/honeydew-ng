'use strict';

angular.module('honeydew')
    .directive('editorNav', [
        function () {
            return {
                templateUrl: 'editor/editor-nav/editor-nav.html',
                scope: {
                    filename: '@',
                    control: '='
                },
                replace: true,
                restrict: 'E'
            };
        }]);
