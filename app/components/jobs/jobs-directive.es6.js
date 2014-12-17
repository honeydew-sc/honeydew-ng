'use strict';

angular.module('honeydew')
    .directive('jobOptions', function (availableBrowsers, $localStorage, $sessionStorage, $location, Jobs, Files, Tree, filetree, Monitor, panes, alerts, randomString, liveReport, hostname, BackgroundStatus) {
        return {
            scope: {
                submitAction: '='
            },
            templateUrl: 'components/jobs/jobs.html',
            restrict: 'E',
            link: function (scope, element, attrs) {
                (function populateBrowsers() {
                    scope.$storage = $sessionStorage;

                    scope.browsers = availableBrowsers.getBrowsers();
                    scope.servers = availableBrowsers.getServers();
                })();
            },
            controller: ($scope, hostname, Jobs) => {
                $scope.executeJob = () => {
                    (function updateWindowLayout() {
                        // oooh side effects
                        panes.openPane('report');
                        filetree.closeTreeViaSettings('execute');
                    })();

                    if ($scope.jobOptions.$valid) {
                        var job = createJob($scope.$storage.browser, $scope.$storage.server);
                        $scope.$emit('file:commit');
                        return job.$save();
                    }
                    else {
                        return false;
                    }
                };

                var createJob = (browser, server) => {
                    var file = $location.path().substr(1);
                    var host = hostname.host;
                    var channel = liveReport.switchChannel();
                    var job = { file, host, channel, server, browser };

                    if (server !== 'Saucelabs') {
                        job.browser += ' Local';
                        job.local = server.split(' ').pop();
                    }

                    // The backend expects an array of browser names
                    job.browser = [ job.browser ];

                    return new Jobs(job);
                };

                (function listenForExecutes() {
                    $scope.$on('job:execute', (event, data) => {
                        $scope.executeJob();
                    });
                })();

                (function listenForHostnames() {
                    $scope.$on('hostname:changed', function (event, hostname) {
                        if (hostname.match(/app\.zip$/)) {
                            $scope.$storage.browser = 'iOS';
                        }
                        else if (hostname.match(/\.apk$/)) {
                            $scope.$storage.browser = 'Android';
                        }
                        else {
                            if ($scope.$storage.browser.match(/iOS|Android/)) {
                                $scope.$storage.browser = 'Chrome';
                            }
                        }
                    });
                })();
            },
            somethingElse: function (scope, element, attrs) {
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
                    scope.browsers = availableBrowsers.browsers;
                    scope.servers = availableBrowsers.servers;
                }

                // TODO: this is getting too big
                scope.executeJob = function () {
                    if (scope.jobOptions.$valid) {
                        if (job.label.match(/local(?! mobile)/i)) {
                            BackgroundStatus.get({
                                status: 'webdriver',
                                local: job.local
                            }, function (res) {
                                if (res.webdriverStatus) {
                                    Jobs.execute(job);
                                }
                                else {
                                    alerts.addAlert({
                                        type: 'danger',
                                        msg: 'The webdriver server at ' + res.serverAddress + ':4444 is unreachable! Your test is not running!'
                                    });
                                }
                            });
                        }
                        else {
                            Jobs.execute(job);
                        }

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
            }
        };
    });
