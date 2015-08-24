describe('EnvStatusDetail directive', () => {
    var elm,
        scope,
        controller;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( ($compile, $rootScope) => {
        elm = angular.element('<td env-status-detail name="name" app="app"></td>');

        scope = $rootScope;
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
        controller.name = 'name';
        expect(controller.isSharecare()).toBe(false);

        controller.name = 'SC';
        expect(controller.isSharecare()).toBe(true);
    });

    it('should display build information when available', () => {
        let text = elm.find('.build-detail').text();
        expect(text).toMatch(/branch: branch/);
        expect(text).toMatch(/build: build/);
    });

    it('should hide the build information when missing', () => {
        delete controller.app.build;
        scope.$digest();
        expect(elm.find('.build-detail').length).toBe(0);
    });

    function fakeAppDetails ( healthcheck = {}, honeydew = {}, kabocha = { summary: true }) {
        let status = true;
        let webauth = { status };
        let webpub = { status };
        let data = { status };
        let build = { webpub: 'build', branch: 'branch' };

        healthcheck = angular.equals(healthcheck, {}) ? {
            webauth, webpub, data
        } : {};

        return { healthcheck, honeydew, kabocha, build };
    }
});
