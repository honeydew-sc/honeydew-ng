'use strict';

ddescribe('Controller: ReportLiveCtrl', function () {
    var httpMock, scope, ReportLiveCtrl, channel, Pusher;
    beforeEach(module('honeydew'));

    beforeEach(inject(function($controller, $rootScope, $httpBackend) {
        httpMock = $httpBackend;
        scope = $rootScope.$new();
        channel = 'testChannel';
        Pusher = {
            subscribe: function () {}
        };
        spyOn(Pusher, 'subscribe');

        ReportLiveCtrl = $controller('ReportLiveCtrl', {
            $scope: scope,
            $stateParams: {
                channel: channel
            },
            Pusher: Pusher
        });
    }));

    it('should subscribe to the channel from the url', function() {
        expect(scope.report.channel).toBe(channel);
        var subscribeArgs = Pusher.subscribe.calls[0].args;
        expect(subscribeArgs[0]).toBe(channel);
    });

    it('should update the report in scope on pusher updates', function () {
        expect(scope.report.output).toBe('');
        var message = 'a pretend pusher message';
        var pusherCallback = Pusher.subscribe.calls[0].args[2];
        pusherCallback(message);
        expect(scope.report.output).toBe(message);
    });
});
