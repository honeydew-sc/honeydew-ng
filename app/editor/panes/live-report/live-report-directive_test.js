'use strict';

describe('Controller: ReportLiveCtrl', function () {
    var scope, ctrl, channel, pusherMock, liveReport;
    beforeEach(module('honeydew'));

    beforeEach(inject(function($controller, $rootScope, $httpBackend, $compile, _liveReport_) {
        scope = $rootScope.$new();
        channel = 'testChannel';
        liveReport = _liveReport_;
        pusherMock = {
            subscribe: function () {},
            unsubscribe: function () {}
        };
        spyOn(pusherMock, 'subscribe');
        spyOn(pusherMock, 'unsubscribe');

        ctrl = $controller(LiveReportCtrl, {
            $scope: scope,
            liveReport: liveReport,
            Pusher: pusherMock
        });
    }));

    it('should subscribe to the channel from the url', function() {
        liveReport.switchChannel(channel);
        expect(scope.report.channel).toBe(channel);
        var subscribeArgs = pusherMock.subscribe.calls[0].args;
        expect(subscribeArgs[0]).toBe(channel);
    });

    it('should update the report in scope on pusher updates', function () {
        liveReport.switchChannel(channel);
        expect(scope.report.output).toMatch('Loading...');
        var message = 'a pretend pusher message';
        var pusherCallback = pusherMock.subscribe.calls[0].args[2];
        pusherCallback(message);
        expect(scope.report.output).toMatch(message);
    });
});
