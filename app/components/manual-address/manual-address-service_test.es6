describe('manualAddress', function () {
    'use strict';

    var manualAddress;
    beforeEach(module('honeydew'));
    beforeEach(inject(function (_manualAddress_) {
        manualAddress = _manualAddress_;
    }));

    it('should be defined', () => {
        expect(manualAddress).toBeDefined();
    });

    it('should pop a modal', () => {
        expect(manualAddress.popModal).toBeDefined();
    });

});
