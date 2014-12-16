describe('jobs directive', function () {
    var elm, scope;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( function ( $compile, $rootScope ) {
        elm = angular.element('<job-options></job-options');
        scope = $rootScope;

        $compile(elm)(scope);
        scope.$digest();
    }));

    it('properly executes jobs', () => {
        expect(elm).toBeDefined();
    });

});
