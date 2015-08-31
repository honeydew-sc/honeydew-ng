class SetEditController {
    constructor ( $location, $mdDialog, Set ) {
        this.$location = $location;
        this.$mdDialog = $mdDialog;
        this.Set = Set;

        this.currentSet = this.Set.currentSet();

        this.existingSets = [];
        this.Set.existingSets().then(( sets ) => {
            this.existingSets = sets;
        });
    }

    isExistingSet() {
        if ( ! this.hasOwnProperty( 'existingSets' ) ) {
            return false;
        }

        let shortName = this._shortName( this.newSetName );
        if ( shortName === this.currentSet ) {
            return false;
        }
        else {
            return this.existingSets.indexOf( shortName ) !== -1;
        }
    }

    rename () {
        let { currentSet, newSetName, Set  } = this;
        let newName = newSetName.replace( /.set$/, '' );

        return Set.rename( currentSet, newName )
            .then( ({ data }) => {
                this.redirectToNewSet( data.newSetName );
                return { data };
            })
            .then( this.hideModal.bind( this ) )
            .catch( ({ data }) => {
                this.statusMessage = 'Something went wrong :(';
            });
    }

    redirectToNewSet ( name ) {
        let { $location } = this;
        return $location.path( '/sets/' + name + '.set' );
    }

    hideModal () {
        let { $mdDialog } = this;
        $mdDialog.hide();
    }

    _shortName ( name = '' ) {
        return name.replace( /.set$/, '' );
    }
};

angular.module('honeydew')
    // register the controller explicitly so it can referenced by name
    // elsewhere
    .controller('SetEditController', SetEditController)
    .directive('setEdit', function () {
        return {
            templateUrl: 'components/set-edit/set-edit.html',
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: true,
            controller: 'SetEditController',
            controllerAs: 'SetEdit'
        };
    });
