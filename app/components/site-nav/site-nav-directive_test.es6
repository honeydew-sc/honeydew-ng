describe('SiteNav directive', () => {
    var elm,
        scope,
        controller;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    describe('dropdown version', () => {
        beforeEach(inject( ($compile, $rootScope) => {
            elm = angular.element('<site-nav></site-nav>');
            scope = $rootScope;
            $compile(elm)(scope);
            scope.$digest();

            controller = elm.isolateScope().SiteNav;
        }));

        it('should link to home outside of the dropdown', () => {
            let home = elm.find('a.btn-bland.btn-default');
            expect(home.text()).toMatch(/Home/);
        });

        it('should display the rest of the links in the dropdown', () => {
            let EXTRA_LINKS_COUNT = 2;
            let expectedImageCount = controller.links.length + EXTRA_LINKS_COUNT;

            // we need to open the dropdown to see the links!
            elm.find('.dropdown').click();
            let links = elm.find('.dropdown-menu a');
            expect(links.length).toBe(expectedImageCount);
        });

        it('should not display any images', () => {
            let images = elm.find('img');
            expect(images.length).toBe(0);
        });
    });

    describe('image version', () => {
        beforeEach(inject( ($compile, $rootScope) => {
            elm = angular.element('<site-nav images="true"></site-nav>');
            scope = $rootScope;
            $compile(elm)(scope);
            scope.$digest();

            controller = elm.isolateScope().SiteNav;
        }));

        it('should include images for each link', () => {
            let expectedImageCount = controller.links.length;
            let images = elm.find('img');

            expect(images.length).toBe(expectedImageCount);
        });

    });
});
