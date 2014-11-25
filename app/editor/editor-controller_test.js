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
        scope.doc = {
            markClean: function () {}
        };
        scope.file = fakeFile;
        scope.file.debouncedSave = function () {};

        EditorCtrl = $controller('EditorCtrl', {
            $scope: scope,
            autocomplete: {},
            honeydewLint: {}
        });
    }));

});
