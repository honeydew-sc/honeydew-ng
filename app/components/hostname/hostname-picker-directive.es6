'use strict';

angular.module('sc.hostname')
    .directive('hostnamePicker', function ( hostname ) {
        return {
            templateUrl: 'components/hostname/hostname.html',
            replace: true,
            scope: true,
            restrict: 'E',
            controller: function ( $scope, hostname ) {
                var self = this;
                self.name = hostname;

                self.emit = function (app, env) {
                    $scope.$emit('hostname:update', app, env);

                    if (env) {
                        self.open = false;
                    }
                };

            },
            controllerAs: 'Host'
        };
    });
