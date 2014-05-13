'use strict';

angular.module('honeydew')
    .controller('FileTreeCtrl', function ($scope, filetree, $location, $timeout, debounce, $localStorage) {
        // put filetree.show() on the scope as the display fn
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
            var tree, folder = tab.label.toLowerCase();
            tab.data = $localStorage.topLevelTree[folder];
            // TODO: maybe optimize this so tab doesn't block pageload?
            filetree.get(folder).then(function () {
                tree = tab.data = filetree[folder + 'tree'];
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
            var tab = $scope.tabs.find(function (tab) {
                return tab.label.toLowerCase() === data.folder;
            });
            tab.data = filetree[data.folder + 'tree'];
        });

        $timeout(function () {
            // prevent animations during pageload
            $scope.animate = 1;
        });
    });
