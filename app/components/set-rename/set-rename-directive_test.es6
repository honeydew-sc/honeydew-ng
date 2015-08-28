describe('SetRename directive', () => {
    let $q;
    let elm;
    let Set;
    let ctrl;
    let scope;
    let $mdDialog;
    let $location;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( (_$q_, _Set_, $compile, $rootScope, $location, _$mdDialog_) => {
        $q = _$q_;
        Set = _Set_;
        $mdDialog = _$mdDialog_;
        $location.path('/sets/original.set');

        let p = $q.defer();
        p.resolve([ 'other', 'existing', 'sets' ]);
        spyOn( Set, 'existingSets' ).and.returnValue( p.promise );

        elm = angular.element('<set-rename></set-rename>');
        scope = $rootScope;
        $compile(elm)(scope);
        scope.$digest();

        ctrl = elm.isolateScope().SetRename;
    }));

    it('should find out the current set on its own', () => {
        expect(ctrl.currentSet).toBe('original');
    });

    it('should use the set service to rename a set', () => {
        doSetRename();
        expect(Set.rename).toHaveBeenCalledWith( 'original', 'destination' );
    });

    it('should hide the modal after successfully renaming a set', () => {
        spyOn( $mdDialog, 'hide' );
        doSetRename();
        expect( $mdDialog.hide ).toHaveBeenCalled();
    });

    it('should disable the rename button while the form is invalid', () => {
        let renameBtn = elm.find('.rename-btn');
        expect(renameBtn.attr('disabled')).toBe('disabled');

        scope.$apply( () => { ctrl.newSetName = 'validSetName'; } );
        expect(renameBtn.attr('disabled')).toBe(undefined);
    });

    it('should remove the .set extension during renames', () => {
        ctrl.newSetName = 'extension.set';
        doSetRename( true, 'extension' );
        expect( Set.rename ).toHaveBeenCalledWith( 'original', 'extension' );
    });

    it('should warn about merging sets', () => {
        scope.$apply( () => { ctrl.newSetName = 'other'; } );
        expect(elm.find('.merge-warning').length).toBe(1);;
    });

    function doSetRename ( success = true, newSetName = 'destination') {
        let data = { success, newSetName };

        let p = $q.defer();
        p.resolve({ data });
        spyOn( Set, 'rename' ).and.returnValue( p.promise );

        ctrl.newSetName = newSetName;
        let renameBtn = elm.find('.rename-btn');
        renameBtn.click();
    }
});
