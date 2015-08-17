class EnvStatusDetailController {
    constructor () {
    }

    isSharecare () {
        return this.name === 'SC';
    }

    healthcheckMessage () {
        let { healthcheckStatus } = this;

        if ( healthcheckStatus ) {
            this.healthcheckMessage = 'All healthchecks are passing!';
        }
        else {
            let { healthcheck } = this.app;
            let failures = Object.keys(healthcheck)
                .filter( key => !healthcheck[key] );

            this.healthcheckMessage = `${failures.length} healthchecks are failing: `;
        }
    }


};

angular.module('honeydew').directive('envStatusDetail', function () {
    return {
        templateUrl: 'components/env-status-detail/env-status-detail.html',

        // this is intended for use inside a table, and in a proper
        // <table>s, the <tr> tags eject anything that isn't a
        // <td>. So we're deviating from the norm slightly here.
        replace: true,
        restrict: 'A',

        scope: {
            name: '@',
            app: '='
        },
        bindToController: true,
        controller: EnvStatusDetailController,
        controllerAs: 'EnvStatusDetail'
    };
});
