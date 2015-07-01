describe('SetReportService', function () {
    var $q,
        $rootScope,
        Files,
        SetReport,
        httpMock,
        LiveReport,
        SetReportService;

    beforeEach(module('honeydew'));
    beforeEach(inject(function (_$rootScope_, _$q_, _SetReport_, _SetReportService_, _Files_, $httpBackend, _liveReport_) {
        $rootScope = _$rootScope_;
        $q = _$q_;
        Files = _Files_;
        SetReport = _SetReport_;
        SetReportService = _SetReportService_;
        httpMock = $httpBackend;
        LiveReport = _liveReport_;

        spyOn( _liveReport_, 'switchChannel' );
    }));

    it('should get the list of features for a set', () => {
        mockGetFeatures();

        let called = 0;
        SetReportService.getSetFeatures('test.set')
            .then( res => {
                called++;
                expect(res.features).toEqual( [
                    'test/test.feature',
                    'test/test2.feature'
                ]);
            });

        $rootScope.$apply();
        expect(called).toBe(1);
        expect(Files.get).toHaveBeenCalledWith({
            file: 'sets%2Ftest.set'
        });
    });

    it('should sort the feature list alphabetically', () => {
        mockGetFeatures([
            "test/c.feature",
            "test/b.feature",
            "test/a.feature"
        ].join("\n"));

        let called = 0;
        SetReportService.getSetFeatures('test.set')
            .then( res => {
                called++;
                expect(res.features).toEqual( [
                    "test/a.feature",
                    "test/b.feature",
                    "test/c.feature"
                ]);
            });

        $rootScope.$apply();
        expect(called).toBe(1);
    });

    it('should get the history of a set by name', () => {
        mockGetSetHistory();

        let called = 0;
        SetReportService.getSetHistory( 'test.set' )
            .then( res => {
                called++;
                expect(res.reports).toEqual([{
                    reportId: 1,
                    setRunId: 2,
                    startDate: 'start date',
                    host: 'host',
                    user: 'user'
                }]);
            });

        $rootScope.$apply();
        expect(called).toBe(1);
        expect(SetReport.get).toHaveBeenCalledWith({
            name: 'test.set',
            host: undefined
        });
    });

    it('should combine features with set history data', () => {
        let browser = 'Chrome local',
            startDate = '2015-05-27 11:12:50',
            host = 'host',
            user = 'user';

        let features = [
            'test/test.feature',
            'test/test2.feature'
        ],
            reports = [{
                browser, startDate, host, user,
                featureFile: "/./test/test.feature",
                reportId: "3",
                setRunId: "2",
                status: "success"
            }, {
                browser, startDate, host, user,
                featureFile: "/./test/test.feature",
                reportId: "1",
                setRunId: "1",
                status: "success"
            }, {
                browser, startDate, host, user,
                featureFile: "/./test/test2.feature",
                reportId: "2",
                setRunId: "1",
                status: "failure"
            }];

        let { setData, reportData } = SetReportService.reorganizeReportData( [ { features }, { reports }] );

        startDate = new Date(startDate);
        expect(setData).toEqual([
            { setRunId: 2, startDate, browser, host, user },
            { setRunId: 1, startDate, browser, host, user }
        ]);

        expect(reportData).toEqual({
            'test/test.feature': [{
                setRunId: 2,
                status: 'success',
                reportId: 3
            }, {
                setRunId: 1,
                status: 'success',
                reportId: 1
            }],
            'test/test2.feature': [{
                setRunId: 2
            }, {
                setRunId: 1,
                status: 'failure',
                reportId: 2
            }]
        });
    });

    it('should figure out which features are failed', () => {
        let reportData = {
            "test/test.feature": [
                { "setRunId":2, "status":"success", "reportId":3 },
                { "setRunId":1, "status":"success", "reportId":1 }
            ],
            "test/test2.feature": [
                { "setRunId":2 },
                { "setRunId":1, "status":"failure", "reportId":2 }
            ]
        };

        let failed = SetReportService.missingOrFailed( 1, reportData );
        expect(failed).toEqual([ 'test/test2.feature' ]);
    });

    it('should figure out which features are missing', () => {
        let reportData = {
            "test/test.feature": [
                { "setRunId":2, "status":"success", "reportId":3 },
                { "setRunId":1, "status":"success", "reportId":1 }
            ],
            "test/test2.feature": [
                { "setRunId":2 },
                { "setRunId":1, "status":"failure", "reportId":2 }
            ]
        };

        let missing = SetReportService.missingOrFailed( 2, reportData );
        expect(missing).toEqual([ 'test/test2.feature' ]);
    });

    it('should combine features that are failed and missing', () => {
        let reportData = {
            "test/test.feature": [
                { "setRunId":3, "status":"success", "reportId":1 }
            ],
            "test/test2.feature": [
                { "setRunId":3, "status":"failure", "reportId":2 }
            ],
            "test/test3.feature": [
                { "setRunId":3 }
            ]
        };

        let missingOrFailed = SetReportService.missingOrFailed( 3, reportData );
        expect(missingOrFailed).toEqual([ 'test/test2.feature', 'test/test3.feature' ]);
    });

    describe('rerunning', () => {
        let rerunJobs;

        beforeEach( () => {
            let setData = {
                browser: 'browser',
                host: 'host',
                user: 'user',
                startDate: 'startDate'
            };

            httpMock.expectPOST('/rest.php/jobs').respond({});
            httpMock.expectPOST('/rest.php/jobs').respond({});

            let { jobs } = SetReportService.rerun( [ 'test/test1.feature', 'test/test2.feature' ], setData );
            rerunJobs = jobs;

            httpMock.flush();
        });

        it('should compose jobs to be rerun with the proper attributes', () => {
            rerunJobs.map( job => {
                expect(job.hasOwnProperty('user')).toBe(false);
                expect(job.hasOwnProperty('startDate')).toBe(false);
                expect(job.queue).toBe(true);
            });
        });

        it('should construct a single channel and switch to it', () => {
            expect(rerunJobs[0].channel).toBe(rerunJobs[1].channel);
            expect(LiveReport.switchChannel).toHaveBeenCalledWith( rerunJobs[1].channel );
        });

        it('should include the feature name in the payload', () => {
            expect(rerunJobs[0].file).toBe('test/test1.feature');
            expect(rerunJobs[1].file).toBe('test/test2.feature');
        });
    });

    function mockGetFeatures ( contents = "test/test.feature\ntest/test2.feature" ) {
        spyOn( Files , 'get' ).and.callFake( () => {
            let p = $q.defer();
            p.resolve({ contents });
            return { $promise: p.promise };
        });
    }

    function mockGetSetHistory () {
        spyOn( SetReport , 'get' ).and.callFake( () => {
            let p = $q.defer();
            p.resolve({
                success: true,
                reports: [{
                    reportId: 1,
                    setRunId: 2,
                    startDate: 'start date',
                    host: 'host',
                    user: 'user'
                }]
            });
            return { $promise: p.promise };
        });

    }
});
