describe('SetReport directive', () => {
    var $q,
        elm,
        scope,
        panes,
        setData,
        $compile,
        $timeout,
        hostname,
        controller,
        featureData,
        SetReportService;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( (_$q_, _$compile_, $rootScope, _$timeout_, _SetReportService_, _hostname_, _panes_) => {
        $q = _$q_;
        $timeout = _$timeout_;
        SetReportService = _SetReportService_;
        scope = $rootScope;
        $compile = _$compile_;
        hostname = _hostname_;
        panes = _panes_;

        hostname.host = 'test-host';

        let p = $q.defer();
        p.resolve({ hostnames: [{host: 'https://www.sharecare.com' }]});
        spyOn( SetReportService, 'getSetHostnames' )
            .and.returnValue(p.promise);

        spyOn( hostname, 'highlightEnvs').and.callThrough();
    }));

    beforeEach( () => {
        setData = [{
            setRunId: 2,
            browser: 'Chrome Local',
            startDate: new Date('2015-05-27 11:31:04'),
            hasFailures: true
        }, {
            setRunId: 1,
            browser: 'Chrome Local',
            startDate: new Date('2015-05-27 11:12:50'),
            hasFailures: false
        }];

        featureData = {
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
            }],
            'test/test3.feature': [{
                setRunId: 2,
                status: 'bugged',
                reportId: 10
            }, {
                setRunId: 1,
                status: 'bugpass',
                reportId: 11
            }]
        };

        mockSetReportService( setData, featureData );
        compileDirective();
    });

    it('should have set and report data available', () => {
        expect(controller.setData).toBe(setData);
        expect(controller.reportData).toBe(featureData);
    });

    describe('table', () => {
        it('should construct table headers', () => {
            let first = elm.find('table th:first + th').text();
            expect(first).toMatch(/Chrome$/m);
            expect(first).toMatch(/5.27,.11:31AM/);

            let last = elm.find('table th:last').text();
            expect(last).toMatch(/Chrome$/m);
            expect(last).toMatch(/5.27,.11:12AM/);

            expect(elm.find('table th').length).toBe(3);
        });

        it('should only show one parent directory and no extension', () => {
            let shortFeature = elm.find('tr td:first a').text();
            expect(shortFeature).toBe('test/test');
        });

        it('should link to features', () => {
            let firstLink = elm.find('tr td:first a').attr('href');
            expect(firstLink).toBe('#/features/test/test.feature');

            let secondLink = elm.find('tr:nth-child(2) td:first a').attr('href');
            expect(secondLink).toBe('#/features/test/test2.feature');
        });

        it('should apply classes based on status', () => {
            let tds = elm.find('td.status');
            expect(tds.hasClass('success')).toBe(true);
            expect(tds.hasClass('failure')).toBe(true);
            expect(tds.hasClass('bugged')).toBe(true);
            expect(tds.hasClass('bugpass')).toBe(true);
        });

    });

    it('should pass the host when getting set history', () => {
        let name = 'test.set',
            host = 'test-host',
            run = undefined;

        expect(SetReportService.getSetHistory)
            .toHaveBeenCalledWith({ name, host, run });
    });

    describe('auto-refresh', () => {
        it('should trigger when the hostname changes', () => {
            spyOn( controller, 'getSetHistoryData' );

            scope.$broadcast('hostname:changed');
            scope.$apply();

            expect(controller.getSetHistoryData).toHaveBeenCalled();
        });

        it('should trigger when a report ends', () => {
            spyOn( controller, 'getSetHistoryData' );

            scope.$broadcast('report:ended');
            scope.$apply();
            $timeout.flush();

            expect(controller.getSetHistoryData).toHaveBeenCalled();
        });
    });

    it('should suggest to use the hostname filter', () => {
        let helperText = elm.find('.filter-host i').attr('popover');
        expect(helperText).toBe(controller.wrongHostMessage);
    });

    it('should hide set runs from view', () => {
        controller.setRunDisplayCount = 1;
        scope.$apply();

        var headers = elm.find('th');
        expect(headers.length).toBe(2);

        var headerText = headers.text();
        expect(headerText.indexOf('Chrome Local'))
            .toBe(headerText.lastIndexOf('Chrome Local'));
    });

    it('should toggle the display of all sets on click', () => {
        controller.setRunDisplayCount = 1;
        scope.$apply();

        elm.find('.toggle-display-all').click();
        var headers = elm.find('th');
        expect(headers.length).toBe(3);
    });

    it('should emit progress events throughout its lifecycle', () => {
        let loading = 0,
            increment = 0;

        scope.$on('progress:loading', () => loading++ );
        scope.$on('progress:increment', () => increment++ );

        controller.getSetHistoryData();
        scope.$apply();

        expect(loading).toBe(1);
        expect(increment).toBeGreaterThan(2);
    });

    describe('rerunning', () => {
        let rerunLocator = '.rerun-failures';

        beforeEach( () => {
            spyOn( SetReportService, 'rerun' );
        });

        it('should delegate to the set report service for rerunning failures', () => {
            let rerun = elm.find(rerunLocator);
            rerun[0].click();

            expect(SetReportService.rerun).toHaveBeenCalled();
        });

        it('should pop open the report pane when rerunning', () => {
            spyOn( panes, 'openPane' );
            let rerun = elm.find(rerunLocator);
            rerun[0].click();

            expect(panes.openPane).toHaveBeenCalledWith( 'report' );
        });

        it('should not display the rerun dropdown for successful runs', () => {
            let dropdowns = elm.find(rerunLocator);
            expect(dropdowns.length).toBe(1);
        });

    });

    describe('hostname highlighting', () => {
        it('should highlight hostname app/env pairs', () => {
            let pairs = controller.highlightHostnames(),
                called = 0;

            pairs.then( ([{ app, env }]) => {
                called++;
                expect(app).toBe('SC');
                expect(env).toBe('prod');
            });

            scope.$apply();
            expect(called).toBe(1);
        });

        it('should reset the hostname highlights', () => {
            expect(hostname.highlightEnvs).toHaveBeenCalledWith([]);
        });
    });

    describe('for a specific run', () => {
        beforeEach( () => {
            elm = angular.element('<set-report set="test.set" run="123"></set-report>');
            $compile(elm)(scope);
            scope.$digest();

            controller = elm.isolateScope().SetReport;
        });

        it('should pass the run id in the history query', () => {
            let name = 'test.set',
                host = 'test-host',
                run = '123';

            expect(SetReportService.getSetHistory)
                .toHaveBeenCalledWith({ name, host, run });
        });

    });

    function compileDirective() {
        elm = angular.element('<set-report set="test.set" run=""></set-report>');
        $compile(elm)(scope);
        scope.$digest();

        controller = elm.isolateScope().SetReport;
    }

    function mockSetReportService( setData = 'setData', reportData = 'reportData' ) {
        let deferred = $q.defer();
        deferred.resolve( {} );
        let promise = deferred.promise;

        spyOn( SetReportService, 'getSetFeatures').and.returnValue( promise );
        spyOn( SetReportService, 'getSetHistory' ).and.returnValue( promise );
        spyOn( SetReportService, 'reorganizeReportData' ).and.callFake( () => {
            return { setData, reportData };
        });
    }
});
