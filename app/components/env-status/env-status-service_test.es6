describe('EnvStatus', function () {
    let results,
        httpMock,
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
            var query = encodeURIComponent(Environment.getHealthcheckUrl( app, env ))
                    .replace(/%3A/, ':');

            httpMock.expectGET(`/rest.php/envstatus/app/${app}/env/${env}?check=${query}`)
                .respond( mockStatus( app ) );
        });

        // kick off the requests...
        results = EnvStatus.query( () => true, env => env === 'prod' );
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

    it('should cache all statuses and summaries', () => {
        expect(statuses['SC, prod'].healthcheck.summary).toBe(true);
        expect(statuses['DROZ, prod'].healthcheck.summary).toBe(true);
    });

    it('should return the results of a query', () => {
        expect(results['SC, prod'].healthcheck.summary).toBe(true);
        expect(results['DROZ, prod'].healthcheck.summary).toBe(true);
    });

    it('should make the $promise available ', () => {
        expect(results.$promise).toBeDefined();
        var resolved = results.$promise.$$state.status;
        expect(resolved).toBe(1);
    });

    it('should filter out unwanted applications', () => {
        let results = EnvStatus.query( app => app === 'SC', env => env === 'prod' );
        expect(Object.keys(results)).toContain('SC, prod');
    });

    it('should filter out unwanted environments', () => {
        let results = EnvStatus.query( undefined, env => env === 'stage' );
        expect(Object.keys(results)).toContain('SC, stage');
        expect(Object.keys(results)).toContain('DROZ, stage');
    });
});
