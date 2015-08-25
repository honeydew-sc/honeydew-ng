describe('EnvStatusDetail directive', () => {
    var elm,
        scope,
        ctrl;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( ($compile, $rootScope) => {
        elm = angular.element('<td env-status-detail name="name" app="app"></td>');

        scope = $rootScope;
        scope.app = fakeAppDetails();

        $compile(elm)(scope);
        scope.$digest();

        ctrl = elm.isolateScope().EnvStatusDetail;
    }));

    it('should pull the app and name down from its parent', () => {
        expect(ctrl.name).toBe('name');
        expect(ctrl.app).toBeDefined();
    });

    it('should know if the current app is Sharecare', () => {
        ctrl.name = 'name';
        expect(ctrl.isSharecare()).toBe(false);

        ctrl.name = 'SC';
        expect(ctrl.isSharecare()).toBe(true);
    });

    it('should display build information when available', () => {
        let text = elm.find('.build-detail').text();
        expect(text).toMatch(/branch: branch/);
        expect(text).toMatch(/build: build/);
    });

    it('should hide the build information when missing', () => {
        delete ctrl.app.build;
        scope.$digest();
        expect(elm.find('.build-detail').length).toBe(0);
    });

    it('should have an extra column for sharecare', () => {
        let notSC = ctrl.colspan();
        expect(notSC).toBe(4);

        ctrl.name = 'SC';
        expect(ctrl.colspan()).toBe(5);
    });

    it('should display healthcheck information', () => {
        // one healthcheck li for each of author, webpub, and data
        expect(elm.find('.healthcheck li').length).toBe(3);
    });

    describe('HD section', () => {
        it('should be displayed', () => {
            expect(elm.find('.honeydew').length).toBe(1);
        });

        it('should display the success percentage', () => {
            scope.$apply( () => { ctrl.app.honeydew.percentage = 50; } );
            expect(elm.find('.honeydew .big-emph').text()).toMatch(/^\s*50\s*$/);
        });

        it('should display a dashboard link', () => {
            scope.$apply( () => { ctrl.app.honeydew.url = 'dashboard'; } );
            expect(elm.find('.honeydew a').attr('href')).toBe('dashboard');
        });

    });

    describe('kabocha section', () => {

        beforeEach( () => {
            scope.$apply(() => {
                ctrl.name = 'SC';

                ctrl.app.kabocha.summary = false;
                ctrl.app.kabocha.failure = [
                    'fail',
                    'fail2'
                ];
            });
        });

        it('should be missing when not SC', () => {
            scope.$apply(() => { ctrl.name = 'name'; });
            expect(elm.find('.kabocha').length).toBe(0);
        });

        it('should display for SC properties', () => {
            expect(elm.find('.kabocha').length).toBe(1);
        });

        it('should list the failing test suites', () => {
            let failing = elm.find('.kabocha li').text();
            expect(failing).toBe([ 'fail', 'fail2' ].join( '' ));
        });

        it('should display a kabocha dashboard url', () => {
            expect(elm.find('.kabocha a.dashboard').length).toBe(1);
        });

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
