class StatusController {
    constructor ( EnvStatus ) {
        this.statuses = EnvStatus.statuses;
        this.apps = [];

        // populate the statuses!
        EnvStatus.query( app => app === 'SC' );
    }
}

StatusController.$inject = [ 'EnvStatus' ];

angular.module('honeydew')
    .controller('StatusController', StatusController);
