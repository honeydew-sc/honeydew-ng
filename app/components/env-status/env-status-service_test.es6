ddescribe('HealthcheckStatus', function () {
    let httpMock,
        mockHealthcheck,
        HealthcheckStatus;


    beforeEach(module('honeydew'));
    beforeEach(inject(function ($httpBackend, _HealthcheckStatus_) {
        httpMock = $httpBackend;
        HealthcheckStatus = _HealthcheckStatus_;

        mockHealthcheck = {
            stage: {
                author: true,
                webpub: true,
                data: true,
                summary: true
            }
        };
    }));

    it('should exist', () => {
        httpMock.expectGET('/rest.php/envstatus/stage/healthcheck')
            .respond(mockHealthcheck);
        httpMock.expectGET('/rest.php/envstatus/prod/healthcheck')
            .respond(mockHealthcheck);

        var ret = HealthcheckStatus.query();
        console.log(ret);
        httpMock.flush();
    });
});
