'use strict';

angular.module('honeydew')
    .controller('FileActionCtrl', ['$scope', '$modal', '$log', function ($scope, $modal, $log) {

        $scope.open = function () {
            var modalInstance = $modal.open({
                templateUrl: 'views/fileActions.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    }]);
