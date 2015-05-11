'use strict';

angular.module('honeydew')
    .controller('LandingCtrl', function ($scope, $localStorage, $modal, $location, Files) {
        var self = this;

        self.history = ($localStorage.history || [])
            .filter(( item, index, self ) => {
                // de dupe again just to be sure
                return self.indexOf(item) === index;
            })
            .map( (item) => {
                // format the history items for use in the view
                return {
                    href: item,
                    label: item.replace(/\/?(features|sets)\/?/, '')
                };
            });

        var historyLength = self.history.length;
        // keep the length manageable
        if (historyLength > 10) {
            $localStorage.history.splice(10, historyLength - 10);
        }

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
            tempFile.$save().then( () => {
                $location.path('/' + filename);
            });
        };

        self.openModal = () => {
            var modalInstance = $modal.open({
                templateUrl: 'components/new-file-modal/new-file-modal.html',
                controller: 'NewFileModalCtrl',
                resolve: {
                    filename: () => { return 'features/'; },
                    title: () => { return 'Create New'; },
                    action: () => {
                        return new Files().createNew;
                    }
                }
            });

            modalInstance.result.then( dest => {
                $location.path('/' + dest.file);
            });
        };



        self.viewGif = active => {
            var modal = $modal.open({
                templateUrl: 'landing/gif.html',
                resolve: {
                    active: () => { return active; }
                },
                controller: viewGifController
            });
        };

        function viewGifController ($scope, active) {
            var sources = {
                feature: '/landing/new-feature.webm',
                set: '/landing/new-set.webm'
            };

            $scope.src = sources[active];
        }

    });
