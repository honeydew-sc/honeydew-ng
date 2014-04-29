'use strict';

ddescribe('FileTreeCtrl', function () {
    var httpMock, scope, FileTreeCtrl, location, controller;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, $location) {
        controller = $controller;
        httpMock = $httpBackend;
        location = $location;
        scope = $rootScope.$new();
        var folders = [ "features", "phrases", "sets" ];

        folders.forEach(function (it) {
            httpMock.expectGET('/rest.php/tree/' + it).respond({
                success: true,
                tree: [{ label: it, children: [] }]
            });
        });

        FileTreeCtrl = $controller('FileTreeCtrl', {
            $scope: scope
        });

        httpMock.flush();
    }));

    it('should have the appropriate tree data', function () {
        scope.tabs.forEach(function (it) {
            expect(it.label).toBeDefined();
            expect(it.data).toBeDefined();
            expect(it.data[0].label).toBe(it.label.toLowerCase());
        });
    });

    it('should set the active tab based on the url', function () {
        location.path('/sets/blah-blah/');
        scope.$apply();

        // re-instantiate the controller so that it does its path
        // checks again. this should probably be in a function.
        FileTreeCtrl = controller('FileTreeCtrl', {
            $scope: scope
        });

        scope.tabs.forEach(function (tab) {
            if (tab.label.toLowerCase() === 'sets') {
                expect(tab.active).toBe(true);
            }
        });
    });;
});
