'use strict';

describe('FileTreeCtrl', function () {
    var httpMock, scope, FileTreeCtrl;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        httpMock = $httpBackend;
        scope = $rootScope.$new();

        httpMock.expectGET('/rest.php/tree/features').respond({
            success: true,
            tree: [
                {
                    label: 'test',
                    children: []
                }
            ]
        });

        FileTreeCtrl = $controller('FileTreeCtrl', {
            $scope: scope
        });

        httpMock.flush();
    }));

    it('should have the appropriate tree data', function () {
        expect(scope.data).toBeDefined();
        expect(scope.data[0].label).toBe('test');
    });
});
