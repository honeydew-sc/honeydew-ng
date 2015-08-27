class SetRenameController {
    constructor ( $location, Set ) {
        this.currentSet = this._locationToSet( $location.path() );
    }

    _locationToSet ( path ) {
        let matches = path.match(/\/sets\/(.*)\.set/);
        return matches[1];
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
