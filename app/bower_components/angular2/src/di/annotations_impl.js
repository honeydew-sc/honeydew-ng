System.register(["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      CONST,
      stringify,
      Inject,
      InjectPromise,
      InjectLazy,
      Optional,
      DependencyAnnotation,
      Injectable;
  return {
    setters: [function($__m) {
      CONST = $__m.CONST;
      stringify = $__m.stringify;
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
      Inject = ($traceurRuntime.createClass)(function(token) {
        this.token = token;
      }, {toString: function() {
          return ("@Inject(" + stringify(this.token) + ")");
        }}, {});
      $__export("Inject", Inject);
      $__export("Inject", Inject = __decorate([CONST(), __metadata('design:paramtypes', [Object])], Inject));
      InjectPromise = ($traceurRuntime.createClass)(function(token) {
        this.token = token;
      }, {toString: function() {
          return ("@InjectPromise(" + stringify(this.token) + ")");
        }}, {});
      $__export("InjectPromise", InjectPromise);
      $__export("InjectPromise", InjectPromise = __decorate([CONST(), __metadata('design:paramtypes', [Object])], InjectPromise));
      InjectLazy = ($traceurRuntime.createClass)(function(token) {
        this.token = token;
      }, {toString: function() {
          return ("@InjectLazy(" + stringify(this.token) + ")");
        }}, {});
      $__export("InjectLazy", InjectLazy);
      $__export("InjectLazy", InjectLazy = __decorate([CONST(), __metadata('design:paramtypes', [Object])], InjectLazy));
      Optional = ($traceurRuntime.createClass)(function() {}, {toString: function() {
          return "@Optional()";
        }}, {});
      $__export("Optional", Optional);
      $__export("Optional", Optional = __decorate([CONST(), __metadata('design:paramtypes', [])], Optional));
      DependencyAnnotation = ($traceurRuntime.createClass)(function() {}, {get token() {
          return null;
        }}, {});
      $__export("DependencyAnnotation", DependencyAnnotation);
      $__export("DependencyAnnotation", DependencyAnnotation = __decorate([CONST(), __metadata('design:paramtypes', [])], DependencyAnnotation));
      Injectable = ($traceurRuntime.createClass)(function() {}, {}, {});
      $__export("Injectable", Injectable);
      $__export("Injectable", Injectable = __decorate([CONST(), __metadata('design:paramtypes', [])], Injectable));
    }
  };
});
//# sourceMappingURL=annotations_impl.js.map

//# sourceMappingURL=../../src/di/annotations_impl.js.map