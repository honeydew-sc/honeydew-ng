class EnvStatusController {

    constructor (EnvStatus) {
        this.EnvStatus = EnvStatus;
        this.statuses = this.populateEnvStatus();
    }

    populateEnvStatus() {
        let appQuery = new RegExp(this.app || 'SC'),
            envQuery = new RegExp(this.env || '.*');

        let statuses = this.EnvStatus.query(
            app => appQuery.test(app),
            env => envQuery.test(env)
        );

        return statuses;
    }
}

angular.module('honeydew')
    .directive('envStatus', function () {
        return {
            scope: {
                app: '@',
                env: '@'
            },
            bindToController: true,

            templateUrl: 'components/env-status/env-status.html',
            replace: true,
            restrict: 'E',

            controller: EnvStatusController,
            controllerAs: 'EnvStatus'
        };
    });
