'use strict';

angular.module('honeydew')
    .directive('jobOptions', function (browserSelection, $localStorage, Jobs, panes) {
        return {
            scope: {
                filename: '@',
                control: '='
            },
            templateUrl: 'components/job-options/job-options.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                scope.browserList = browserSelection.all;

                scope.$storage = $localStorage.$default({
                    host: ''
                    // , browser: scope.browserList[1]
                });

                // the defaults for ngStorage don't mesh well with
                // setting a default for an ng-options select, so
                // we have to do it manually.
                if (scope.$storage.browser) {
                    scope.browserList.forEach( function (element, index, array) {
                        if (scope.$storage.browser.browser === element.browser) {
                            scope.$storage.browser = element;
                        }
                    });
                }
                else {
                    scope.$storage.browser = scope.browserList[1];
                }

                scope.control.executeJob = function () {
                    if (scope.jobOptions.$valid) {
                        panes.openPane('report');
                        var job = angular.extend({}, scope.$storage.browser, {
                            file: scope.filename,
                            host: scope.$storage.host
                        });
                        Jobs.execute(job);
                    }
                };
            }
        };
    });
