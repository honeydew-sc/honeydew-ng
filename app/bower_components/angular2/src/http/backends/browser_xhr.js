System.register(["angular2/di"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      BrowserXHR;
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
      BrowserXHR = ($traceurRuntime.createClass)(function() {
        return (new window.XMLHttpRequest());
      }, {}, {});
      $__export("BrowserXHR", BrowserXHR);
      $__export("BrowserXHR", BrowserXHR = __decorate([Injectable(), __metadata('design:paramtypes', [])], BrowserXHR));
    }
  };
});
//# sourceMappingURL=browser_xhr.js.map

//# sourceMappingURL=../../../src/http/backends/browser_xhr.js.map