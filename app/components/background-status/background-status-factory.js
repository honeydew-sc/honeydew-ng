'use strict';

angular.module('honeydew')
    .factory('BackgroundStatus', function ($resource) {
        return $resource('/rest.php/status/:status', {
            status: '@status'
        });
    });
