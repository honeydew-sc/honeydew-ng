class StatusController {
    constructor ( EnvStatus ) {
        this.statuses = EnvStatus.query();
        this.apps = Object.keys(this.statuses);
    }
}

StatusController.$inject = [ 'EnvStatus' ];

angular.module('honeydew')
    .controller('StatusController', StatusController);
