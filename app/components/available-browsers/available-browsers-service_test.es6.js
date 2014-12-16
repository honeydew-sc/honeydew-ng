'use strict';

ddescribe('availableBrowsersService', () => {
    var availableBrowsers;

    beforeEach(module('honeydew'));

    beforeEach(inject( function ( _availableBrowsers_ ) {
        availableBrowsers = _availableBrowsers_;
    }));

    it('shoulve have a couple browser choices', () => {
        var browsers = availableBrowsers.getBrowsers();

        expect(browsers.length).toBeGreaterThan(4);
    });

    it('should have a couple server choices', () => {
        var servers = availableBrowsers.getServers();

        expect(servers.length).toBeGreaterThan(5);
    });

});
