'use strict';

angular.module('honeydew')
    .directive('cmAtom', (cmAutocomplete, $window) => {
        return {
            restrict: 'C',
            link: function (scope, element, attrs) {
                element.bind('click', event => {
                    var destination = '/#/' + cmAutocomplete.phraseLookup[element.text()];
                    $window.open(destination);
                });
            }
        };
    });
