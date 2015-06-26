describe('ProgressLinear directive', () => {
    var elm,
        scope,
        controller;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( ($compile, $rootScope) => {
        elm = angular.element('<progress-linear></progress-linear>');
        scope = $rootScope;
        $compile(elm)(scope);
        scope.$digest();

        controller = elm.isolateScope().ProgressLinear;
    }));

    it('should be hidden initially', () => {
        expect(elm.find('md-progress-linear').length).toBe(0);
        expect(controller.loading).toBe(false);
    });

    it('should have an md-progress-linear in it', () => {
        controller.loading = true;
        scope.$apply();
        var mdProgress = elm.find('md-progress-linear');
        expect(mdProgress.length).toBe(1);
    });

    it('should display on its loading event', () => {
        scope.$emit( 'progress:loading' );
        scope.$apply();
        expect(controller.loading).toBe(true);
    });

    it('should hide on its done event', () => {
        scope.$emit( 'progress:done' );
        scope.$apply();
        expect(controller.loading).toBe(false);
    });
});
