'use strict';

angular.module('honeydew')
    .directive('backgroundProcess', function () {
        return {
            templateUrl: 'components/background-process/background-process.html',
            restrict: 'E',
            controller: function (BackgroundProcess) {
                var self = this;

                BackgroundProcess.query(null, function (res) {
                    self.list = res;
                });

            },
            controllerAs: 'processes'
        };
    });
