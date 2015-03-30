describe('JobsServiceClass', function () {
    var Jobs,
        location,
        hostname,
        httpMock;
    beforeEach(module('honeydew'));
    beforeEach(inject( function ( _Jobs_, _$location_, _hostname_, $httpBackend) {
        Jobs = _Jobs_;
        location = _$location_;
        hostname = _hostname_;
    }));

    it('should accept values for all options in the constructor', () => {
        var props = {
            file: 'f',
            host: 'h',
            channel: 'c',
            browser: 'b',
            server: 's'
        };
        var job = new Jobs(props);

        for (var key in props) {
            expect(job.key).toBe(props.key);
        }
    });

    it('should not change browser for Localhost jobs', () => {
        var job = new Jobs({
            browser: 'browser',
            server: 'Localhost'
        });

        expect(job.browser[0]).toContain( 'browser' );
    });

    it('should prefix browser name with local server', () => {
        var job = new Jobs({
            browser: 'end',
            server: 'AA: test'
        });

        expect(job.browser[0]).toContain( 'AA end' );
    });

    it('should suffix local when jobs are not saucelabs', () => {
        var job = new Jobs({
            browser: 'not saucelabs',
            server: 'not saucelabs'
        });
        expect(job.browser[0]).toBe('not saucelabs Local');
    });

    it('should put a local server IP prop on local jobs', () => {
        var job = new Jobs({
            browser: 'Chrome',
            server: 'AB: 1.2.3.4'
        });
        expect(job.local).toBeDefined();
        expect(job.local).toBe('1.2.3.4');
    });

    it('should set up saucelabs jobs correctly', () => {
        var sauce = new Jobs({
            browser: 'Chrome',
            server: 'Saucelabs'
        });
        expect(sauce.local).not.toBeDefined();
        expect(sauce.browser[0]).toBe('Chrome');
    });

    it('should get a default file from the location', () => {
        spyOn(location, 'path').and.returnValue('/location');
        var job = new Jobs({
            browser: 'nix',
            server: 'nix'
        });
        expect(job.file).toBe('location');
    });

    it('should handle the hostname properly', () => {
        hostname.host = 'hostless';
        var hostless = new Jobs({
            browser: 'nix',
            server: 'nix'
        });
        expect(hostless.host).toBe('hostless');
    });

    it('should switch to a new channel', () => {
        var chan = new Jobs({
            browser: 'nix',
            server: 'nix'
        });
        expect(chan.channel).toBeDefined();
        expect(chan.channel).toMatch(/private-.*/);
    });

});
