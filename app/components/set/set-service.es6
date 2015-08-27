class SetService {
    constructor ( $http ) {
        this.$http = $http;

    }

    getEndpoint( sourceSet ) {
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

    rename ( sourceSet, newSetName ) {
        let { $http } = this;
        if ( ! this.isNameValid( newSetName ) ){
            return false;
        }
        else {
            let endpoint = this.getEndpoint( sourceSet );
            return $http.post( endpoint, { newSetName } );
        }
    }

    isNameValid ( name ) {
        return /^[0-9a-zA-Z_\-\.\/]+$/.test( name );
    }
}

angular.module('honeydew').service( 'Set', SetService );
