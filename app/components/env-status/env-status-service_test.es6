describe('EnvStatus', function () {
    let httpMock,
        statuses,
        EnvStatus,
        Environment;

    beforeEach(module('honeydew'));
    beforeEach(inject(function ($httpBackend, _EnvStatus_, _Environment_) {
        httpMock = $httpBackend;
        EnvStatus = _EnvStatus_;
        Environment = _Environment_;

        EnvStatus.apps = [ 'SC', 'Army' ];

        EnvStatus.apps.map( app => {
            httpMock.expectGET(`/rest.php/envstatus/app/${app}/env/prod`)
                .respond( mockStatus( app ) );
        });

        // kick off the requests...
        EnvStatus.query();
        // and resolve the promises
        httpMock.flush();

        statuses = EnvStatus.statuses;
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
        expect(statuses.SC.healthcheck.summary).toBe(true);
        expect(statuses.Army.healthcheck.summary).toBe(true);
    });
});
