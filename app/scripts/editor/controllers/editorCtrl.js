'use strict';

angular.module('honeydew')
    .controller('EditorCtrl', [
        '$scope',
        '$stateParams',
        'Files',
        'debounce',
        '$location',
        function ($scope, $stateParams, Files, debounce, $location) {
            $scope.editorOptions = {
                lineWrapping : true,
                lineNumbers: true,
                onLoad: function (cm) {
                    $scope.cm = cm;
                }
            };

            $scope.display = function ( file ) {
                $scope.undo = false;
                $scope.file = Files.get({file: $scope.encode(file)}, function (res) {
                    $scope.watchCodeMirror();
                }, function (res) {
                    $scope.create(file);
                });
            };

            $scope.create = function (file, contents) {
                if (typeof(contents) === 'undefined') {
                    contents = 'Feature: ';
                }

                $scope.file = new Files({
                    file: $scope.encode(file),
                    contents: contents
                });

                $scope.file.$save().then( function () {
                    $scope.watchCodeMirror();
                });
            };

            $scope.watchCodeMirror = function () {
                $scope.$watch('file.contents', debounce($scope.debouncedSave, 1234));
            };

            $scope.save = function() {
                $scope.file.$save().then(function (res) {
                    $scope.cm.markClean();
                }).catch( function (res) {
                });
            };

            $scope.debouncedSave = function ( newContents, oldContents ) {
                if (newContents !== oldContents && oldContents !== undefined) {
                    $scope.save();
                }
            };

            $scope.delete = function( ) {
                $scope.undo = true;
                $scope.undoFile = angular.copy($scope.file);
                $scope.file.delete();
            };

            $scope.copy = function( destination ) {
                $scope.copied = angular.copy($scope.file);
                $scope.copied.file = $scope.encode(destination);
                $scope.copied.$save().then( function (res) {
                    $location.path(res.file);
                });
            };

            $scope.move = function( destination, source ) {
                $scope.new = angular.copy($scope.file);
                $scope.new.$save().then( function (res) {
                    $scope.delete();
                    $location.path(res.file);
                }).catch( function (res) {

                });
            };

            $scope.encode = function ( file ) {
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
                $scope.undoFile.$save().then( function (res) {
                    $location.path(res.file);
                });
            };

            if ($stateParams.path) {
                // put feature contents in model if it's in URL
                $scope.filename = $stateParams.path;
                $scope.display($scope.filename);
            }

            $scope.panes = {
                "current-report": {
                    "name": "report",
                    "icon": "fa-list-alt"
                }
            };

            $scope.activePane = "";

            $scope.openPane = function (pane) {
                $scope.activePane = pane;
            };

            $scope.closePane = function () {
                $scope.activePane = "";
            };

            $scope.togglePane = function (pane) {
                if ($scope.activePane == pane) {
                    $scope.closePane();
                }
                else {
                    $scope.openPane(pane);
                }
                console.log($scope.activePane);
            };
        }]);
