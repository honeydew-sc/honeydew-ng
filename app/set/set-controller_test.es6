describe('SetController', function () {
    var scope,
        httpMock,
        SetController;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, CmDomHelpers) {
        httpMock = $httpBackend;
        scope = $rootScope.$new();

        SetController = $controller('SetController', {
            $stateParams: {
                set: 'test.set'
            }
        });
    }));

    it('should put set history on the scope', () => {
        expect(SetController.setHistory).toBeDefined();
    });
});
