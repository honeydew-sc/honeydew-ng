'use strict';

angular.module('honeydew')
    .controller('EditorCtrl', [
        '$scope',
        '$stateParams',
        'Files',
        'debounce',
        '$window',
        function ($scope, $stateParams, Files, debounce, $window) {
            $scope.editorOptions = {
                lineWrapping : true,
                lineNumbers: true,
                onLoad: function (cm) {
                    $scope.cm = cm;
                }
            };

            $scope.display = function ( file ) {
                $scope.undo = false;
                $scope.file = Files.get({file: $scope.resolveFilename(file)});
                $scope.$watch('file.contents', debounce($scope.debouncedSave, 1234));
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

            $scope.debouncedSave = function ( newContents, oldContents ) {
                if (newContents !== oldContents && oldContents !== undefined) {
                    $scope.save($scope.filename, newContents);
                }
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
                // ngResource encodes the slashes to %2F. Apache needs
                // 'AllowEncodedSlashes' set to true, but we have no
                // permissions for that. Double encoding the url gets
                // past the Apache issue; Slim decodes one level, so
                // we just have to decode once in the Slim app.
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
        }]);
