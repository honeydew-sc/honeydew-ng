describe('HoneydewJob directive', function () {
    var elm,
        panes,
        scope,
        compile,
        storage,
        Settings,
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
                           _panes_,
                           _Settings_,
                           _hostname_,
                           _liveReport_,
                           _availableBrowsers_) {
        elm = angular.element('<job-options></job-options>');
        panes = _panes_;
        scope = $rootScope;
        compile = $compile;
        location = $location;
        httpMock = $httpBackend;
        Settings = _Settings_;
        Settings.reset();

        hostname = _hostname_;
        liveReport = _liveReport_;
        storage = $sessionStorage;
        storage.settings = {};
        availableBrowsers = _availableBrowsers_;

        hostname.env = 'prod';
        hostname.app = 'SC';
        hostname.resolve();

        storage.browser = browser;
        storage.server = server;

        // $compile mutates elm
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

    var setupPostContent = (browserName, serverName) => {
        var file = 'test.feature',
            host = 'https://www.sharecare.com',
            serverPrefix = serverName.split(': ').shift(),
            local = serverName.split(' ').pop(),
            browser = browserName + ' Local',
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

        // keep track of the local server via prefix
        if (serverPrefix.length === 2) {
            content.browser = serverPrefix + ' ' + content.browser;
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

    it('should use the wdAddress for localhost when present', () => {
        var local = '1.1.1.1';
        Settings.set('wdAddress', local);

        spyOn(location, 'path').and.returnValue('/test.feature');
        spyOn(liveReport, 'switchChannel').and.returnValue('channel');

        httpMock.expectGET(`/rest.php/status/webdriver?local=${ local }`)
            .respond({webdriverStatus: true});
        httpMock.expectPOST('/rest.php/jobs', {
            file: "test.feature",
            host: "https://www.sharecare.com",
            channel: "channel",
            server: "Localhost",
            browser: ["Chrome Local"],
            local
        })
            .respond({});
        elm.find('#execute').click();
        httpMock.flush();
    });

    it('should execute the proper job parameters for a local server', () => {
        storage.server = availableBrowsers.getServers()[1];

        setupPostContent(storage.browser, storage.server);
        elm.find('#execute').eq(0).click();
        httpMock.flush();
    });

    it('should prefix the server shortname to the browser', () => {
        storage.server = 'AB: 1.2.3.4';

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

    it('should emit two events when executing', () => {
        // The scope that we have access to doesn't seem to be the
        // scope in the directive controller (ie our scope.$emit is
        // never called), so we'll just listen for the event like a
        // regular scope instead of spying.
        var emits = 0;
        var incEmitCount = () => emits++;
        scope.$on('file:commit', incEmitCount);
        scope.$on('report:reset', incEmitCount);

        setupPostContent(storage.browser, storage.server);
        elm.find('#execute').eq(0).click();
        httpMock.flush();

        expect(emits).toBe(2);
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
        spyOn( panes, 'openPane' );

        // Note that we are asserting that we only receive a single
        // GET request, and implicitly asserting that we do not see
        // the subsequent POST to /jobs that would start the job.
        httpMock.expectGET('/rest.php/status/webdriver?local=Localhost').respond({webdriverStatus: false});
        elm.find('#execute').eq(0).click();
        httpMock.flush();

        // we want to automatically open the settings pane so you can
        // fix your ip on the spot!
        expect(panes.openPane).toHaveBeenCalledWith('settings');
    });

    it('should not yet check for local mobile server status', () => {
        storage.browser = 'iOS Mobile';
        setupPostContent(storage.browser, storage.server);
        elm.find('#execute').eq(0).click();
        httpMock.flush();
    });
});

describe('HoneydewJob directive for sets page', () => {
    var elm,
        scope,
        storage,
        location,
        httpMock,
        controller,
        Monitor;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( function (
        $compile,
        $location,
        $rootScope,
        $httpBackend,
        $sessionStorage,
        _hostname_,
        _Monitor_
    ) {
        elm = angular.element('<job-options></job-options>');
        location = $location;
        httpMock = $httpBackend;
        storage = $sessionStorage;
        Monitor = _Monitor_;

        _hostname_.env = 'prod';
        _hostname_.app = 'SC';
        _hostname_.resolve();

        spyOn(location, 'path').and.returnValue('#/monitor');
        $compile(elm)($rootScope);

        httpMock.expectGET('/rest.php/tree/sets').respond({ tree: [ { name: 'fake.set', label: 'fake.set' } ] });
        $rootScope.$digest();
        scope = elm.scope();
        controller = elm.controller('jobOptions');

        httpMock.flush();
    }));

    it('should know it\'s on a monitor page', () => {
        expect(!!controller.isMonitor).toBe(true);
        expect(controller.setList.length).toBe(1);
    });

    it('should emit a new monitor job properly', () => {
        let set = 'fake.set',
            browser = 'GP Chrome Local',
            host = 'https://www.sharecare.com';
        var content = { set, host, browser};

        storage.browser = 'Chrome';
        storage.server = 'GP: a.fake.ip';

        spyOn(scope, '$emit').and.callThrough();
        elm.find('#add-set').eq(0).click();
        scope.$digest();
        expect(scope.$emit).toHaveBeenCalledWith('monitor:create', new Monitor(content));
    });
});
