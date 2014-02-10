'use strict';

var whee;

angular.module('honeydew')
    .directive('jobOptions', [
        'browserSelection',
        '$localStorage',
        function (browserSelection, $localStorage) {
            return {
                templateUrl: 'scripts/common/directives/jobOptions.html',
                restrict: 'E',
                link: function postLink(scope, element, attrs) {
                    scope.browserList = browserSelection.allBrowsers;

                    scope.$storage = $localStorage.$default({
                        host: 'http://www.sharecare.com'
                        // , browser: scope.browserList[1]
                    });

                    // the defaults for ngStorage don't mesh well with
                    // setting a default for an ng-options select, so
                    // we have to do it manually.
                    if (scope.$storage.browser) {
                        scope.browserList.forEach( function (element, index, array) {
                            if (scope.$storage.browser.name === element.name) {
                                scope.$storage.browser = element;
                            }
                        });
                    }
                    else {
                        scope.$storage.browser = scope.browserList[1];
                    }

                    console.log(scope.browserList[1].name);
                    whee = scope;

                    scope.executeJob = function () {
                        console.log(scope.$storage.browser);
                        console.log(scope.$storage.host);
                    };
                }
            };
        }]);
