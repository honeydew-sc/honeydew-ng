'use strict';

describe('ReportCtrl', function () {
    var scope,
        location,
        httpMock,
        ReportCtrl,
        liveReport,
        stateParams;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, $location, _liveReport_, Settings) {
        location = $location;
        scope = $rootScope.$new();
        httpMock = $httpBackend;
        liveReport = _liveReport_;
        Settings.reset();

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
        expect(ReportCtrl.result.output.join('')).toContain( 'contents' );
    });

    it('should highlight the output accordingly', () => {
        httpMock.expectGET('/rest.php/report/1')
            .respond({ result: '# Success' });
        httpMock.flush();

        expect(ReportCtrl.result.output.join('')).toContain( '# Success' );
        expect(ReportCtrl.result.output[0]).toMatch( /<span class=".*<\/span>/ );

    });

    it('should start a replacement job', () => {
        var browser = 'Chrome Local',
            file = "/test/dan.feature",
            host = "https://www.sharecare.com",
            reportId = 49,
            userId = 5,
            channel = 'channel';

        httpMock.expectGET('/rest.php/report/1')
            .respond({
                browser,
                userId,
                featureFile: file,
                host,
                id: reportId,
                result: "result",
                setRunId: 5,
                status: "failure",
                success: "true"
            });
        httpMock.flush();

        spyOn(liveReport, 'switchChannel').and.returnValue(channel);
        browser = [ browser ];
        httpMock.expectPOST('/rest.php/jobs', {
            browser,
            file,
            host,
            userId,
            channel,
            reportId,
            server: "Localhost",
            local: "Localhost"
        })
            .respond({ contents: 'success' });
        ReportCtrl.replaceReportInSet();
        httpMock.flush();
    });

});
