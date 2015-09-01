describe('EditorNav directive', () => {
    let $q;
    let Set;
    let elm;
    let ctrl;
    let scope;
    let $templateCache;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( ( $compile, $rootScope, $location, _$templateCache_, _$q_, _Set_ ) => {
        $location.path( '/sets/currentSet.set' );
        $q = _$q_;
        $templateCache = _$templateCache_;
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

    it('should open the proper set rename modal', () => {
        cacheLeadingSlashTemplateUrl( 'set-edit' );

        let p = $q.defer();
        $q.resolve(['existing', 'sets']);
        spyOn( Set, 'existingSets' ).and.returnValue( p.promise );

        let renameModalBtn = elm.find('#rename-set');
        renameModalBtn.click();


        expect(Set.existingSets).toHaveBeenCalled();
    });

    function cacheLeadingSlashTemplateUrl( name ) {
        let templateUrl = `components/${name}/${name}.html`;
        let template = $templateCache.get(templateUrl);
        expect(template).toBeDefined();
        $templateCache.put( '/' + templateUrl, template );
    }
});
