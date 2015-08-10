fdescribe('SiteNav directive', () => {
    var elm,
        scope,
        controller;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( ($compile, $rootScope) => {
        elm = angular.element('<site-nav></site-nav>');
        scope = $rootScope;
        $compile(elm)(scope);
        scope.$digest();

        controller = elm.isolateScope().SiteNav;
    }));

    it('should display all links', () => {
        let expectedLength = controller.links.length;

        let linkCount = elm.find('.outbound-link a');
        expect(linkCount.length).toBe(expectedLength);
    });

    it('should not display images by default', () => {
        let images = elm.find('img');
        expect(images.length).toBe(0);
    });
});
