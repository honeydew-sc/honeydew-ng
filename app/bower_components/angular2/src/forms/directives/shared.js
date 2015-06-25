System.register(["angular2/src/facade/collection", "angular2/src/facade/lang", "../validators"], function($__export) {
  "use strict";
  var ListWrapper,
      iterableToList,
      isBlank,
      BaseException,
      Validators;
  function controlPath(name, parent) {
    var p = ListWrapper.clone(parent.path);
    p.push(name);
    return p;
  }
  function setUpControl(c, dir) {
    if (isBlank(c))
      _throwError(dir, "Cannot find control");
    if (isBlank(dir.valueAccessor))
      _throwError(dir, "No value accessor for");
    c.validator = Validators.compose([c.validator, dir.validator]);
    dir.valueAccessor.writeValue(c.value);
    dir.valueAccessor.registerOnChange(function(newValue) {
      dir.viewToModelUpdate(newValue);
      c.updateValue(newValue);
      c.markAsDirty();
    });
    c.registerOnChange(function(newValue) {
      return dir.valueAccessor.writeValue(newValue);
    });
    dir.valueAccessor.registerOnTouched(function() {
      return c.markAsTouched();
    });
  }
  function composeNgValidator(ngValidators) {
    if (isBlank(ngValidators))
      return Validators.nullValidator;
    return Validators.compose(iterableToList(ngValidators).map(function(v) {
      return v.validator;
    }));
  }
  function _throwError(dir, message) {
    var path = ListWrapper.join(dir.path, " -> ");
    throw new BaseException((message + " '" + path + "'"));
  }
  function setProperty(renderer, elementRef, propName, propValue) {
    renderer.setElementProperty(elementRef, propName, propValue);
  }
  $__export("controlPath", controlPath);
  $__export("setUpControl", setUpControl);
  $__export("composeNgValidator", composeNgValidator);
  $__export("setProperty", setProperty);
  return {
    setters: [function($__m) {
      ListWrapper = $__m.ListWrapper;
      iterableToList = $__m.iterableToList;
    }, function($__m) {
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
    }, function($__m) {
      Validators = $__m.Validators;
    }],
    execute: function() {
    }
  };
});
//# sourceMappingURL=shared.js.map

//# sourceMappingURL=../../../src/forms/directives/shared.js.map