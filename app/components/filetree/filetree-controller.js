'use strict';

angular.module('honeydew')
    .controller('FileTreeCtrl', function ($scope, filetree, $location, $timeout, debounce, $localStorage, alerts) {
        // put filetree.show() on the scope as the display fn
        $scope.tree = filetree;

        $scope.treeOptions = {
            dirSelectable: false
        };

        $scope.tabs = [
            {
                label: "Features",
                refreshing: true
            },
            {
                label: "Phrases",
                refreshing: true
            },
            {
                label: "Sets",
                refreshing: true
            }
        ];

        var path = $location.path();
        $scope.tabs.forEach(function (tab) {
            var tree, folder = tab.label.toLowerCase();
            tab.data = $localStorage.topLevelTree[folder];

            filetree.get(folder).then(function ( res ) {
                tree = tab.data = filetree[folder + 'tree'];
                tab.refreshing = false;
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
                        filetree.grep(folder, newNeedle).then(function (res) {
                            tab.grepResults = res.tree;
                        }).then(function () {
                            tab.data = filetree.filter(tree, tab.needle);
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

        $scope.refresh = function ( label ) {
            var folder = label.toLowerCase();
            var tab = $scope.tabs.find(function (tab) {
                return tab.label.toLowerCase() === folder;
            });

            tab.refreshing = true;
            filetree.get(folder)
                .then(function ( res ) {
                    tab.data = filetree[folder + 'tree'];
                }).catch( alerts.catcher )
                .finally( function ( res ) {
                    tab.refreshing = false;
                });
        };

        $timeout(function () {
            // prevent animations during pageload
            $scope.animate = 1;
        });
    });
