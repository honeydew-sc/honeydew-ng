describe('hostnameService', function () {
    var hostname, scope;

    beforeEach(module('honeydew'));

    beforeEach(inject(function (_hostname_, _$rootScope_) {
        hostname = _hostname_;
        scope = _$rootScope_;
    }));

    it('should get an instance of the hostname service', function () {
        expect(hostname).toBeDefined();
    });

    it('should resolve the host from the env', function () {
        hostname.env = 'qa';
        scope.$apply();
        expect(hostname.host).toMatch(/qa.*\.com/);

        hostname.env = 'stage';
        scope.$apply();
        expect(hostname.host).toMatch(/stage.*\.com/);
    });

    it('should resolve the host from the app', function () {
        hostname.app = 'SC';
        expect(hostname.host).toMatch(/sharecare\.com/);
    });

    it('should switch the envs according to host', function () {
        expect(hostname.envOptions.length).toBe(3);
        hostname.app = 'SC';
        scope.$apply();
        expect(hostname.envOptions.length).toBe(8);
        hostname.app = 'DROZ';
        scope.$apply();
        expect(hostname.envOptions.length).toBe(3);
    });

    it('should have env and app options', function () {
        expect(Object.keys(hostname.apps).length).toBe(6);
        expect(Object.keys(hostname.envs.DROZ).length).toBe(3);
        expect(Object.keys(hostname.envs.SC).length).toBe(8);
    });

    it('should replace "prod" with an empty string', function () {
        hostname.env = 'prod';
        scope.$apply();
        expect(hostname.host).not.toMatch(/prod/);
    });

    it('should resolve mobile differently', function () {
        hostname.app = 'Mobile';
        hostname.env = 'iOS';
        scope.$apply();
        expect(hostname.host).toMatch(/origin.*app\.zip/);

        hostname.app = 'Mobile';
        hostname.env = 'Android';
        scope.$apply();
        expect(hostname.host).toMatch(/origin.*apk$/);
    });
});
