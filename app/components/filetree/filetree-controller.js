'use strict';

angular.module('honeydew')
    .controller('FileTreeCtrl', function ($scope, filetree, $location, $timeout, debounce, $localStorage) {
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
            tab.data = $localStorage.topLevelTree[folder];
            var tree;
            // TODO: maybe optimize this so tab doesn't block pageload?
            $scope.tree.get(folder).then(function () {
                tree = tab.data = $scope.tree[folder + 'tree'];
            });

            tab.active = !!path.match('^.' + folder);

            function search(newNeedle, oldNeedle) {
                if (newNeedle === oldNeedle) {
                    return;
                }
                else {
                    if (tab.needle.length === 0) {
                        tab.data = tree;
                    }
                    else {
                        tab.data = filetree.filter(tree, tab.needle);
                        filetree.grep(folder, newNeedle).then(function (res) {
                            tab.grepResults = res.tree;
                        });
                    }
                }
            };

            $scope.$watch(function () {return tab.needle;}, debounce(search, 350));
        });

        $scope.$on('tree', function (event, data) {
            $scope.tree = filetree;
        });

        $timeout(function () {
            // prevent animations during pageload
            $scope.animate = 1;
        });
    });
