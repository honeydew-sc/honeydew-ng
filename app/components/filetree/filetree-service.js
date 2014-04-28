'use strict';

angular.module('honeydew')
    .service('filetree', function ($resource, $sessionStorage, $location) {
        this._backend = $resource('/rest.php/tree/:folder', {
            folder: '@folder'
        });

        this.get = function ( folder ) {
            return this._backend.get({ folder: folder }).$promise;
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

        this.show = function (node) {
            $location.path('editor' + node.folder + '/' + node.label);
        };
    });
