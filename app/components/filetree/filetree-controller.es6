angular.module('honeydew')
    .controller('FileTreeCtrl', function ($scope, filetree, $location, $timeout, debounce, $localStorage, alerts) {
        // put filetree.show() on the scope as the display fn
        $scope.tree = filetree;

        $scope.treeOptions = {
            dirSelectable: false,
            equality: (a, b) => {
                if ( !a || !b ) {
                    return false;
                }

                return a.$$hashKey === b.$$hashKey;
            }
        };

        $scope.tabs = [
            { label: "Features" },
            { label: "Phrases" },
            { label: "Sets" }
        ];
        $scope.tabs.forEach( tab => tab.active = isTabActive( tab ) );

        function isTabActive ( tab ) {
            return !!$location.path().match( '^.' + tab.label.toLowerCase() );
        };

        let onload = true;
        $scope.getTreeContents = function ( tab ) {
            if ( tab === undefined ) {
                return;
            }

            // let's only query the server once per session by
            // default; for manual refreshes, there is a refresh
            // button.
            if ( tab.hasOwnProperty( 'data' ) ) {
                return;
            }

            var tree,
                folder = tab.label.toLowerCase();

            tab.refreshing = true;
            filetree.get(folder)
                .finally(function ( res ) {
                    tree = tab.data = filetree[folder + 'tree'];
                    tab.refreshing = false;
                })
                .finally( () => {
                    // we only want to set expanded nodes when we are
                    // loading the page. any time after that, we'll be
                    // in getTreeContents because the user changed the
                    // active tab on their own. when that happens, we
                    // don't want to interfere with what they're
                    // doing.
                    if ( onload ) {
                        onload = false;
                        setExpandedNodesFromPath( tab );
                    }
                });

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
        };

        function setExpandedNodesFromPath( tab ) {
            let label = tab.label.toLowerCase();
            if ( label === 'sets' ) {
                // sets tab has no folders and thus nothing to expand
                return;
            }
            else {
                let path = $location.path();
                // path looks like
                //
                // /<tabName>/nodes/to/be/expanded/name.ext
                //
                // if we put the nodes to be expanded in
                // tab.expandedNodes, the tree-control will do the
                // rest.
                let expandedLabels = path.replace(`/${label}/`, '' ).split('/');
                let expanded = filterExpandedNodes( [], tab.data, expandedLabels );
                let leaf = expanded.pop();

                tab.expandedNodes = expanded;
                tab.selectedNode = leaf;
            }
        }

        function filterExpandedNodes( acc, nodes, labels ) {
            if ( !nodes.length ) {
                return acc;
            }

            let label = labels.shift();
            let node = nodes.find( node => node.label === label );
            if ( node ) {
                acc.push(node);
                return filterExpandedNodes( acc, node.children, labels );
            }
            else {
                return acc;
            }
        }

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
    });
