'use strict';

angular.module('honeydew')
    .directive('alertDisplay', [
        'alerts',
        function (alerts) {
            return {
                templateUrl: 'scripts/common/directives/alertDisplay.html',
                restrict: 'E',
                link: function (scope, element, attrs) {
                    scope.alerts = alerts;
                }
            };
        }]);
