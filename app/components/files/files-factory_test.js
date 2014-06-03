describe('filesFactory', function () {
    var Files, httpMock, location, filetree;
    var backend = '/rest.php/files/';
    var contents = 'fake contents';

    beforeEach(module('honeydew'));

    beforeEach(inject(function ( _Files_, $httpBackend, _$location_, _filetree_ ) {
        Files = _Files_;
        httpMock = $httpBackend;
        location = _$location_;
        filetree = _filetree_;

        spyOn(filetree, 'addLeaf');
        spyOn(filetree, 'deleteLeaf');
    }));

    function _setup () {
        httpMock.expectGET(backend + 'features%2Ffake.feature').respond({
            file: 'features%2Ffake.feature',
            contents: contents
        });
        var file = Files.get({file: 'features/fake.feature'});
        httpMock.flush();
        return file;
    };

    function _fileCopySetup( destination ) {
        var file = _setup();

        // We double encode them because we don't have .htaccess
        // permissions to set AllowEncodedSlashes to true
        destination = Files.encode(Files.encode(destination));
        httpMock.expectPOST(backend + destination).respond({
            success: 'true',
            contents: contents
        });
        file.copy('features/fake2.feature');
        httpMock.flush();

        return file;
    }

    it('should hit the backend for files', function () {
        var file = _setup();

        expect(file.contents).toBe(contents);
    });


    it('should copy itself to a new file and take us there', function () {
        _fileCopySetup('features/fake2.feature');

        expect(location.path()).toMatch(/fake2/);
    });

    it('should add the new file to the filetree', function () {
        var destination = 'features/fake2.feature';
        _fileCopySetup(destination);

        expect(filetree.addLeaf).toHaveBeenCalled();
    });

    it('should move files to a new place', function () {
        var file = _setup();

        httpMock.expectPOST(backend + 'features%252Fmoved.feature').respond({ success: true });
        httpMock.expectDELETE(backend + 'features%252Ffake.feature').respond({ success: true });
        file.move('features/moved.feature');
        httpMock.flush();

        expect(filetree.deleteLeaf).toHaveBeenCalled();
    });
});
