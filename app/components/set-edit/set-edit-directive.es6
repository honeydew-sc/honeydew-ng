class SetEditController {
    constructor ( $location, $mdDialog, Set, $scope ) {
        this.$location = $location;
        this.$mdDialog = $mdDialog;
        this.Set = Set;

        this.action = $scope.action.toLowerCase();

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

    doAction() {
        let editPromise;
        if ( this.isCopy() ) {
            editPromise = this.copy();
        }
        else if ( this.isRename() ) {
            editPromise = this.rename();
        }
        else {
            this.statusMessage = 'Set Edit Controller: how did you get here?';
            console.error( this.statusMessage );
        }

        return editPromise
            .then( ({ data }) => {
                this.redirectToNewSet( data.newSetName );
                return { data };
            })
            .then( this.hideModal.bind( this ) )
            .catch( ({ data }) => {
                this.statusMessage = 'Something went wrong :(';
            });
    }

    isCopy () { return this.action === 'copy'; }
    isRename () { return this.action === 'rename'; }

    copy () {
        let { currentSet, newSetName, Set  } = this;
         let newName = newSetName.replace( /.set$/, '' );

        return Set.copy( currentSet, newName );
    }

    rename () {
        let { currentSet, newSetName, Set  } = this;
        let newName = newSetName.replace( /.set$/, '' );

        return Set.rename( currentSet, newName );
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
            bindToController: true,
            controller: 'SetEditController',
            controllerAs: 'SetEdit'
        };
    });
