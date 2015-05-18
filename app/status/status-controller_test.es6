describe('StatusController', function () {
    var scope,
        httpMock,
        controller,
        stateParams,
        Environment,
        StatusController;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, _Environment_) {
        scope = $rootScope.$new();
        httpMock = $httpBackend;
        Environment = _Environment_;
        controller = $controller;
    }));

    function initControllerWithParams( params ) {
        StatusController = controller('StatusController', {
            $scope: scope,
            $stateParams: params
        });
    }

    it('should select all applications by default', () => {
        initControllerWithParams( {} );
        expect(StatusController.apps).toEqual(Object.keys(Environment.apps));
    });

    it('should narrow to SC when specified in state params', () => {
        initControllerWithParams({ app: 'SC' });
        expect(StatusController.apps).toEqual([ 'SC' ] );
    });

    it('should filter to all army envs for DoD', () => {
        initControllerWithParams({ app: 'DoD' });
        expect(StatusController.apps).toEqual([ 'Army', 'TMA' ] );
    });

    it('should accept a comma delimited list of apps', () => {
        initControllerWithParams({ app: 'SC,DROZ' });
        expect(StatusController.apps).toEqual([ 'SC', 'DROZ' ] );
    });

    it('should accept DoD as part of a list', () => {
        initControllerWithParams({ app: 'DROZ,DoD' });
        expect(StatusController.apps).toEqual([ 'DROZ', 'Army', 'TMA' ] );
    });
});
