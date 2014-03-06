'use strict';

angular.module('honeydew')
    .directive('autofocus', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                $timeout( function () {
                    element[0].select();
                }, 200);
            }
        };
    });
