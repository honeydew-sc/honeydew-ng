describe('FileTreeCtrl', function () {
    var httpMock, scope, FileTreeCtrl, location, controller;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, $location) {
        controller = $controller;
        httpMock = $httpBackend;
        location = $location;
        scope = $rootScope.$new();
    }));

    it('should have the appropriate tree data', function () {
        httpMockTree('features');

        let featuresTab = scope.tabs[0];
        expect(featuresTab.label).toBe('Features');
        expect(featuresTab.data).toEqual([{ label: 'features', children: [] }]);
        expect(featuresTab.data[0].label).toBe(featuresTab.label.toLowerCase());
    });

    it('should set the active tab based on the url', function () {
        location.path('/sets/blah-blah/');
        httpMockTree('sets');

        scope.tabs.forEach(function (tab) {
            if (tab.label.toLowerCase() === 'sets') {
                expect(tab.active).toBe(true);
            }
        });
    });

    function httpMockTree( label ) {
        let children = [];
        httpMock.expectGET('/rest.php/tree/' + label).respond({
            success: true,
            tree: [{ label, children }]
        });

        FileTreeCtrl = controller('FileTreeCtrl', {
            $scope: scope
        });

        httpMock.flush();
        scope.$apply();
    }
});
