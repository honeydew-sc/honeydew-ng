angular.module('honeydew')
    .factory('Tree', function ($resource) {
        return $resource('/rest.php/tree/:folder', {
            folder: '@folder'
        });
    });
