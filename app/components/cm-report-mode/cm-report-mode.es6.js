function cmReportModeService (preambleOptions) {
    var style = {
        HEADER: 'cm-keyword',
        SUCCESS: 'success',
        FAILURE: 'failure',
        SCENARIO: 'scenario',

        successfulScenario () {
            return this.SUCCESS + ' ' + this.SCENARIO;
        },

        failedScenario () {
            return this.FAILURE + ' ' + this.SCENARIO;
        }
    };

    CodeMirror.defineMode('report', function () {
        var preambleKeys = Object.keys(preambleOptions);
        var headers = new RegExp([
            'Start Date',
            'Host',
            'Build',
            'Browser',
            'Feature File',
            'Job ID',
            'Feature',
        ].concat(preambleKeys).map(it => it + ':').join('|'));

        var successRule = /# \(OK\).*?\)/;
        var failureRule = /# \(ER\).*?\)/;

        return {
            startState: () => { return {}; },
            token: (stream, state) => {
                if (stream.match(headers)) {
                    return style.HEADER;
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
