describe('SetService', function () {
    let Set;
    let httpMock;

    beforeEach(module('honeydew'));
    beforeEach(inject(( _Set_, $httpBackend ) => {
        Set = _Set_;
        httpMock = $httpBackend;
    }));

    it('should automatically append extensions to set names ', () => {
        expect(Set._coerceExtension( 'old' )).toBe( 'old.set' );
        expect(Set._coerceExtension( 'old.set' )).toBe( 'old.set' );
    });

    it('should validate set names', () => {
        let valid = [ 'aBc', '123', '-_-._.' ];
        valid.forEach( (name) => {
            expect( Set.isNameValid( name ) ).toBe( true );
        });

        let invalid = [ '!@#', '()(', ';&;' ];
        invalid.forEach( (name) => {
            expect( Set.isNameValid( name ) ).toBe( false );
        });
    });

    it('should not rename a set to something invalid', () => {
        let status = Set.rename( 'old', '!@#' );
        expect( status ).toBe( false );
    });

    it('should hit the rename backend endpoint', () => {
        let success = true;
        let newSetName = 'destination';
        httpMock.expectPOST( '/rest.php/sets/source.set', { newSetName } )
            .respond({ success, newSetName}) ;
        let renamePost = Set.rename( 'source', 'destination' );
        httpMock.flush();
    });

});
