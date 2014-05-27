'use strict';

describe('MonitorCtrl', function () {
    var httpMock, scope, MonitorCtrl;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        httpMock = $httpBackend;
        scope = $rootScope.$new();

        MonitorCtrl = $controller('MonitorCtrl', {
            $scope: scope
        });
    }));

    it('should be instantiated?', function () {

    });
});
