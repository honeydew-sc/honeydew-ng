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

    it('should query the server for the current IP address ', () => {
        expect(controller.address).toBe('1.1.1.1');
    });

    it('should let Settings override the server value', () => {
        Settings.set('wdAddress',  '2.2.2.2');
        expect(controller.address).toBe('2.2.2.2');
    });

    it('should update itself when Settings changes', () => {
        Settings.set('wdAddress', '2.2.2.2' );
        expect(controller.address).toBe('2.2.2.2');

        Settings.set('wdAddress', '3.3.3.3' );
        expect(controller.address).toBe('3.3.3.3');
    });

    it('should clear the stored value when requested', () => {
        Settings.set('wdAddress', '3.3.3.3' );
        expect(controller.address).toBe('3.3.3.3');
        controller.reset();
        expect(controller.address).toBe('1.1.1.1');
    });

    it('should set the new address manually', () => {
        controller.address = '1.2.3.4';
        expect(controller.address).toBe('1.2.3.4');
    });

    fit('should query the server after user input', () => {
        let input = elm.find('input');
        input.text('1.2.3.4');
        input.triggerHandler('blur');
        scope.$digest();
    });
});
