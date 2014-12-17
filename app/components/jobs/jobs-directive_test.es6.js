'use strict';

describe('Jobs directive', function () {
    var elm,
        scope,
        compile,
        storage,
        hostname,
        httpMock,
        location,
        liveReport,
        availableBrowsers,
        browser = 'Chrome',
        server = 'Localhost';

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( function ( $compile,
                           $rootScope,
                           $sessionStorage,
                           $httpBackend,
                           $location,
                           _hostname_,
                           _liveReport_,
                           _availableBrowsers_) {
        elm = angular.element('<job-options></job-options>');
        scope = $rootScope;
        compile = $compile;
        location = $location;
        httpMock = $httpBackend;
        hostname = _hostname_;
        liveReport = _liveReport_;
        storage = $sessionStorage;
        availableBrowsers = _availableBrowsers_;

        // $compile mutates elm
        storage.browser = browser;
        storage.server = server;
        $compile(elm)(scope);

        httpMock.expectGET('/rest.php/tree/sets').respond({ tree: [] });
        scope.$digest();
        httpMock.flush();

        hostname.env = 'prod';
        hostname.app = 'SC';
        hostname.resolve();
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

    var setupPostContent = (browserName, serverName) => {
        var file = 'test.feature',
            host = 'https://www.sharecare.com',
            browser = browserName + ' Local',
            local = serverName.split(' ').pop(),
            server = serverName,
            channel = 'channel';
        spyOn(location, 'path').and.returnValue('/' + file);
        spyOn(liveReport, 'switchChannel').and.returnValue(channel);

        var content = {file, host, channel, browser, server, local};
        if (serverName.match(/Saucelabs/)) {
            content.server = 'Saucelabs';
            content.browser = browserName;
            delete content.local;
        }
        else if (!browserName.match(/Mobile/i)) {
            // we check our webdriver status for local servers
            httpMock.expectGET(`/rest.php/status/webdriver?local=${ local }`)
                .respond({webdriverStatus: true});
        }

        // the backend expects an array of browsers
        content.browser = [ content.browser ];
        return httpMock.expectPOST('/rest.php/jobs', content)
            .respond({});
    };

    it('should execute the proper job parameters for localhost', () => {
        setupPostContent(storage.browser, storage.server);
        elm.find('#execute').click();
        httpMock.flush();
    });

    it('should execute the proper job parameters for a local server', () => {
        storage.server = availableBrowsers.getServers()[1];

        setupPostContent(storage.browser, storage.server);
        elm.find('#execute').eq(0).click();
        httpMock.flush();
    });

    it('should approriately execute a saucelabs job', () => {
        storage.server = 'Saucelabs';

        setupPostContent(storage.browser, storage.server);
        elm.find('#execute').eq(0).click();
        httpMock.flush();
    });

    it('should execute on job:execute events', () => {
        setupPostContent(storage.browser, storage.server);
        scope.$broadcast('job:execute');
        httpMock.flush();
    });

    it('should emit a file:commit event when executing', () => {
        // the scope that we have access to doesn't seem to be the
        // scope in the directive controller (ie our scope.$emit is
        // never called), so we'll just listen for the event like a
        // regular scope instead of spying.
        var emits = 0;
        scope.$on('file:commit', (args) => {
            emits++;
        });

        setupPostContent(storage.browser, storage.server);
        elm.find('#execute').eq(0).click();
        httpMock.flush();

        expect(emits).toBe(1);
    });

    it('should update the browser whenever the hostname changes', () => {
        hostname.env = 'iOS';
        hostname.app = 'Mobile';
        hostname.resolve();
        expect(storage.browser).toMatch('iOS');

        hostname.env = 'Android';
        hostname.app = 'Mobile';
        hostname.resolve();
        expect(storage.browser).toMatch('Android');
    });

    it('should not change the browser when hostname goes from SC to DrOZ', () => {
        storage.browser = 'Firefox';

        hostname.env = 'prod';
        hostname.app = 'SC';
        hostname.resolve();
        expect(storage.browser).toBe('Firefox');
    });

    it('should not run if the webdriver server is down', () => {
        // Note that we are asserting that we only receive a single
        // GET request, and implicitly asserting that we do not see
        // the subsequent POST to /jobs that would start the job.
        httpMock.expectGET('/rest.php/status/webdriver?local=Localhost').respond({webdriverStatus: false});
        elm.find('#execute').eq(0).click();
        httpMock.flush();
    });

    it('should not yet check for local mobile server status', () => {
        storage.browser = 'iOS Mobile';
        setupPostContent(storage.browser, storage.server);
        elm.find('#execute').eq(0).click();
        httpMock.flush();
    });
});
