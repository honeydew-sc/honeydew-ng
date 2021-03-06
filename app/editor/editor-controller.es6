angular.module('honeydew')
    .controller('EditorCtrl', function ($scope, $stateParams, $cacheFactory, Files, debounce, autocomplete, alerts, honeydewLint, $timeout, $localStorage, liveReport, filetree, CmDomHelpers, featureMode, $location, History) {
        $scope.$storage = $localStorage;

        // put the tree on the scope so we can have
        // $scope.tree.collapse prop in the html template
        $scope.tree = filetree;

        CodeMirror.registerHelper('lint', 'honeydew', honeydewLint.linter);
        CodeMirror.registerHelper('hint', 'honeydew', autocomplete.getHints);

        let isMac = /Mac/.test(navigator.platform);
        let saveCurrentFile = () => {
            return debounce($scope.file.debouncedSave.bind($scope.file), 1234);
        };

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
                'Ctrl-Y': 'redo',
                'Ctrl-A': isMac ? 'goLineStartSmart' : 'selectAll',
                'Cmd-S': 'manualSave',
                'F8': 'stepOver',
                'F9': 'quitRepl'
            },
            onLoad: function (cm) {
                $scope.editorOptions.refresh = function () {
                    $timeout(function () {
                        // force a fullText re-highlighting by
                        // resetting the mode
                        cm.setOption('mode', 'honeydew');

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
                        var matches = $scope.file.contents.match(/\nJIRA: (.*)/i);
                        return matches !== null ? matches[1] : '';
                    }
                };

                CodeMirror.commands.repl = function (cm) {
                    var rule = cm.getLine(cm.getCursor().line);
                    liveReport.evalRule(rule);
                };

                CodeMirror.commands.gotoNextLine = cm => {
                    console.log('hi going to next line');
                    let current = cm.getCursor();
                    let nextLine = Object.assign(current, {
                        line: current.line + 1
                    });

                    cm.setCursor(nextLine);
                };

                CodeMirror.commands.stepOver = cm => {
                    CodeMirror.commands.repl(cm);
                    CodeMirror.commands.gotoNextLine(cm);
                };

                CodeMirror.commands.quitRepl = liveReport.close;

                CodeMirror.commands.execute = function (cm) {
                    $scope.$broadcast('job:execute');
                };

                CodeMirror.commands.manualSave = () => {
                    if (isMac) {
                        (saveCurrentFile(true))();
                    }
                };

                CmDomHelpers.focus(cm, $scope);
                CmDomHelpers.compileRenderedLines(cm, $scope);
            }
        };

        // TODO: put this somewhere way better than here. like in the
        // files factory.
        var clearCache = cache => {
            cache.get('$http').removeAll();
        };

        $scope.display = function ( file ) {
            clearCache($cacheFactory);
            $scope.file = Files.getCached({file: Files.encode(file)}, function (res) {
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
            $scope.stopWatching = $scope.$watch('file.contents', saveCurrentFile());
        };

        if ($stateParams.path) {
            // put feature contents in model if it's in URL
            $scope.filename = $stateParams.path;
            $scope.display($scope.filename);
        }

        (function listenForFileCommits() {
            $scope.$on('file:commit', function (event, data) {
                var file = angular.copy($scope.file);
                file.msg = $scope.doc.jira();

                file.$commit().then(function (res) {
                    alerts.addAlert(res, 1000);
                })
                    .catch(function (res) {
                        alerts.addAlert(res);
                    });
            });
        })();

        (function listenForCodemirrorRedraws() {
            $scope.$on('codemirror:refresh', function () {
                $scope.editorOptions.refresh();
            });
        })();

        History.addCurrentLocation();
    });
