'use strict';

angular.module('honeydew')
    .service('filetree', function ($resource, $localStorage, $location, $rootScope, Tree) {
        var self = this;

        if (typeof($localStorage.topLevelTree) === 'undefined') {
            $localStorage.topLevelTree = {};
        }

        this.get = function ( folder ) {
            var promise = Tree.get({ folder: folder }).$promise;

            promise.then(function (res) {
                persistTree(folder, res.tree);
            });

            return promise;
        };

        function persistTree(folder, tree, broadcast) {
            $localStorage.topLevelTree[folder] = self[folder + 'tree'] = tree;

            if (broadcast) {
                $rootScope.$broadcast('tree', { folder: folder });
            }
        }

        this.show = function (node) {
            $location.path(node.folder + '/' + node.label);
        };

        this.addLeaf = function (filename, tree) {
            var parts = filename.split('/');
            var folder = parts.shift();

            // if no tree is specified, we're adding to one of our
            // canonical trees. otherwise, we're trying to build
            // a new tree.
            tree = typeof(tree) === 'undefined' ? self[folder + 'tree'] : tree;
            var containingDir = filename.split('/').slice(0, -1).join('/');

            var thing = addLeafRecursively(tree, parts, containingDir);
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

                if (tree.every( function (existingLeaf) {
                    return existingLeaf.label !== leaf.label;
                })) {

                    tree.push(leaf);
                    tree.sort(treeSorter);
                }

                return tree;
            }
            else {
                var needle = nodeParts.shift();

                var branch = tree.find(findLeaf(needle));

                // if it doesn't go in an existing folder, let's
                // create a folder and try again at the current level
                if (typeof(branch) === 'undefined') {
                    addLeafRecursively(tree, [needle]);
                    nodeParts.unshift(needle);
                    return addLeafRecursively(tree, nodeParts, directory);
                }
                else {
                    // we can descend to the found branch's children
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
            persistTree(folder, tree, "broadcast");
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
                var branch = tree.find(findLeaf(needle));

                if (typeof(branch) !== 'undefined') {
                    deleteLeafRecursively(branch.children, nodeParts);
                }

                // if we didn't find a match, there's nothing to do...
            }
        };

        function findLeaf (needle) {
            return function (node) {
                return node.label === needle;
            };
        };

        this.filter = function (haystack, needle) {
            var needles = [];
            var needleRegex = new RegExp(needle.replace(' ', '.'), 'i');

            angular.copy(haystack).forEach(function (item) {
                if (item.label.toLowerCase() === needle.toLowerCase()) {
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

        this.collapse = $localStorage.filetreeCollapse || false;

        this.toggleTree = function () {
            this.collapse = !this.collapse;

            $rootScope.$broadcast('filetreeToggle');
            $localStorage.filetreeCollapse = this.collapse;
        };

        this.grep = function (folder, needle) {
            return Tree.get({
                folder: folder,
                needle: needle
            }).$promise.then(function (res) {
                var tree = [];
                res.list.forEach(function (file) {
                    self.addLeaf(file, tree);
                });

                return { tree: tree };
            });
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
