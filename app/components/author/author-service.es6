angular.module('honeydew')
    .factory('Author', function ($resource) {
        return $resource('/rest.php/user');
    });
