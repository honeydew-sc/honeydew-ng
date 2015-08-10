class SiteNavController {
    constructor ( SiteNav ) {
        this.links = SiteNav.links;
    }
};

angular.module('honeydew').directive('siteNav', function () {
    return {
        templateUrl: 'components/site-nav/site-nav.html',
        replace: true,
        restrict: 'E',
        scope: {
            images: '='
        },
        bindToController: true,
        controller: SiteNavController,
        controllerAs: 'SiteNav'
    };
});
