function cmReportModeService ($rootScope, $filter, preambleOptions, awsConfig) {
    var style = {
        HEADER: 'cm-keyword',
        DATE: 'date',
        SUCCESS: 'success',
        FAILURE: 'failure',
        SCENARIO: 'scenario',
        LINK: 'link',
        SCREENSHOT: 'screenshot',
        PLAINLINK: 'plain-link',
        FEATURE: 'feature-file',

        successfulScenario () {
            return this.SUCCESS + ' ' + this.SCENARIO;
        },

        failedScenario () {
            return this.FAILURE + ' ' + this.SCENARIO;
        },

        highlight (line) {
            var elem = '';
            var ret = CodeMirror.runMode(line, 'report', (token, style) => {
                if (style) {
                    var outputToken;
                    if (style === this.LINK || style === this.FEATURE || style === this.PLAINLINK) {
                        outputToken = this.outputLink( token, style );
                    }

                    else if (style === this.SCREENSHOT) {
                        outputToken = this.outputScreenshot( token, style );
                    }

                    else if (style === this.DATE) {
                        outputToken = this.outputDate( token, style );
                    }

                    else {
                        outputToken = token;
                    }

                    elem += '<span class="' + style + '">' + outputToken + '</span>';

                    if (style === this.FAILURE) {
                        $rootScope.$broadcast('report:failure');
                    }
                }
                else {
                    elem += token;
                }
            });

            return elem;
        },


        makeLink ( title, route ) {
            return `<a href="${route}${title}">${title}</a>`;
        },

        outputLink( token, style ) {
            let outputToken = '';
            if ( style === this.LINK ) {
                let route = '/#/report/';
                outputToken = token.replace(/(\d+)/, this.makeLink( "$1", route ) );
            }

            else if ( style === this.FEATURE ) {
                let route = '/#/features/';
                outputToken = token.replace(/ (.*.feature)/, ' ' + this.makeLink( "$1", route ) );
            }

            else if ( style === this.PLAINLINK ) {
                outputToken = `<a target="_blank" href=${token}>${token}</a>`;
            }

            return outputToken;
        },

        outputScreenshot( token, style ) {
            let base = '/screenshots/',
                targ = 'target="_blank"';

            let outputToken = token
                .replace(/Saving reference: .*\/(.*)/, `<a ${targ} href="${base}$1">reference</a>`)
                .replace(/Reference: .*\/([^&]*) & current:/, `<a ${targ} href="${base}$1">Reference</a> & current:`)
                .replace(/current: .*\/(.*)/, `<a ${targ} href="${base}$1">current</a>`);

            return outputToken;
        },

        outputDate( token, style ) {
            // dates are either in milliseconds from a current run of
            // honeydew (basically, the output of perl's `time`
            // function)
            //
            // OR
            //
            // they're from the database, where there'd stored in UTC
            // +0 time, in which case we have to convert them back.
            if ( /\d{9,10}/.test(token) ) {
                let timeFromSeconds = new Date( 0 );
                // the dates in seconds come missing an hour; i dunno
                // why...
                let hour = 3600;
                timeFromSeconds.setSeconds( parseInt(token) + hour );
                return ' ' + this.formatDate( timeFromSeconds );
            }
            else {
                // appending the UTC part convinces date to parse it
                // as UTC, which we have to do since it's recorded in
                // the database as UTC.
                let date = new Date( token + ' UTC' );
                return ' ' + this.formatDate( date );
            }
        },

        formatDate( date ) {
            let dateFormat = 'M&#8209;dd, h:mm:ssa';
            return $filter('date')(date, dateFormat);
        }
    };

    CodeMirror.defineMode('report', function () {
        var preambleKeys = Object.keys(preambleOptions);
        var headers = new RegExp([
            'Host',
            'Build',
            'Browser',
            'Feature File',
            'Job ID',
            'Feature',
        ].concat(preambleKeys).map(it => it + ':').join('|'));

        var dateHeaders = /Start Date:|End Date:/;

        var date = new RegExp(/ \d{9,10}| \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);

        var successRule = /# \(OK\).*?\)/;
        var failureRule = /# \(ER\).*?\)/;

        return {
            startState: () => {
                let inDateHeader = false;
                return { inDateHeader };
            },

            token: (stream, state) => {
                if (stream.match(headers)) {
                    state.inDateHeader = false;
                    return style.HEADER;
                }
                else if (stream.match(dateHeaders)) {
                    state.inDateHeader = true;
                    return style.HEADER;
                }
                else if (stream.match(date)) {
                    state.inDateHeader = false;
                    return style.DATE;
                }
                else if (stream.match(successRule)) {
                    return style.SUCCESS;
                }
                else if (stream.match(failureRule)) {
                    return style.FAILURE;
                }
                else if (stream.match(/# Success/)) {
                    return style.successfulScenario();
                }
                else if (stream.match(/# Failure/)) {
                    return style.failedScenario();
                }
                else if (stream.match(/Report ID: \d+/)) {
                    return style.LINK;
                }
                else if (stream.match( /.*\.feature$/ ) ) {
                    return style.FEATURE;
                }
                else if (stream.match(/Reference: .*current: .*/)) {
                    return style.SCREENSHOT;
                }
                else if (stream.match(/Saving reference: .*/)) {
                    return style.SCREENSHOT;
                }
                else if (stream.match(/^https?:\/\/.*screenshot.*png$/) ){
                    return style.PLAINLINK;
                }
                else {
                    stream.next();
                    stream.eatWhile(/[^\s]/);
                    return null;
                }
            }
        };
    });

    return style;
}

angular.module('sc.cmmodes', [ 'sc.constants' ]).service('cmReportMode', cmReportModeService);
