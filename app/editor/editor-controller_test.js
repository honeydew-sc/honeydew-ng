'use strict';

describe('Controller: EditorCtrl', function () {
    var httpMock, scope, EditorCtrl, testFileUrl, shortFile, encodedFile, fakeText, fakedContents, Files, fakeFile;
    beforeEach(module('honeydew'));

    beforeEach(inject(function($controller, $rootScope, $httpBackend, _Files_) {
        httpMock = $httpBackend;

        Files = _Files_;
        testFileUrl = '/rest.php/files/features%252Ffake.feature';
        shortFile = 'features/fake.feature';
        encodedFile = encodeURIComponent(shortFile);
        fakeText = 'fake feature contents!';
        fakedContents = {
            file: encodedFile,
            contents: fakeText
        };
        fakeFile = new Files(fakedContents);

        scope = $rootScope.$new();
        scope.markClean = function () {};
        scope.file = fakeFile;

        EditorCtrl = $controller('EditorCtrl', {
            $scope: scope
        });
    }));

    it('should put the feature contents in the model', function() {
        httpMock.expectGET(testFileUrl).respond(fakedContents);
        scope.display(shortFile);
        httpMock.flush();
        expect(scope.file.contents).toBe(fakeText);
    });

    it('should persist changes to the model', function() {
        httpMock.expectPOST(testFileUrl, fakedContents).respond(fakedContents);
        scope.save();
        httpMock.flush();
    });

    it('should delete a file', function() {
        httpMock.expectDELETE(testFileUrl).respond({ status: 'success' });
        scope.delete();
        httpMock.flush();
    });

    it('should let me undo after a delete', function () {
        httpMock.expectDELETE(testFileUrl).respond({ status: 'success' });
        scope.delete();
        httpMock.flush();
        expect(scope.canUndo()).toBeTruthy();

        httpMock.expectPOST(testFileUrl, fakedContents).respond(fakedContents);
        scope.undoDelete();
        httpMock.flush();
    });

    it('should copy files around', function() {
        httpMock.expectPOST(testFileUrl.replace('fake', 'fake2'), {
            file: 'features%2Ffake2.feature',
            contents: fakeText
        }).respond({ status: 'success' });

        scope.copy(shortFile.replace('fake', 'fake2'));
        httpMock.flush();
    });

    it('should move files from here to there', function () {
        httpMock.expectPOST(testFileUrl.replace('fake', 'fake2'), {
            file: 'features%2Ffake2.feature',
            contents: fakeText
        }).respond({ status: 'success' });
        httpMock.expectDELETE(testFileUrl).respond({status: 'success'});

        scope.move(shortFile.replace('fake', 'fake2'));
        httpMock.flush();
    });
});
