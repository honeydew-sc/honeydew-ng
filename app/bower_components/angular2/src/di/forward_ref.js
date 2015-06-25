System.register(["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var stringify,
      isFunction;
  function forwardRef(forwardRefFn) {
    forwardRefFn.__forward_ref__ = forwardRef;
    forwardRefFn.toString = function() {
      return stringify(this());
    };
    return forwardRefFn;
  }
  function resolveForwardRef(type) {
    if (isFunction(type) && type.hasOwnProperty('__forward_ref__') && type.__forward_ref__ === forwardRef) {
      return type();
    } else {
      return type;
    }
  }
  $__export("forwardRef", forwardRef);
  $__export("resolveForwardRef", resolveForwardRef);
  return {
    setters: [function($__m) {
      stringify = $__m.stringify;
      isFunction = $__m.isFunction;
    }],
    execute: function() {
    }
  };
});
//# sourceMappingURL=forward_ref.js.map

//# sourceMappingURL=../../src/di/forward_ref.js.map