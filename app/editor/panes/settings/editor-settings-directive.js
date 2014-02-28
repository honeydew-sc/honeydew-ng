'use strict';

angular.module('honeydew')
    .directive('editorSettings', function () {
        return {
            templateUrl: 'editor/panes/settings/editor-settings.html',
            scope: {
                options: '='
            },
            replace: true,
            restrict: 'E',
            controller: function ($scope) {
                console.log('settings', $scope);
            }
        };
    });
