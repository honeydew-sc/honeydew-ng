'use strict';

angular.module('honeydew')
    .controller('ModalInstanceCtrl', [
        '$scope', '$modalInstance', 'filename', 'Author', 'Files', 'alerts', 'title', 'action',
        function ($scope, $modalInstance, filename, Author, Files, alerts, title, action) {
            $scope.filename = filename;
            $scope.title = title;
            $scope.action = action;

            $scope.dest = {
                file: filename.split('/').slice(0, -1).join('/') + '/'
            };

            $scope.isFormValid = function () {
                return $scope.isValidFilename() && $scope.dest.author;
            };

            $scope.isValidFilename = function () {
                return $scope.dest.file.match(/^(feature|phrase|set)s\/.*\.\1$/);
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
        }]);
