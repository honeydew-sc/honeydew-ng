System.register(["angular2/di", "angular2/src/facade/lang", "angular2/src/dom/dom_adapter"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      isBlank,
      DOM,
      AppRootUrl;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      isBlank = $__m.isBlank;
    }, function($__m) {
      DOM = $__m.DOM;
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
      AppRootUrl = ($traceurRuntime.createClass)(function() {}, {get value() {
          if (isBlank(this._value)) {
            var a = DOM.createElement('a');
            DOM.resolveAndSetHref(a, './', null);
            this._value = DOM.getHref(a);
          }
          return this._value;
        }}, {});
      $__export("AppRootUrl", AppRootUrl);
      $__export("AppRootUrl", AppRootUrl = __decorate([Injectable(), __metadata('design:paramtypes', [])], AppRootUrl));
    }
  };
});
//# sourceMappingURL=app_root_url.js.map

//# sourceMappingURL=../../src/services/app_root_url.js.map