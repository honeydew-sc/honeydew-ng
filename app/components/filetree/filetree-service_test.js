'use strict';

describe('filetreeService', function () {
    var httpMock, filetree, scope, location, store;
    var root, oldLength;
    var base = '/rest.php/tree/';
    var folder = 'features';

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

    beforeEach(module('honeydew'));

    beforeEach(inject(function (_filetree_, _$rootScope_, _$httpBackend_, _$location_, _$localStorage_) {
        location = _$location_;
        filetree = _filetree_;
        scope = _$rootScope_;
        httpMock = _$httpBackend_;
        store = _$localStorage_;

        httpMock.expectGET( base + folder ).respond({ tree: features });
        filetree.get(folder);
        httpMock.flush();

        root = filetree.featurestree;
        oldLength = root.length;
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

        // mock out a fake settings object
        store.settings = { collapse: {} };

        filetree.show(fakeNode);
        scope.$apply();
        expect(location.path()).toMatch('folder.*label');
    });

    describe('FiletreeFilenameSearch', function () {
        it('should preserve both top level folders if they each have children', function () {
            var res = filetree.filter(features, '2');
            expect(res.length).toBe(2);
            expect(res[0].children[0].label).toBe('head child 2.feature');

        });

        it('should drop a folder entirely if it has no children', function () {
            var res = filetree.filter(features, 'filterChildless');
            expect(res.length).toBe(1);
            expect(res[0].label).toBe('head');
            expect(res[0].children[0].label).toMatch('filterChildless');
        });

        it('should be case insensitive', function () {
            var res = filetree.filter(features, 'filterchildless');
            expect(res.length).toBe(1);
            expect(res[0].label).toBe('head');
            expect(res[0].children[0].label).toMatch('filterChildless');
        });

        it('should drop things that match but do not end in feature, set, or phrase', function () {
            var res = filetree.filter(features, 'child 1');
            expect(res.length).toBe(1);
            expect(res[0].label).toBe('tail filterChildless');

        });

        it('should include a folder if it is a perfect match', function () {
            var res = filetree.filter(features, 'tail filterChildless');
            expect(res.length).toBe(1);
            expect(res[0].label).toBe('tail filterChildless');
            expect(res[0].children[0].label).toMatch('tail child 1.feature');
        });
    });

    describe('AddDeleteTreeNodes', function () {

        it('should add a top level leaf', function () {
            var leafName = 'zTopLevelLeaf.feature';
            filetree.addLeaf('features/' + leafName);
            expect(root.length).toBe(oldLength + 1);
            expect(root[oldLength].label).toBe(leafName);
        });

        it('should not add leaf if it already exists', function () {
            var leafName = 'zTopLevelLeaf.feature';
            filetree.addLeaf('features/' + leafName);
            filetree.addLeaf('features/' + leafName);
            expect(root.length).toBe(oldLength + 1);
        });

        it('should add a nested leaf to an existing folder, sorted', function () {
            var leafName = 'zChildLeaf.feature';
            var folderName = 'features/head';
            var children = filetree.featurestree[0].children;
            var oldLength = children.length;
            filetree.addLeaf(folderName + '/' + leafName);
            expect(children.length).toBe(oldLength + 1);
            expect(children[oldLength].label).toBe(leafName);
            expect(children[oldLength].folder).toBe(folderName);

            // check for sorting
            filetree.addLeaf('features/head/A' + leafName);
            expect(children[0].label).toBe('A' + leafName);
        });

        it('should add a nested leaf to a new folder', function () {
            var leafName = 'zNewLeaf.feature';

            filetree.addLeaf('features/zCar/' + leafName);
            expect(root.length).toBe(oldLength + 1);
            expect(root[oldLength].label).toBe('zCar');
            expect(root[oldLength].children[0].label).toBe('' + leafName);

            filetree.addLeaf('features/head/Acdr/newLeaf.feature');
            expect(filetree.featurestree[0].children[0].label).toBe('Acdr');
        });

        it('should delete a top level leaf', function () {
            filetree.addLeaf('features/Acar.feature');
            expect(root[0].label).toBe('Acar.feature');

            filetree.deleteLeaf('features/Acar.feature');
            expect(root[0].label).not.toBe('Acar.feature');
            expect(root.length).toBe(2);
        });

        it('should delete a nested leaf', function () {
            var pruned = 'features/head/filterChildless.feature';

            var children = root[0].children;
            var oldLength = children.length;
            filetree.deleteLeaf(pruned);
            expect(children.length).toBe(oldLength - 1);
            expect(children.reverse()[0].label).not.toBe('filterChildless.feature');
        });
    });

    describe('grepSearch', function () {

        it('should transform a grep list to a filetree', function () {
            var needle = 'needle';

            httpMock.expectGET(base + folder + '?needle=' + needle).respond({
                list: ['features/e2e/filetree_test.js']
            });
            filetree.grep(folder, needle).then(function (res) {
                expect(res.tree).toBeDefined();
                expect(res.tree[0].label).toBe('e2e');
                expect(res.tree[0].children[0].label).toBe('filetree_test.js');
            });
            httpMock.flush();

        });

    });
});
