'use strict';

angular.module('honeydew')
    .directive('backgroundStatus', function () {
        return {
            templateUrl: 'components/background-status/background-status.html',
            restrict: 'E',
            controller: function (BackgroundStatus) {
                var self = this;

                BackgroundStatus.query(null, function (res) {
                    self.list = res;
                });

            },
            controllerAs: 'statuses'
        };
    });
