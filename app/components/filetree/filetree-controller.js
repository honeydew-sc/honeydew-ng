'use strict';

angular.module('honeydew')
    .controller('FileTreeCtrl', function ($scope, filetree, $location, $timeout) {
        $scope.tree = filetree;

        $scope.treeOptions = {
            dirSelectable: false
            // defaultExpanded: filetree.defaultExpanded
        };

        $scope.tabs = [
            { label: "Features" },
            { label: "Phrases" },
            { label: "Sets"}
        ];

        $scope.tabs.forEach( function (it) {
            var folder = it.label.toLowerCase();
            // TODO: maybe optomize this so it doesn't block pageload?
            $scope.tree.get(folder).then(function (res) {
                it.data = res.tree;
            });

        });
    });
