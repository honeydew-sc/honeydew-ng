'use strict';

angular.module('honeydew')
    .directive('editorNav', ['$modal', '$log', '$location', 'Files', 'alerts', function ($modal, $log, $location, Files, alerts) {
        return {
            templateUrl: 'editor/editor-nav/editor-nav.html',
            scope: {
                filename: '@',
                control: '=',
                doc: '='
            },
            replace: true,
            restrict: 'E',
            link: function (scope, element, attrs) {
                scope.open = function (action) {
                    var modalInstance = $modal.open({
                        templateUrl: 'components/modal/modal.html',
                        controller: 'ModalInstanceCtrl',
                        resolve: {
                            filename: function () {
                                return scope.filename;
                            },
                            action: function () {
                                return action;
                            }
                        }
                    });

                    modalInstance.result.then(function (dest) {
                        $location.path('/' + dest.file);
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };

                scope.create = function (file, contents) {
                    if (typeof(contents) === 'undefined') {
                        contents = 'Feature: ';
                    }

                    scope.file = new Files({
                        file: Files.encode(file),
                        contents: contents
                    });

                    scope.file.$save().then( function () {
                        scope.watchCodeMirror();
                    });
                };

                scope.delete = function( ) {
                    scope.undo = true;
                    scope.undoFile = angular.copy(scope.file);
                    scope.file.$delete();
                };

                scope.copy = function( destination ) {
                    scope.copied = angular.copy(scope.file);
                    scope.copied.file = Files.encode(destination);
                    scope.copied.$save().then( function (res) {
                        $location.path(res.file);
                    });
                };

                scope.move = function( destination ) {
                    scope.new = angular.copy(scope.file);
                    scope.new.file = Files.encode(destination);
                    scope.new.$save().then( function (res) {
                        scope.file.$delete();
                        $location.path(res.file);
                    });
                };

                scope.canUndo = function () {
                    return scope.undo;
                };

                scope.undoDelete = function () {
                    scope.undoFile.$save().then( function (res) {
                        $location.path(res.file);
                    });
                };
            }
        };
    }]);
