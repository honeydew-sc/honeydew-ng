describe('StatusController', function () {
    var $q,
        scope,
        httpMock,
        deferred,
        EnvStatus,
        stateParams,
        StatusController;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, _$q_, _EnvStatus_ ) {
        scope = $rootScope.$new();
        httpMock = $httpBackend;
        EnvStatus = _EnvStatus_;
        $q = _$q_;

        stateParams = {};

        EnvStatus.statuses = {};
        EnvStatus.statuses['SC, prod'] = {
                healthcheck: { summary: true },
                honeydew: { summary: true }
            };

        spyOn(EnvStatus, 'query');

        StatusController = $controller('StatusController', {
            $scope: scope,
            EnvStatus: EnvStatus
        });
    }));

    it('should query the backend for statuses', () => {
        expect(EnvStatus.query).toHaveBeenCalled();
    });

    it('should make the statuses available on the vm', () => {
        expect(StatusController.statuses['SC, prod']
               .healthcheck.summary).toBe(true);
        expect(StatusController.statuses['SC, prod']
               .honeydew.summary).toBe(true);
    });
});
