'use strict';

angular.module('honeydew')
    .controller('FileTreeCtrl', function ($scope, filetree, $location, $timeout) {
        $scope.treeOptions = {
            dirSelectable: false
            // defaultExpanded: filetree.defaultExpanded
        };

        $scope.tree = filetree;

        $scope.tree.get("features").then(function (res) {
            $scope.data = res.tree;
        });
    });
