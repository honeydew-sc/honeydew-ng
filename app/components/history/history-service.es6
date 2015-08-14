class History {
    constructor ( $localStorage, $location ) {
        if (!$localStorage.history) {
            $localStorage.history = [];
        }

        this.history = $localStorage.history;
        this.$location = $location;
    }

    get entries () {
        this.history = this.history
            .filter( ( file, index, ary ) =>  ary.indexOf( file ) === index )
            .filter( (_, index ) => index < 10 );

        return this.history.map( ( item, index, ary ) => {
            let href = item;
            let label = item.replace( /\/?(features|sets)\/?/, '' );
            return { href, label };
        });
    }

    add ( item ) {
        this.history.unshift( item );
    }

    addCurrentLocation( ) {
        let { $location } = this;
        this.add( $location.path() );
    }
}

angular.module('honeydew').service('History', History);
