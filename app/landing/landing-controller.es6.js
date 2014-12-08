'use strict';

angular.module('honeydew')
    .controller('LandingCtrl', function ($scope, $localStorage, $modal, $location, Files) {
        var self = this;

        self.history = ($localStorage.history || [])
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

        self.gotoTempFile = () => {
            var filename = 'features/test/tmp/' + new Date().getTime() + '.feature';

            var file = Files.encode(filename);
            var contents = [
                'Feature: temporary',
                '',
                ' Scenario: temp',
                ' '
            ].join("\n");

            var tempFile = new Files({file, contents});
            tempFile.$save().then((res) => {
                $location.path('/' + filename);
            });
        };

        self.openModal = function () {
            var modalInstance = $modal.open({
                templateUrl: 'components/new-file-modal/new-file-modal.html',
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



        self.viewGif = function (active) {
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
