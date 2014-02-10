'use strict';

angular.module('honeydew')
    .directive('jobOptions', [
        'browserSelection',
        '$localStorage',
        'Jobs',
        function (browserSelection, $localStorage, Jobs) {
            return {
                scope: {
                    filename: '@'
                },
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

                    scope.executeJob = function () {
                        Jobs.save({
                            filename: scope.filename,
                            browser: scope.$storage.browser.name,
                            host: scope.$storage.host
                        }).then(function (res) {
                            console.log(res);
                        });
                    };
                }
            };
        }]);
