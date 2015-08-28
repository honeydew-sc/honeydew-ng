describe('validSetName directive', () => {
    let elm;
    let form;
    let scope;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( ($location, $compile, $rootScope) => {
        spyOn( $location, 'path' ).and.returnValue( '/sets/current.set' );

        elm = angular.element(
            `<form name="form">
                <input ng-model="model.setName" name="setName" valid-set-name>
            </form>`
        );

        scope = $rootScope;
        scope.model = { setName: null };

        $compile(elm)(scope);
        scope.$digest();

        form = scope.form;
    }));

    it('should reject invalid characters', () => {
        form.setName.$setViewValue( '!@#' );
        expect( form.setName.$valid ).toBe( false );
    });

    it('should reject the curren set', () => {
        form.setName.$setViewValue( 'current' );
        expect( form.setName.$valid ).toBe( false );
    });

    it('should reject the current set with extension', () => {
        form.setName.$setViewValue( 'current.set' );
        expect( form.setName.$valid ).toBe( false );
    });

    it('should accept a valid set name', () => {
        form.setName.$setViewValue( 'hooray' );
        expect( form.setName.$valid ).toBe( true );
    });
});
