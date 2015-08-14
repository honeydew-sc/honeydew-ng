angular.module('honeydew')
    .controller('LandingCtrl', function ($scope, History, $modal, $location, Files) {
        var self = this;

        self.history = History.entries;

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

    });
