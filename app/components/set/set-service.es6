class SetService {
    constructor ( $http, $location ) {
        this.$http = $http;
        this.$location = $location;
    }

    rename ( sourceSet, newSetName ) {
        let { $http } = this;
        if ( ! this.isNameValid( newSetName ) ){
            return false;
        }
        else {
            let endpoint = this._getEndpoint( sourceSet );
            return $http.post( endpoint, { newSetName } );
        }
    }

    isNameValid ( name ) {
        return /^[0-9a-zA-Z_\-\.\/]+$/.test( name );
    }

    currentSet () {
        let { $location } = this;

        let matches = $location.path().match(/\/sets\/(.*)\.set/);
        if ( matches.length ) {
            return matches[1];
        }
        else {
            return '';
        }
    }

    _getEndpoint( sourceSet ) {
        let endpointBase = '/rest.php/sets/';

        return endpointBase + this._coerceExtension( sourceSet );
    }

    _coerceExtension( setName ) {
        if ( ! /\.set$/.test( setName ) ) {
            return setName + '.set';
        }
        else {
            return setName;
        }
    }
}

angular.module('honeydew').service( 'Set', SetService );
