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

        var path = $location.path();
        $scope.tabs.forEach( function (it) {
            var folder = it.label.toLowerCase();
            // TODO: maybe optomize this so it doesn't block pageload?
            $scope.tree.get(folder).then(function (res) {
                it.data = res.tree;
            });

            // base active tab off of type of item
            if (path.match('^.' + folder)) {
                it.active = true;
            }
            else {
                it.active = false;
            }
        });
    });
