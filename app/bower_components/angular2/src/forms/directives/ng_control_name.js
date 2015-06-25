System.register(["angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/facade/collection", "angular2/angular2", "angular2/di", "./control_container", "./ng_control", "./validators", "./shared"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      __param,
      CONST_EXPR,
      EventEmitter,
      ObservableWrapper,
      StringMapWrapper,
      Directive,
      Ancestor,
      onDestroy,
      onChange,
      Query,
      QueryList,
      forwardRef,
      Binding,
      ControlContainer,
      NgControl,
      NgValidator,
      controlPath,
      composeNgValidator,
      controlNameBinding,
      NgControlName;
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
      Ancestor = $__m.Ancestor;
      onDestroy = $__m.onDestroy;
      onChange = $__m.onChange;
      Query = $__m.Query;
      QueryList = $__m.QueryList;
    }, function($__m) {
      forwardRef = $__m.forwardRef;
      Binding = $__m.Binding;
    }, function($__m) {
      ControlContainer = $__m.ControlContainer;
    }, function($__m) {
      NgControl = $__m.NgControl;
    }, function($__m) {
      NgValidator = $__m.NgValidator;
    }, function($__m) {
      controlPath = $__m.controlPath;
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
      controlNameBinding = CONST_EXPR(new Binding(NgControl, {toAlias: forwardRef(function() {
          return NgControlName;
        })}));
      NgControlName = function($__super) {
        function $__0(parent, ngValidators) {
          $traceurRuntime.superConstructor($__0).call(this);
          this.update = new EventEmitter();
          this._added = false;
          this._parent = parent;
          this.ngValidators = ngValidators;
        }
        return ($traceurRuntime.createClass)($__0, {
          onChange: function(c) {
            if (!this._added) {
              this.formDirective.addControl(this);
              this._added = true;
            }
            if (StringMapWrapper.contains(c, "model")) {
              this.formDirective.updateModel(this, this.model);
            }
          },
          onDestroy: function() {
            this.formDirective.removeControl(this);
          },
          viewToModelUpdate: function(newValue) {
            ObservableWrapper.callNext(this.update, newValue);
          },
          get path() {
            return controlPath(this.name, this._parent);
          },
          get formDirective() {
            return this._parent.formDirective;
          },
          get control() {
            return this.formDirective.getControl(this);
          },
          get validator() {
            return composeNgValidator(this.ngValidators);
          }
        }, {}, $__super);
      }(NgControl);
      $__export("NgControlName", NgControlName);
      $__export("NgControlName", NgControlName = __decorate([Directive({
        selector: '[ng-control]',
        hostInjector: [controlNameBinding],
        properties: ['name: ngControl', 'model: ngModel'],
        events: ['update: ngModel'],
        lifecycle: [onDestroy, onChange],
        exportAs: 'form'
      }), __param(0, Ancestor()), __param(1, Query(NgValidator)), __metadata('design:paramtypes', [ControlContainer, QueryList])], NgControlName));
    }
  };
});
//# sourceMappingURL=ng_control_name.js.map

//# sourceMappingURL=../../../src/forms/directives/ng_control_name.js.map