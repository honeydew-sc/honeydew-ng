describe('SetController', function () {
    var scope,
        httpMock,
        $controller,
        SetController;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ( _$controller_, $rootScope, $httpBackend, CmDomHelpers ) {
        httpMock = $httpBackend;
        $controller = _$controller_;
        scope = $rootScope.$new();

        SetController = $controller( 'SetController', {
            $stateParams: {
                set: 'test.set'
            }
        });
    }));

    it('should put the set name on the scope', () => {
        expect(SetController.setName).toBe( 'test.set' );
        expect(SetController.run).toBe( '' );
    });

    it('should put the set run id on scope if it has one', () => {
        let ctrl = $controller( 'SetController', {
            $stateParams: {
                set: 'test.set',
                run: '123'
            }
        });

        expect(ctrl.run).toBe('123');
    });

});
