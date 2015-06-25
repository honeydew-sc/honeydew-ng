System.register([], function($__export) {
  "use strict";
  return {
    setters: [],
    execute: function() {
      if (!Object.hasOwnProperty('name')) {
        Object.defineProperty(Function.prototype, 'name', {get: function() {
            var name = this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];
            Object.defineProperty(this, 'name', {value: name});
            return name;
          }});
      }
    }
  };
});
//# sourceMappingURL=shims_for_IE.js.map

//# sourceMappingURL=../../src/test_lib/shims_for_IE.js.map