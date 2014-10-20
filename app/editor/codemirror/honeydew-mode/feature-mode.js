/*
 Gherkin mode - http://www.cukes.info/
 Report bugs/issues here: https://github.com/marijnh/CodeMirror/issues
 */

angular.module('honeydew').service('featureMode', function (cmAutocomplete) {
    var phrases = [],
        keywords = [],
        PHRASE_TOKEN = 'atom',
        KEYWORD_TOKEN = 'tag';
    cmAutocomplete.populateAutocompleteSources( false )
        .success(function ( res ) {
            phrases = res.phrases;
            keywords = Object.keys(res.keywords);
        });


    CodeMirror.defineMode("honeydew", function () {
        var projects = [
            'ADTECH',
            'AREPORT',
            'ARMYFIT',
            'AFFEEDBACK',
            'SCMOBILE',
            'BACTES',
            'BLOG',
            'DS',
            'DATA',
            'DROZ',
            'EMAILMARK',
            'FRAMEWORK',
            'HLTHLN',
            'HLEXPORT',
            'HELPDESK',
            'HFPINTERNA',
            'HDEW',
            'MAINT',
            'MOBILE',
            'QA',
            'REALAGE',
            'SC',
            'SCBS',
            'SCFIT',
            'SN',
            'SCPHP',
            'SCPROG',
            'SCWEST',
            'SCME',
            'SSO',
            'SITEOPS',
            'STAR',
            'TEAM',
            'TIC',
            'TMA',
            'TMAFEEDBAC',
            'TNATION',
            'YUBARI'
        ];

        var jiraProjectsRegex = new RegExp(
            projects.map(function ( it ) {
                return it + '\-\\d+';
            }).join('|')
        );

        return {
            lineComment: '#',
            startState: function () {
                return {
                    lineNumber: 0,
                    tableHeaderLine: false,
                    inCommentLine: false,
                    allowFeature: true,
                    allowPreamble: false,
                    allowSets: false,
                    allowScenario: false,
                    allowSteps: false,
                    allowPlaceholders: false,
                    allowMultilineArgument: false,
                    inMultilineTable: false,
                    inKeywordLine: false
                };
            },
            token: function (stream, state) {
                // console.log('lookingAt: ', stream.string.substr(stream.pos), '| peek: ', stream.peek());

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

                // we don't want to eat space if we're trying to parse
                // something like two links on the same line
                if (stream.string.match(/[\|']/)) {
                    stream.eatSpace();
                }


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
                    var stopOn = /[^\s$"'<#hA-Za-z@]/;
                    stream.eatWhile(stopOn);
                };

                stream.isComment = function () {
                    return this.indentation() === 0;
                };

                stream.isSet = function () {
                    return stream.string.match(/^Set: /);
                };

                if (stream.isSet()) {
                    state.allowSets = true;
                }
                else {
                    state.allowSets = false;
                }

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
                // SET
                else if (state.allowPreamble && stream.match(/Set:|JIRA|Keep Open/)) {
                    return "keyword";
                }
                else if (state.allowPreamble && stream.match(/\$.+ /)) {
                    return "variable";
                }
                // EXAMPLES
                else if (state.allowScenario && stream.match(/Examples:/)) {
                    state.allowPlaceholders = false;
                    state.allowSteps = true;
                    state.allowPreamble = false;
                    state.allowMultilineArgument = true;
                    return "keyword";
                }
                // SSCENARIO
                else if (!state.inKeywordLine && state.allowScenario && stream.match(/\s*sscenario:/i)) {
                    return "sscenario";
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
                // PHRASES
                //
                // The regex for phrases must come before (given|when|then)
                // check. Phrases can contain (given|when|then), and if the
                // tokenizer eats up the (given|when|then) as a keyword
                // before it realizes the whole line is a string, it won't
                // get a chance to look at the whole line and realize it's
                // a phrase.
                else if ( phrases.some(function ( it ) {
                    // phrases should only match if the entire line is
                    // an exact match
                    var regex = new RegExp('^\s*' + it + '$');
                    // use this to diagnose whether the line should be a
                    // phrase:
                    //
                    // if (stream.string.trim().match(regex)) {
                    //     console.log(regex, stream.string.substr(stream.pos));
                    // }
                    return stream.match(regex);
                }) ) {
                    // We're hijacking the atom color for phrases and keywords ????
                    return PHRASE_TOKEN;
                }
                // KEYWORDS
                else if (keywords.some( function ( it ) {
                    // useful for diagnosing if the line should
                    // contain a match at all:
                    //
                    // if (stream.string.trim().match(regex)) {
                    //     console.log(regex, stream.string.substr(stream.pos));
                    // }
                    return stream.match(it);
                }) ) {
                    return KEYWORD_TOKEN;
                }
                // STEPS
                else if (!state.inKeywordLine && state.allowSteps && stream.match(/Given|When|Then/)) {
                    state.inStep = true;
                    state.allowPlaceholders = true;
                    state.allowMultilineArgument = true;
                    state.inKeywordLine = true;
                    return "variable-2";
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
                else if (stream.string.match(/^Set/) && stream.match(/^@[\w\d_\-\.]+/)) {
                    return "clickable-link";
                }
                else if (stream.match(/^https?:\/\/[^\s]*/)) {
                    return "clickable-link";
                }
                else if (stream.match(jiraProjectsRegex)) {
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

});
