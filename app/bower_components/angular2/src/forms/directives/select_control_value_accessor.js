System.register(["angular2/angular2", "./ng_control", "angular2/src/facade/lang", "./shared"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      __param,
      Directive,
      Query,
      QueryList,
      Renderer,
      ElementRef,
      NgControl,
      isPresent,
      setProperty,
      NgSelectOption,
      SelectControlValueAccessor;
  return {
    setters: [function($__m) {
      Directive = $__m.Directive;
      Query = $__m.Query;
      QueryList = $__m.QueryList;
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
      __param = (this && this.__param) || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      NgSelectOption = ($traceurRuntime.createClass)(function() {}, {}, {});
      $__export("NgSelectOption", NgSelectOption);
      $__export("NgSelectOption", NgSelectOption = __decorate([Directive({selector: 'option'}), __metadata('design:paramtypes', [])], NgSelectOption));
      SelectControlValueAccessor = ($traceurRuntime.createClass)(function(cd, renderer, elementRef, query) {
        this.cd = cd;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.value = '';
        this.onChange = function(_) {};
        this.onTouched = function() {};
        cd.valueAccessor = this;
        this._updateValueWhenListOfOptionsChanges(query);
      }, {
        writeValue: function(value) {
          this.value = value;
          setProperty(this.renderer, this.elementRef, "value", value);
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
        },
        _updateValueWhenListOfOptionsChanges: function(query) {
          var $__0 = this;
          query.onChange(function() {
            return $__0.writeValue($__0.value);
          });
        }
      }, {});
      $__export("SelectControlValueAccessor", SelectControlValueAccessor);
      $__export("SelectControlValueAccessor", SelectControlValueAccessor = __decorate([Directive({
        selector: 'select[ng-control],select[ng-form-control],select[ng-model]',
        host: {
          '(change)': 'onChange($event.target.value)',
          '(input)': 'onChange($event.target.value)',
          '(blur)': 'onTouched()',
          '[value]': 'value',
          '[class.ng-untouched]': 'ngClassUntouched',
          '[class.ng-touched]': 'ngClassTouched',
          '[class.ng-pristine]': 'ngClassPristine',
          '[class.ng-dirty]': 'ngClassDirty',
          '[class.ng-valid]': 'ngClassValid',
          '[class.ng-invalid]': 'ngClassInvalid'
        }
      }), __param(3, Query(NgSelectOption, {descendants: true})), __metadata('design:paramtypes', [NgControl, Renderer, ElementRef, QueryList])], SelectControlValueAccessor));
    }
  };
});
//# sourceMappingURL=select_control_value_accessor.js.map

//# sourceMappingURL=../../../src/forms/directives/select_control_value_accessor.js.map