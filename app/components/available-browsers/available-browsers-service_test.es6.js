'use strict';

describe('availableBrowsersService', () => {
    var availableBrowsers, $location;

    beforeEach(module('honeydew'));

    beforeEach(inject( function ( _availableBrowsers_, _$location_ ) {
        availableBrowsers = _availableBrowsers_;
        $location = _$location_;
    }));

    it('should have a couple browser choices', () => {
        var browsers = availableBrowsers.getBrowsers();

        expect(browsers.length).toBeGreaterThan(4);
    });

    it('should have a couple server choices', () => {
        var servers = availableBrowsers.getServers();

        expect(servers.length).toBeGreaterThan(1);
        expect(servers).toContain('Localhost');
    });

    it('should not let monitor users see localhost', () => {
        spyOn($location, 'path').and.returnValue('something/monitor/something');
        var servers = availableBrowsers.getServers();

        expect(servers).not.toContain('Localhost');
    });
});
