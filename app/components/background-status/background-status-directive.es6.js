'use strict';

angular.module('honeydew')
    .directive('backgroundStatus', function () {
        return {
            templateUrl: 'components/background-status/background-status.html',
            restrict: 'E',
            controller: function (BackgroundStatus, localConfig) {
                this.list = [];

                BackgroundStatus.query(null, res => {
                    res.forEach( it => this.list.push(it) );

                    Object.keys(localConfig).forEach( server => {
                        BackgroundStatus.get({
                            status: 'webdriver',
                            local: localConfig[server]
                        }, res => {
                            this.list.push({
                                name: server,
                                status: res.webdriverStatus
                            });
                        });
                    });
                });

            },
            controllerAs: 'statuses'
        };
    });
