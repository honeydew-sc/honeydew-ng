'use strict';

describe('LiveReportDirective', function () {
    var elm, compile, scope, ctrl, channel, pusherMock, liveReport;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject(function ($rootScope, $compile, _liveReport_) {
        elm = angular.element('<live-report></live-report>');

        liveReport = _liveReport_;

        channel = 'testChannel';
        $compile(elm)($rootScope);
        $rootScope.$digest();

        scope = elm.isolateScope();
    }));

    it('should subscribe to a channel and put it on the scope', function() {
        liveReport.switchChannel(channel);
        expect(scope.report.channel).toMatch(channel);
        expect(scope.report.output).not.toMatch('nothing');
    });
});
