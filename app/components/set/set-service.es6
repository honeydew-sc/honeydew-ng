class SetService {
    constructor ( $http, $location ) {
        this.$http = $http;
        this.$location = $location;
        this.endpointBase = '/rest.php/sets/';
    }

    existingSets () {
        if ( this.existingSetList ) {
            return this.existingSetList;
        }
        else {
            let { $http } = this;
            this.existingSetList = $http.get( this.endpointBase )
                .then( ({ data: { sets: sets }}) => {
                    return sets.map( set => set.replace( /\.set$/, '' ) );
                });

            return this.existingSetList;
        }
    }

    rename ( sourceSet, newSetName ) {
        if ( ! this.isNameValid( newSetName ) ) {
            return false;
        }
        else {
            let { $http } = this;
            let endpoint = this._getEndpoint( sourceSet );
            return $http.post( endpoint, { newSetName } );
        }
    }

    copy ( sourceSetName, newSetName ) {
        if ( ! this.isNameValid( newSetName ) ) {
            return false;
        }
        else {
            let { $http } = this;
            let endpoint = this._getEndpoint( newSetName );
            return $http.put( endpoint, {
                sourceSetName: this._coerceExtension( sourceSetName )
            });
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
        return this.endpointBase + this._coerceExtension( sourceSet );
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
