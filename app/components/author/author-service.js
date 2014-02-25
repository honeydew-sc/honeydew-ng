'use strict';

angular.module('honeydew')
    .factory('Author', ['$resource', function ($resource) {
        return $resource('/rest.php/user');
    }]);
