System.register(["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var isBlank,
      isPresent,
      BaseException,
      ElementBinder;
  return {
    setters: [function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
    }],
    execute: function() {
      ElementBinder = function() {
        function ElementBinder(index, parent, distanceToParent, protoElementInjector, componentDirective) {
          this.index = index;
          this.parent = parent;
          this.distanceToParent = distanceToParent;
          this.protoElementInjector = protoElementInjector;
          this.componentDirective = componentDirective;
          this.nestedProtoView = null;
          this.hostListeners = null;
          if (isBlank(index)) {
            throw new BaseException('null index not allowed.');
          }
        }
        return ($traceurRuntime.createClass)(ElementBinder, {
          hasStaticComponent: function() {
            return isPresent(this.componentDirective) && isPresent(this.nestedProtoView);
          },
          hasEmbeddedProtoView: function() {
            return !isPresent(this.componentDirective) && isPresent(this.nestedProtoView);
          }
        }, {});
      }();
      $__export("ElementBinder", ElementBinder);
    }
  };
});
//# sourceMappingURL=element_binder.js.map

//# sourceMappingURL=../../../src/core/compiler/element_binder.js.map