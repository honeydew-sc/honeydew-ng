System.register(["angular2/di"], function($__export) {
  "use strict";
  var OpaqueToken,
      appComponentRefToken,
      appComponentTypeToken;
  return {
    setters: [function($__m) {
      OpaqueToken = $__m.OpaqueToken;
    }],
    execute: function() {
      appComponentRefToken = new OpaqueToken('ComponentRef');
      $__export("appComponentRefToken", appComponentRefToken);
      appComponentTypeToken = new OpaqueToken('RootComponent');
      $__export("appComponentTypeToken", appComponentTypeToken);
    }
  };
});
//# sourceMappingURL=application_tokens.js.map

//# sourceMappingURL=../../src/core/application_tokens.js.map