'use strict';

describe('LiveReportService', function () {
    var liveReportService, rootScope, pusherMock, timeout, pusherReal;
    var channel = 'testChannel';
    var rule = 'Given I am on the / page';
    beforeEach(module('honeydew'));

    beforeEach(inject(function (_liveReport_, _Pusher_, $timeout) {
        liveReportService = _liveReport_;
        pusherMock = pusherReal = _Pusher_;
        pusherMock.channel = {
            trigger: function () {}
        };
        spyOn(pusherMock.channel, 'trigger');

        timeout = $timeout;
        spyOn(pusherMock, 'subscribe').andCallFake(function (params) {
            return {
                then: function (cb) {
                    cb(pusherMock.channel);
                }
            };
        });

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
        liveReportService.switchChannel();
        liveReportService.evalRule(rule);
        expect(pusherMock.channel.trigger).toHaveBeenCalledWith(liveReportService.events.evalRule, rule);
    });

    it('closes itself if we join a new channel and immediately idle', function () {
        spyOn(liveReportService, 'close');

        liveReportService.switchChannel();
        expect(liveReportService.close).toHaveBeenCalled();
        timeout.flush();
        expect(liveReportService.close.callCount).toBe(2);
    });

    it('can we idle after evaluating a rule', function () {
        spyOn(liveReportService, 'close');

        liveReportService.switchChannel();
        liveReportService.close.reset();
        liveReportService.evalRule('blah blah blah');
        expect(liveReportService.close).not.toHaveBeenCalled();
        timeout.flush();
        expect(liveReportService.close.callCount).toBe(1);
        expect(liveReportService.close).toHaveBeenCalled();
    });

});
