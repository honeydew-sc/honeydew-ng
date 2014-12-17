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

                    var job = createJob($scope.$storage.browser, $scope.$storage.server);
                    $scope.$emit('file:commit');
                    return job.$save();
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

                scope.$storage = $sessionStorage.$default({
                    server: '',
                    browser: ''
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
                    if (typeof scope.browserList !== 'undefined') {
                        scope.browserList.forEach( function (element, index, array) {
                            if (label === element.label) {
                                scope.$storage.browser = label;
                            }
                        });
                    }
                    else {
                        scope.$storage.browserName = label;
                    }
                }

                var cleanup = scope.$root.$on('hostname:changed', function (event, hostname) {
                    if (hostname.match(/origin.*honeydew\//)) {
                        selectBrowser( 'Mobile Emulator' );
                    }
                    else {
                        selectBrowser( 'Chrome Local' );
                    }
                });

                scope.$on('$destroy', function () {
                    cleanup();
                });

                // TODO: this is getting too big
                scope.executeJob = function () {
                    if (scope.jobOptions.$valid) {
                        panes.openPane('report');
                        var channel = liveReport.switchChannel();

                        var filename = $location.path().substr(1);

                        var job = {
                            file: filename,
                            host: hostname.host,
                            channel: channel
                        };

                        var isServer = scope.$storage.server.match(/^\w\w: ((?:\d\.?){4})/);
                        if (isServer) {
                            console.log(isServer);
                        }
                        return job;

                        filetree.closeTreeViaSettings( 'execute' );
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

                // put executeJob on control, which is passed up to
                // the editor-nav directive, and from there to the
                // EditorCtrl scope
                if (scope.control) {
                    scope.control.executeJob = scope.executeJob;
                }
            }
        };
    });
