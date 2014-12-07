'use strict';

angular.module('honeydew')
    .controller('LandingCtrl', function ($scope, $localStorage, $modal, $location, Files) {
        $scope.history = ($localStorage.history || [])
            .filter(function ( item, index, self ) {
                // de dupe again just to be sure
                return self.indexOf(item) === index;
            })
            .map( function (item) {
                // format the history items for use in the view
                return {
                    href: item,
                    label: item.replace(/\/?(features|sets)\/?/, '')
                };
            });

        $scope.openModal = function () {
            var modalInstance = $modal.open({
                templateUrl: 'components/modal/modal.html',
                controller: 'NewFileModalCtrl',
                resolve: {
                    filename: function () { return 'features/'; },
                    title: function () { return 'Create New'; },
                    action: function () {
                        return new Files().createNew;
                    }
                }
            });

            modalInstance.result.then(function (dest) {
                $location.path('/' + dest.file);
            });
        };

        $scope.viewGif = function (active) {
            var modal = $modal.open({
                templateUrl: 'landing/gif.html',
                resolve: {
                    active: function () { return active; }
                },
                controller: [
                    '$scope', 'active', function ($scope, active) {
                        var sources = {
                            feature: '/landing/new-feature.webm',
                            set: '/landing/new-set.webm'
                        };

                        $scope.src = sources[active];
                    }]
            });
        };

    });
