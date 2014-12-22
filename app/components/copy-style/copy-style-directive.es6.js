'use strict';

angular.module('honeydew')
    .directive('copyStyle', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var args = attrs.copyStyle.split('|').map( it => it.trim() ),
                    classes = attrs['class'] || '',
                    selector = args[0],
                    source = $(selector),
                    filter = args[1],
                    copiedStyles = [
                        'color',
                        'background-color'
                    ];

                if (classes.match(new RegExp(filter))) {
                    copiedStyles.forEach( it => element.css(it, source.css(it)) );
                }
            }
        };
    });
