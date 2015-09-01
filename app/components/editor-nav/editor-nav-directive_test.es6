describe('EditorNav directive', () => {
    let $q;
    let Set;
    let elm;
    let ctrl;
    let scope;
    let httpMock;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( ( $compile, $rootScope, $location, $httpBackend, _$q_, _Set_ ) => {
        $location.path( '/sets/currentSet.set' );
        httpMock = $httpBackend;
        $q = _$q_;
        Set = _Set_;

        elm = angular.element('<editor-nav></editor-nav>');
        scope = $rootScope;
        $compile(elm)(scope);
        scope.$digest();

        ctrl = elm.isolateScope().EditorNav;
    }));

    it('should show the rename set button on set pages', () => {
        expect(elm.find('#rename-set').length).toBe(1);;
    });

    it('should open the proper edit set modal', () => {
        httpMock.expectGET('/components/set-edit/set-edit.html')
            .respond('');

        let p = $q.defer();
        $q.resolve(['existing', 'sets']);
        spyOn( Set, 'existingSets' ).and.returnValue( p.promise );

        let renameModalBtn = elm.find('#rename-set');
        renameModalBtn.click();

        httpMock.flush();

        expect(Set.existingSets).toHaveBeenCalled();
    });
});
