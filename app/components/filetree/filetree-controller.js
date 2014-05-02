'use strict';

angular.module('honeydew')
    .controller('FileTreeCtrl', function ($scope, filetree, $location, $timeout) {
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
            // TODO: maybe optimize this so tab doesn't block pageload?
            $scope.tree.get(folder).then(function (res) {
                tab.data = res.tree;
            });

            tab.active = !!path.match('^.' + folder);
        });

        $timeout(function () {
            // prevent animations during pageload
            $scope.animate = 1;
        });
    });
