System.register(["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var BaseException,
      WrappedValue,
      _wrappedValues,
      _wrappedIndex,
      BasePipe;
  function _abstract() {
    throw new BaseException('This method is abstract');
  }
  return {
    setters: [function($__m) {
      BaseException = $__m.BaseException;
    }],
    execute: function() {
      WrappedValue = function() {
        function WrappedValue(wrapped) {
          this.wrapped = wrapped;
        }
        return ($traceurRuntime.createClass)(WrappedValue, {}, {wrap: function(value) {
            var w = _wrappedValues[_wrappedIndex++ % 5];
            w.wrapped = value;
            return w;
          }});
      }();
      $__export("WrappedValue", WrappedValue);
      _wrappedValues = [new WrappedValue(null), new WrappedValue(null), new WrappedValue(null), new WrappedValue(null), new WrappedValue(null)];
      _wrappedIndex = 0;
      BasePipe = function() {
        function BasePipe() {}
        return ($traceurRuntime.createClass)(BasePipe, {
          supports: function(obj) {
            return true;
          },
          onDestroy: function() {},
          transform: function(value) {
            return _abstract();
          }
        }, {});
      }();
      $__export("BasePipe", BasePipe);
    }
  };
});
//# sourceMappingURL=pipe.js.map

//# sourceMappingURL=../../../src/change_detection/pipes/pipe.js.map