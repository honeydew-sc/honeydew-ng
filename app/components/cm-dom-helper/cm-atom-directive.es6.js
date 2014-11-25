'use strict';

angular.module('honeydew')
    .directive('cmAtom', (autocomplete, $window) => {
        return {
            restrict: 'C',
            link: function (scope, element, attrs) {
                element.bind('click', event => {
                    var destination = '/#/' + autocomplete.getPhraseFile(element.text());
                    $window.open(destination);
                });
            }
        };
    });
