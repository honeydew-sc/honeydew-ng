describe('EditorNav directive', () => {
    let elm;
    let ctrl;
    let scope;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( ( $compile, $rootScope, $location ) => {
        $location.path( '/sets/currentSet.set' );

        elm = angular.element('<editor-nav></editor-nav>');
        scope = $rootScope;
        $compile(elm)(scope);
        scope.$digest();

        ctrl = elm.isolateScope().EditorNav;
    }));

    it('should show the rename set button on set pages', () => {
        expect(elm.find('#rename-set').length).toBe(1);;
    });
});
