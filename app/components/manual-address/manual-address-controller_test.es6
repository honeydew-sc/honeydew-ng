'use strict';

describe('ManualAddressCtrl', function () {
    var scope,
        storage,
        httpMock,
        ManualAddressCtrl;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, $localStorage) {
        scope = $rootScope.$new();
        storage = $localStorage;
        storage.settings = {};
        httpMock = $httpBackend;

        ManualAddressCtrl = $controller('ManualAddressCtrl', {
            $scope: scope,
            $localStorage: storage
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

    it('should let localStorage override the server value', () => {
        storage.settings = { wdAddress: '2.2.2.2' };
        expect(ManualAddressCtrl.address()).toBe('2.2.2.2');
    });

    it('should update itself when localStorage changes', () => {
        storage.settings = { wdAddress: '2.2.2.2' };
        expect(ManualAddressCtrl.address()).toBe('2.2.2.2');

        storage.settings = { wdAddress: '3.3.3.3' };
        expect(ManualAddressCtrl.address()).toBe('3.3.3.3');
    });

    it('should clear the stored value when requested', () => {
        ManualAddressCtrl.reset();
        expect(ManualAddressCtrl.address()).toBe('1.1.1.1');
    });
});
