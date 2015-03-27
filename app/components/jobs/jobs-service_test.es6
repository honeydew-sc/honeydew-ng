ddescribe('JobsServiceClass', function () {
    var Jobs,
        httpMock;
    beforeEach(module('honeydew'));
    beforeEach(inject( function ( _Jobs_, $httpBackend) {
        Jobs = _Jobs_;
    }));

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

    iit('should put a local server IP prop on local jobs', () => {
        var job = new Jobs({
            browser: 'Chrome',
            server: 'AB: 1.2.3.4'
        });
        expect(job.local).toBeDefined();
    });
});
