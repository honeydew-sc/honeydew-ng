'use strict';

angular.module('honeydew')
    .directive('jobOptions', function (availableBrowsers, $localStorage, Jobs, Files, panes, alerts, randomString, liveReport) {
        return {
            scope: {
                filename: '@',
                jira: '=',
                control: '='
            },
            templateUrl: 'components/jobs/jobs.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                scope.browserList = availableBrowsers.all;

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
                        var channel = liveReport.switchChannel();

                        var job = angular.extend({}, scope.$storage.browser, {
                            file: scope.filename,
                            host: scope.$storage.host,
                            channel: channel
                        });

                        Jobs.execute(job);

                        var file = new Files({
                            file: Files.encode(scope.filename),
                            msg: scope.jira()
                        });

                        file.$commit()
                            .then(function (res) {
                                alerts.addAlert(res, 1000);
                            })
                            .catch(function (res) {
                                alerts.addAlert(res);
                            });
                    }
                };
            }
        };
    });
