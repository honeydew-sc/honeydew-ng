System.register(["angular2/di"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      AppViewListener;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
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
      AppViewListener = ($traceurRuntime.createClass)(function() {}, {
        viewCreated: function(view) {},
        viewDestroyed: function(view) {}
      }, {});
      $__export("AppViewListener", AppViewListener);
      $__export("AppViewListener", AppViewListener = __decorate([Injectable(), __metadata('design:paramtypes', [])], AppViewListener));
    }
  };
});
//# sourceMappingURL=view_listener.js.map

//# sourceMappingURL=../../../src/core/compiler/view_listener.js.map