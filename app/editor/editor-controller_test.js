'use strict';

describe('Controller: EditorCtrl', function () {
    var httpMock, scope, EditorCtrl, testFileUrl, shortFile, encodedFile, fakeText, fakedContents, Files, fakeFile, fakeAutocomplete;
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
        scope.doc = {
            markClean: function () {}
        };
        scope.file = fakeFile;

        EditorCtrl = $controller('EditorCtrl', {
            $scope: scope,
            cmAutocomplete: fakeAutocomplete
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
});
