class SetRenameController {
    constructor ( $location, Set ) {
        this.currentSet = this._locationToSet( $location.path() );
    }

    _locationToSet ( path ) {
        let matches = path.match(/\/sets\/(.*)\.set/);
        return matches[1];
    }
};

angular.module('honeydew').directive('setRename', function () {
    return {
        templateUrl: 'components/set-rename/set-rename.html',
        replace: true,
        restrict: 'E',
        scope: {},
        bindToController: true,
        controller: SetRenameController,
        controllerAs: 'SetRename'
    };
});
