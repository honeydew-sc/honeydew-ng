'use strict';

angular.module('honeydew')
    .service('honeydewLint', function (cmAutocomplete) {
        var honeydewLintService = {
            found: [],

            linter: function(text) {
                honeydewLintService.found = [];
                text.split("\n").map( function ( line, index ) {
                    if (/^ +(?:Given|When|Then)/.test(line)) {
                        if (/\(\.\*\)/.test(line)) {
                            honeydewLintService.addSyntaxError(line, index, 'The (.*) is just a placeholder; you should probably fill it in! Move your cursor to this line and press Ctrl-Space to jump to it automatically! :)');
                        }
                        else if (!honeydewLintService.isAPhrase(line) && !honeydewLintService.isARule(line)) {
                            honeydewLintService.addSyntaxError(line, index, '[' + line.trim() + '] doesn\'t seem to be a valid rule...');
                        }
                    }
                });

                return honeydewLintService.found;
            },

            addSyntaxError: function (line, index, msg) {
                var indentation = line.match(/(^\s+)/);
                honeydewLintService.found.push({
                    from: CodeMirror.Pos(index, indentation[0].length),
                    to: CodeMirror.Pos(index, line.length),
                    message: msg
                });
            },

            isAPhrase: function (line) {
                return cmAutocomplete.phrases.indexOf(line.trim()) > -1;
            },

            isARule: function( line ) {
                return cmAutocomplete.regexRules.some(function (rule) {
                    // rule is the regexp we're trying against - we
                    // try each candidate against every rule
                    var ruleReg = RegExp(
                        rule.trim().replace(/\$/g, "\\$")
                        , "i");

                    // `this` refers to the candidate line of text
                    return ruleReg.test(this);
                }, line.replace(/ and do not end$/, ""));
            }

        };

        return honeydewLintService;
    });
