System.register(["angular2/di", "angular2/src/dom/dom_adapter", "./shadow_dom_strategy"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      DOM,
      ShadowDomStrategy,
      NativeShadowDomStrategy;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
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
      NativeShadowDomStrategy = function($__super) {
        function $__0() {
          $traceurRuntime.superConstructor($__0).apply(this, arguments);
        }
        return ($traceurRuntime.createClass)($__0, {prepareShadowRoot: function(el) {
            return DOM.createShadowRoot(el);
          }}, {}, $__super);
      }(ShadowDomStrategy);
      $__export("NativeShadowDomStrategy", NativeShadowDomStrategy);
      $__export("NativeShadowDomStrategy", NativeShadowDomStrategy = __decorate([Injectable(), __metadata('design:paramtypes', [])], NativeShadowDomStrategy));
    }
  };
});
//# sourceMappingURL=native_shadow_dom_strategy.js.map

//# sourceMappingURL=../../../../src/render/dom/shadow_dom/native_shadow_dom_strategy.js.map