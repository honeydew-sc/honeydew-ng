class SetRenameController {
    constructor ( $location, $mdDialog, Set ) {
        this.$location = $location;
        this.$mdDialog = $mdDialog;
        this.Set = Set;

        this.currentSet = this.Set.currentSet();
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
};

angular.module('honeydew')
    // register the controller explicitly so it can referenced by name
    // elsewhere
    .controller('SetRenameController', SetRenameController)
    .directive('setRename', function () {
        return {
            templateUrl: 'components/set-rename/set-rename.html',
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: true,
            controller: 'SetRenameController',
            controllerAs: 'SetRename'
        };
    });
