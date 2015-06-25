System.register(["angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/facade/collection", "./validators"], function($__export) {
  "use strict";
  var StringWrapper,
      isPresent,
      isBlank,
      EventEmitter,
      ObservableWrapper,
      StringMapWrapper,
      ListWrapper,
      List,
      Validators,
      VALID,
      INVALID,
      AbstractControl,
      Control,
      ControlGroup,
      ControlArray;
  function isControl(c) {
    return c instanceof AbstractControl;
  }
  function _find(c, path) {
    if (isBlank(path))
      return null;
    if (!(path instanceof List)) {
      path = StringWrapper.split(path, new RegExp("/"));
    }
    if (ListWrapper.isEmpty(path))
      return null;
    return ListWrapper.reduce(path, function(v, name) {
      if (v instanceof ControlGroup) {
        return isPresent(v.controls[name]) ? v.controls[name] : null;
      } else if (v instanceof ControlArray) {
        var index = name;
        return isPresent(v.at(index)) ? v.at(index) : null;
      } else {
        return null;
      }
    }, c);
  }
  $__export("isControl", isControl);
  return {
    setters: [function($__m) {
      StringWrapper = $__m.StringWrapper;
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }, function($__m) {
      EventEmitter = $__m.EventEmitter;
      ObservableWrapper = $__m.ObservableWrapper;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
      ListWrapper = $__m.ListWrapper;
      List = $__m.List;
    }, function($__m) {
      Validators = $__m.Validators;
    }],
    execute: function() {
      VALID = "VALID";
      $__export("VALID", VALID);
      INVALID = "INVALID";
      $__export("INVALID", INVALID);
      AbstractControl = function() {
        function AbstractControl(validator) {
          this.validator = validator;
          this._pristine = true;
          this._touched = false;
        }
        return ($traceurRuntime.createClass)(AbstractControl, {
          get value() {
            return this._value;
          },
          get status() {
            return this._status;
          },
          get valid() {
            return this._status === VALID;
          },
          get errors() {
            return this._errors;
          },
          get pristine() {
            return this._pristine;
          },
          get dirty() {
            return !this.pristine;
          },
          get touched() {
            return this._touched;
          },
          get untouched() {
            return !this._touched;
          },
          get valueChanges() {
            return this._valueChanges;
          },
          markAsTouched: function() {
            this._touched = true;
          },
          markAsDirty: function() {
            var onlySelf = (arguments[0] !== (void 0) ? arguments[0] : {}).onlySelf;
            onlySelf = isPresent(onlySelf) ? onlySelf : false;
            this._pristine = false;
            if (isPresent(this._parent) && !onlySelf) {
              this._parent.markAsDirty({onlySelf: onlySelf});
            }
          },
          setParent: function(parent) {
            this._parent = parent;
          },
          updateValidity: function() {
            var onlySelf = (arguments[0] !== (void 0) ? arguments[0] : {}).onlySelf;
            onlySelf = isPresent(onlySelf) ? onlySelf : false;
            this._errors = this.validator(this);
            this._status = isPresent(this._errors) ? INVALID : VALID;
            if (isPresent(this._parent) && !onlySelf) {
              this._parent.updateValidity({onlySelf: onlySelf});
            }
          },
          updateValueAndValidity: function() {
            var $__2 = arguments[0] !== (void 0) ? arguments[0] : {},
                onlySelf = $__2.onlySelf,
                emitEvent = $__2.emitEvent;
            onlySelf = isPresent(onlySelf) ? onlySelf : false;
            emitEvent = isPresent(emitEvent) ? emitEvent : true;
            this._updateValue();
            if (emitEvent) {
              ObservableWrapper.callNext(this._valueChanges, this._value);
            }
            this._errors = this.validator(this);
            this._status = isPresent(this._errors) ? INVALID : VALID;
            if (isPresent(this._parent) && !onlySelf) {
              this._parent.updateValueAndValidity({
                onlySelf: onlySelf,
                emitEvent: emitEvent
              });
            }
          },
          find: function(path) {
            return _find(this, path);
          },
          getError: function(errorCode) {
            var path = arguments[1] !== (void 0) ? arguments[1] : null;
            var c = isPresent(path) && !ListWrapper.isEmpty(path) ? this.find(path) : this;
            if (isPresent(c) && isPresent(c._errors)) {
              return StringMapWrapper.get(c._errors, errorCode);
            } else {
              return null;
            }
          },
          hasError: function(errorCode) {
            var path = arguments[1] !== (void 0) ? arguments[1] : null;
            return isPresent(this.getError(errorCode, path));
          },
          _updateValue: function() {}
        }, {});
      }();
      $__export("AbstractControl", AbstractControl);
      Control = function($__super) {
        function Control(value) {
          var validator = arguments[1] !== (void 0) ? arguments[1] : Validators.nullValidator;
          $traceurRuntime.superConstructor(Control).call(this, validator);
          this._value = value;
          this.updateValidity({onlySelf: true});
          this._valueChanges = new EventEmitter();
        }
        return ($traceurRuntime.createClass)(Control, {
          updateValue: function(value) {
            var $__2 = arguments[1] !== (void 0) ? arguments[1] : {},
                onlySelf = $__2.onlySelf,
                emitEvent = $__2.emitEvent;
            this._value = value;
            if (isPresent(this._onChange))
              this._onChange(this._value);
            this.updateValueAndValidity({
              onlySelf: onlySelf,
              emitEvent: emitEvent
            });
          },
          registerOnChange: function(fn) {
            this._onChange = fn;
          }
        }, {}, $__super);
      }(AbstractControl);
      $__export("Control", Control);
      ControlGroup = function($__super) {
        function ControlGroup(controls) {
          var optionals = arguments[1] !== (void 0) ? arguments[1] : null;
          var validator = arguments[2] !== (void 0) ? arguments[2] : Validators.group;
          $traceurRuntime.superConstructor(ControlGroup).call(this, validator);
          this.controls = controls;
          this._optionals = isPresent(optionals) ? optionals : {};
          this._valueChanges = new EventEmitter();
          this._setParentForControls();
          this._value = this._reduceValue();
          this.updateValidity({onlySelf: true});
        }
        return ($traceurRuntime.createClass)(ControlGroup, {
          addControl: function(name, c) {
            this.controls[name] = c;
            c.setParent(this);
          },
          removeControl: function(name) {
            StringMapWrapper.delete(this.controls, name);
          },
          include: function(controlName) {
            StringMapWrapper.set(this._optionals, controlName, true);
            this.updateValueAndValidity();
          },
          exclude: function(controlName) {
            StringMapWrapper.set(this._optionals, controlName, false);
            this.updateValueAndValidity();
          },
          contains: function(controlName) {
            var c = StringMapWrapper.contains(this.controls, controlName);
            return c && this._included(controlName);
          },
          _setParentForControls: function() {
            var $__0 = this;
            StringMapWrapper.forEach(this.controls, function(control, name) {
              control.setParent($__0);
            });
          },
          _updateValue: function() {
            this._value = this._reduceValue();
          },
          _reduceValue: function() {
            return this._reduceChildren({}, function(acc, control, name) {
              acc[name] = control.value;
              return acc;
            });
          },
          _reduceChildren: function(initValue, fn) {
            var $__0 = this;
            var res = initValue;
            StringMapWrapper.forEach(this.controls, function(control, name) {
              if ($__0._included(name)) {
                res = fn(res, control, name);
              }
            });
            return res;
          },
          _included: function(controlName) {
            var isOptional = StringMapWrapper.contains(this._optionals, controlName);
            return !isOptional || StringMapWrapper.get(this._optionals, controlName);
          }
        }, {}, $__super);
      }(AbstractControl);
      $__export("ControlGroup", ControlGroup);
      ControlArray = function($__super) {
        function ControlArray(controls) {
          var validator = arguments[1] !== (void 0) ? arguments[1] : Validators.array;
          $traceurRuntime.superConstructor(ControlArray).call(this, validator);
          this.controls = controls;
          this._valueChanges = new EventEmitter();
          this._setParentForControls();
          this._updateValue();
          this.updateValidity({onlySelf: true});
        }
        return ($traceurRuntime.createClass)(ControlArray, {
          at: function(index) {
            return this.controls[index];
          },
          push: function(control) {
            this.controls.push(control);
            control.setParent(this);
            this.updateValueAndValidity();
          },
          insert: function(index, control) {
            ListWrapper.insert(this.controls, index, control);
            control.setParent(this);
            this.updateValueAndValidity();
          },
          removeAt: function(index) {
            ListWrapper.removeAt(this.controls, index);
            this.updateValueAndValidity();
          },
          get length() {
            return this.controls.length;
          },
          _updateValue: function() {
            this._value = ListWrapper.map(this.controls, function(c) {
              return c.value;
            });
          },
          _setParentForControls: function() {
            var $__0 = this;
            ListWrapper.forEach(this.controls, function(control) {
              control.setParent($__0);
            });
          }
        }, {}, $__super);
      }(AbstractControl);
      $__export("ControlArray", ControlArray);
    }
  };
});
//# sourceMappingURL=model.js.map

//# sourceMappingURL=../../src/forms/model.js.map