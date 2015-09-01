describe('SetEdit directive', () => {
    let $q;
    let elm;
    let Set;
    let ctrl;
    let scope;
    let $mdDialog;
    let $location;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( (_$q_, _Set_, $location, _$mdDialog_) => {
        $q = _$q_;
        Set = _Set_;
        $mdDialog = _$mdDialog_;

        $location.path('/sets/original.set');

        let p = $q.defer();
        p.resolve([ 'other', 'existing', 'sets' ]);
        spyOn( Set, 'existingSets' ).and.returnValue( p.promise );
    }));

    let modes = [ 'copy', 'rename' ];
    modes.forEach( ( mode ) => {
        describe(`${mode} mode`,  () => {
            let findSubmitBtn = () => elm.find('.submit-btn');

            beforeEach( inject( ( $compile, $rootScope ) => {
                elm = angular.element('<set-edit></set-edit>');
                scope = $rootScope;
                scope.action = mode;
                $compile(elm)(scope);
                scope.$digest();

                ctrl = elm.scope().SetEdit;
            }));

            it('should find out the current set on its own', () => {
                expect(ctrl.currentSet).toBe('original');
            });

            it(`should use the set service to ${mode} a set`, () => {
                doSetAction();
                expect(Set[mode]).toHaveBeenCalledWith( 'original', 'destination' );
            });

            it(`should hide the modal after successfully doing a set ${mode}`, () => {
                spyOn( $mdDialog, 'hide' );
                doSetAction();
                expect( $mdDialog.hide ).toHaveBeenCalled();
            });

            it(`should disable the ${mode} button while the form is invalid`, () => {
                let submitBtn = findSubmitBtn();
                expect(submitBtn.attr('disabled')).toBe('disabled');

                scope.$apply( () => { ctrl.newSetName = 'validSetName'; } );
                expect(submitBtn.attr('disabled')).toBe(undefined);
            });

            it(`should remove the .set extension during ${mode}`, () => {
                ctrl.newSetName = 'extension.set';
                doSetAction( true, 'extension' );
                expect( Set[mode] ).toHaveBeenCalledWith( 'original', 'extension' );
            });

            it('should warn about merging sets', () => {
                scope.$apply( () => { ctrl.newSetName = 'other'; } );
                expect(elm.find('.merge-warning').length).toBe(1);;
            });

            function doSetAction ( success = true, newSetName = 'destination') {
                let data = { success, newSetName };

                let p = $q.defer();
                p.resolve({ data });
                spyOn( Set, mode ).and.returnValue( p.promise );

                ctrl.newSetName = newSetName;
                let submitBtn = findSubmitBtn();
                submitBtn.click();
            }
        });
    });
});
