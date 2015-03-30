'use strict';

angular.module('honeydew')
    .directive('jobOptions', function (availableBrowsers, $sessionStorage, $location, Monitor, Tree) {
        return {
            scope: true,
            templateUrl: 'components/jobs/jobs.html',
            restrict: 'E',
            controller: function ($scope, $q, HoneydewJob, alerts, panes, filetree, hostname, BackgroundStatus, liveReport) {
                var self = this;
                self.$scope = $scope;

                (function populateBrowsers() {
                    self.$storage = $sessionStorage;
                    self.browsers = availableBrowsers.getBrowsers();
                    self.servers = availableBrowsers.getServers();
                })();

                // needed in the view to toggle the set list
                self.isMonitor = $location.path().match(/\/monitor$/);

                (function populateSets() {
                    if (self.isMonitor) {
                        Tree.get( {folder: 'sets'}, res => {
                            self.setList = res.tree.map( it => it.label );
                            self.set = { name: self.setList[0] };
                        });
                    }
                })();

                (function listenForExecutes() {
                    $scope.$on('job:execute', (event, data) => {
                        self.executeJob();
                    });
                })();

                (function listenForHostnames() {
                    $scope.$on('hostname:changed', function (event, hostname) {
                        if (hostname.match(/app\.zip$/)) {
                            self.$storage.browser = 'iOS Mobile';
                        }
                        else if (hostname.match(/\.apk$/)) {
                            self.$storage.browser = 'Android Mobile';
                        }
                        else {
                            if (self.$storage.browser.match(/iOS|Android/)) {
                                self.$storage.browser = 'Chrome';
                            }
                        }
                    });
                })();

                self.executeJob = () => {
                    (function updateWindowLayout() {
                        // oooh side effects
                        panes.openPane('report');
                        filetree.closeTreeViaSettings('execute');
                    })();

                    hasWebdriver(self.$storage.server).then( res => {
                        if (res.webdriverStatus && $scope.jobOptions.$valid) {
                            var job = new HoneydewJob({ browser: self.$storage.browser, server: self.$storage.server });
                            $scope.$emit('file:commit');
                            $scope.$emit('report:reset');
                            return job.$execute();
                        }
                        else {
                            return false;
                        }
                    });
                };

                self.addMonitor = () => {
                    var monitor = constructMonitor(self.$storage.browser, self.$storage.server);
                    $scope.$emit('monitor:create', monitor);
                };

                var getLocalIp = serverName => {
                    $sessionStorage.settings = $sessionStorage.settings || {};
                    if ( serverName === 'Localhost' && 'wdAddress' in $sessionStorage.settings){
                        return $sessionStorage.settings.wdAddress;
                    }
                    else {
                        return serverName.split(' ').pop();
                    }
                };

                var isSaucelabs = () => self.$storage.server === 'Saucelabs';

                var isMobile = () => self.$storage.browser.match(/Mobile/i);

                var hasWebdriver = (server) => {
                    if ( isSaucelabs() || isMobile() ) {
                        // TODO: we're just assume Saucelabs is up
                        var deferred = $q.defer();
                        deferred.resolve({webdriverStatus: true});

                        return deferred.promise;
                    }
                    else {
                        var statusPromise = BackgroundStatus.get({
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

                var constructMonitor = (browser, server) => {
                    var set = self.set.name,
                        host = hostname.host,
                        monitor = { set, host, browser };

                    if (!isSaucelabs()) {
                        var prefix = server.split(': ').shift();
                        monitor.browser = `${ prefix } ${browser} Local`;
                    }

                    return new Monitor(monitor);
                };
            },
            controllerAs: 'job'
        };
    });
