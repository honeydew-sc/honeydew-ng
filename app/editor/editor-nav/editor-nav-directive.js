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
                            title: function () {
                                return action;
                            },
                            action: function () {
                                return scope.fileActions[action];
                            }
                        }
                    });

                    modalInstance.result.then(function (dest) {
                        $location.path('/' + dest.file);
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };

                scope.fileActions = {
                    'Create New': function (destination) {
                        destination.jira = typeof(destination.jira) === 'undefined' ? '' : destination.jira;
                        var newFile = new Files({
                            file: Files.encode(destination.file),
                            contents: [
                                'Feature:',
                                '',
                                'JIRA: ' + destination.jira,
                                '# Email: ' + destination.author + '@sharecare.com',
                                '',
                                ' Scenario: ' + destination.jira
                            ].join("\n")
                        });

                        return newFile.$save();
                    }
                };

                // scope.delete = function( ) {
                //     scope.undo = true;
                //     scope.undoFile = angular.copy(scope.file);
                //     scope.file.$delete();
                // };

                // scope.copy = function( destination ) {
                //     scope.copied = angular.copy(scope.file);
                //     scope.copied.file = Files.encode(destination);
                //     scope.copied.$save().then( function (res) {
                //         $location.path(res.file);
                //     });
                // };

                // scope.move = function( destination ) {
                //     scope.new = angular.copy(scope.file);
                //     scope.new.file = Files.encode(destination);
                //     scope.new.$save().then( function (res) {
                //         scope.file.$delete();
                //         $location.path(res.file);
                //     });
                // };

                // scope.canUndo = function () {
                //     return scope.undo;
                // };

                // scope.undoDelete = function () {
                //     scope.undoFile.$save().then( function (res) {
                //         $location.path(res.file);
                //     });
                // };
            }
        };
    }]);
