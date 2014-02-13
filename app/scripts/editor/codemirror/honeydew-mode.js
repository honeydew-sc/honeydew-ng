/*
 Gherkin mode - http://www.cukes.info/
 Report bugs/issues here: https://github.com/marijnh/CodeMirror/issues
 */

// Following Objs from Brackets implementation: https://github.com/tregusti/brackets-gherkin/blob/master/main.js
//var Quotes = {
//  SINGLE: 1,
//  DOUBLE: 2
//};

//var regex = {
//  keywords: /(Feature| {2}(Scenario|In order to|As|I)| {4}(Given|When|Then|And))/
//};

CodeMirror.defineMode("honeydew", function () {
    return {
        startState: function () {
            return {
                lineNumber: 0,
                tableHeaderLine: false,
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

            // LINE COMMENT
            if (stream.match(/#.*/)) {
                return "comment";

                // FEATURE
            } else if (!state.inKeywordLine && state.allowFeature && stream.match(/Feature:/)) {
                state.allowFeature = false;
                state.allowScenario = true;
                state.allowPreamble = true;
                state.allowPlaceholders = false;
                state.allowSteps = false;
                state.allowMultilineArgument = false;
                state.inKeywordLine = true;
                return "keyword";

                // EXAMPLES
            } else if (state.allowScenario && stream.match(/Examples:/)) {
                state.allowPlaceholders = false;
                state.allowSteps = true;
                state.allowPreamble = false;
                state.allowMultilineArgument = true;
                return "keyword";

                // SCENARIO
            } else if (!state.inKeywordLine && state.allowScenario && stream.match(/Scenario:/)) {
                state.allowPlaceholders = false;
                state.allowSteps = true;
                state.allowPreamble = false;
                state.allowMultilineArgument = false;
                state.inKeywordLine = true;
                return "keyword";

                // STEPS
            } else if (!state.inKeywordLine && state.allowSteps && stream.match(/Given|When|Then/)) {
                state.inStep = true;
                state.allowPlaceholders = true;
                state.allowMultilineArgument = true;
                state.inKeywordLine = true;
                return "keyword";

                // INLINE STRING
            } else if (stream.match(/"[^"]*"?/)) {
                return "string";

                // PLACEHOLDER
            } else if (state.allowPlaceholders && stream.match(/<[^>]*>?/)) {
                return "variable";

            } else if (state.allowPlaceholders && stream.match(/\$[^\s]+/)) {
                return "variable";

                // Fall through
            } else {
                stream.next();
                stream.eatWhile(/[^$"<#]/);
                return null;
            }
        }
    };
});

CodeMirror.defineMIME("text/x-feature", "honeydew");
