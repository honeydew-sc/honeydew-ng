class StatusController {
    constructor ( EnvStatus ) {
    }
}

StatusController.$inject = [ 'EnvStatus' ];

angular.module('honeydew')
    .controller('StatusController', StatusController);
