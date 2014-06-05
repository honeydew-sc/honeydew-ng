'use strict';

describe('SetCtrl', function () {
    var httpMock, scope, SetCtrl;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        httpMock = $httpBackend;
        scope = $rootScope.$new();

        SetCtrl    = $controller('SetCtrl', {
                $scope: scope
            });
    }));

    it('should have a file on the scope', function () {
        expect(scope.file).toBeDefined();
    });
});
