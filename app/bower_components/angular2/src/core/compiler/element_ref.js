System.register(["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var BaseException,
      ElementRef;
  return {
    setters: [function($__m) {
      BaseException = $__m.BaseException;
    }],
    execute: function() {
      ElementRef = function() {
        function ElementRef(parentView, boundElementIndex, _renderer) {
          this.parentView = parentView;
          this.boundElementIndex = boundElementIndex;
          this._renderer = _renderer;
        }
        return ($traceurRuntime.createClass)(ElementRef, {
          get renderView() {
            return this.parentView.render;
          },
          set renderView(viewRef) {
            throw new BaseException('Abstract setter');
          },
          get nativeElement() {
            return this._renderer.getNativeElementSync(this);
          }
        }, {});
      }();
      $__export("ElementRef", ElementRef);
    }
  };
});
//# sourceMappingURL=element_ref.js.map

//# sourceMappingURL=../../../src/core/compiler/element_ref.js.map