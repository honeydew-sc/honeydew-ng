'use strict';

angular.module('honeydew')
    .service('filetree', function ($resource, $sessionStorage, $location) {
        this._backend = $resource('/rest.php/tree/:folder', {
            folder: '@folder'
        });

        this.get = function ( folder ) {
            var service = this;
            var promise = this._backend.get({ folder: folder }).$promise;

            promise.then(function (res) {
                service[folder + 'tree'] = res.tree;
            });

            return promise;
        };

        this.collapse = false;

        this.toggleTree = function () {
            this.collapse = !this.collapse;
        };

        this.show = function (node) {
            $location.path(node.folder + '/' + node.label);
        };

        var self = this;
        this.filter = function (haystack, needle) {
            var needles = [];

            angular.copy(haystack).forEach(function (item) {
                if (item.label === needle) {
                    needles.push(item);
                }
                else {
                    if (item.children.length > 0) {
                        item.children = self.filter(item.children, needle);
                    }

                    if (( item.label.match(needle)
                          && item.label.match(/\.(?:feature|phrase|set)$/) )
                        || item.children.length > 0) {
                        needles.push(item);
                    }
                }
            });

            return needles;
        };
    });
