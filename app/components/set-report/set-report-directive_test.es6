describe('SetReport directive', () => {
    var $q,
        elm,
        scope,
        setData,
        $compile,
        controller,
        featureData,
        SetReportService;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( (_$q_, _$compile_, $rootScope, _SetReportService_, hostname) => {
        $q = _$q_;
        SetReportService = _SetReportService_;
        scope = $rootScope;
        $compile = _$compile_;

        hostname.host = 'test-host';
    }));

    beforeEach( () => {
        setData = [{
            setRunId: 2,
            browser: 'Chrome Local',
            startDate: new Date('2015-05-27 11:31:04')
        }, {
            setRunId: 1,
            browser: 'Chrome Local',
            startDate: new Date('2015-05-27 11:12:50')
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
            }]
        };

        mockSetReportService( setData, featureData );
        compileDirective();
    });

    it('should have set and report data available', () => {
        expect(controller.setData).toBe(setData);
        expect(controller.reportData).toBe(featureData);
    });

    it('should construct table headers', () => {
        let first = elm.find('table th:first + th').text();
        expect(first).toMatch(/Chrome$/m);
        expect(first).toMatch('5-27, 11:31AM');

        let last = elm.find('table th:last').text();
        expect(last).toMatch(/Chrome$/m);
        expect(last).toMatch('5-27, 11:12AM');

        expect(elm.find('table th').length).toBe(3);
    });

    it('should only show one parent directory and no extension', () => {
        let shortFeature = elm.find('tr td:first a').text();
        expect(shortFeature).toBe('test/test');
    });

    it('should link to features', () => {
        let firstLink = elm.find('tr td:first a').attr('href');
        expect(firstLink).toBe('#/features/test/test.feature');

        let secondLink = elm.find('tr:last td:first a').attr('href');
        expect(secondLink).toBe('#/features/test/test2.feature');
    });

    it('should pass the host when getting set history', () => {
        expect(SetReportService.getSetHistory).toHaveBeenCalledWith(
            'test.set', 'test-host'
        );
    });

    it('should refresh itself when the hostname changes', () => {
        spyOn( controller, 'getSetHistoryData' );

        scope.$broadcast('hostname:changed');
        scope.$apply();

        expect(controller.getSetHistoryData).toHaveBeenCalled();
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
        expect(increment).toBe(2);
    });

    function compileDirective() {
        elm = angular.element('<set-report set="test.set"></set-report>');
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
