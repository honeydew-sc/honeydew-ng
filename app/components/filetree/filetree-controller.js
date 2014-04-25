'use strict';

angular.module('honeydew')
    .controller('FileTreeCtrl', function ($scope, filetree, $location) {
        $scope.control = {};
        $scope.data = filetree.empty;

        filetree.backend.get({ folder: 'features' }, function (res) {
            $scope.data = res.tree;
        });

        String.prototype.endsWith = function(suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };

        $scope.tree_handler = function (branch) {
            if (branch.label.endsWith('feature')) {
                var folder = $scope.resolve_parent(branch);
                var path = folder + branch.label;
                $location.path(path);
            }
        };

        $scope.resolve_parent = function (branch, acc) {
            if (typeof(acc) === 'undefined') {
                acc = [];
            }

            var parent = $scope.control.get_parent_branch(branch);
            if (typeof(parent) === 'undefined') {
                acc.push('features');
                return acc.reverse().join('/') + '/';
            }
            else {
                acc.push(parent.label);
                return $scope.resolve_parent(parent, acc);
            }
        };

    });
