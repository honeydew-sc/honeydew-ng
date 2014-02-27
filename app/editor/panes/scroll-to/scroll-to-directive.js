'use strict';


// Version 0.0.2
// AngularJS simple hash-tag scroll alternative
// this directive uses click event to scroll to the target element
//
// <div ng-app="app">
//   <div ng-controller="myCtrl">
//     <a scroll-to="section1">Section 1</a>
//   </div>
//   ...
//   <div id="section1">
//      <h2>Section1</h2>
//      <a scroll-to="">Back to Top</a>
//   </div>
//  ...
//   <div id="section1">
//      <h2>Section1</h2>
//      <a scroll-to="section1" offset="60">Section 1 with 60px offset</a>
//   </div>
// </div>

// from https://github.com/iameugenejo/ngScrollTo/blob/master/ng-scrollto.js

angular.module('honeydew')
    .directive('scrollTo', function ($window) {
        return {
            restrict : 'AC',
            compile : function(){
                var document = $window.document;

                function scrollInto(idOrName) {//find element with the given id or name and scroll to the first element it finds
                    var el = Array.prototype.slice.call(document.getElementsByName(idOrName));
                    el.forEach(function (it) {
                        it.scrollIntoView(true);
                    });
                }

                return function(scope, element, attr) {
                    element.bind('click', function(){
                        scrollInto(attr.scrollTo);
                    });
                };
            }
        };
    });
