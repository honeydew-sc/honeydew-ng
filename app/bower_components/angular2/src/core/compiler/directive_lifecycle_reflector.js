System.register(["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var Type,
      isPresent;
  function hasLifecycleHook(e, type, annotation) {
    if (isPresent(annotation.lifecycle)) {
      return annotation.lifecycle.indexOf(e) !== -1;
    } else {
      if (!(type instanceof Type))
        return false;
      return e.name in type.prototype;
    }
  }
  $__export("hasLifecycleHook", hasLifecycleHook);
  return {
    setters: [function($__m) {
      Type = $__m.Type;
      isPresent = $__m.isPresent;
    }],
    execute: function() {
    }
  };
});
//# sourceMappingURL=directive_lifecycle_reflector.js.map

//# sourceMappingURL=../../../src/core/compiler/directive_lifecycle_reflector.js.map