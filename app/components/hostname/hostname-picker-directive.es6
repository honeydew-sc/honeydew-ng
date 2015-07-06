class HostnamePickerController {
    constructor ( $scope, $location, hostname ) {
        this.$scope = $scope;
        this.$location = $location;
        this.hostname = hostname;

        this.name = hostname;
        this.$scope.$emit('hostname:ready');
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
            let apps = this.name.highlight.map( ({ app }) => app );
            return apps.some( app => currentApp === app );
        }
        else {
            return false;
        }
    }

    isEnvHighlighted( envOpt ) {
        if ( this._shouldHighlight() ) {
            return this.name.highlight.some( ({app, env}) => {
                return app === this.name.app && env === envOpt;
            });
        }
        else {
            return false;
        }
    }

    isDisabled({ app, env }) {
        if ( this._isSetPage() ) {
            if ( app ) {
                return !this.isAppHighlighted( app );
            }
            else if ( env ) {
                return !this.isEnvHighlighted( env );
            }
            else {
                return false;
            }
        }
        else {
            // we're not on a set page at all, so nothing should be
            // disabled
            return false;
        }
    }

    _isSetPage() {
        return /\.set$/.test(this.$location.path());
    }

    _shouldHighlight() {
        let isSetState = this._isSetPage();

        if ( isSetState ) {
            return isSetState;
        }
        else {
            return this.name.highlight.length !== 0;
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
