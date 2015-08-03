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

        // TODO: since this is an old component, it's not set up as a
        // directive. as a result, even though the template has a hook
        // to invoke getTreeContents for the active tab on its own,
        // the controller on its own doesn't do it, so we need to fake
        // it out here. this needs to be refactored into a directive
        // and then we won't need to kludge this on our own.
        let tab = scope.tabs.find( tab => tab.active );
        scope.getTreeContents( tab );

        httpMock.flush();
        scope.$apply();
    }
});
