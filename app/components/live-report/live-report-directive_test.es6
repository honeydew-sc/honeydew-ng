'use strict';

describe('LiveReportDirective', function () {
    var elm, compile, scope, ctrl, channel, pusherMock, liveReport, storage;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject(function ($rootScope, $compile, $localStorage, _liveReport_) {
        elm = angular.element('<live-report></live-report>');

        liveReport = _liveReport_;
        storage = $localStorage;
        scope = $rootScope;
        compile = $compile;
    }));

    afterEach( () => delete storage.settings );

    var reportDirectiveCtrl = function () {
        channel = 'testChannel';
        compile(elm)(scope);
        scope.$digest();

        return elm.isolateScope().ReportPane;;
    };

    it('should subscribe to a channel and put it on the scope', function() {
        var ReportPane = reportDirectiveCtrl();
        liveReport.switchChannel(channel);
        expect(ReportPane.report.channel).toMatch(channel);
        expect(ReportPane.report.output).not.toMatch('nothing');
    });

    it('should use the proper theme', () => {
        delete storage.settings;
        storage.settings = {
            theme: 'theme'
        };

        var ReportPane = reportDirectiveCtrl();
        expect(ReportPane.theme).toBe('theme');

    });

    it('should lazily initialize localStorage', () => {
        delete storage.settings;
        var ReportPane = reportDirectiveCtrl();
        expect(ReportPane.theme).toBeDefined();
    });
});
