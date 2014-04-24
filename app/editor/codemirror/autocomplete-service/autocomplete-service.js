'use strict';

angular.module('honeydew')
    .service('cmAutocomplete', function ($resource, $http) {
        var preambleHints = [
            'Existing Bug: ',
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
                var cur = cm.getCursor();
                var token = cm.getTokenAt(cur);
                var needle = cm.getLine(cur.line);
                var end = needle.length;

                var completionBackend, indent;
                if (token.state.allowPreamble) {
                    completionBackend = autocompleteService.getPreamble();
                    indent = 0;
                }
                else {
                    completionBackend = autocompleteService.getSteps();
                    indent = 1;
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

                var completionObject = {
                    list: result && result.length ? result : [],
                    from: CodeMirror.Pos(cur.line, 0),
                    to: CodeMirror.Pos(cur.line, end)
                };

                return completionObject;
            },

            getPreamble: function () {
                return autocompleteService.preamble;
            },

            getSteps: function () {
                return autocompleteService.validSteps;
            },

            populateAutocompleteSources: function () {
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
