System.register([], function($__export) {
  "use strict";
  var TypeLiteral;
  return {
    setters: [],
    execute: function() {
      TypeLiteral = function() {
        function TypeLiteral() {}
        return ($traceurRuntime.createClass)(TypeLiteral, {get type() {
            throw new Error("Type literals are only supported in Dart");
          }}, {});
      }();
      $__export("TypeLiteral", TypeLiteral);
    }
  };
});
//# sourceMappingURL=type_literal.js.map

//# sourceMappingURL=../../src/di/type_literal.js.map