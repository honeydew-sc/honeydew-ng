System.register(["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      CONST,
      OpaqueToken;
  return {
    setters: [function($__m) {
      CONST = $__m.CONST;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      OpaqueToken = ($traceurRuntime.createClass)(function(desc) {
        this._desc = 'Token(' + desc + ')';
      }, {toString: function() {
          return this._desc;
        }}, {});
      $__export("OpaqueToken", OpaqueToken);
      $__export("OpaqueToken", OpaqueToken = __decorate([CONST(), __metadata('design:paramtypes', [String])], OpaqueToken));
    }
  };
});
//# sourceMappingURL=opaque_token.js.map

//# sourceMappingURL=../../src/di/opaque_token.js.map