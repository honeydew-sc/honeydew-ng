function SetsFactory ($resource) {
    return $resource( '/rest.php/sets/:set', { set: '@set' } );
}

angular.module('honeydew').factory( 'Sets', SetsFactory );
