class ProgressLinearController {
    constructor ( $rootScope, $timeout ) {
        this.scope = $rootScope;
        this.timeout = $timeout;

        this.loading = false;
        this.value = 0;
        this.mode = 'indeterminate';
        this.listenForLoading();
    }

    listenForLoading () {
        this.scope.$on( 'progress:loading', (event, data) => {
            this.loading = true;
            this.value = 0;
        });

        this.scope.$on( 'progress:value', (event, data) => {
            this.loading = true;
            this.value = data.value;
            this.mode = 'determinate';

            if ( this.value === 100 ) {
                this.timeout( () => { this.reset(); }, 750 );
            }
        });

        this.scope.$on( 'progress:increment', () => {
            this.increment();
        });

        this.scope.$on( 'progress:done', (event, data) => {
            this.reset();
        });
    }

    increment () {
        this.loading = true;
        this.mode = 'determinate';
        let remainder = 100 - this.value;
        let incrementedValue = Math.floor(this.value + remainder / 3);

        this.value = incrementedValue;
    }

    reset () {
        this.loading = false;
        this.mode = 'indeterminate';
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
