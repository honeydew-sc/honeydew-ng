'use strict';

describe('Controller: ReportLiveCtrl', function () {
    var scope, ctrl, channel, pusherMock;
    beforeEach(module('honeydew'));

    beforeEach(inject(function($controller, $rootScope, $httpBackend, $compile) {
        scope = $rootScope.$new();
        channel = 'testChannel';
        pusherMock = {
            subscribe: function () {}
        };
        spyOn(pusherMock, 'subscribe');

        ctrl = $controller(LiveReportCtrl, {
            $scope: scope,
            $localStorage: {
                channel: channel
            },
            Pusher: pusherMock
        });
    }));

    it('should subscribe to the channel from the url', function() {
        expect(scope.report.channel).toBe(channel);
        var subscribeArgs = pusherMock.subscribe.calls[0].args;
        expect(subscribeArgs[0]).toBe(channel);
    });

    it('should update the report in scope on pusher updates', function () {
        expect(scope.report.output).toMatch('Loading...');
        var message = 'a pretend pusher message';
        var pusherCallback = pusherMock.subscribe.calls[0].args[2];
        pusherCallback(message);
        expect(scope.report.output).toMatch(message);
    });
});
