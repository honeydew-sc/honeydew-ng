System.register(["angular2/src/facade/async"], function($__export) {
  "use strict";
  var PromiseWrapper,
      Rectangle,
      Ruler;
  return {
    setters: [function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }],
    execute: function() {
      Rectangle = function() {
        function Rectangle(left, top, width, height) {
          this.left = left;
          this.right = left + width;
          this.top = top;
          this.bottom = top + height;
          this.height = height;
          this.width = width;
        }
        return ($traceurRuntime.createClass)(Rectangle, {}, {});
      }();
      $__export("Rectangle", Rectangle);
      Ruler = function() {
        function Ruler(domAdapter) {
          this.domAdapter = domAdapter;
        }
        return ($traceurRuntime.createClass)(Ruler, {measure: function(el) {
            var clntRect = this.domAdapter.getBoundingClientRect(el.nativeElement);
            return PromiseWrapper.resolve(new Rectangle(clntRect.left, clntRect.top, clntRect.width, clntRect.height));
          }}, {});
      }();
      $__export("Ruler", Ruler);
    }
  };
});
//# sourceMappingURL=ruler.js.map

//# sourceMappingURL=../../src/services/ruler.js.map