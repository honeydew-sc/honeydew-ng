fdescribe('SetReport directive', () => {
    var $q,
        elm,
        scope,
        controller,
        SetReportService;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( ($q, $compile, $rootScope, _SetReportService_) => {
        SetReportService = _SetReportService_;

        let promise = $q.defer();
        promise.resolve( {} );
        spyOn( SetReportService, 'getSetFeatures').and.returnValue( promise );
        spyOn( SetReportService, 'getSetHistory' ).and.returnValue( promise );
        spyOn( SetReportService, 'reorganizeReportData' ).and.callFake( () => {
            let setData = 'setData',
                reportData = 'reportData';

            return { setData, reportData };
        });

        elm = angular.element('<set-report set="test.set"></set-report>');
        scope = $rootScope;
        $compile(elm)(scope);
        scope.$digest();

        controller = elm.isolateScope().SetReport;


    }));

    it('should have set and report data available', () => {
        expect(controller.setData).toBe('setData');
        expect(controller.reportData).toBe('reportData');
    });
});
