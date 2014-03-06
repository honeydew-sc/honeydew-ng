'use strict';

var whee;
angular.module('honeydew')
    .service('honeydewLint', function (cmAutocomplete) {
        whee = cmAutocomplete;
        var honeydewLintService = {
            linter: function(text) {
                var found = [];
                var str = 'hello';
                text.split("\n").map( function ( line, index ) {
                    if (/^ +(?:Given|When|Then)/.test(line)) {
                        if (!honeydewLintService.isAPhrase(line) && !honeydewLintService.isARule(line)) {
                            var indentation = line.match(/(^\s+)/);
                            found.push({
                                from: CodeMirror.Pos(index, indentation[0].length),
                                to: CodeMirror.Pos(index, line.length),
                                message: '[' + line.trim() + '] doesn\'t seem to be a valid rule...'
                            });
                        }
                    }
                });

                return found;
            },

            isAPhrase: function (line) {
                return cmAutocomplete.phrases.indexOf(line.trim()) > -1;
            },

            isARule: function( line ) {
                return cmAutocomplete.regexRules.some(function (rule) {
                    // rule is the regexp we're trying against - we
                    // try each candidate against every rule
                    var ruleReg = RegExp(rule.trim()
                                         .replace(/([dw]\+)/g, "\\$1")
                                         .replace(/\$/g, "\\$"), "i");

                    // `this` refers to the candidate line of text
                    return ruleReg.test(this);
                }, line.replace(/ and do not end$/, ""));
            }

        };

        return honeydewLintService;
    });
