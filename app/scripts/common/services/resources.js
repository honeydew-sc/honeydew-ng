'use strict';

angular.module('honeydew')
    .factory('Files', ['$resource', function ($resource) {
        return $resource('/rest.php/files/:file', {file: '@file'});
    }]);

angular.module('honeydew')
    .factory('jobs', ['$resource', function ($resource) {
        return $resource('/rest.php/jobs');
    }]);
