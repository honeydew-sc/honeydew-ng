'use strict';

angular.module('honeydew')
    .controller('FileTreeCtrl', function ($scope, filetree, $location, $timeout) {
        $scope.treeOptions = {
            dirSelectable: false
            // defaultExpanded: filetree.defaultExpanded
        };

        filetree.get("features").then(function (res) {
            $scope.data = res.tree;
        });

        $scope.showSelected = function (node) {
            $location.path('editor' + node.folder + '/' + node.label);
        };
    });
