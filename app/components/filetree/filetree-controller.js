'use strict';

angular.module('honeydew')
    .controller('FileTreeCtrl', function ($scope, filetree, $location, $timeout, debounce) {
        $scope.tree = filetree;

        $scope.treeOptions = {
            dirSelectable: false
        };

        $scope.tabs = [
            { label: "Features" },
            { label: "Phrases" },
            { label: "Sets"}
        ];

        var path = $location.path();
        $scope.tabs.forEach(function (tab) {
            var folder = tab.label.toLowerCase();
            var tree;
            // TODO: maybe optimize this so tab doesn't block pageload?
            $scope.tree.get(folder).then(function (res) {
                tree = tab.data = res.tree;
            });

            tab.active = !!path.match('^.' + folder);

            function swapTrees(newNeedle, oldNeedle) {
                if (newNeedle === oldNeedle) {
                    return;
                }
                else {
                    if (tab.needle.length === 0) {
                        $scope.treeOptions.defaultExpanded = [];
                        tab.data = tree;
                    }
                    else {
                        tab.data = filetree.filter(tree, tab.needle);
                    }
                }
            };

            $scope.$watch(function () {return tab.needle;}, debounce(swapTrees, 350));
        });

        $timeout(function () {
            // prevent animations during pageload
            $scope.animate = 1;
        });
    });
