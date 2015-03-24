'use strict';

angular.module('honeydew')
    .service('randomString', function () {
        return {
            string: function () {
                return (new Date() * Math.random()).toString(36).substr(0,8).replace(/[^a-zA-Z]/g, 'h');
            }
        };
    });
