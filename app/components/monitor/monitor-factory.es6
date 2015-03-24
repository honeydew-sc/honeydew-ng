'use strict';

angular.module('honeydew')
    .factory('Monitor', function ($resource) {
        return $resource('/rest.php/monitor/:id', {id: '@id'});
    });
