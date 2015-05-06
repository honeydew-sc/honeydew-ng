class StatusController {
    constructor ( $anchorScroll, $location, EnvStatus ) {
        this.apps = [
            'SC',
            'DROZ',
            'HCA'
        ];

        this.$location = $location;
        this.$anchorScroll = $anchorScroll;
        this.$anchorScroll.yOffset = 25;
    }

    scroll ( hash ) {
        this.$location.hash( hash );
        this.$anchorScroll();
    }
}

StatusController.$inject = [ '$anchorScroll', '$location', 'EnvStatus' ];

angular.module('honeydew')
    .controller('StatusController', StatusController);
