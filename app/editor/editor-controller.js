'use strict';

angular.module('honeydew')
    .controller('EditorCtrl', [
        '$scope', '$stateParams', 'Files', 'debounce', '$location', 'cmAutocomplete', 'alerts',
        function ($scope, $stateParams, Files, debounce, $location, cmAutocomplete, alerts) {
            $scope.editorOptions = {
                lineWrapping : true,
                lineNumbers: true,
                styleActiveLine: true,
                theme: 'xq-light',
                mode: 'honeydew',
                extraKeys: {
                    'Ctrl-Space': 'autocomplete',
                    'F5': 'execute',
                    'Ctrl-/': 'toggleComment'
                },
                onLoad: function (cm) {
                    $scope.markClean = function () {
                        cm.markClean();
                    };

                    CodeMirror.commands.autocomplete = function (cm) {
                        CodeMirror.showHint(cm, CodeMirror.hint.honeydew);
                    };

                    CodeMirror.commands.execute = function (cm) {
                        $scope.jobs.executeJob();
                    };

                    CodeMirror.registerHelper("hint", "honeydew", cmAutocomplete.getHints);
                }
            };

            $scope.jobs = {};
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
                // the response to $save includes the file contents;
                // on response, it (sometimes?) updates file.contents
                // in the codemirror and messes up the undo history
                // and cursor position.
                var preserveCodeMirror = angular.copy($scope.file);
                preserveCodeMirror.$save().then(function (res) {
                    $scope.markClean();
                }).catch( function (res) {
                    alerts.addAlert(res);
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
                $scope.file.$delete();
            };

            $scope.copy = function( destination ) {
                $scope.copied = angular.copy($scope.file);
                $scope.copied.file = $scope.encode(destination);
                $scope.copied.$save().then( function (res) {
                    $location.path(res.file);
                });
            };

            $scope.move = function( destination ) {
                $scope.new = angular.copy($scope.file);
                $scope.new.file = $scope.encode(destination);
                $scope.new.$save().then( function (res) {
                    $scope.file.$delete();
                    $location.path(res.file);
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
        }]);
