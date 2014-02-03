'use strict';

var whee;
angular.module('honeydew')
    .controller('EditorCtrl', [
        '$scope',
        '$stateParams',
        'Files',
        function ($scope, $stateParams, Files) {
            $scope.editorOptions = {
                lineWrapping : true,
                lineNumbers: true
            };

            $scope.display = function (file) {
                $scope.undo = false;
                $scope.file = Files.get({file: $scope.resolveFilename(file)});
            };

            $scope.save = function( file, savedContents ) {
                $scope.undo = false;
                if (typeof(savedContents) === 'undefined') {
                    savedContents = $scope.file.contents;
                }

                Files.save({
                    file: $scope.resolveFilename(file),
                    contents: savedContents
                });
            };

            $scope.delete = function( file ) {
                $scope.undo = true;
                $scope.deletedObject = {
                    file: file,
                    contents: $scope.file.contents
                };

                Files.delete( {file: $scope.resolveFilename(file)} );
            };

            $scope.copy = function( destination ) {
                $scope.undo = false;
                $scope.save(destination);
            };

            $scope.move = function( destination, source ) {
                $scope.undo = false;
                Files.save( {
                    file: $scope.resolveFilename(destination),
                    contents: $scope.file.contents
                }, function (res) {
                    $scope.delete(source);
                });
            };

            $scope.resolveFilename = function ( file ) {
                if (typeof(file) === 'undefined') {
                    file = $scope.filename;
                }

                return encodeURIComponent(file);
            };

            $scope.canUndo = function () {
                return $scope.undo;
            };

            $scope.undoDelete = function () {
                $scope.save( $scope.deletedObject.file, $scope.deletedObject.contents );
            };

            if ($stateParams.path) {
                // put feature contents in model if it's in URL
                $scope.filename = $stateParams.path;
                $scope.display($scope.filename);
            }

            whee = $scope;
        }]);
