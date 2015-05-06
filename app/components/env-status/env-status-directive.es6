function EnvStatusController (EnvStatus) {
    let appQuery = new RegExp(this.app || 'SC'),
        envQuery = new RegExp(this.env || '.*');

    this.statuses = EnvStatus.query(
        app => appQuery.test(app),
        env => envQuery.test(env)
    );
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
