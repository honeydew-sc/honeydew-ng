'use strict';

angular.module('honeydew')
    .directive('backgroundProcess', function () {
        return {
            templateUrl: 'components/background-process/background-process.html',
            restrict: 'E',
            controller: function (BackgroundProcess) {
                this.list = [
                    { name: 'saucelabs', status: 'on' },
                    { name: 'browsermob', status: 'on'}
                ];

            },
            controllerAs: 'processes'
        };
    });
