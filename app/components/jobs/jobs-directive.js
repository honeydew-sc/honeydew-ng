'use strict';

angular.module('honeydew')
    .directive('jobOptions', function (availableBrowsers, $localStorage, $sessionStorage, $location, Jobs, Files, Tree, filetree, Monitor, panes, alerts, randomString, liveReport, hostname) {
        return {
            scope: {
                jira: '=',
                control: '=',
                submitAction: '='
            },
            templateUrl: 'components/jobs/jobs.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                scope.monitor = attrs.monitor;
                if (scope.monitor) {
                    scope.browserList = availableBrowsers.set;

                    Tree.get( {
                        folder: 'sets'
                    }, function (res) {
                        scope.setList = res.tree.map( function ( it ) {
                            return it.label;
                        });
                        scope.set = {
                            name: scope.setList[0]
                        };
                    });

                    scope.action = function () {
                        var maybeNewMonitor = new Monitor({
                            browser: scope.$storage.browser.browser[0],
                            host: hostname.host,
                            set: scope.set.name,
                            on: true
                        });

                        return scope.submitAction(maybeNewMonitor);
                    };
                }
                else {
                    scope.browserList = availableBrowsers.all;
                }

                scope.$storage = $sessionStorage.$default({
                    host: ''
                    // , browser: scope.browserList[1]
                });

                // the defaults for ngStorage don't mesh well with
                // setting a default for an ng-options select, so
                // we have to do it manually.
                if (scope.$storage.browser) {
                    selectBrowser( scope.$storage.browser.label );
                }
                else {
                    scope.$storage.browser = scope.browserList[1];
                }

                function selectBrowser ( label ) {
                    scope.browserList.forEach( function (element, index, array) {
                        if (label === element.label) {
                            scope.$storage.browser = element;
                        }
                    });
                }

                var cleanup = scope.$root.$on('hostname:changed', function (event, hostname) {
                    var mobile = 'Local Mobile Emulator';
                    if (hostname.match(/origin.*honeydew\//)) {
                        selectBrowser( mobile );
                    }
                    else if (scope.$storage.browser.label === mobile) {
                        selectBrowser( 'Chrome Local' );
                    }
                });

                scope.$on('$destroy', function () {
                    cleanup();
                });

                scope.executeJob = function () {
                    if (scope.jobOptions.$valid) {
                        panes.openPane('report');
                        var channel = liveReport.switchChannel();

                        var filename = $location.path().substr(1);
                        var job = angular.extend({}, scope.$storage.browser, {
                            file: filename,
                            host: hostname.host,
                            channel: channel
                        });

                        filetree.closeTreeViaSettings( 'execute' );

                        Jobs.execute(job);

                        var file = new Files({
                            file: Files.encode(filename),
                            msg: scope.jira ? scope.jira() : ''
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

                // put executeJob on control, which is passed up to
                // the editor-nav directive, and from there to the
                // EditorCtrl scope
                if (scope.control) {
                    scope.control.executeJob = scope.executeJob;
                }
            }
        };
    });
