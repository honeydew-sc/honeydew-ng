'use strict';

angular.module('honeydew')
    .factory('Jobs', function ($resource) {
        return $resource('/rest.php/jobs', null, {
            'execute': {
                method: 'POST'
            }
        });
    });
