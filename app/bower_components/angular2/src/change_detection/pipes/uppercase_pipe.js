System.register(["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var isString,
      StringWrapper,
      UpperCasePipe,
      UpperCaseFactory;
  return {
    setters: [function($__m) {
      isString = $__m.isString;
      StringWrapper = $__m.StringWrapper;
    }],
    execute: function() {
      UpperCasePipe = function() {
        function UpperCasePipe() {
          this._latestValue = null;
        }
        return ($traceurRuntime.createClass)(UpperCasePipe, {
          supports: function(str) {
            return isString(str);
          },
          onDestroy: function() {
            this._latestValue = null;
          },
          transform: function(value) {
            if (this._latestValue !== value) {
              this._latestValue = value;
              return StringWrapper.toUpperCase(value);
            } else {
              return this._latestValue;
            }
          }
        }, {});
      }();
      $__export("UpperCasePipe", UpperCasePipe);
      UpperCaseFactory = function() {
        function UpperCaseFactory() {}
        return ($traceurRuntime.createClass)(UpperCaseFactory, {
          supports: function(str) {
            return isString(str);
          },
          create: function() {
            return new UpperCasePipe();
          }
        }, {});
      }();
      $__export("UpperCaseFactory", UpperCaseFactory);
    }
  };
});
//# sourceMappingURL=uppercase_pipe.js.map

//# sourceMappingURL=../../../src/change_detection/pipes/uppercase_pipe.js.map