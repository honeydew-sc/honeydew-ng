'use strict';

angular.module('honeydew')
    .directive('alertDisplay', function (alerts) {
        return {
            templateUrl: 'components/alert/alert.html',
            restrict: 'E',
            link: function (scope, element, attrs) {
                scope.alerts = alerts;
            }
        };
    });
