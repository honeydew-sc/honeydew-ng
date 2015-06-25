System.register(["angular2/src/facade/async", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/core/annotations/decorators", "angular2/di", "./control_container", "../model", "./shared"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      PromiseWrapper,
      ObservableWrapper,
      EventEmitter,
      ListWrapper,
      isPresent,
      CONST_EXPR,
      Directive,
      forwardRef,
      Binding,
      ControlContainer,
      ControlGroup,
      Control,
      setUpControl,
      formDirectiveBinding,
      NgForm;
  return {
    setters: [function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
      ObservableWrapper = $__m.ObservableWrapper;
      EventEmitter = $__m.EventEmitter;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
      CONST_EXPR = $__m.CONST_EXPR;
    }, function($__m) {
      Directive = $__m.Directive;
    }, function($__m) {
      forwardRef = $__m.forwardRef;
      Binding = $__m.Binding;
    }, function($__m) {
      ControlContainer = $__m.ControlContainer;
    }, function($__m) {
      ControlGroup = $__m.ControlGroup;
      Control = $__m.Control;
    }, function($__m) {
      setUpControl = $__m.setUpControl;
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
      formDirectiveBinding = CONST_EXPR(new Binding(ControlContainer, {toAlias: forwardRef(function() {
          return NgForm;
        })}));
      NgForm = function($__super) {
        function $__1() {
          $traceurRuntime.superConstructor($__1).call(this);
          this.ngSubmit = new EventEmitter();
          this.form = new ControlGroup({});
        }
        return ($traceurRuntime.createClass)($__1, {
          get formDirective() {
            return this;
          },
          get path() {
            return [];
          },
          get controls() {
            return this.form.controls;
          },
          get value() {
            return this.form.value;
          },
          get errors() {
            return this.form.errors;
          },
          addControl: function(dir) {
            var $__0 = this;
            this._later(function(_) {
              var container = $__0._findContainer(dir.path);
              var c = new Control("");
              setUpControl(c, dir);
              container.addControl(dir.name, c);
              c.updateValidity();
            });
          },
          getControl: function(dir) {
            return this.form.find(dir.path);
          },
          removeControl: function(dir) {
            var $__0 = this;
            this._later(function(_) {
              var container = $__0._findContainer(dir.path);
              if (isPresent(container)) {
                container.removeControl(dir.name);
                container.updateValidity();
              }
            });
          },
          addControlGroup: function(dir) {
            var $__0 = this;
            this._later(function(_) {
              var container = $__0._findContainer(dir.path);
              var c = new ControlGroup({});
              container.addControl(dir.name, c);
              c.updateValidity();
            });
          },
          removeControlGroup: function(dir) {
            var $__0 = this;
            this._later(function(_) {
              var container = $__0._findContainer(dir.path);
              if (isPresent(container)) {
                container.removeControl(dir.name);
                container.updateValidity();
              }
            });
          },
          updateModel: function(dir, value) {
            var $__0 = this;
            this._later(function(_) {
              var c = $__0.form.find(dir.path);
              c.updateValue(value);
            });
          },
          onSubmit: function() {
            ObservableWrapper.callNext(this.ngSubmit, null);
            return false;
          },
          _findContainer: function(path) {
            ListWrapper.removeLast(path);
            return ListWrapper.isEmpty(path) ? this.form : this.form.find(path);
          },
          _later: function(fn) {
            var c = PromiseWrapper.completer();
            PromiseWrapper.then(c.promise, fn, function(_) {});
            c.resolve(null);
          }
        }, {}, $__super);
      }(ControlContainer);
      $__export("NgForm", NgForm);
      $__export("NgForm", NgForm = __decorate([Directive({
        selector: 'form:not([ng-no-form]):not([ng-form-model]),ng-form,[ng-form]',
        hostInjector: [formDirectiveBinding],
        host: {'(submit)': 'onSubmit()'},
        events: ['ngSubmit'],
        exportAs: 'form'
      }), __metadata('design:paramtypes', [])], NgForm));
    }
  };
});
//# sourceMappingURL=ng_form.js.map

//# sourceMappingURL=../../../src/forms/directives/ng_form.js.map