'use strict';

angular.module('honeydew')
    .directive('jobOptions', function (availableBrowsers, $sessionStorage, Monitor) {
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
            controller: function ($scope, $location, $q, Jobs, alerts, panes, filetree, hostname, BackgroundStatus, liveReport) {
                $scope.executeJob = () => {
                    (function updateWindowLayout() {
                        // oooh side effects
                        panes.openPane('report');
                        filetree.closeTreeViaSettings('execute');
                    })();

                    hasWebdriver($scope.$storage.server).then( res => {
                        if (res.webdriverStatus && $scope.jobOptions.$valid) {
                            let job = createJob($scope.$storage.browser, $scope.$storage.server);
                            $scope.$emit('file:commit');
                            return job.$execute();
                        }
                        else {
                            return false;
                        }
                    });
                };

                var getLocalIp = value => value.split(' ').pop();

                var isSaucelabs = () => $scope.$storage.server === 'Saucelabs';

                var isMobile = () => $scope.$storage.browser.match(/Mobile/i);

                var createJob = (browser, server) => {
                    var file    = $location.path().substr(1),
                        host    = hostname.host,
                        channel = liveReport.switchChannel(),
                        job     = { file, host, channel, server, browser };

                    if ( !isSaucelabs() ) {
                        job.browser += ' Local';
                        job.local = getLocalIp(server);
                    }

                    // The backend expects an array of browser names
                    job.browser = [ job.browser ];

                    return new Jobs(job);
                };

                var hasWebdriver = (server) => {
                    if ( isSaucelabs() || isMobile() ) {
                        // TODO: we're just assume Saucelabs is up
                        let deferred = $q.defer();
                        deferred.resolve({webdriverStatus: true});

                        return deferred.promise;
                    }
                    else {
                        let statusPromise = BackgroundStatus.get({
                            status: 'webdriver',
                            local: getLocalIp(server)
                        }, res => {
                            if (!res.webdriverStatus) {
                                alerts.addAlert({
                                    type: 'danger',
                                    msg: 'The webdriver server at ' + res.serverAddress + ':4444 is unreachable! Your test is not running!'
                                });
                            }

                            return res.webdriverStatus;
                        }).$promise;

                        return statusPromise;
                    }
                };

                (function listenForExecutes() {
                    $scope.$on('job:execute', (event, data) => {
                        $scope.executeJob();
                    });
                })();

                (function listenForHostnames() {
                    $scope.$on('hostname:changed', function (event, hostname) {
                        if (hostname.match(/app\.zip$/)) {
                            $scope.$storage.browser = 'iOS Mobile';
                        }
                        else if (hostname.match(/\.apk$/)) {
                            $scope.$storage.browser = 'Android Mobile';
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
