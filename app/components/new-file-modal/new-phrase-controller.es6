'use strict';

angular.module('honeydew')
    .controller('NewPhraseCtrl', ($scope, $modalInstance, $location, Author, Files, alerts, filename, title, action) => {
        // filename, title, and action are manually injected when
        // opening the modal in editor-nav-directive.js. they are not
        // available for general DI.
        $scope.filename = filename;
        $scope.title = title;
        $scope.action = action;

        $scope.dest = {
            phrase: '',
            project: ''
        };

        $scope.isFormValid = () => {
            // expose the form validation errors on scope so we can
            // display appropriate error messages in the template

            var phrase = $scope.dest.phrase || '';
            var project = $scope.dest.project || '';

            if (phrase === '') {
                $scope.hasPhrase = false;
                $scope.phraseChars = true;
            }
            else {
                $scope.hasPhrase = phrase.length > 0;
                $scope.phraseChars = phrase.match(/^[0-9A-z_\-\. ']+$/);
            }

            if (project === '') {
                $scope.hasProject = false;
                $scope.projectChars = true;
            }
            else {
                $scope.hasProject = project.length > 0;
                $scope.projectChars = project.match(/^[A-z]*$/);
            }

            return $scope.hasPhrase && $scope.phraseChars && $scope.hasProject && $scope.projectChars;
        };

        var phraseToFilename = newPhrase => {
            if (!$scope.isFormValid()) {
                return '';
            }
            var phrase = newPhrase.phrase;
            var project = newPhrase.project;

            var title = phrase.replace(/[^A-z0-9_]/g, '_');

            return '/phrases/' + project + '/' + title + '.phrase';
        };

        $scope.updatePhrase = () => {
            $scope.newFilename = phraseToFilename($scope.dest);
        };

        $scope.ok = () => {
            var newPhrase = new Files({
                file: Files.encode($scope.newFilename),
                contents: [
                    'Phrase: ' + $scope.dest.phrase,
                    '',
                    ' '
                ].join("\n")
            });

            newPhrase.$save().then( res => {
                $modalInstance.close({ file: $scope.newFilename.replace(/^\//, '') });
            }).catch( res => {
                alerts.addAlert(res);
            });
        };

        $scope.cancel = () => {
            $modalInstance.dismiss('cancel');
        };
    });
