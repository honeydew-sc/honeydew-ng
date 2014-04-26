'use strict';

angular.module('honeydew')
    .service('filetree', function ($resource, $sessionStorage) {
        var backend = $resource('/rest.php/tree/:folder', {
            folder: '@folder'
        });

        var service = {

            get: function () {
                return backend.get({ folder: 'features' }).$promise;
            },

            persistState: function (expandedNodes) {
                service.defaultExpanded = [];
                angular.forEach(expandedNodes, function (value) {
                    if (!!value) {
                        service.defaultExpanded.push(value);
                    }
                });

                $sessionStorage.defaultExpanded = service.defaultExpanded;
            },

            defaultExpanded: $sessionStorage.defaultExpanded || []
        };

        return service;
    });
