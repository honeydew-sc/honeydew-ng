System.register(["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var isString,
      StringWrapper,
      LowerCasePipe,
      LowerCaseFactory;
  return {
    setters: [function($__m) {
      isString = $__m.isString;
      StringWrapper = $__m.StringWrapper;
    }],
    execute: function() {
      LowerCasePipe = function() {
        function LowerCasePipe() {
          this._latestValue = null;
        }
        return ($traceurRuntime.createClass)(LowerCasePipe, {
          supports: function(str) {
            return isString(str);
          },
          onDestroy: function() {
            this._latestValue = null;
          },
          transform: function(value) {
            if (this._latestValue !== value) {
              this._latestValue = value;
              return StringWrapper.toLowerCase(value);
            } else {
              return this._latestValue;
            }
          }
        }, {});
      }();
      $__export("LowerCasePipe", LowerCasePipe);
      LowerCaseFactory = function() {
        function LowerCaseFactory() {}
        return ($traceurRuntime.createClass)(LowerCaseFactory, {
          supports: function(str) {
            return isString(str);
          },
          create: function() {
            return new LowerCasePipe();
          }
        }, {});
      }();
      $__export("LowerCaseFactory", LowerCaseFactory);
    }
  };
});
//# sourceMappingURL=lowercase_pipe.js.map

//# sourceMappingURL=../../../src/change_detection/pipes/lowercase_pipe.js.map