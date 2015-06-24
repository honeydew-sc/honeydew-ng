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
            startDate: '2015-05-27 11:31:04'
        }, {
            setRunId: 1,
            browser: 'Chrome Local',
            startDate: '2015-05-27 11:12:50'
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
        expect(first).toMatch(setData[0].browser);
        expect(first).toMatch(setData[0].startDate);

        let last = elm.find('table th:last').text();
        expect(last).toMatch(setData[1].browser);
        expect(last).toMatch(setData[1].startDate);

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
