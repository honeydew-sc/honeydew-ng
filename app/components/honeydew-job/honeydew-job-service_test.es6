describe('HoneydewJobServiceClass', function () {
    var HoneydewJob,
        location,
        hostname,
        httpMock,
        localConfig;
    beforeEach(module('honeydew'));
    beforeEach(inject( function ( _HoneydewJob_, _$location_, $httpBackend, _hostname_, _localConfig_) {
        HoneydewJob = _HoneydewJob_;
        location = _$location_;
        hostname = _hostname_;
        localConfig = _localConfig_;
    }));

    it('should accept values for all options in the constructor', () => {
        var props = {
            file: 'f',
            host: 'h',
            channel: 'c',
            browser: 'b',
            server: 's'
        };
        var job = new HoneydewJob(props);

        for (var key in props) {
            expect(job.key).toBe(props.key);
        }
    });

    it('should not change browser for Localhost jobs', () => {
        var job = new HoneydewJob({
            browser: 'browser',
            server: 'Localhost'
        });

        expect(job.browser[0]).toContain( 'browser' );
    });

    it('should prefix browser name with local server', () => {
        var job = new HoneydewJob({
            browser: 'end',
            server: 'AA: test'
        });

        expect(job.browser[0]).toContain( 'AA end' );
    });

    it('should suffix local when jobs are not saucelabs', () => {
        var job = new HoneydewJob({
            browser: 'not saucelabs',
            server: 'not saucelabs'
        });
        expect(job.browser[0]).toBe('not saucelabs Local');
    });

    it('should put a local server IP prop on local jobs', () => {
        var job = new HoneydewJob({
            browser: 'Chrome',
            server: 'AB: 1.2.3.4'
        });
        expect(job.local).toBeDefined();
        expect(job.local).toBe('1.2.3.4');
    });

    it('should set up saucelabs jobs correctly', () => {
        var sauce = new HoneydewJob({
            browser: 'Chrome',
            server: 'Saucelabs'
        });
        expect(sauce.local).not.toBeDefined();
        expect(sauce.browser[0]).toBe('Chrome');
    });

    it('should get a default file from the location', () => {
        spyOn(location, 'path').and.returnValue('/location');
        var job = new HoneydewJob({
            browser: 'nix',
            server: 'nix'
        });
        expect(job.file).toBe('location');
    });

    it('should handle the hostname properly', () => {
        hostname.host = 'hostless';
        var hostless = new HoneydewJob({
            browser: 'nix',
            server: 'nix'
        });
        expect(hostless.host).toBe('hostless');
    });

    it('should switch to a new channel', () => {
        var chan = new HoneydewJob({
            browser: 'nix',
            server: 'nix'
        });
        expect(chan.channel).toBeDefined();
        expect(chan.channel).toMatch(/private-.*/);
    });

    it('should extract a server from the browser', () => {
        localConfig.test_ab = '1.1.1.1';

        var noServer = new HoneydewJob({
            browser: 'AB Chrome Local'
        });
        expect(noServer.server).toBe('AB 1.1.1.1');
        expect(noServer.local).toBe('1.1.1.1');
    });

    it('should default to localhost if the browser does not match a server', () => {
        var local = new HoneydewJob({
            browser: 'Chrome Local'
        });
        expect(local.server).toBe('Localhost');
    });

});
