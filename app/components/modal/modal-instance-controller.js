'use strict';

angular.module('honeydew')
    .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'filename', 'Author', 'Files', 'alerts', 'action', function ($scope, $modalInstance, filename, Author, Files, alerts, action) {
        $scope.filename = filename;
        $scope.action = action;

        $scope.dest = {
            file: filename.split('/').slice(0, -1).join('/') + '/'
        };

        Author.get().$promise.then( function (res) {
            $scope.dest.author = res.user;
        });

        $scope.ok = function () {
            var newFile = new Files({
                file: Files.encode($scope.dest.file),
                contents: [
                    'Feature:',
                    '',
                    'JIRA: ' + $scope.dest.jira,
                    '# Email: ' + $scope.dest.author + '@sharecare.com',
                    '',
                    ' Scenario: ' + $scope.dest.jira
                ].join("\n")
            });

            newFile.$save().then( function (res) {
                $modalInstance.close($scope.dest);
            }).catch( function (res) {
                alerts.addAlert(res);
            });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);
