'use strict';

ddescribe('filetreeService', function () {
    var httpMock, filetree, scope, location;
    var base = '/rest.php/tree/';
    var folder = 'features';

    beforeEach(module('honeydew'));

    beforeEach(inject(function (_filetree_, _$rootScope_, $httpBackend, $location) {
        location = $location;
        filetree = _filetree_;
        scope = _$rootScope_;
        httpMock = $httpBackend;
    }));

    it('should get an instance of the filetree service', function () {
        expect(filetree).toBeDefined();
    });

    it('should have get that returns a promise', function () {
        httpMock.expectGET( base + folder).respond({});
        var promise = filetree.get(folder);
        httpMock.flush();
        expect(promise.then).toBeDefined();
    });

    it('should put the folder tree on itself', function () {
        httpMock.expectGET( base + folder ).respond({
            success: true,
            tree: [
                {
                    label: 'test',
                    children: []
                }
            ]
        });

        filetree.get(folder);
        httpMock.flush();
        expect(filetree.featurestree).toBeDefined();
        expect(filetree.featurestree[0].label).toBe('test');

    });

    it('should be able to toggle its own collapse property', function () {
        expect(filetree.collapse).toBe(false);

        var singletonInstance = filetree;
        singletonInstance.toggleTree();
        expect(filetree.collapse).toBe(true);

        filetree.toggleTree();
        expect(filetree.collapse).toBe(false);
    });

    it('should be able to set the location', function () {
        var fakeNode = {
            folder: '/folder',
            label: 'label'
        };

        filetree.show(fakeNode);
        scope.$apply();
        expect(location.path()).toMatch('folder.*label');

    });
});
