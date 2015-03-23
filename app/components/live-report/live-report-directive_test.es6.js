'use strict';

describe('LiveReportDirective', function () {
    var elm, compile, scope, ctrl, channel, pusherMock, liveReport;
    var elm, compile, scope, ctrl, channel, pusherMock, liveReport, ReportPane;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject(function ($rootScope, $compile, _liveReport_) {
        elm = angular.element('<live-report></live-report>');

        liveReport = _liveReport_;

        channel = 'testChannel';
        $compile(elm)($rootScope);
        $rootScope.$digest();

        ReportPane = elm.isolateScope().ReportPane;
    }));

    it('should subscribe to a channel and put it on the scope', function() {
        liveReport.switchChannel(channel);
        expect(ReportPane.report.channel).toMatch(channel);
        expect(ReportPane.report.output).not.toMatch('nothing');
    });
});
