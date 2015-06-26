class ProgressLinearController {
    constructor ( $rootScope ) {
        this.scope = $rootScope;

        this.loading = false;
        this.listenForLoading();
    }

    listenForLoading () {
        this.scope.$on( 'progress:loading', (event, data) => {
            this.loading = true;
        });

        this.scope.$on( 'progress:done', (event, data) => {
            this.loading = false;
        });
    }
};

angular.module('honeydew')
    .directive('progressLinear', function () {
        return {
            templateUrl: 'components/progress-linear/progress-linear.html',
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: true,
            controller: ProgressLinearController,
            controllerAs: 'ProgressLinear'
        };
    })
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('green');
    });
