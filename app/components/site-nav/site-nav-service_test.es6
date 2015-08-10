describe('SiteNav', function () {
    let SiteNav;

    beforeEach(module('honeydew'));
    beforeEach(inject( (_SiteNav_) => {
        SiteNav = _SiteNav_;
    }));

    it('should have a list of links', () => {
        expect(SiteNav.links).toBeDefined();
    });

    it('should have urls, titles, and images', () => {
        let keys = [ 'url', 'title', 'image' ];
        SiteNav.links.forEach( link => {
            keys.forEach( key => {
                expect( link.hasOwnProperty( key ) ).toBe(true);
            });
        });
    });
});
