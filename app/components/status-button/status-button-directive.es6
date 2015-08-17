class StatusButtonController {
    isSuccess () {
        return this.status === true;
    }

    isFailure () {
        return this.status === false;
    }

    isUnknown () {
        return !this.isSuccess() && !this.isFailure();
    }
};

angular.module('honeydew').directive('statusButton', function () {
    return {
        templateUrl: 'components/status-button/status-button.html',
        replace: true,
        restrict: 'E',
        scope: {
            status: '='
        },
        bindToController: true,
        controller: StatusButtonController,
        controllerAs: 'StatusButton'
    };
});
