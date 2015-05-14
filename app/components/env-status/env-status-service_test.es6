describe('EnvStatus', function () {
    let results,
        httpMock,
        EnvStatus,
        Environment;

    beforeEach(module('honeydew'));
    beforeEach(inject(function ($httpBackend, _EnvStatus_, _Environment_) {
        httpMock = $httpBackend;
        EnvStatus = _EnvStatus_;
        Environment = _Environment_;

        EnvStatus.apps = [ 'SC', 'DROZ' ];

        mockKabochaQuery();
        results = mockQuery( 'SC' );
    }));

    it('should return the results of a query', () => {
        expect(results['SC, prod'].healthcheck.summary).toBe(true);

        let drozResults = mockQuery( 'DROZ' );
        expect(drozResults['DROZ, prod'].healthcheck.summary).toBe(true);
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

    it('should calculate the honeydew summary', () => {
        let status = results['SC, prod'];
        expect(status.hasOwnProperty('honeydew')).toBe(true);
        expect(status.honeydew.summary).toBe(true);
    });

    it('should not have a summary for an invalid honeydew db lookup', () => {
        let query = mockedCheck( 'SC', 'al' );
        mockKabochaQuery();
        httpMock.expectGET(`/rest.php/envstatus/app/SC/env/al?check=${query}`)
            .respond( mockStatus( { success: 0, total: 0 } ) );
        let results = EnvStatus.query( app => app === 'SC', env => env === 'al' );
        httpMock.flush();

        expect(results['SC, al'].honeydew.hasOwnProperty('summary'))
               .toBe(false);
    });

    it('should derive the dashboard url', () => {
        let status = results['SC, prod'];
        expect(status.honeydew.url).toMatch(/dashboard.*build.*hostname/);
    });

    it('should talk to kabocha for sharecare', () => {
        expect(results['SC, prod'].hasOwnProperty('kabocha')).toBe(true);


    });

    function mockQuery( app ) {
        mockHoneydewQuery( app );
        // kick off the requests...
        let results = EnvStatus.query( qApp => qApp === app, env => env === 'prod' );
        // and resolve the promises
        httpMock.flush();

        return results;
    }

    function mockKabochaQuery( ) {
        let fakeKabocha = '{"result":"SUCCESS","data":{"prod":{"status":"ok"},"stage":{"status":"ok"},"dw2":{"status":"ok"},"al2":{"status":"ok"},"cm2":{"status":"ok"},"kms":{"status":"ok"},"mservices":{"status":"ok"},"jd":{"status":"ok"},"dw":{"status":"ok"},"al":{"status":"ok"},"cm":{"status":"ok"}}}';

        httpMock.expectGET('/kabocha/api.php/logs/kabocha/status')
            .respond(fakeKabocha);
    }

    function mockHoneydewQuery( app ) {
        let env = 'prod';

        // the ng-resource encoder doesn't encode ':', so we need to
        // switch it back
        let query = mockedCheck( app, env );

        httpMock.expectGET(`/rest.php/envstatus/app/${app}/env/${env}?check=${query}`)
            .respond( mockStatus() );
    }

    function mockStatus ( honeydew = { success: 8, total: 10 } ) {
        let healthcheck = {
                summary: true,
                author: true,
                webpub: true,
                data: true
            },
            build = { webpub: '1.2.3.4' };

        return {
            healthcheck,
            build,
            honeydew
        };

    }

    function mockedCheck ( app = 'SC', env = 'prod' ) {
        return encodeURIComponent(Environment.getHealthcheckUrl( app, env ))
            .replace(/%3A/, ':');
    }
});
