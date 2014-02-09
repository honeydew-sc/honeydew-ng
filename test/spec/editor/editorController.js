'use strict';

describe('Controller: EditorCtrl', function () {
    var httpMock, scope, EditorCtrl, testFile, shortFile, uiConfig;
    beforeEach(module('honeydew'));

    beforeEach(inject(function($controller, $rootScope, $httpBackend, uiCodeMirrorConfig) {
        httpMock = $httpBackend;
        scope = $rootScope.$new();
        testFile = '/rest.php/files/features%252Ffake.feature';
        shortFile = 'features/fake.feature';
        uiConfig = uiCodeMirrorConfig;
        EditorCtrl = $controller('EditorCtrl', {
            $scope: scope
        });
    }));

    it('should put the feature contents in the model', function() {
        httpMock.expectGET(testFile).respond({contents: 'fake feature contents!'});
        scope.display(shortFile);
        httpMock.flush();
        expect(scope.file.contents).toBe('fake feature contents!');
    });

    it('should persist changes to the model', function() {
        httpMock.expectPOST(testFile, {
            file: 'features%2Ffake.feature',
            contents: 'new contents'
        }).respond({});
        scope.file = { contents: 'new contents'};
        scope.save(shortFile);
        httpMock.flush();
    });

    it('should delete a file', function() {
        httpMock.expectDELETE(testFile).respond({ status: 'success' });
        scope.file = { contents: 'new contents'};
        scope.delete(shortFile);
        httpMock.flush();
    });

    it('should let me undo after a delete', function () {
        httpMock.expectDELETE(testFile).respond({ status: 'success' });
        scope.file = { contents: 'new contents'};
        scope.delete(shortFile);
        httpMock.flush();
        expect(scope.canUndo()).toBeTruthy();


        httpMock.expectPOST(testFile, {
            file: 'features%2Ffake.feature',
            contents: 'new contents'
        }).respond({});

        scope.undoDelete();
        httpMock.flush();
    });

    it('should copy files around', function() {
        httpMock.expectPOST(testFile.replace('fake', 'fake2'), {
            file: 'features%2Ffake2.feature',
            contents: 'copied contents'
        }).respond({ status: 'success' });
        scope.file = {contents: 'copied contents'};
        scope.copy(shortFile.replace('fake', 'fake2'));
        httpMock.flush();
    });

    it('should move files from here to there', function () {
        httpMock.expectPOST(testFile.replace('fake', 'fake2'), {
            file: 'features%2Ffake2.feature',
            contents: 'moved contents'
        }).respond({ status: 'success' });
        httpMock.expectDELETE(testFile).respond({status: 'success'});
        scope.file = {contents: 'moved contents'};
        scope.move(shortFile.replace('fake', 'fake2'), shortFile);
        httpMock.flush();
    });
});
