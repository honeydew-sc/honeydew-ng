'use strict';

angular.module('honeydew')
    .controller('EditorCtrl', function ($scope, $stateParams, Files, debounce, $location, cmAutocomplete, alerts, honeydewLint, $timeout, $localStorage, liveReport, filetree, CmDomHelpers, featureMode) {
        $scope.$storage = $localStorage;

        // put the tree on the scope so we can have
        // $scope.tree.collapse prop in the html template
        $scope.tree = filetree;

        CodeMirror.registerHelper('lint', 'honeydew', honeydewLint.linter);
        CodeMirror.registerHelper('hint', 'honeydew', cmAutocomplete.getHints);

        $scope.editorOptions = {
            lineWrapping : true,
            lineNumbers: true,
            styleActiveLine: true,
            mode: 'honeydew',
            lint: true,
            extraKeys: {
                'Ctrl-Space': 'jumpOrAutocomplete', // defined in autocomplete-service.js
                'Tab': 'jumpOrAutocomplete',
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
                        var matches = $scope.file.contents.match(/JIRA: (.*)/i);
                        return matches !== null ? matches[1] : '';
                    }
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

                CmDomHelpers.focus(cm, $scope);
                CmDomHelpers.clickableLinks($);
                CmDomHelpers.compileRenderedLines(cm, $scope);
            }
        };

        $scope.display = function ( file ) {
            $scope.file = Files.get({file: Files.encode(file)}, function (res) {
                $scope.watchCodeMirror();

                // this is pretty messy - the file itself should know
                // about 'markClean', but it depends on `cm`, which
                // isn't easy to get to when defining the File
                // model. so we crucially put it back on the file here
                // and just avert our eyes...
                Files.markClean = $scope.file.markClean = $scope.doc.markClean;
                $timeout( $scope.file.markClean, 1);
            }, function (res) {
                alerts.addAlert(res);
            });
        };

        $scope.watchCodeMirror = function () {
            $scope.stopWatching = $scope.$watch('file.contents', debounce($scope.file.debouncedSave.bind($scope.file), 1234));
        };

        if ($stateParams.path) {
            // put feature contents in model if it's in URL
            $scope.filename = $stateParams.path;
            $scope.display($scope.filename);
        }
    });
