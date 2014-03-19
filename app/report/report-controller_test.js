'use strict';

describe('Controller: ReportCtrl', function () {
    var httpMock, scope, ReportCtrl;
    beforeEach(module('honeydew'));

    beforeEach(inject(function($controller, $rootScope, $httpBackend) {
        httpMock = $httpBackend;
        scope = $rootScope.$new();

        ReportCtrl = $controller('ReportCtrl', {
            $scope: scope,
            $stateParams: {
                id: 'id'
            }
        });
    }));

    iit('should get the channel from the url', function() {

    });
});
