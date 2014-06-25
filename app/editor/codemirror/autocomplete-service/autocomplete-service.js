'use strict';

angular.module('honeydew')
    .service('cmAutocomplete', function ($resource, $http, alerts, Tree) {
        CodeMirror.commands.jumpOrAutocomplete = function (cm) {
            if (!CodeMirror.commands.jumpCursor(cm)) {
                CodeMirror.showHint(cm, CodeMirror.hint.honeydew);
            }
        };

        var preambleHints = [
            'Existing Bug: ',
            'Set: ',
            'Proxy',
            'Email: ',
            'Subtitles: ',
            'Keep Open',
            'JIRA: ',
            'Scenario: '
        ];

        String.prototype.repeat = function( num ) {
            return new Array( num + 1 ).join( this );
        };

        var autocompleteService = {
            getHints:  function (cm) {
                var cur = cm.getCursor(),
                    token = cm.getTokenAt(cur),
                    needle = cm.getLine(cur.line),
                    end = needle.length,

                    indent = 1,
                    // our completion replaces the entire line with
                    // the needle (if found)
                    completionObject = {
                        from: CodeMirror.Pos(cur.line, 0),
                        to: CodeMirror.Pos(cur.line, end)
                    },
                    completionBackend;

                if (token.state.allowSets) {
                    // Autocompleting a set name should only replace
                    // the token, instead of the entire line.
                    completionObject = {
                        from: CodeMirror.Pos(cur.line, token.start),
                        to: CodeMirror.Pos(cur.line, token.end)
                    };
                    completionBackend = autocompleteService.getSets();
                    needle = token.string;
                }
                else if (token.state.allowPreamble) {
                    indent = 0;  // preamble items need no indentation
                    completionBackend = autocompleteService.getPreamble();
                }
                else {
                    completionBackend = autocompleteService.getSteps();
                }

                var result = completionBackend.filter( function (it) {
                    return it.toLowerCase().search(needle.toLowerCase().trim()) !== -1;
                }).map( function (it) {
                    if (it.indexOf('Scenario') === 0) {
                        indent = 1;
                    }
                    else if (it.indexOf('When') === 0) {
                        indent = 3;
                    }
                    else if (it.indexOf('Then') === 0) {
                        indent = 5;
                    }

                    var completion = {
                        text: ' '.repeat(indent) + it,
                        displayText: it
                    };

                    return completion;
                });

                completionObject.list = result && result.length ? result : [];

                CodeMirror.on(completionObject, "close", function () {
                    var found = cm.getLine(cur.line);
                    if (found.indexOf('(.*)') !== -1) {
                        alerts.addAlert({
                            type: 'info',
                            msg: 'Nice work on the auto complete :D Try pressing Ctrl-Space again to select the (.*), and then fill it in!'
                        }, 7500);
                    }
                });

                return completionObject;
            },

            getPreamble: function () {
                return autocompleteService.preamble;
            },

            getSteps: function () {
                return autocompleteService.validSteps;
            },

            getSets: function () {
                return autocompleteService.sets;
            },

            populateAutocompleteSources: function () {
                Tree.get({ folder: 'sets' }, function (res)  {
                    autocompleteService.sets = res.tree.map( function (it) {
                        return '@' + it.label.replace(/\.set$/, '');
                    });
                });

                return $http.get('/rest.php/autocomplete').success(function (res) {
                    autocompleteService.phrases = res.phrases;
                    autocompleteService.suggestRules = res.suggestRules;
                    autocompleteService.regexRules = res.regexRules;
                    autocompleteService.preamble = preambleHints;
                    autocompleteService.validSteps = res.suggestRules.concat(res.phrases);
                });
            }
        };

        autocompleteService.populateAutocompleteSources();

        return autocompleteService;
    });
