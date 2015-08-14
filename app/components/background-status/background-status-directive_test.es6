describe('BackgroundStatus directive', () => {
    var elm,
        scope,
        Status,
        compile,
        Settings,
        httpMock;

    var config = {
        a: '1.2.3.4'
    };

    beforeEach(module('honeydew', $provide => {
        $provide.constant('localConfig', config );
    }));

    beforeEach(module('tpl'));

    beforeEach(inject( ($compile, $rootScope, $httpBackend, _Settings_) => {
        scope = $rootScope;
        compile = $compile;
        Settings = _Settings_;
        Settings.reset();
        httpMock = $httpBackend;
    }));

    afterEach( () => {
        Settings.reset();
    });

    var setupLocalStatuses = (localRes, storage) => {
        elm = angular.element('<background-status></background-status>');
        compile(elm)(scope);

        httpMock.expectGET('/rest.php/status/saucelabs').respond({});
        if (storage) {
            httpMock.expectGET('/rest.php/status?local=' + storage).respond([]);
        }
        else {
            httpMock.expectGET('/rest.php/status').respond([]);
        }
        httpMock.expectGET('/rest.php/status/webdriver?local=' + config.a).respond(localRes);

        httpMock.flush();
        scope.$digest();

        Status = elm.isolateScope().Status;
    };


    it('should be isolated', () => {
        setupLocalStatuses({
            name: 'a',
            webdriverStatus: true
        });

        expect(Status).toBeDefined();
    });

    it('should not add successes to the list', () => {
        setupLocalStatuses({
            name: 'a',
            webdriverStatus: true
        });

        expect(Status.list.length).toBe(1);
    });

    it('should add failures to the list', () => {
        setupLocalStatuses({
            name: 'a',
            webdriverStatus: false
        });

        expect(Status.list.length).toBe(2);
        expect(Status.list[1].name).toBe('a');
    });

    it('should use the local wdAddress when available', () => {
        Settings.set('wdAddress', '3.3.3.3');
        setupLocalStatuses({
            name: 'a',
            webdriverStatus: false
        }, '3.3.3.3');

        // The actual test for this is the httpMock.expectGET with a
        // request that has the ?local=3.3.3.3 query parameter
        // attached to it. It's handled in setup, but let's just make
        // sure that everything still makes sense here:
        expect(Status.list.length).toBe(2);
    });
});
