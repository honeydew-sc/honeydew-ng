class HostnamePickerController {
    constructor ( $scope, $location, hostname ) {
        this.$scope = $scope;
        this.$location = $location;
        this.hostname = hostname;

        this.name = hostname;
        this.$scope.$emit('hostname:ready');

        this.highlight = hostname.highlight;
    }

    emit (app, env) {
        this.$scope.$emit('hostname:update', app, env);

        if (env) {
            this.open = false;
        }
    }

    userChangedHostname () {
        this.$scope.$emit( 'hostname:changed', this.name.host );
    }

    isAppHighlighted( currentApp ) {
        if ( this._shouldHighlight() ) {
            let apps = this.highlight.map( ({ app }) => app );
            return apps.some( app => currentApp === app );
        }
        else {
            return false;
        }
    }

    isEnvHighlighted( envOpt ) {
        if ( this._shouldHighlight() ) {
            return this.highlight.some( ({app, env}) => app === this.name.app && env === envOpt );
        }
        else {
            return false;
        }
    }

    _shouldHighlight() {
        let isSetState = /\.set$/.test(this.$location.path());

        if ( isSetState ) {
            return isSetState;
        }
        else {
            return this.highlight.length === 0;
        }
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
