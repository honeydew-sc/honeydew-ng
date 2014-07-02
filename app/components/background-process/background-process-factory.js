'use strict';

angular.module('honeydew')
    .factory('BackgroundProcess', function ($resource) {
        return $resource('/rest.php/files/:process', {
            process: '@process'
        });
    });
