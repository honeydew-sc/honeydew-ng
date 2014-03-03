/*
 Gherkin mode - http://www.cukes.info/
 Report bugs/issues here: https://github.com/marijnh/CodeMirror/issues
 */
CodeMirror.defineMode("honeydew", function () {
    return {
        lineComment: '#',
        startState: function () {
            return {
                lineNumber: 0,
                tableHeaderLine: false,
                inCommentLine: false,
                allowFeature: true,
                allowPreamble: false,
                allowScenario: false,
                allowSteps: false,
                allowPlaceholders: false,
                allowMultilineArgument: false,
                inMultilineTable: false,
                inKeywordLine: false
            };
        },
        token: function (stream, state) {
            if (stream.sol()) {
                state.lineNumber++;
                state.inKeywordLine = false;
                state.inCommentLine = stream.match(/^\s*#.*/);

                if (state.inMultilineTable) {
                    state.tableHeaderLine = false;
                    if (!stream.match(/\s*\|/, false)) {
                        state.allowMultilineArgument = false;
                        state.inMultilineTable = false;
                    }
                }
            }

            stream.eatSpace();

            if (state.allowMultilineArgument) {
                // TABLE
                if (state.inMultilineTable) {
                    if (stream.match(/\|\s*/)) {
                        return "bracket";
                    } else {
                        stream.match(/[^\|]*/);
                        return state.tableHeaderLine ? "header" : "string";
                    }
                }

                // DETECT START
                if (stream.match("|")) {
                    // Table
                    state.inMultilineTable = true;
                    state.tableHeaderLine = true;
                    return "bracket";
                }

            }

            stream.proceed = function () {
                stream.next();
                // this eatWhile will consume everything in the rest
                // of the line except for the characters here, so if
                // we want to highlight new things in the middle of
                // the line, we need to put their starting characters
                // in here
                stream.eatWhile(/[^$"'<#h]/);
            };

            stream.isComment = function () {
                return this.indentation() === 0;
            };


            // LINE COMMENT
            if (state.inCommentLine) {
                return "comment";
            }
            else if (state.allowSteps && stream.isComment()) {
                // since we're not consuming anything with a call to
                // .match, we need to push the stream along manually,
                // or else it'll check the same line forever
                stream.proceed();
                return "comment";
            }
            // FEATURE
            else if (!state.inKeywordLine && state.allowFeature && stream.match(/Feature:/)) {
                state.allowFeature = false;
                state.allowScenario = true;
                state.allowPreamble = true;
                state.allowPlaceholders = true;
                state.allowSteps = false;
                state.allowMultilineArgument = false;
                state.inKeywordLine = true;
                return "keyword";
            }
            // EXAMPLES
            else if (state.allowScenario && stream.match(/Examples:/)) {
                state.allowPlaceholders = false;
                state.allowSteps = true;
                state.allowPreamble = false;
                state.allowMultilineArgument = true;
                return "keyword";
            }
            // SCENARIO
            else if (!state.inKeywordLine && state.allowScenario && stream.match(/(only|skip)? ?Scenario:/i)) {
                state.allowPlaceholders = false;
                state.allowSteps = true;
                state.allowPreamble = false;
                state.allowMultilineArgument = false;
                state.inKeywordLine = true;
                var type = "keyword";
                if (stream.isComment()) {
                    type += " comment";
                }
                return type;
            }
            // STEPS
            else if (!state.inKeywordLine && state.allowSteps && stream.match(/Given|When|Then/)) {
                state.inStep = true;
                state.allowPlaceholders = true;
                state.allowMultilineArgument = true;
                state.inKeywordLine = true;
                return "keyword";
            }
            // INLINE STRING
            else if (stream.match(/"[^"]*"?/) || stream.match(/ '[^']*' /)) {
                return "string";
            }
            // PLACEHOLDER
            else if (state.allowPlaceholders && stream.match(/<[^>]*>?/)) {
                return "variable";
            }
            else if (state.allowPlaceholders && stream.match(/\$[^\s]+/)) {
                return "variable";
            }
            // CLICKABLE LINKS
            else if (stream.match(/^https?:\/\/[^\s]*/)) {
                return "clickable-link";
            }
            // FALL THROUGH
            else {
                stream.proceed();
                return null;
            }
        }
    };
});

CodeMirror.defineMIME("text/x-feature", "honeydew");
