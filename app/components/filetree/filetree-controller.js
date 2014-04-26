'use strict';

angular.module('honeydew')
    .controller('FileTreeCtrl', function ($scope, filetree, $location, $timeout) {
        $scope.treeOptions = {
            dirSelectable: false,
            defaultExpanded: filetree.defaultExpanded
        };

        filetree.get().then(function (res) {
            $scope.data = res.tree;
        });

        $scope.showSelected = function (node) {
            filetree.persistState($scope.expandedNodes);
            $timeout(function () {
                $location.path(node.folder + '/' + node.label);
            }, 100);
        };
    });
