angular.module('honeydew').directive('validSetName', function ( Set ) {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: ( scope, elem, attrs, ngModel ) => {
            let validatorName = 'setname';

            ngModel.$parsers.push( function (value) {
                if ( ! value || value.length === 0 ) {
                    return value;
                }

                if ( Set.isNameValid( value ) ) {
                    ngModel.$setValidity( validatorName, true );
                }
                else {
                    ngModel.$setValidity( validatorName, false );
                }

                return value;
            });
        }
    };
});
