describe('NewPhraseCtrl', () => {
    var httpMock, scope, $modalInstance, NewPhraseCtrl, Files;

    beforeEach(module('honeydew'));

    beforeEach(inject( ($controller, $rootScope, $httpBackend, _Files_) => {
        httpMock = $httpBackend;
        scope = $rootScope.$new();
        Files = _Files_;

        $modalInstance = {
            close: () => {}
        };

        spyOn($modalInstance, 'close');

        NewPhraseCtrl = $controller('NewPhraseCtrl', {
            $scope: scope,
            $modalInstance,
            filename: '',
            title: '',
            action: ''
        });
    }));

    it('should reject an empty form', () => {
        scope.dest = {
            phrase: '',
            project: ''
        };

        // form is invalid
        expect(scope.isFormValid()).toBe(false);

        // but we don't want to show every error message for an empty
        // form.
        expect(scope.hasPhrase).toBe(false);
        expect(scope.phraseChars).toBe(true);
        expect(scope.hasProject).toBe(false);
        expect(scope.projectChars).toBe(true);
    });

    it('should tell us about a required project', () => {
        scope.dest = {
            phrase: 'something',
            project: ''
        };

        expect(scope.isFormValid()).toBe(false);
        expect(scope.hasProject).toBe(false);
    });

    it('should tell us about a required phrase', () => {
        scope.dest = {
            phrase: '',
            project: 'something'
        };

        expect(scope.isFormValid()).toBe(false);
        expect(scope.hasPhrase).toBe(false);
    });

    it('should tell us about a phrase with invalid characters', () => {
        scope.dest = {
            phrase: '@#$&@#@#$',
            project: 'something'
        };

        // they might come back as null
        expect(!!scope.isFormValid()).toBe(false);
        expect(!!scope.phraseChars).toBe(false);
    });

    it('should tell us about a project with invalid characters', () => {
        scope.dest = {
            phrase: 'valid',
            project: '@#$*@#$'
        };

        // they might come back as null
        expect(!!scope.isFormValid()).toBe(false);
        expect(!!scope.projectChars).toBe(false);
    });

    it('should let us submit a valid new phrase', () => {
        scope.dest = {
            phrase: 'valid',
            project: 'valid'
        };

        expect(!!scope.isFormValid()).toBe(true);
    });

    it('should handle phrase title conversion', () => {
        scope.dest = {
            phrase: 'replace my spaces and \'quotes',
            project: 'okay'
        };

        scope.updatePhrase();
        expect(scope.newFilename).toBe('/phrases/okay/replace_my_spaces_and__quotes.phrase');
    });

    it('should try to create a new phrase', () => {
        scope.dest = {
            phrase: 'test title',
            project: 'project'
        };
        scope.updatePhrase();

        var newPhraseTemplate = [
            'Phrase: test title',
            '',
            ' '
        ].join("\n");
        var data = {
            file: Files.encode(scope.newFilename),
            contents: newPhraseTemplate
        };

        var encodedFilename = Files.encode(Files.encode(scope.newFilename));
        httpMock.expectPOST('/rest.php/files/' + encodedFilename, data).respond( 200, '');
        scope.ok();
        httpMock.flush();

        expect($modalInstance.close).toHaveBeenCalledWith({file: scope.newFilename.replace(/^\//, '')  });
    });
});
