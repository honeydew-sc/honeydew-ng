'use strict';

angular.module('honeydew')
    .factory('Jobs', ['$resource', function ($resource) {
        return $resource('/rest.php/jobs', null,
                         {
                             'execute': { method: 'POST' }
                         });
    }]);
