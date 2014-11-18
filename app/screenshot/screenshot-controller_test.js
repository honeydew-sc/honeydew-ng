'use strict';

describe('ScreenshotCtrl', function () {
    var httpMock, scope, ScreenshotCtrl;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        httpMock = $httpBackend;
        scope = $rootScope.$new();

        ScreenshotCtrl = $controller('ScreenshotCtrl', {
            $scope: scope
        });
    }));

    it('should be instantiated?', function () {

    });
});
