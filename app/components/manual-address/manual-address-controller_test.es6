'use strict';

describe('ManualAddressCtrl', function () {
    var scope,
        Settings,
        httpMock,
        ManualAddressCtrl;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, _Settings_) {
        scope = $rootScope.$new();
        Settings = _Settings_;
        Settings.delete('wdAddress');
        httpMock = $httpBackend;

        ManualAddressCtrl = $controller('ManualAddressCtrl', {
            $scope: scope,
            Settings: Settings
        });

        httpMock.expectGET('/rest.php/status/webdriver').respond({
            webdriverStatus: false,
            serverAddress: '1.1.1.1'
        });
        scope.$digest();
        httpMock.flush();
    }));

    it('should ask the server for your IP address', () => {
        expect(ManualAddressCtrl.address()).toBe('1.1.1.1');
    });

    it('should let Settings override the server value', () => {
        Settings.set('wdAddress',  '2.2.2.2');
        expect(ManualAddressCtrl.address()).toBe('2.2.2.2');
    });

    it('should update itself when Settings changes', () => {
        Settings.set('wdAddress', '2.2.2.2' );
        expect(ManualAddressCtrl.address()).toBe('2.2.2.2');

        Settings.set('wdAddress', '3.3.3.3' );
        expect(ManualAddressCtrl.address()).toBe('3.3.3.3');
    });

    it('should clear the stored value when requested', () => {
        ManualAddressCtrl.reset();
        expect(ManualAddressCtrl.address()).toBe('1.1.1.1');
    });

    it('should set the new address manually', () => {
        ManualAddressCtrl.address('1.2.3.4');
        expect(ManualAddressCtrl.address()).toBe('1.2.3.4');
    });
});
