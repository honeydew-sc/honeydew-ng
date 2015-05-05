describe('StatusController', function () {
    var scope,
        httpMock,
        EnvStatus,
        stateParams,
        StatusController;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, _EnvStatus_) {
        scope = $rootScope.$new();
        httpMock = $httpBackend;
        EnvStatus = _EnvStatus_;

        stateParams = {};

        spyOn(EnvStatus, 'query').and.returnValue({
            SC: {
                healthcheck: { summary: true },
                honeydew: { summary: true }
            }
        });

        StatusController = $controller('StatusController', {
            $scope: scope,
            $stateParams: stateParams
        });
    }));

    it('should query the backend for statuses', () => {
        expect(EnvStatus.query).toHaveBeenCalled();

        expect(StatusController.statuses
               .SC.healthcheck.summary).toBe(true);
        expect(StatusController.statuses
               .SC.honeydew.summary).toBe(true);
    });
});
