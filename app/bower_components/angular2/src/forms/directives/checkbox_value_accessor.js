System.register(["angular2/angular2", "./ng_control", "angular2/src/facade/lang", "./shared"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Directive,
      Renderer,
      ElementRef,
      NgControl,
      isPresent,
      setProperty,
      CheckboxControlValueAccessor;
  return {
    setters: [function($__m) {
      Directive = $__m.Directive;
      Renderer = $__m.Renderer;
      ElementRef = $__m.ElementRef;
    }, function($__m) {
      NgControl = $__m.NgControl;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      setProperty = $__m.setProperty;
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
      CheckboxControlValueAccessor = ($traceurRuntime.createClass)(function(cd, renderer, elementRef) {
        this.cd = cd;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.onChange = function(_) {};
        this.onTouched = function() {};
        cd.valueAccessor = this;
      }, {
        writeValue: function(value) {
          this.checked = value;
          setProperty(this.renderer, this.elementRef, "checked", value);
        },
        get ngClassUntouched() {
          return isPresent(this.cd.control) ? this.cd.control.untouched : false;
        },
        get ngClassTouched() {
          return isPresent(this.cd.control) ? this.cd.control.touched : false;
        },
        get ngClassPristine() {
          return isPresent(this.cd.control) ? this.cd.control.pristine : false;
        },
        get ngClassDirty() {
          return isPresent(this.cd.control) ? this.cd.control.dirty : false;
        },
        get ngClassValid() {
          return isPresent(this.cd.control) ? this.cd.control.valid : false;
        },
        get ngClassInvalid() {
          return isPresent(this.cd.control) ? !this.cd.control.valid : false;
        },
        registerOnChange: function(fn) {
          this.onChange = fn;
        },
        registerOnTouched: function(fn) {
          this.onTouched = fn;
        }
      }, {});
      $__export("CheckboxControlValueAccessor", CheckboxControlValueAccessor);
      $__export("CheckboxControlValueAccessor", CheckboxControlValueAccessor = __decorate([Directive({
        selector: 'input[type=checkbox][ng-control],input[type=checkbox][ng-form-control],input[type=checkbox][ng-model]',
        host: {
          '(change)': 'onChange($event.target.checked)',
          '(blur)': 'onTouched()',
          '[checked]': 'checked',
          '[class.ng-untouched]': 'ngClassUntouched',
          '[class.ng-touched]': 'ngClassTouched',
          '[class.ng-pristine]': 'ngClassPristine',
          '[class.ng-dirty]': 'ngClassDirty',
          '[class.ng-valid]': 'ngClassValid',
          '[class.ng-invalid]': 'ngClassInvalid'
        }
      }), __metadata('design:paramtypes', [NgControl, Renderer, ElementRef])], CheckboxControlValueAccessor));
    }
  };
});
//# sourceMappingURL=checkbox_value_accessor.js.map

//# sourceMappingURL=../../../src/forms/directives/checkbox_value_accessor.js.map