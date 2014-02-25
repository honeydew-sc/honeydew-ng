'use strict';

angular.module('honeydew')
    .directive('editorNav', [
        function () {
            return {
                templateUrl: 'editor/editor-nav/editor-nav.html',
                scope: {
                    filename: '@',
                    control: '=',
                    doc: '='
                },
                replace: true,
                restrict: 'E'
            };
        }
    ]);
