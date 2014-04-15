'use strict';

angular.module('honeydew')
    .controller('EditorCtrl', function ($scope, $stateParams, Files, debounce, $location, cmAutocomplete, alerts, honeydewLint, $timeout, $localStorage, liveReport) {
        $scope.$storage = $localStorage;

        CodeMirror.registerHelper('lint', 'honeydew', honeydewLint.linter);
        CodeMirror.registerHelper('hint', 'honeydew', cmAutocomplete.getHints);

        $scope.editorOptions = {
            lineWrapping : true,
            lineNumbers: true,
            styleActiveLine: true,
            mode: 'honeydew',
            lint: true,
            extraKeys: {
                'Ctrl-Space': 'autocomplete',
                'Cmd-Enter': 'repl',
                'Alt-Enter': 'repl',
                'Cmd-Esc': 'quitRepl',
                'Alt-Esc': 'quitRepl',
                'F5': 'execute',
                'Ctrl-/': 'toggleComment',
                'Cmd-/': 'toggleComment',
                'Ctrl-Z': 'undo',
                'Ctrl-Y': 'redo'
            },
            onLoad: function (cm) {
                // no need to hint the startup FAQ page
                if (/test\/FAQ\.feature/.test($location.path())) {
                    cm.setOption('lint', false);
                }

                $scope.editorOptions.refresh = function () {
                    $timeout(function () {
                        cm.refresh();
                    }, 1);
                };

                $scope.doc = {
                    redo: function () {
                        cm.redo();
                    },

                    undo: function () {
                        cm.undo();
                    },

                    markClean: function () {
                        cm.markClean();
                    },

                    isDirty: function () {
                        return !cm.isClean();
                    },

                    keyMap: CodeMirror.keyMap.default,

                    jira: function () {
                        var matches = $scope.file.contents.match(/JIRA: (.*)/);
                        return matches !== null ? matches[1] : '';
                    }
                };

                CodeMirror.commands.autocomplete = function (cm) {
                    CodeMirror.showHint(cm, CodeMirror.hint.honeydew);
                };

                CodeMirror.commands.repl = function (cm) {
                    var rule = cm.getLine(cm.getCursor().line);
                    liveReport.evalRule(rule);
                };

                CodeMirror.commands.quitRepl = liveReport.close;

                // 'jobs' gets passed through two directives in
                // attributes down to the jobOptions directive, where
                // executeJob is defined.
                $scope.jobs = {};
                CodeMirror.commands.execute = function (cm) {
                    $scope.jobs.executeJob();
                };

                // sorry. for whatever reason, the dropdown
                // retains the open class when clicking into the
                // codemirror. Seems like CM swallows the click or
                // something; clicking on not CM parts of the page
                // hide the dropdown just fine.
                cm.on('focus', function (cm) {
                    document.querySelectorAll('.file-nav-dropdown')[0]
                        .classList.remove('open');
                });

                // :( I don't know why, but a directive
                // with restrict: 'C' wasn't picking up on these spans
                // when added by the mode highlighter. Manually
                // $apply()ing and $digest()ing didn't seem to make a
                // difference
                $('.CodeMirror').on('click', '.cm-clickable-link', function(event) {
                    var url;
                    url = $(event.target).text();
                    if (url.indexOf('http') !== 0) {
                        url = 'http://' + url;
                    }
                    return window.open(url, '_blank');
                });
            }
        };


        $scope.display = function ( file ) {
            $scope.file = Files.get({file: Files.encode(file)}, function (res) {
                $scope.watchCodeMirror();
                $timeout( $scope.doc.markClean, 1);
            }, function (res) {
                alerts.addAlert(res);
            });
        };

        $scope.watchCodeMirror = function () {
            $scope.stopWatching = $scope.$watch('file.contents', debounce($scope.debouncedSave, 1234));
        };

        $scope.save = function() {
            if ($scope.file.contents === "") {
                alerts.addAlert({data: {reason: "Cowardly refusing to save an empty file. Sorry!"}});
            }
            else {
                // the response to $save includes the file contents;
                // on response, it (sometimes?) updates file.contents
                // in the codemirror and messes up the undo history
                // and cursor position.
                var preserveCodeMirror = angular.copy($scope.file);
                preserveCodeMirror.$save().then(function (res) {
                    $scope.doc.markClean();
                }).catch( function (res) {
                    alerts.addAlert(res);
                });
            }
        };

        $scope.debouncedSave = function ( newContents, oldContents ) {
            if (newContents !== oldContents && oldContents !== undefined) {
                $scope.save();
            }
        };

        if ($stateParams.path) {
            // put feature contents in model if it's in URL
            $scope.filename = $stateParams.path;
            $scope.display($scope.filename);
        }
    });
