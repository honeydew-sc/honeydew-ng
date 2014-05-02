'use strict';

describe('filetreeService', function () {
    var httpMock, filetree, scope, location;
    var base = '/rest.php/tree/';
    var folder = 'features';

    beforeEach(module('honeydew'));

    beforeEach(inject(function (_filetree_, _$rootScope_, _$httpBackend_, _$location_) {
        location = _$location_;
        filetree = _filetree_;
        scope = _$rootScope_;
        httpMock = _$httpBackend_;
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

    var features = [
        {
            label: 'head',
            children: [
                { label: 'head child 1', children: [] },
                { label: 'head child 2.feature', children: [] },
                { label: 'filterChildless.feature', children: [] }
            ]
        },

        {
            label: 'tail filterChildless',
            children: [
                { label: 'tail child 1.feature', children: [] },
                { label: 'tail child 2.feature', children: [] }
            ]
        }
    ];

    it('should filter a recursive structure', function () {
        // preserve both top level folders if they each have children
        var res = filetree.filter(features, '2');
        expect(res.length).toBe(2);
        expect(res[0].children[0].label).toBe('head child 2.feature');

        // drop a folder entirely if it has no children
        res = filetree.filter(features, 'filterChildless');
        expect(res.length).toBe(1);
        expect(res[0].label).toBe('head');
        expect(res[0].children[0].label).toMatch('filterChildless');

        // drop things that match but don't end in feature, set, or phrsae
        res = filetree.filter(features, 'child 1');
        expect(res.length).toBe(1);
        expect(res[0].label).toBe('tail filterChildless');

        // include a folder if it's a perfect match
        res = filetree.filter(features, 'tail filterChildless');
        expect(res.length).toBe(1);
        expect(res[0].label).toBe('tail filterChildless');
        expect(res[0].children[0].label).toMatch('tail child 1.feature');

    });
});
