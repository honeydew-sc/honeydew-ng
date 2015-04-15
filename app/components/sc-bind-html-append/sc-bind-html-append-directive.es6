'use strict';

angular.module('honeydew')
    .directive('scBindHtmlAppend', function () {
        return {
            restrict: 'A',
            controller: function ($scope, $element, $attrs, $parse) {
                var event = $attrs.scBindHtmlAppend;
                $scope.$on(event, (event, data) => {
                    $element.append(data);
                });
            }
        };
    });
