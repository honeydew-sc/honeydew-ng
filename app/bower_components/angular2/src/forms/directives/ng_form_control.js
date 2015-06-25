System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/angular2", "angular2/di", "./ng_control", "./validators", "./shared"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      __param,
      CONST_EXPR,
      StringMapWrapper,
      EventEmitter,
      ObservableWrapper,
      Directive,
      onChange,
      Query,
      QueryList,
      forwardRef,
      Binding,
      NgControl,
      NgValidator,
      setUpControl,
      composeNgValidator,
      formControlBinding,
      NgFormControl;
  return {
    setters: [function($__m) {
      CONST_EXPR = $__m.CONST_EXPR;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      EventEmitter = $__m.EventEmitter;
      ObservableWrapper = $__m.ObservableWrapper;
    }, function($__m) {
      Directive = $__m.Directive;
      onChange = $__m.onChange;
      Query = $__m.Query;
      QueryList = $__m.QueryList;
    }, function($__m) {
      forwardRef = $__m.forwardRef;
      Binding = $__m.Binding;
    }, function($__m) {
      NgControl = $__m.NgControl;
    }, function($__m) {
      NgValidator = $__m.NgValidator;
    }, function($__m) {
      setUpControl = $__m.setUpControl;
      composeNgValidator = $__m.composeNgValidator;
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
      __param = (this && this.__param) || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      formControlBinding = CONST_EXPR(new Binding(NgControl, {toAlias: forwardRef(function() {
          return NgFormControl;
        })}));
      NgFormControl = function($__super) {
        function $__0(ngValidators) {
          $traceurRuntime.superConstructor($__0).call(this);
          this.update = new EventEmitter();
          this._added = false;
          this.ngValidators = ngValidators;
        }
        return ($traceurRuntime.createClass)($__0, {
          onChange: function(c) {
            if (!this._added) {
              setUpControl(this.form, this);
              this.form.updateValidity();
              this._added = true;
            }
            if (StringMapWrapper.contains(c, "model")) {
              this.form.updateValue(this.model);
            }
          },
          get path() {
            return [];
          },
          get control() {
            return this.form;
          },
          get validator() {
            return composeNgValidator(this.ngValidators);
          },
          viewToModelUpdate: function(newValue) {
            ObservableWrapper.callNext(this.update, newValue);
          }
        }, {}, $__super);
      }(NgControl);
      $__export("NgFormControl", NgFormControl);
      $__export("NgFormControl", NgFormControl = __decorate([Directive({
        selector: '[ng-form-control]',
        hostInjector: [formControlBinding],
        properties: ['form: ngFormControl', 'model: ngModel'],
        events: ['update: ngModel'],
        lifecycle: [onChange],
        exportAs: 'form'
      }), __param(0, Query(NgValidator)), __metadata('design:paramtypes', [QueryList])], NgFormControl));
    }
  };
});
//# sourceMappingURL=ng_form_control.js.map

//# sourceMappingURL=../../../src/forms/directives/ng_form_control.js.map