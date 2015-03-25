'use strict';

describe('ReportCtrl', function () {
    var scope,
        httpMock,
        stateParams,
        ReportCtrl;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        scope = $rootScope.$new();
        httpMock = $httpBackend;

        stateParams = {
            report: 1
        };

        ReportCtrl = $controller('ReportCtrl', {
            $scope: scope,
            $stateParams: stateParams
        });
    }));

    it('should go get a single report', () => {
        httpMock.expectGET('/rest.php/report/1')
            .respond({ report: 'contents' });
        httpMock.flush();
        expect(ReportCtrl.output).toBe( 'contents' );
    });

    it('should highlight the output accordingly', () => {
        httpMock.expectGET('/rest.php/report/1')
            .respond({ report: '# Success' });
        httpMock.flush();

        expect(ReportCtrl.output).toContain( '# Success' );
        expect(ReportCtrl.output).toMatch( /<span class=".*<\/span>/ );

    });
});
