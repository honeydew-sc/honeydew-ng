'use strict';

angular.module('honeydew')
  .directive('jobOptions', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the jobOptions directive');
      }
    };
  });
