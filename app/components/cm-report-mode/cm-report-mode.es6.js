function cmReportModeService (preambleOptions) {
    CodeMirror.defineMode('report', function () {
        var preambleKeys = Object.keys(preambleOptions);
        var headers = new RegExp([
            'Start Date',
            'Host',
            'Build',
            'Browser',
            'Feature File',
            'Job ID',
        ].concat(preambleKeys).map(it => it + ':').join('|'));

        var successRule = /# \(OK\).*?\)/;
        var failureRule = /# \(ER\).*?\)/;

        return {
            startState: () => { return {}; },
            token: (stream, state) => {
                if (stream.match(headers)) {
                    return 'header';
                }
                else if (stream.match(successRule)) {
                    return 'success';
                }
                else if (stream.match(failureRule)) {
                    return 'failure';
                }
                else if (stream.match(/# Success/)) {
                    return 'success scenario';
                }
                else if (stream.match(/# Failure/)) {
                    return 'failure scenario';
                }
                else {
                    stream.next();
                    stream.eatWhile(/[^\s]/);
                    return null;
                }
            }
        };
    });
}

angular.module('sc.cmmodes', [ 'sc.constants' ]).service('cmReportMode', cmReportModeService);
