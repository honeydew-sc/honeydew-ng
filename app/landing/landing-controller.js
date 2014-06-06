'use strict';

angular.module('honeydew')
    .controller('LandingCtrl', function ($scope, $localStorage, $modal, $location, Files) {
        $scope.history = $localStorage.history;

        // de dupe again just to be sure
        $scope.history = $scope.history.filter(function ( item, index, self ) {
            return self.indexOf(item) === index;
        });

        $scope.openModal = function () {
            var modalInstance = $modal.open({
                templateUrl: 'components/modal/modal.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    filename: function () { return 'features/t.feature'; },
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
                size: 'lg',
                resolve: {
                    active: function () { return active; }
                },
                controller: function ($scope, active) {
                    var sources = {
                        feature: '/landing/new-feature.webm',
                        set: '/landing/new-set.webm'
                    };

                    $scope.src = sources[active];
                    console.log(active, $scope.src);
                }
            });
        };

    });
