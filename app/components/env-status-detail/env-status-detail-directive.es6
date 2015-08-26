class EnvStatusDetailController {
    constructor (EnvStatus) {
        // this.name and this.app automatically are on our controller
        // thanks to the scope declaration in the directive definitive
        this.EnvStatus = EnvStatus;
    }

    isSharecare () {
        return this.EnvStatus.isSharecare( this.name );
    }

    colspan () {
        let STANDARD_COLUMNS = 4;
        if ( this.isSharecare() ) {
            return 1 + STANDARD_COLUMNS;
        }
        else {
            return STANDARD_COLUMNS;
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
