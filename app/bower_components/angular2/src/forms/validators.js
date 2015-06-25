System.register(["angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var isBlank,
      isPresent,
      ListWrapper,
      StringMapWrapper,
      Validators;
  return {
    setters: [function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }],
    execute: function() {
      Validators = function() {
        function Validators() {}
        return ($traceurRuntime.createClass)(Validators, {}, {
          required: function(c) {
            return isBlank(c.value) || c.value == "" ? {"required": true} : null;
          },
          nullValidator: function(c) {
            return null;
          },
          compose: function(validators) {
            return function(c) {
              var res = ListWrapper.reduce(validators, function(res, validator) {
                var errors = validator(c);
                return isPresent(errors) ? StringMapWrapper.merge(res, errors) : res;
              }, {});
              return StringMapWrapper.isEmpty(res) ? null : res;
            };
          },
          group: function(c) {
            var res = {};
            StringMapWrapper.forEach(c.controls, function(control, name) {
              if (c.contains(name) && isPresent(control.errors)) {
                Validators._mergeErrors(control, res);
              }
            });
            return StringMapWrapper.isEmpty(res) ? null : res;
          },
          array: function(c) {
            var res = {};
            ListWrapper.forEach(c.controls, function(control) {
              if (isPresent(control.errors)) {
                Validators._mergeErrors(control, res);
              }
            });
            return StringMapWrapper.isEmpty(res) ? null : res;
          },
          _mergeErrors: function(control, res) {
            StringMapWrapper.forEach(control.errors, function(value, error) {
              if (!StringMapWrapper.contains(res, error)) {
                res[error] = [];
              }
              var current = res[error];
              current.push(control);
            });
          }
        });
      }();
      $__export("Validators", Validators);
    }
  };
});
//# sourceMappingURL=validators.js.map

//# sourceMappingURL=../../src/forms/validators.js.map