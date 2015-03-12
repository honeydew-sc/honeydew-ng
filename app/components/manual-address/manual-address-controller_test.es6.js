'use strict';

describe('ManualAddressCtrl', function () {
    var scope,
        httpMock,
        stateParams,
        ManualAddressCtrl;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        scope = $rootScope.$new();
        httpMock = $httpBackend;

        stateParams = {};

        ManualAddressCtrl = $controller('ManualAddressCtrl', {
            $scope: scope,
            $stateParams: stateParams
        });
    }));

    it('should probably exist', () => {
        expect(ManualAddressCtrl).toBeDefined();
    });
});
