fdescribe('SetReportService', function () {
    var $q,
        $scope,
        Files,
        SetReportService;

    beforeEach(module('honeydew'));
    beforeEach(inject(function ($rootScope, _$q_, _SetReportService_, _Files_) {
        $scope = $rootScope;
        $q = _$q_;
        Files = _Files_;
        SetReportService = _SetReportService_;
    }));

    function mockGetFeatures () {
        spyOn( Files , 'get' ).and.callFake( () => {
            let p = $q.defer();
            p.resolve({
                contents: `features/test.feature
                features/test2.feature`
            });
            return { $promise: p.promise };
        });
    }

    it('should get the list of features for a set', () => {
        mockGetFeatures();

        let called = 0;
        SetReportService.getSetFeatures('test.set')
            .then( res => {
                called++;
                expect(res.features).toEqual( [
                    'features/test.feature',
                    'features/test2.feature'
                ]);
            });

        $scope.$apply();
        expect(called).toBe(1);
        expect(Files.get).toHaveBeenCalledWith({
            file: 'sets%2Ftest.set'
        });
    });
});
