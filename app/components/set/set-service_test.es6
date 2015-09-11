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

    it('should get a sanitized list of all current sets', () => {
        httpMock.expectGET('/rest.php/sets/')
            .respond({ sets: [ 'other', 'sets'] });
        let sets = Set.existingSets();
        httpMock.flush();
    });

    describe('rename', () => {

        let success = true;
        let newSetName = 'destination';

        it('should not rename a set to something invalid', () => {
            let status = Set.rename( 'old', '!@#' );
            expect( status ).toBe( false );
        });

        it('should hit the rename backend endpoint', () => {
            httpMock.expectPOST( '/rest.php/sets/source.set', { newSetName } )
                .respond({ success, newSetName}) ;
            let renamePost = Set.rename( 'source', 'destination' );
            httpMock.flush();
        });

        it('should clean up history after itself', () => {
            spyOn( Set, '_cleanupHistory' );
            httpMock.expectPOST( '/rest.php/sets/source.set', { newSetName } )
                .respond({ success, newSetName}) ;
            let renamePost = Set.rename( 'source', 'destination' );
            httpMock.flush();
            expect(Set._cleanupHistory).toHaveBeenCalled();
        });

    });

    describe('copy', () => {

        it('should not rename a set to something invalid', () => {
            let status = Set.copy( 'old', '!@#' );
            expect( status ).toBe( false );
        });

        it('should hit the copy backend endpoint', () => {
            let success = true;
            let sourceSetName = 'source.set';
            let newSetName = 'destination';

            httpMock.expectPUT( `/rest.php/sets/${newSetName}.set`, { sourceSetName } )
                .respond({ success, newSetName });
            let copyPut = Set.copy( 'source', 'destination' );
            httpMock.flush();

        });
    });

    describe('delete', () => {
        let success = true;
        let sourceSetName = 'source';

        it('should hit the delete backend endpoint sets', () => {
            httpMock.expectDELETE( `/rest.php/sets/${sourceSetName}.set` ).
                respond({ success });
            Set.delete( sourceSetName );
            httpMock.flush();
        });

        it('should clean up history after itself', () => {
            spyOn( Set, '_cleanupHistory' );
            httpMock.expectDELETE( `/rest.php/sets/${sourceSetName}.set` ).
                respond({ success });
            Set.delete( sourceSetName );
            httpMock.flush();
            expect( Set._cleanupHistory ).toHaveBeenCalled();

        });
    });
});
