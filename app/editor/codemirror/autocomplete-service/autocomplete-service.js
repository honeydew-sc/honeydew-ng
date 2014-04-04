'use strict';

angular.module('honeydew')
    .service('cmAutocomplete', function ($resource, $http) {
        var autocompleteService = {
            getHints:  function (cm) {
                var cur = cm.getCursor();
                var token = cm.getTokenAt(cur);
                var line = cm.getLine(cur.line);
                var start = token.start;
                var end = token.end;
                var word = line;

                var source;

                if (token.state.allowPreamble) {
                    source = autocompleteService.getPreamble();
                    start = 0;
                }
                else {
                    source = autocompleteService.getSteps();
                    start = 1;
                }

                var result = source.filter( function (it) {
                    return it.toLowerCase().search(word.toLowerCase().trim()) !== -1;
                });

                return {
                    list: result && result.length ? result : [],
                    from: CodeMirror.Pos(cur.line, start),
                    to: CodeMirror.Pos(cur.line, end)
                };
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
                    autocompleteService.preamble = res.preambleHints;
                    autocompleteService.validSteps = res.suggestRules.concat(res.phrases);
                });
            }
        };

        autocompleteService.populateAutocompleteSources();

        return autocompleteService;
    });
