System.register(["angular2/di", "angular2/src/facade/lang", "../../../angular2", "../validators"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      forwardRef,
      Binding,
      CONST_EXPR,
      Directive,
      Validators,
      NgValidator,
      requiredValidatorBinding,
      NgRequiredValidator;
  return {
    setters: [function($__m) {
      forwardRef = $__m.forwardRef;
      Binding = $__m.Binding;
    }, function($__m) {
      CONST_EXPR = $__m.CONST_EXPR;
    }, function($__m) {
      Directive = $__m.Directive;
    }, function($__m) {
      Validators = $__m.Validators;
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
      NgValidator = function() {
        function NgValidator() {}
        return ($traceurRuntime.createClass)(NgValidator, {get validator() {
            throw "Is not implemented";
          }}, {});
      }();
      $__export("NgValidator", NgValidator);
      requiredValidatorBinding = CONST_EXPR(new Binding(NgValidator, {toAlias: forwardRef(function() {
          return NgRequiredValidator;
        })}));
      NgRequiredValidator = function($__super) {
        function $__0() {
          $traceurRuntime.superConstructor($__0).apply(this, arguments);
        }
        return ($traceurRuntime.createClass)($__0, {get validator() {
            return Validators.required;
          }}, {}, $__super);
      }(NgValidator);
      $__export("NgRequiredValidator", NgRequiredValidator);
      $__export("NgRequiredValidator", NgRequiredValidator = __decorate([Directive({
        selector: '[required][ng-control],[required][ng-form-control],[required][ng-model]',
        hostInjector: [requiredValidatorBinding]
      }), __metadata('design:paramtypes', [])], NgRequiredValidator));
    }
  };
});
//# sourceMappingURL=validators.js.map

//# sourceMappingURL=../../../src/forms/directives/validators.js.map