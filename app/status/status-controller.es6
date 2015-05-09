class StatusController {
    constructor ( $anchorScroll, $location, $stateParams, EnvStatus, Environment ) {
        this.apps = Object.keys(Environment.apps);

        this.$location = $location;
        this.$anchorScroll = $anchorScroll;
        this.$anchorScroll.yOffset = 25;
    }

    scroll ( hash ) {
        this.$location.hash( hash );
        this.$anchorScroll();
    }
}

angular.module('honeydew')
    .controller('StatusController', StatusController);
