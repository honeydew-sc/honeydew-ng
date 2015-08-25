describe('KabochaStatus', function () {
    let KabochaStatus, httpMock, kabochaStatusPromise;

    beforeEach(module('honeydew'));
    beforeEach(inject(( _KabochaStatus_, $httpBackend ) => {
        KabochaStatus = _KabochaStatus_;
        httpMock = $httpBackend;

        mockKabochaQuery();
        kabochaStatusPromise = KabochaStatus.get( 'SC' );
    }));

    it('should derive the kabocha summary', () => {
        kabochaStatusPromise.then( ( statuses ) => {
            Object.keys(statuses).forEach( ( env ) => {
                expect( statuses[env].summary ).toBe(true);
            });
        });

        httpMock.flush();
    });

    it('should collect the successful suites', () => {
        kabochaStatusPromise.then( ( statuses ) => {
            Object.keys(statuses).forEach( ( env ) => {
                expect( statuses[env].success ).toEqual([ 'success', 'success2' ]);
            });
        });

        httpMock.flush();
    });

    it('should collect the failing suites', () => {
        kabochaStatusPromise.then( ( statuses ) => {
            Object.keys(statuses).forEach( ( env ) => {
                expect( statuses[env].failure ).toEqual([ 'failure' ]);
            });
        });

        httpMock.flush();
    });

    it('should hackily memoize the request & processing', () => {
        let called = 0;
        kabochaStatusPromise.then( ( statuses ) => {
            called++;
            expect(called).toBe(1);
        });
        // this should trigger the memoized path through the fn,
        // avoiding the network request and result processing.
        KabochaStatus.get( 'SC' );

        httpMock.flush();

    });

    function mockKabochaQuery( ) {
        let status = 'ok';
        let suites = {
            success: { status: 'ok' },
            success2: { status: 'ok' },
            failure: { status: 'not ok' }
        };

        let fakeKabocha = {
            data: {
                al: { status, suites },
                al2: { status, suites },
                cm: { status, suites },
                cm2: { status, suites },
                dw: { status, suites },
                dw2: { status, suites },
                jd: { status, suites },
                kms: { status, suites },
                mservices: { status, suites },
                prod: { status, suites },
                stage: { status, suites }
            },
            result: 'SUCCESS'
        };

        httpMock.expectGET('/kabocha/api.php/logs/kabocha/status')
            .respond(fakeKabocha);
    }
});
