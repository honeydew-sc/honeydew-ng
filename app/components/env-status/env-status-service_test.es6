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

        EnvStatus.apps = [ 'SC', 'DROZ' ];

        EnvStatus.apps.map( app => {
            var env = 'prod';

            // the ng-resource encoder doesn't encode ':', so we need to
            // switch it back
            var query = encodeURIComponent(Environment.getEnvUrl( app, env ))
                    .replace(/%3A/, ':');

            httpMock.expectGET(`/rest.php/envstatus/app/${app}/env/${env}?check=${query}`)
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
        EnvStatus.apps.map( app => {
            expect(statuses[app].healthcheck.summary).toBe(true);
        });
    });
});
