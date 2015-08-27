fdescribe('SetRename directive', () => {
    let elm;
    let ctrl;
    let scope;
    let $location;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( ($q, $compile, $rootScope, $location) => {
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
});
