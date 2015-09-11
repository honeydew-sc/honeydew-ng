class SetService {
    constructor ( $http, $location, History ) {
        this.$http = $http;
        this.$location = $location;
        this.History = History;
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
            return $http.post( endpoint, { newSetName } )
                .then( (res) => {
                    this._cleanupHistory();
                    return res;
                });
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

    delete ( sourceSet ) {
        let { $http } = this;
        let endpoint = this._getEndpoint( sourceSet );
        return $http.delete( endpoint )
            .then( (res) => {
                this._cleanupHistory();
                return res;
            });
    }

    isNameValid ( name ) {
        return /^[0-9a-zA-Z_\-\.\/]+$/.test( name );
    }

    currentSet () {
        let { $location } = this;

        let matches = $location.path().match(/\/sets\/(.*)\.set/);
        if ( matches && matches.length ) {
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

    _cleanupHistory( ) {
        let { History, $location } = this;
        History.remove( $location.path() );
    }
}

angular.module('honeydew').service( 'Set', SetService );
