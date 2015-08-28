class SetService {
    constructor ( $http ) {
        this.$http = $http;

    }

    getEndpoint( sourceSet ) {
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
