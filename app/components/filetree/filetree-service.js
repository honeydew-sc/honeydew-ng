'use strict';

angular.module('honeydew')
    .service('filetree', function ($resource) {
        var backend = $resource('/rest.php/tree/:folder', {
            folder: '@folder'
        });

        var service = {
            empty: [ { label: '', children: [] } ],
            backend: backend
        };

        return service;
    });
