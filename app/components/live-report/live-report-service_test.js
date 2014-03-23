'use strict';

describe('LiveReportService', function () {
    var liveReportService, rootScope, pusherMock;
    var channel = 'testChannel';
    var rule = 'Given I am on the / page';
    beforeEach(module('honeydew'));

    beforeEach(inject(function (_liveReport_, _Pusher_) {
        liveReportService = _liveReport_;
        pusherMock = _Pusher_;
        spyOn(pusherMock, 'subscribe');
        spyOn(pusherMock, 'unsubscribe');
    }));

    it('can be instantiated', function () {
        expect(liveReportService).toBeDefined();
    });

    it('gives us new private channels', function () {
        var channel = liveReportService.switchChannel();
        expect(channel).toMatch(/^private\-/);
    });

    it('switches channels', function () {
        liveReportService.switchChannel(channel);
        expect(liveReportService.channel).toMatch(channel);
    });

    it('should update the report in scope on pusher updates', function () {
        liveReportService.switchChannel(channel);
        expect(liveReportService.output).toMatch('Loading...');
        var message = 'a pretend pusher message';
    });

    it('should append new messages to the output', function () {
        liveReportService.pusherListener(rule);
        expect(liveReportService.output).toBe(rule);
        liveReportService.pusherListener(rule);
        expect(liveReportService.output).toBe(rule + rule);
    });

    it('sends messages in private channels', function () {
        pusherMock.channel = {
            trigger: function () {}
        };
        spyOn(pusherMock.channel, 'trigger');

        liveReportService.evalRule(rule);
        expect(pusherMock.channel.trigger).toHaveBeenCalledWith(liveReportService.events.evalRule, rule);
    });
});
