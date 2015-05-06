describe('StatusController', function () {
    var $q,
        scope,
        httpMock,
        deferred,
        EnvStatus,
        StatusController;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, _$q_, _EnvStatus_ ) {
        scope = $rootScope.$new();
        httpMock = $httpBackend;
        EnvStatus = _EnvStatus_;
        $q = _$q_;
    }));

});
