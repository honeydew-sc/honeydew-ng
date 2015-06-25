System.register(["angular2/src/facade/collection", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var ListWrapper,
      stringify,
      BaseException,
      isBlank,
      AbstractBindingError,
      NoBindingError,
      AsyncBindingError,
      CyclicDependencyError,
      InstantiationError,
      InvalidBindingError,
      NoAnnotationError;
  function findFirstClosedCycle(keys) {
    var res = [];
    for (var i = 0; i < keys.length; ++i) {
      if (ListWrapper.contains(res, keys[i])) {
        res.push(keys[i]);
        return res;
      } else {
        res.push(keys[i]);
      }
    }
    return res;
  }
  function constructResolvingPath(keys) {
    if (keys.length > 1) {
      var reversed = findFirstClosedCycle(ListWrapper.reversed(keys));
      var tokenStrs = ListWrapper.map(reversed, function(k) {
        return stringify(k.token);
      });
      return " (" + tokenStrs.join(' -> ') + ")";
    } else {
      return "";
    }
  }
  return {
    setters: [function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      stringify = $__m.stringify;
      BaseException = $__m.BaseException;
      isBlank = $__m.isBlank;
    }],
    execute: function() {
      AbstractBindingError = function($__super) {
        function AbstractBindingError(key, constructResolvingMessage) {
          $traceurRuntime.superConstructor(AbstractBindingError).call(this);
          this.keys = [key];
          this.constructResolvingMessage = constructResolvingMessage;
          this.message = this.constructResolvingMessage(this.keys);
        }
        return ($traceurRuntime.createClass)(AbstractBindingError, {
          addKey: function(key) {
            this.keys.push(key);
            this.message = this.constructResolvingMessage(this.keys);
          },
          toString: function() {
            return this.message;
          }
        }, {}, $__super);
      }(BaseException);
      $__export("AbstractBindingError", AbstractBindingError);
      NoBindingError = function($__super) {
        function NoBindingError(key) {
          $traceurRuntime.superConstructor(NoBindingError).call(this, key, function(keys) {
            var first = stringify(ListWrapper.first(keys).token);
            return ("No provider for " + first + "!" + constructResolvingPath(keys));
          });
        }
        return ($traceurRuntime.createClass)(NoBindingError, {}, {}, $__super);
      }(AbstractBindingError);
      $__export("NoBindingError", NoBindingError);
      AsyncBindingError = function($__super) {
        function AsyncBindingError(key) {
          $traceurRuntime.superConstructor(AsyncBindingError).call(this, key, function(keys) {
            var first = stringify(ListWrapper.first(keys).token);
            return ("Cannot instantiate " + first + " synchronously. It is provided as a promise!" + constructResolvingPath(keys));
          });
        }
        return ($traceurRuntime.createClass)(AsyncBindingError, {}, {}, $__super);
      }(AbstractBindingError);
      $__export("AsyncBindingError", AsyncBindingError);
      CyclicDependencyError = function($__super) {
        function CyclicDependencyError(key) {
          $traceurRuntime.superConstructor(CyclicDependencyError).call(this, key, function(keys) {
            return ("Cannot instantiate cyclic dependency!" + constructResolvingPath(keys));
          });
        }
        return ($traceurRuntime.createClass)(CyclicDependencyError, {}, {}, $__super);
      }(AbstractBindingError);
      $__export("CyclicDependencyError", CyclicDependencyError);
      InstantiationError = function($__super) {
        function InstantiationError(cause, key) {
          $traceurRuntime.superConstructor(InstantiationError).call(this, key, function(keys) {
            var first = stringify(ListWrapper.first(keys).token);
            return ("Error during instantiation of " + first + "!" + constructResolvingPath(keys) + ". ORIGINAL ERROR: " + cause);
          });
          this.cause = cause;
          this.causeKey = key;
        }
        return ($traceurRuntime.createClass)(InstantiationError, {}, {}, $__super);
      }(AbstractBindingError);
      $__export("InstantiationError", InstantiationError);
      InvalidBindingError = function($__super) {
        function InvalidBindingError(binding) {
          $traceurRuntime.superConstructor(InvalidBindingError).call(this);
          this.message = "Invalid binding - only instances of Binding and Type are allowed, got: " + binding.toString();
        }
        return ($traceurRuntime.createClass)(InvalidBindingError, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(BaseException);
      $__export("InvalidBindingError", InvalidBindingError);
      NoAnnotationError = function($__super) {
        function NoAnnotationError(typeOrFunc, params) {
          $traceurRuntime.superConstructor(NoAnnotationError).call(this);
          var signature = [];
          for (var i = 0,
              ii = params.length; i < ii; i++) {
            var parameter = params[i];
            if (isBlank(parameter) || parameter.length == 0) {
              signature.push('?');
            } else {
              signature.push(ListWrapper.map(parameter, stringify).join(' '));
            }
          }
          this.message = "Cannot resolve all parameters for " + stringify(typeOrFunc) + "(" + signature.join(', ') + "). " + 'Make sure they all have valid type or annotations.';
        }
        return ($traceurRuntime.createClass)(NoAnnotationError, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(BaseException);
      $__export("NoAnnotationError", NoAnnotationError);
    }
  };
});
//# sourceMappingURL=exceptions.js.map

//# sourceMappingURL=../../src/di/exceptions.js.map