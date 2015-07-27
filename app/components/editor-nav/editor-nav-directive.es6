'use strict';

angular.module('honeydew')
    .directive('editorNav', function ($modal, $log, $location, $localStorage, $window, Files, alerts, filetree) {
        return {
            templateUrl: 'components/editor-nav/editor-nav.html',
            scope: {
                filename: '@',
                control: '=',
                doc: '=',
                file: '=',
                stopWatching: '='
            },
            replace: true,
            restrict: 'E',
            link: function (scope, element, attrs) {
                scope.$storage = $localStorage;
                scope.tree = filetree;

                scope.isSet = $location.path().match(/sets\/.*\.set/);

                // for the 'Other Locations' dropdown in the top
                // right, we need to take care of properly setting the
                // protocol
                if ($location.host().match('honeydew.be')) {
                    scope.base = 'https://honeydew.be.jamconsultg.com';
                }
                else {
                    scope.base = 'http://localhost';
                }

                scope.go = function ( destination ) {
                    $window.open(scope.base + destination);
                };

                scope.open = function ( action ) {
                    if (action === 'CopyTemp') {
                        scope.file.tmpCopy();
                    }
                    else {
                        var todo = scope.fileActions[action];

                        var modalInstance = $modal.open({
                            templateUrl: todo.template,
                            controller: todo.controller,
                            resolve: {
                                filename: function () {
                                    return scope.filename;
                                },
                                title: function () {
                                    return action;
                                },
                                action: function () {
                                    return todo.cb;
                                }
                            }
                        });

                        modalInstance.result.then(function (dest) {
                            $location.path('/' + dest.file);
                        });
                    }
                };

                scope.fileActions = {
                    'Create New': {
                        template: 'components/new-file-modal/new-file-modal.html',
                        controller: 'NewFileModalCtrl',
                        cb: function ( destination ) {
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

                            filetree.addLeaf(destination.file);
                            return newFile.$save();
                        }
                    },

                    'New Phrase': {
                        template: 'components/new-file-modal/new-phrase.html',
                        controller: 'NewPhraseCtrl',
                        cb: function ( phrase ) { }
                    },

                    'Copy': {
                        template: 'components/new-file-modal/new-file-modal.html',
                        controller: 'NewFileModalCtrl',
                        cb: function ( destination ) {
                            return scope.file.copy(destination.file);
                        }
                    },

                    'Move': {
                        template: 'components/new-file-modal/new-file-modal.html',
                        controller: 'NewFileModalCtrl',
                        cb: function ( destination ) {
                            return scope.file.move(destination.file);
                        }
                    },

                    'Delete': {
                        template: 'components/new-file-modal/new-file-modal.html',
                        controller: 'NewFileModalCtrl',
                        cb: function () {
                            scope.$storage.undoFile = angular.copy(scope.file);
                            if (scope.stopWatching) {
                                scope.stopWatching();
                            }
                            scope.file.delete().then(function (res) {
                                res = res || {};
                                res.notes = scope.filename + " has been deleted";
                                alerts.addAlert(res, 3000);
                                filetree.deleteLeaf(scope.filename);
                            });
                            $location.path('/');
                        }
                    }
                };

                scope.undoDelete = function () {
                    var restore = new Files(scope.$storage.undoFile);
                    restore.$save().then( function (res) {
                        scope.$storage.undoFile = '';
                        var path = decodeURIComponent(decodeURIComponent(res.file));
                        filetree.addLeaf(path);
                        $location.path(path);
                    });
                };
            },
            controller: ($scope, $localStorage) => {
                $scope.settings = $localStorage.settings;
            }
        };
    });
