angular.module('honeydew').directive('validSetName', function ( Set ) {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: ( scope, elem, attrs, ngModel ) => {
            ngModel.$parsers.push( function (value) {
                if ( ! value || value.length === 0 ) {
                    return value;
                }

                if ( Set.isNameValid( value ) ) {
                    ngModel.$setValidity( 'setname', true );
                }
                else {
                    ngModel.$setValidity( 'setname', false );
                }

                let currentSet = Set.currentSet();
                if ( currentSet === value || currentSet + '.set' === value ) {
                    ngModel.$setValidity( 'setExists', false );
                }
                else {
                    ngModel.$setValidity( 'setExists', true );
                }

                return value;
            });
        }
    };
});
