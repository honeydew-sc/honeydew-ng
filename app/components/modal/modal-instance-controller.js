'use strict';

angular.module('honeydew')
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, $location, filename, Author, Files, alerts, title, action) {
        $scope.filename = filename;
        $scope.title = title;
        $scope.action = action;
        $scope.permalink = 'https://honeydew.be.jamconsultg.com/#' + $location.path();

        $scope.dest = {
            file: filename.split('/').slice(0, -1).join('/') + '/'
        };

        $scope.isFormValid = function () {
            return $scope.isValidFilename() && $scope.dest.author;
        };

        $scope.isValidFilename = function () {
            $scope.inProperFolder = $scope.dest.file.match(/^(feature|phrase|set)/);
            $scope.hasProperExtension = $scope.dest.file.match(/^(feature|phrase|set)s\/.+\.\1$/);
            $scope.noSpecialChars = $scope.dest.file.match(/^[0-9a-zA-Z_\-\.\/]+$/);

            return $scope.hasProperExtension && $scope.noSpecialChars;
        };

        Author.get().$promise.then( function (res) {
            $scope.dest.author = res.user;
        });

        $scope.ok = function () {
            action($scope.dest).then( function (res) {
                $modalInstance.close($scope.dest);
            }).catch( function (res) {
                alerts.addAlert(res);
            });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
