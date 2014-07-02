'use strict';

angular.module('honeydew')
    .factory('BackgroundProcess', function ($resource) {
        return $resource('/rest.php/process/:process', {
            process: '@process'
        });
    });
