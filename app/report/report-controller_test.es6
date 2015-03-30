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
            .respond({ result: 'contents' });
        httpMock.flush();
        expect(ReportCtrl.output).toContain( 'contents' );
    });

    it('should highlight the output accordingly', () => {
        httpMock.expectGET('/rest.php/report/1')
            .respond({ result: '# Success' });
        httpMock.flush();

        expect(ReportCtrl.output).toContain( '# Success' );
        expect(ReportCtrl.output).toMatch( /<span class=".*<\/span>/ );

    });

    // it('should start a replacement job', () => {
    //     httpMock.expectGET('/rest.php/report/1')
    //         .respond({
    //             browser: "Chrome Local",
    //             buildNumber: "4.17.5.20150325-1955",
    //             endDate: "2015-03-27 15:22:16",
    //             featureFile: "/test/dan.feature",
    //             host: "https://www.sharecare.com",
    //             id: "49",
    //             jobId: "da47b651-7fae-4329-a1aa-a9c06747e33d",
    //             project: "sharecare",
    //             result: "result",
    //             setRunId: null,
    //             startDate: "2015-03-27 15:22:09",
    //             status: "failure",
    //             success: "true",
    //             userId: "5"
    //         });
    //     httpMock.flush();

    //     httpMock.expectPOST('/rest.php/jobs', {})
    //         .respond({ contents: 'success' });
    //     ReportCtrl.replaceReportInSet();
    //     httpMock.flush();
    // })
    ;
});
