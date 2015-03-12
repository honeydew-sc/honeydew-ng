describe('manualAddressService', function () {
    'use strict';

    var manualAddressService;
    beforeEach(module('honeydew'));
    beforeEach(inject(function (_manualAddressService_) {
        manualAddressService = _manualAddressService_;
    }));

    it('should be defined', () => {
        expect(manualAddressService).toBeDefined();
    });

    it('should pop a modal', () => {
        expect(manualAddressService.popModal).toBeDefined();
    });

});
