'use strict';

angular.module('honeydew')
    .directive('backgroundStatus', function () {
        return {
            templateUrl: 'components/background-status/background-status.html',
            scope: {},
            restrict: 'E',
            controller: function (BackgroundStatus, localConfig) {
                this.list = [];

                BackgroundStatus.query(null, res => {
                    res.forEach( it => this.list.push(it) );

                    // add any broken local servers to the list
                    Object.keys(localConfig).forEach( server => {
                        BackgroundStatus.get({
                            status: 'webdriver',
                            local: localConfig[server]
                        }, res => {
                            maybePush({
                                name: server,
                                status: res.webdriverStatus
                            });
                        });
                    });
                });

                var maybePush = server => {
                    if (!server.status) {
                        this.list.push(server);
                    }
                };

            },
            controllerAs: 'Status'
        };
    });
