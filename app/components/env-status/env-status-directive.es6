function EnvStatusController (EnvStatus) {
    let appQuery = this.app || 'SC',
        envQuery = this.env || 'prod';

    this.statuses = EnvStatus.query( app => app === appQuery, env => env === envQuery );
    console.log(this.statuses);
}

angular.module('honeydew')
    .directive('envStatus', function () {
        return {
            scope: {
                app: '@',
                env: '@'
            },
            bindToController: true,

            // new syntax in 1.4:
            // bindToController: {
            //     app: '@',
            //     env: '@'
            // },

            templateUrl: 'components/env-status/env-status.html',
            replace: true,
            restrict: 'E',

            controller: EnvStatusController,
            controllerAs: 'EnvStatus'
        };
    });
