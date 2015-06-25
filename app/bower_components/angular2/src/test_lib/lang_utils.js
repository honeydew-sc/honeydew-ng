System.register([], function($__export) {
  "use strict";
  function getTypeOf(instance) {
    return instance.constructor;
  }
  function instantiateType(type) {
    var params = arguments[1] !== (void 0) ? arguments[1] : [];
    var instance = Object.create(type.prototype);
    instance.constructor.apply(instance, params);
    return instance;
  }
  $__export("getTypeOf", getTypeOf);
  $__export("instantiateType", instantiateType);
  return {
    setters: [],
    execute: function() {
    }
  };
});
//# sourceMappingURL=lang_utils.js.map

//# sourceMappingURL=../../src/test_lib/lang_utils.js.map