class StatusController {
    constructor ( EnvStatus ) {
        this.statuses = EnvStatus.query();
    }
}

StatusController.$inject = [ 'EnvStatus' ];

angular.module('honeydew')
    .controller('StatusController', StatusController);
