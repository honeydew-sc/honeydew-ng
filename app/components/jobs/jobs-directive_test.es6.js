'use strict';

ddescribe('Jobs directive', function () {
    var elm,
        scope,
        compile,
        storage,
        httpMock,
        location,
        liveReport,
        availableBrowsers,
        browser = 'Chrome',
        server = 'Localhost';

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( function ( $compile, $rootScope, $sessionStorage, $httpBackend, $location, _liveReport_, _availableBrowsers_ ) {
        elm = angular.element('<job-options></job-options>');
        scope = $rootScope;
        compile = $compile;
        location = $location;
        httpMock = $httpBackend;
        liveReport = _liveReport_;
        storage = $sessionStorage;
        availableBrowsers = _availableBrowsers_;

        // $compile mutates elm
        storage.browser = browser;
        storage.server = server;
        $compile(elm)(scope);
        scope.$digest();
    }));

    it('should remember browsers through refreshes', () => {
        var selected = elm.find('#browser option[selected]');
        expect(selected.text()).toBe(browser);
    });

    it('should remember servers through refreshes', () => {
        var selected = elm.find('#server option[selected]');
        expect(selected.text()).toBe(server);
    });

    it('should use the values from this window instead of sessionStorage', () => {
        storage.browser = 'Firefox';

        var selected = elm.find('#browser option[selected]');
        expect(selected.text()).toBe(browser);

        storage.server = 'Saucelabs';

        selected = elm.find('#server option[selected]');
        expect(selected.text()).toBe(server);
    });

    iit('should execute the proper job parameters for localhost', () => {
        var file = 'test.feature',
            host = 'https://www.stage.sharecare.com',
            browser = storage.browser + ' Local',
            local = server,
            channel = 'channel';
        spyOn(location, 'path').and.returnValue('/' + file);
        spyOn(liveReport, 'switchChannel').and.returnValue(channel);

        var content = {file, host, channel, browser, server, local};
        httpMock.expectPOST('/rest.php/jobs', content).respond({});
        elm.find('#execute').click();
        httpMock.flush();
    });

    iit('should execute the proper job parameters for a local server', () => {
        storage.server = availableBrowsers.getServers()[2];
        compile(elm)(scope);

        var file = 'test.feature',
            host = 'https://www.stage.sharecare.com',
            browser = storage.browser + ' Local',
            local = storage.server.split(' ').pop(),
            channel = 'channel';
        spyOn(location, 'path').and.returnValue('/' + file);
        spyOn(liveReport, 'switchChannel').and.returnValue(channel);

        var content = {file, host, channel, browser, server, local};
        httpMock.expectPOST('/rest.php/jobs', content).respond({});
        elm.find('#execute').eq(0).click();
        httpMock.flush();
    });
});
