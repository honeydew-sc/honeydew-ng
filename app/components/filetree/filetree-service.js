'use strict';

angular.module('honeydew')
    .service('filetree', function ($resource, $localStorage, $location, $rootScope) {
        var self = this;

        if (typeof($localStorage.topLevelTree) === 'undefined') {
            $localStorage.topLevelTree = {};
        }

        var backend = $resource('/rest.php/tree/:folder', {
            folder: '@folder'
        });

        this.get = function ( folder ) {
            var promise = backend.get({ folder: folder }).$promise;

            promise.then(function (res) {
                persistTree(folder, res.tree);
            });

            return promise;
        };

        function persistTree(folder, tree, broadcast) {
            $localStorage.topLevelTree[folder] = self[folder + 'tree'] = tree;

            if (broadcast) {
                $rootScope.$broadcast('tree');
            }
        }

        this.show = function (node) {
            $location.path(node.folder + '/' + node.label);
        };

        this.addLeaf = function (filename) {
            var parts = filename.split('/');
            var folder = parts.shift();
            var tree = self[folder + 'tree'];
            var containingDir = filename.split('/').slice(0, -1).join('/');

            addLeafRecursively(tree, parts, containingDir);
            persistTree(folder, tree, "broadcast");
        };

        function addLeafRecursively (tree, nodeParts, directory) {
            // if we've consumed all the other nodeParts, it's time to add
            // a leaf
            if (nodeParts.length === 1) {
                var leaf = {
                    label: nodeParts.shift(),
                    children: []
                };

                // we need to put the full directory on the leaf so
                // that self.show can use it as the URL
                if (directory) {
                    leaf.folder = directory;
                }

                tree.push(leaf);
                tree.sort(treeSorter);

                return tree;
            }
            else {
                var needle = nodeParts.shift();

                var branch = tree.find(grepTree(needle));

                // if it doesn't go in an existing folder, let's
                // create a folder and go again
                if (typeof(branch) === 'undefined') {
                    addLeafRecursively(tree, [needle]);
                    nodeParts.unshift(needle);
                    return addLeafRecursively(tree, nodeParts);
                }
                else {
                    return addLeafRecursively(branch.children, nodeParts, directory);
                }
            }
        };

        function treeSorter (a, b) {
            if (a.label == b.label) {
                return 0;
            }
            else {
                return a.label > b.label ? 1 : -1;
            }
        };

        this.deleteLeaf = function (filename) {
            var parts = filename.split('/');
            var folder = parts.shift();
            var tree = self[folder + 'tree'];

            deleteLeafRecursively(tree, parts);
            persistTree(folder, tree);
        };

        function deleteLeafRecursively(tree, nodeParts) {
            // only one part of the filename left means it's time to
            // delete a leaf
            if (nodeParts.length === 1) {
                tree.forEach(function (leaf, index) {
                    if (leaf.label === nodeParts[0]) {
                        tree.splice(index, 1);
                    }
                });
            }
            else {
                // otherwise consume a part of the filename and search
                // the matching branch's children
                var needle = nodeParts.shift();
                var branch = tree.find(grepTree(needle));

                if (typeof(branch) !== 'undefined') {
                    deleteLeafRecursively(branch.children, nodeParts);
                }

                // if we didn't find a match, there's nothing to do...
            }
        };

        function grepTree (needle) {
            return function (node) {
                return node.label === needle;
            };
        };

        this.filter = function (haystack, needle) {
            var needles = [];
            var needleRegex = new RegExp(needle, 'i');

            angular.copy(haystack).forEach(function (item) {
                if (item.label === needle) {
                    needles.push(item);
                }
                else {
                    if (item.children.length > 0) {
                        item.children = self.filter(item.children, needle);
                    }

                    if (( needleRegex.test(item.label)
                          && item.label.match(/\.(?:feature|phrase|set)$/) )
                        || item.children.length > 0) {
                        needles.push(item);
                    }
                }
            });

            return needles;
        };

        this.collapse = false;

        this.toggleTree = function () {
            this.collapse = !this.collapse;
        };
    });

// polyfill for array.find() from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(predicate) {
            if (this == null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                if (i in list) {
                    value = list[i];
                    if (predicate.call(thisArg, value, i, list)) {
                        return value;
                    }
                }
            }
            return undefined;
        }
    });
}
