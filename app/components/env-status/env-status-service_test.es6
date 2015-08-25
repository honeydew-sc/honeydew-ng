fdescribe('EnvStatus', function () {
    let results,
        httpMock,
        EnvStatus,
        HD_TOTAL,
        HD_SUCCESS,
        Environment;

    beforeEach(module('honeydew'));
    beforeEach(inject(function ($httpBackend, _EnvStatus_, _Environment_) {
        httpMock = $httpBackend;
        EnvStatus = _EnvStatus_;
        Environment = _Environment_;

        EnvStatus.apps = [ 'SC', 'DROZ' ];

        HD_TOTAL = HD_SUCCESS = 3;
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

    describe('HD summary calculation', () => {
        it('should calculate the generic honeydew summary when passing', () => {
            let status = results['SC, prod'];
            expect(status.hasOwnProperty('honeydew')).toBe(true);
            expect(status.honeydew.summary).toBe(true);
            expect(status.honeydew.percentage).toBe(100);
        });

        it('should calculate the droz passing summary as a flat failure count', () => {
            HD_TOTAL = 20;
            HD_SUCCESS = 6;
            let results = mockQuery( 'DROZ' );
            let droz = results['DROZ, prod'].honeydew;
            expect(droz.summary).toBe(true);
            expect(droz.percentage).toBe(39);
        });

        it('should calculate the droz failing summary as a flat failure count', () => {
            HD_TOTAL = 20;
            HD_SUCCESS = 5;
            let results = mockQuery( 'DROZ' );
            let droz = results['DROZ, prod'].honeydew;
            expect(droz.summary).toBe(false);
            expect(droz.percentage).toBe(35);
        });
    });

    it('should not have a summary for an invalid honeydew db lookup', () => {
        let query = mockedCheck( 'SC', 'al' );
        httpMock.expectGET(`/rest.php/envstatus/app/SC/env/al?check=${query}`)
            .respond( mockStatus( { details: [] } ) );
        let results = EnvStatus.query( app => app === 'SC', env => env === 'al' );
        httpMock.flush();

        expect(results['SC, al'].honeydew.hasOwnProperty('summary'))
               .toBe(false);
    });

    it('should derive the dashboard url', () => {
        let status = results['SC, prod'];
        expect(status.honeydew.url).toMatch(/dashboard\/index\.html\?.*build.*hostname/);
    });

    it('should add kabocha dashboard url for sharecare', () => {
        expect(results['SC, prod'].hasOwnProperty('kabocha')).toBe(true);
        expect(results['SC, prod'].kabocha.url).toBe(
            '/kabocha/dashboard.html'
        );
    });

    it('should add auth and data links to SC', () => {
        let healthcheck = results['SC, prod'].healthcheck;
        expect(healthcheck.hasOwnProperty('author')).toBe(true);
        expect(healthcheck.hasOwnProperty('data')).toBe(true);

        expect(healthcheck.author.url).toMatch(/auth.*sharecare/);
        expect(healthcheck.data.url).toMatch(/data.*sharecare/);
    });

    it('should not add auth and data to other apps', () => {
        let drozResults = mockQuery( 'DROZ' );
        let healthcheck = drozResults['DROZ, prod'].healthcheck;
        expect(healthcheck.hasOwnProperty('author')).toBe(false);
        expect(healthcheck.hasOwnProperty('data')).toBe(false);
    });

    it('should add a url to the status', () => {
        let status = results['SC, prod'];
        expect(status.url).toBe('https://www.sharecare.com');
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
        let status = 'ok';
        let suites = {
            pass: { status: 'ok' },
            fail: { status: 'not ok' }
        };

        let fakeKabocha = {
            "data": {
                "al": { status, suites },
                "al2": { status, suites },
                "cm": { status, suites },
                "cm2": { status, suites },
                "dw": { status, suites },
                "dw2": { status, suites },
                "jd": { status, suites },
                "kms": { status, suites },
                "mservices": { status, suites },
                "prod": { status, suites },
                "stage": { status, suites }
            },
            "result": 'SUCCESS'
        };

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

    function mockStatus ( honeydew = defaultHoneydewResponse() ) {
        let healthcheck = {
                summary: true
            },
            build = { webpub: '1.2.3.4' };

        return {
            healthcheck,
            build,
            honeydew
        };

    }

    function defaultHoneydewResponse() {
        // it is a little gross to use a global variable for this, but
        // on the other hand we get to be explicit in our tests about
        // what we're sending in, and we don't have to refactor all
        // those mock* functions at the bottom to let us pass through
        // a few more arguments.
        let success = HD_SUCCESS || 3;
        let total = HD_TOTAL || 3;
        return {
            details: [{
                id: "270707",
                setName: "drozOther.set",
                success,
                total
            }, {
                id: "270708",
                setName: "drozGalleryStart.set",
                success: "3",
                total: "3"
            }, {
                id: "270709",
                setName: "drozGalleryStart.set",
                success: "3",
                total: "3"
            }]
        };
    }

    function mockedCheck ( app = 'SC', env = 'prod' ) {
        return encodeURIComponent(Environment.getHealthcheckUrl( app, env ))
            .replace(/%3A/, ':');
    }
});
