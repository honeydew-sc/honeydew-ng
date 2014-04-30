'use strict';

angular.module('honeydew')
    .directive('editorNav', function ($modal, $log, $location, $localStorage, Files, alerts, filetree) {
        return {
            templateUrl: 'editor/editor-nav/editor-nav.html',
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

                scope.default = 'features/test/FAQ.feature';
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
                    },

                    'Delete': function () {
                        scope.$storage.undoFile = angular.copy(scope.file);
                        scope.stopWatching();
                        scope.file.$delete().then(function (res) {
                            res.notes = scope.filename + " has been deleted";
                            alerts.addAlert(res, 3000);
                        });
                        $location.path(scope.default);
                    }
                };

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

                scope.undoDelete = function () {
                    var restore = new Files(scope.$storage.undoFile);
                    restore.$save().then( function (res) {
                        scope.$storage.undoFile = '';
                        $location.path('//' + decodeURIComponent(decodeURIComponent(res.file)) );
                    });
                };
            }
        };
    });
