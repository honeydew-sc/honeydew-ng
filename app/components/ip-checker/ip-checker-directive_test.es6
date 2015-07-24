describe('IpChecker directive', () => {
    var elm,
        scope,
        controller,
        httpMock,
        Settings;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( ($compile, $rootScope, $httpBackend, _Settings_) => {
        Settings = _Settings_;
        Settings.delete('wdAddress');

        httpMock = $httpBackend;
        httpMock.expectGET('/rest.php/status/webdriver').respond({
            webdriverStatus: false,
            serverAddress: '1.1.1.1'
        });

        elm = angular.element('<ip-checker status="ipStatus"></ip-checker>');
        scope = $rootScope;
        $compile(elm)(scope);
        scope.$digest();
        controller = elm.isolateScope().IpChecker;

        httpMock.flush();
    }));

    describe('service', () => {
        it('should query the server for the current IP address ', () => {
            expect(controller.address()).toBe('1.1.1.1');
        });

        it('should let Settings override the server value', () => {
            Settings.set('wdAddress',  '2.2.2.2');
            expect(controller.address()).toBe('2.2.2.2');
        });

        it('should update itself when Settings changes', () => {
            Settings.set('wdAddress', '2.2.2.2' );
            expect(controller.address()).toBe('2.2.2.2');

            Settings.set('wdAddress', '3.3.3.3' );
            expect(controller.address()).toBe('3.3.3.3');
        });

        it('should clear the stored value when requested', () => {
            Settings.set('wdAddress', '3.3.3.3' );
            expect(controller.address()).toBe('3.3.3.3');
            controller.reset();
            expect(controller.address()).toBe('1.1.1.1');
        });

        it('should set the new address manually', () => {
            controller.address('1.2.3.4');
            expect(controller.address()).toBe('1.2.3.4');
        });
    });

    describe('interaction', () => {
        it('should highlight green when successful', () => {
            controller.status = true;
            scope.$apply();

            let successInput = elm.find('#ip.address.true');
            expect(successInput.length).toBe(1);
        });

        it('should highlight red when successful', () => {
            controller.status = false;
            scope.$apply();

            let failureInput = elm.find('#ip.address.false');
            expect(failureInput.length).toBe(1);
        });

        it('should display a visit link when successful', () => {
            controller.checking = false;
            controller.status = true;
            scope.$apply();

            let visit = elm.find('.visit');
            expect(visit.length).toBe(1);
            expect(visit.find('a').attr('ng-href')).toMatch(/:4444\/wd\/hub/);
        });

        it('should reset the value on click', () => {
            let resetBtn = elm.find('.reset[type="button"]');
            // one request finds out our ip
            httpMock.expectGET('/rest.php/status/webdriver').respond({});
            // and the next requests checks the :4444 port
            httpMock.expectGET('/rest.php/status/webdriver').respond({});

            // they could be combined, but we're lazy...
            resetBtn.click();
            httpMock.flush();
        });
    });

});
