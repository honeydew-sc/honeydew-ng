'use strict';

angular.module('honeydew')
    .controller('FeatureCtrl', [
        '$scope',
        '$routeParams',
        function ($scope, $routeParams) {

            $scope.display = function( file ) {
                // $scope.contents = file;
                $scope.feature = Files.get( { file: encodeURIComponent(file) }, function (res) {
                    $scope.contents = res.contents;
                });
            };

            // put feature contents in model if it's in URL
            if ($routeParams.feature) {
                $scope.display($routeParams.feature);
            }
        }]);
