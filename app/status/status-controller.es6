class StatusController {
    constructor ( EnvStatus ) {
        this.statuses = {};
        this.apps = [];

        EnvStatus.query().then( res => {
            this.statuses = EnvStatus.statuses;

            // Object.keys(this.statuses).map( name => {
            //     this.statuses[name].name = name;
            // });
        });
    }
}

StatusController.$inject = [ 'EnvStatus' ];

angular.module('honeydew')
    .controller('StatusController', StatusController);
