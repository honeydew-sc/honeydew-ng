angular.module('honeydew')
    .controller('NewFileModalCtrl', function ($scope, $modalInstance, $location, filename, Author, Files, alerts, title, action) {
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
            var file = $scope.dest.file || '';

            if (file === '') {
                $scope.noSpecialChars = true;
                $scope.hasProperExtension = false;
                $scope.inProperFolder = '';
            }
            else {
                var folder = file.match(/^(feature|phrase|set)/);
                if (folder) {
                    $scope.inProperFolder = folder[0];
                }
                else {
                    $scope.inProperFolder = '';
                }
                $scope.hasProperExtension = file.match(/^(feature|phrase|set)s\/.+\.\1$/);
                $scope.noSpecialChars = file.match(/^[0-9a-zA-Z_\-\.\/]+$/);
            }

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
