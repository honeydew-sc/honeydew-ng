describe('EnvStatus', function () {
    let httpMock,
        Environment,
        EnvStatus;


    beforeEach(module('honeydew'));
    beforeEach(inject(function ($httpBackend, _EnvStatus_, _Environment_) {
        httpMock = $httpBackend;
        EnvStatus = _EnvStatus_;
        Environment = _Environment_;
    }));

    function mockStatus ( app ) {
        return {
            healthcheck: {
                summary: true,
                author: true,
                webpub: true,
                data: true
            },
            honeydew: {
                summary: true
            },
            kabocha: {
                summary: true
            }
        };
    }

    it('should get production statuses and summaries', () => {
        EnvStatus.apps = [ 'SC', 'Army' ];

        EnvStatus.apps.map( app => {
            httpMock.expectGET(`/rest.php/envstatus/app/${app}/env/prod`)
                .respond( mockStatus( app ) );
        });

        var statuses = EnvStatus.query();
        httpMock.flush();

        expect(statuses.SC.healthcheck.summary).toBe(true);
        expect(statuses.Army.healthcheck.summary).toBe(true);
    });
});
