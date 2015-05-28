describe('SetReport directive', () => {
    var $q,
        elm,
        scope,
        $compile,
        controller,
        SetReportService;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( (_$q_, _$compile_, $rootScope, _SetReportService_) => {
        $q = _$q_;
        SetReportService = _SetReportService_;
        scope = $rootScope;
        $compile = _$compile_;
    }));

    it('should have set and report data available', () => {
        mockSetReportService();
        compileDirective();

        expect(controller.setData).toBe('setData');
        expect(controller.reportData).toBe('reportData');
    });

    it('should construct table headers', () => {
        let setData = [{
            setRunId: 10,
            browser: 'Chrome Local',
            startDate: '2015-05-27 11:31:04'
        }, {
            setRunId: 9,
            browser: 'Chrome Local',
            startDate: '2015-05-27 11:12:50'
        }];

        mockSetReportService( setData );
        compileDirective();

        let first = elm.find('table th:first + th').text();
        expect(first).toMatch(setData[0].browser);
        expect(first).toMatch(setData[0].startDate);

        let last = elm.find('table th:last').text();
        expect(last).toMatch(setData[1].browser);
        expect(last).toMatch(setData[1].startDate);

        expect(elm.find('table th').length).toBe(3);
    });

    function compileDirective() {
        elm = angular.element('<set-report set="test.set"></set-report>');
        $compile(elm)(scope);
        scope.$digest();

        controller = elm.isolateScope().SetReport;
    }

    function mockSetReportService( setData = 'setData', reportData = 'reportData' ) {
        let promise = $q.defer();
        promise.resolve( {} );

        spyOn( SetReportService, 'getSetFeatures').and.returnValue( promise );
        spyOn( SetReportService, 'getSetHistory' ).and.returnValue( promise );
        spyOn( SetReportService, 'reorganizeReportData' ).and.callFake( () => {
            return { setData, reportData };
        });
    }
});
