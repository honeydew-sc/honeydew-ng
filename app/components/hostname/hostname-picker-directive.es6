'use strict';

angular.module('sc.hostname')
    .directive('hostnamePicker', function ( $location, hostname ) {
        return {
            templateUrl: () => {
                var url = 'components/hostname/hostname.html';
                if ( $location.$$absUrl.match(/dashboard\/index.html/) ) {
                    return '/' + url;
                }
                else {
                    return url;
                }
            },
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

                $scope.$emit('hostname:ready');
            },
            controllerAs: 'Host'
        };
    });
