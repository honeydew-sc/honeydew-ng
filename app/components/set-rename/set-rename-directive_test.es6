fdescribe('SetRename directive', () => {
    let $q;
    let elm;
    let Set;
    let ctrl;
    let scope;
    let $location;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( (_$q_, _Set_, $compile, $rootScope, $location) => {
        $q = _$q_;
        Set = _Set_;
        $location.path('/sets/original.set');

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
        let success = true;
        let newSetName = 'destination';
        let p = $q.defer();
        p.resolve({ success, newSetName });
        spyOn( Set, 'rename' ).and.returnValue({ promise: p.$promise });

        let renameBtn = elm.find('.rename.btn');
        renameBtn.click();

        expect(Set.rename).toHaveBeenCalledWith( 'original', 'destination' );
    });
});
