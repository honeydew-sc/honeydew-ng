describe('EnvStatusDetail directive', () => {
    var elm,
        scope,
        controller;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( ($compile, $rootScope) => {
        elm = angular.element('<td env-status-detail name="name" app="app"></td>');

        scope = $rootScope;
        scope.name = 'name';
        scope.app = fakeAppDetails();

        $compile(elm)(scope);
        scope.$digest();

        controller = elm.isolateScope().EnvStatusDetail;
    }));

    it('should pull the app and name down from its parent', () => {
        expect(controller.name).toBe('name');
        expect(controller.app).toBeDefined();
    });

    it('should know if the current app is Sharecare', () => {
        expect(controller.isSharecare()).toBe(false);
    });

    function fakeAppDetails ( healthcheck = {}, honeydew = {}, kabocha = {}) {
        let status = true;
        let webauth = { status };
        let webpub = { status };
        let data = { status };

        healthcheck = angular.equals(healthcheck, {}) ? {
            webauth, webpub, data
        } : {};

        return { healthcheck, honeydew, kabocha };
    }
});
