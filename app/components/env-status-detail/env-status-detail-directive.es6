class EnvStatusDetailController {
    constructor () {
    }

    isSharecare () {
        return this.name === 'SC';
    }


};

angular.module('honeydew').directive('envStatusDetail', function () {
    return {
        templateUrl: 'components/env-status-detail/env-status-detail.html',

        // this is intended for use inside a table, and in a proper
        // <table>s, the <tr> tags eject anything that isn't a
        // <td>. So we're deviating from the norm slightly here.
        replace: true,
        restrict: 'EAC',

        scope: {
            name: '@',
            app: '='
        },
        bindToController: true,
        controller: EnvStatusDetailController,
        controllerAs: 'EnvStatusDetail'
    };
});
