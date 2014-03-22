'use strict';

describe('LiveReportDirective', function () {
    var scope, ctrl, channel, pusherMock, liveReportService;
    beforeEach(module('honeydew'));

    beforeEach(inject(function($controller, $rootScope, _liveReport_) {
        scope = $rootScope.$new();
        channel = 'testChannel';
        liveReportService = _liveReport_;

        ctrl = $controller('LiveReportDirectiveCtrl', {
            $scope: scope,
            liveReport: liveReportService
        });
    }));

    it('should subscribe to a channel and put it on the scope', function() {
        liveReportService.switchChannel(channel);
        expect(scope.report.channel).toMatch(channel);
        expect(scope.report.output).not.toMatch('nothing');
    });
});
