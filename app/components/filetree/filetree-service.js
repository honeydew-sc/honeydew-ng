'use strict';

angular.module('honeydew')
    .service('filetree', function ($resource, $sessionStorage, $rootScope) {
        this.backend = $resource('/rest.php/tree/:folder', {
            folder: '@folder'
        });

        this.get = function ( folder ) {
            return this.backend.get({ folder: folder }).$promise;
        };

        this.persistState = function ( expandedNodes ) {
            this.defaultExpanded = [];
            angular.forEach(expandedNodes, function (value) {
                if (!!value) {
                    this.defaultExpanded.push(value);
                }
            });

            $sessionStorage.defaultExpanded = this.defaultExpanded;
        };

        this.collapse = false;

        this.toggleTree = function () {
            this.collapse = !this.collapse;
        };
    });
