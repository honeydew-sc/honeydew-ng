System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/angular2", "angular2/di", "./control_container", "./shared"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      CONST_EXPR,
      ListWrapper,
      ObservableWrapper,
      EventEmitter,
      Directive,
      onChange,
      forwardRef,
      Binding,
      ControlContainer,
      setUpControl,
      formDirectiveBinding,
      NgFormModel;
  return {
    setters: [function($__m) {
      CONST_EXPR = $__m.CONST_EXPR;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      ObservableWrapper = $__m.ObservableWrapper;
      EventEmitter = $__m.EventEmitter;
    }, function($__m) {
      Directive = $__m.Directive;
      onChange = $__m.onChange;
    }, function($__m) {
      forwardRef = $__m.forwardRef;
      Binding = $__m.Binding;
    }, function($__m) {
      ControlContainer = $__m.ControlContainer;
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
          return NgFormModel;
        })}));
      NgFormModel = function($__super) {
        function $__1() {
          var $__4;
          for (var args = [],
              $__3 = 0; $__3 < arguments.length; $__3++)
            args[$__3] = arguments[$__3];
          ($__4 = $traceurRuntime.superConstructor($__1)).call.apply($__4, $traceurRuntime.spread([this], args));
          this.form = null;
          this.directives = [];
          this.ngSubmit = new EventEmitter();
        }
        return ($traceurRuntime.createClass)($__1, {
          onChange: function(_) {
            this._updateDomValue();
          },
          get formDirective() {
            return this;
          },
          get path() {
            return [];
          },
          addControl: function(dir) {
            var c = this.form.find(dir.path);
            setUpControl(c, dir);
            c.updateValidity();
            this.directives.push(dir);
          },
          getControl: function(dir) {
            return this.form.find(dir.path);
          },
          removeControl: function(dir) {
            ListWrapper.remove(this.directives, dir);
          },
          addControlGroup: function(dir) {},
          removeControlGroup: function(dir) {},
          updateModel: function(dir, value) {
            var c = this.form.find(dir.path);
            c.updateValue(value);
          },
          onSubmit: function() {
            ObservableWrapper.callNext(this.ngSubmit, null);
            return false;
          },
          _updateDomValue: function() {
            var $__0 = this;
            ListWrapper.forEach(this.directives, function(dir) {
              var c = $__0.form.find(dir.path);
              dir.valueAccessor.writeValue(c.value);
            });
          }
        }, {}, $__super);
      }(ControlContainer);
      $__export("NgFormModel", NgFormModel);
      $__export("NgFormModel", NgFormModel = __decorate([Directive({
        selector: '[ng-form-model]',
        hostInjector: [formDirectiveBinding],
        properties: ['form: ng-form-model'],
        lifecycle: [onChange],
        host: {'(submit)': 'onSubmit()'},
        events: ['ngSubmit'],
        exportAs: 'form'
      }), __metadata('design:paramtypes', [])], NgFormModel));
    }
  };
});
//# sourceMappingURL=ng_form_model.js.map

//# sourceMappingURL=../../../src/forms/directives/ng_form_model.js.map