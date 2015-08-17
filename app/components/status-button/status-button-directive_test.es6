describe('StatusButton directive', () => {
    var elm,
        scope,
        controller;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( ($compile, $rootScope) => {
        elm = angular.element('<status-button status="true"></status-button>');
        scope = $rootScope;
        $compile(elm)(scope);
        scope.$digest();

        controller = elm.isolateScope().StatusButton;
    }));

    it('should display a green checkbox when the status is true', () => {
        expect(elm.hasClass('green')).toBe(true);
        expect(elm.hasClass('fa-check-circle')).toBe(true);
    });

    it('should display a red x when the status is false', () => {
        controller.status = false;
        scope.$digest();

        expect(elm.hasClass('red')).toBe(true);
        expect(elm.hasClass('fa-times-circle')).toBe(true);
    });

    it('should display a silver x when the status is missing', () => {
        delete controller.status;
        scope.$digest();

        expect(elm.hasClass('silver')).toBe(true);
        expect(elm.hasClass('fa-times-circle')).toBe(true);
    });
});
