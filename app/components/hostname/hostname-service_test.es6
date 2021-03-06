describe('hostnameService', function () {
    var hostname, scope, ctrl;
    var ENV_COUNT = 15,
        APP_COUNT = 8;

    beforeEach(module('sc.hostname'));
    beforeEach(module('tpl'));

    beforeEach(inject(function (_hostname_, _$rootScope_, $compile) {
        hostname = _hostname_;
        scope = _$rootScope_;

        hostname.host = 'http://www.sharecare.com';

        var tpl = '<hostname-picker></hostname-picker>';
        var element = angular.element(tpl);
        var elm = $compile(element)(scope);
        scope.$digest();
        ctrl = element.controller('hostnamePicker');
    }));

    it('should get an instance of the hostname service', function () {
        expect(hostname).toBeDefined();
    });

    it('should resolve the host from the env', function () {
        ctrl.emit('SC', 'qa');
        expect(hostname.host).toMatch(/qa.*\.com/);

        ctrl.emit('SC', 'stage');
        expect(hostname.host).toMatch(/stage.*\.com/);
    });

    it('should resolve the host from the app', function () {
        ctrl.emit('SC', undefined);
        expect(hostname.host).toMatch(/sharecare\.com/);
    });

    it('should switch the envs according to host', function () {
        ctrl.emit('SC', undefined);
        expect(hostname.envOptions.length).toBeGreaterThan(ENV_COUNT);
        ctrl.emit('DROZ', undefined);
        expect(hostname.envOptions.length).toBe(3);
    });

    it('should have env and app options', function () {
        expect(Object.keys(hostname.apps).length).toBeGreaterThan(APP_COUNT);
        expect(Object.keys(hostname.envs.DROZ).length).toBe(3);
        expect(Object.keys(hostname.envs.SC).length).toBeGreaterThan(ENV_COUNT);
    });

    it('should replace "prod" with an empty string', function () {
        ctrl.emit('SC', 'prod');
        expect(hostname.host).not.toMatch(/prod/);
    });

    it('should overwrite what environments need to be higlighted', () => {
        let pair = { app: 'SC', env: 'prod' };
        hostname.highlightEnvs([ pair ]);
        expect(hostname.highlight).toEqual([ pair ]);
    });
});
