class HostnamePickerController {
    constructor ( $scope, hostname ) {
        this.$scope = $scope;
        this.hostname = hostname;

        this.name = hostname;

        this.$scope.$emit('hostname:ready');
    }

    emit (app, env) {
        this.$scope.$emit('hostname:update', app, env);

        if (env) {
            self.open = false;
        }
    }

    userChangedHostname () {
        this.$scope.$emit( 'hostname:changed', { host: this.name.host } );
    }
}

angular.module('sc.hostname')
    .directive('hostnamePicker', function ( $location ) {
        return {
            templateUrl: () => {
                var url = 'components/hostname/hostname.html';
                if ( $location.$$absUrl.match(/dashboard\/index.html/) ) {
                    return '/' + url;
                }
                else {
                    return url;
                }
            },
            replace: true,
            scope: true,
            restrict: 'E',
            controller: HostnamePickerController,
            controllerAs: 'Host'
        };
    });
