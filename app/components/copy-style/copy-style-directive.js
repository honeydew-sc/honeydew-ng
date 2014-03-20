'use strict';

angular.module('honeydew')
    .directive('copyStyle', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var args = attrs.copyStyle.split('|').map(function (it) { return it.trim(); } );
                var classes = attrs['class'] || '';
                var selector = args[0];
                var filter = args[1];
                var source = $(selector);
                var copiedStyles = [
                    'color',
                    'background-color'
                ];

                if (classes.match(new RegExp(filter))) {
                    copiedStyles.forEach( function (it) {
                        element.css(it, source.css(it));
                    });
                }
            }
        };
    });
