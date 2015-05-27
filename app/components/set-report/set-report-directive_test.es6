fdescribe('SetReport directive', () => {
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

    it('should do some other stuff ', () => {
        let setData = [{
            "10": {
                "browser": "Chrome Local",
                "startDate": "2015-05-27 11:31:04"
            }
        }, {
            "9": {
                "browser": "Chrome Local",
                "startDate": "2015-05-27 11:12:50"
            }
        }];

        mockSetReportService( setData );
        compileDirective();

        let header = elm.find('table th[data-set-report-id="10"]').text();
        expect(header).toMatch(setData[0]['10'].browser);
        expect(header).toMatch(setData[0]['10'].startDate);
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
