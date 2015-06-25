System.register(["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var global,
      PublicTestability,
      GetTestability;
  return {
    setters: [function($__m) {
      global = $__m.global;
    }],
    execute: function() {
      PublicTestability = function() {
        function PublicTestability(testability) {
          this._testability = testability;
        }
        return ($traceurRuntime.createClass)(PublicTestability, {
          whenStable: function(callback) {
            this._testability.whenStable(callback);
          },
          findBindings: function(using, binding, exactMatch) {
            return this._testability.findBindings(using, binding, exactMatch);
          }
        }, {});
      }();
      GetTestability = function() {
        function GetTestability() {}
        return ($traceurRuntime.createClass)(GetTestability, {}, {addToWindow: function(registry) {
            global.getAngularTestability = function(elem) {
              var testability = registry.findTestabilityInTree(elem);
              if (testability == null) {
                throw new Error('Could not find testability for element.');
              }
              return new PublicTestability(testability);
            };
          }});
      }();
      $__export("GetTestability", GetTestability);
    }
  };
});
//# sourceMappingURL=get_testability.js.map

//# sourceMappingURL=../../../src/core/testability/get_testability.js.map