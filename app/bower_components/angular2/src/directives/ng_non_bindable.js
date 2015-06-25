System.register(["angular2/annotations"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Directive,
      NgNonBindable;
  return {
    setters: [function($__m) {
      Directive = $__m.Directive;
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
      NgNonBindable = ($traceurRuntime.createClass)(function() {}, {}, {});
      $__export("NgNonBindable", NgNonBindable);
      $__export("NgNonBindable", NgNonBindable = __decorate([Directive({
        selector: '[ng-non-bindable]',
        compileChildren: false
      }), __metadata('design:paramtypes', [])], NgNonBindable));
    }
  };
});
//# sourceMappingURL=ng_non_bindable.js.map

//# sourceMappingURL=../../src/directives/ng_non_bindable.js.map