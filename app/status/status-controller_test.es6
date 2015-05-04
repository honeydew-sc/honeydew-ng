describe('StatusController', function () {
    var scope,
        httpMock,
        stateParams,
        StatusController;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        scope = $rootScope.$new();
        httpMock = $httpBackend;

        stateParams = {};

        StatusController = $controller('StatusController', {
                $scope: scope,
                $stateParams: stateParams
            });
    }));

    it('should exist', () => {
        expect(StatusController).toBeDefined();
    });
});
