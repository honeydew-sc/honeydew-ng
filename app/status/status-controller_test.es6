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

        spyOn(EnvStatus, 'query').and.callFake( () => {
            EnvStatus.statuses = {
                SC: {
                    healthcheck: { summary: true },
                    honeydew: { summary: true }
                }
            };

            var deferred = $q.defer();
            deferred.resolve({});
            return deferred.promise;
        });

        StatusController = $controller('StatusController', {
            $scope: scope,
            $stateParams: stateParams
        });
    }));

    it('should query the backend for statuses', () => {
        scope.$apply();

        expect(StatusController.statuses
               .SC.healthcheck.summary).toBe(true);
        expect(StatusController.statuses
               .SC.honeydew.summary).toBe(true);
    });
});
