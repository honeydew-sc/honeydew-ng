'use strict';

angular.module('honeydew')
    .directive('jobOptions', ['browserSelection', function (browserSelection) {
        return {
            templateUrl: 'scripts/common/directives/jobOptions.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                scope.browserList = browserSelection.allBrowsers;

                console.log(scope.browserList);
            }
        };
    }]);
