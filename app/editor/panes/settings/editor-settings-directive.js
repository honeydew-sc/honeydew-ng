'use strict';

angular.module('honeydew')
    .directive('editor-settings', function (panes) {
        return {
            templateUrl: '',
            replace: true,
            restrict: 'E',
            link: function (scope, element, attrs) {
                console.log('settings', scope.panes);
            }
        };
    });
