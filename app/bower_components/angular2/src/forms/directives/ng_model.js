System.register(["angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/facade/collection", "angular2/angular2", "angular2/di", "./ng_control", "../model", "./validators", "./shared"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      __param,
      CONST_EXPR,
      EventEmitter,
      ObservableWrapper,
      StringMapWrapper,
      Directive,
      onChange,
      QueryList,
      Query,
      forwardRef,
      Binding,
      NgControl,
      Control,
      NgValidator,
      setUpControl,
      composeNgValidator,
      formControlBinding,
      NgModel;
  return {
    setters: [function($__m) {
      CONST_EXPR = $__m.CONST_EXPR;
    }, function($__m) {
      EventEmitter = $__m.EventEmitter;
      ObservableWrapper = $__m.ObservableWrapper;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      Directive = $__m.Directive;
      onChange = $__m.onChange;
      QueryList = $__m.QueryList;
      Query = $__m.Query;
    }, function($__m) {
      forwardRef = $__m.forwardRef;
      Binding = $__m.Binding;
    }, function($__m) {
      NgControl = $__m.NgControl;
    }, function($__m) {
      Control = $__m.Control;
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
          return NgModel;
        })}));
      NgModel = function($__super) {
        function $__0(ngValidators) {
          $traceurRuntime.superConstructor($__0).call(this);
          this._control = new Control("");
          this._added = false;
          this.update = new EventEmitter();
          this.ngValidators = ngValidators;
        }
        return ($traceurRuntime.createClass)($__0, {
          onChange: function(c) {
            if (!this._added) {
              setUpControl(this._control, this);
              this._control.updateValidity();
              this._added = true;
            }
            if (StringMapWrapper.contains(c, "model")) {
              this._control.updateValue(this.model);
            }
          },
          get control() {
            return this._control;
          },
          get path() {
            return [];
          },
          get validator() {
            return composeNgValidator(this.ngValidators);
          },
          viewToModelUpdate: function(newValue) {
            ObservableWrapper.callNext(this.update, newValue);
          }
        }, {}, $__super);
      }(NgControl);
      $__export("NgModel", NgModel);
      $__export("NgModel", NgModel = __decorate([Directive({
        selector: '[ng-model]:not([ng-control]):not([ng-form-control])',
        hostInjector: [formControlBinding],
        properties: ['model: ngModel'],
        events: ['update: ngModel'],
        lifecycle: [onChange],
        exportAs: 'form'
      }), __param(0, Query(NgValidator)), __metadata('design:paramtypes', [QueryList])], NgModel));
    }
  };
});
//# sourceMappingURL=ng_model.js.map

//# sourceMappingURL=../../../src/forms/directives/ng_model.js.map