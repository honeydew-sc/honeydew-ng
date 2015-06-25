System.register(["angular2/src/core/zone/ng_zone"], function($__export) {
  "use strict";
  var NgZone,
      MockNgZone;
  return {
    setters: [function($__m) {
      NgZone = $__m.NgZone;
    }],
    execute: function() {
      MockNgZone = function($__super) {
        function MockNgZone() {
          $traceurRuntime.superConstructor(MockNgZone).call(this, {enableLongStackTrace: false});
        }
        return ($traceurRuntime.createClass)(MockNgZone, {
          run: function(fn) {
            return fn();
          },
          runOutsideAngular: function(fn) {
            return fn();
          }
        }, {}, $__super);
      }(NgZone);
      $__export("MockNgZone", MockNgZone);
    }
  };
});
//# sourceMappingURL=ng_zone_mock.js.map

//# sourceMappingURL=../../src/mock/ng_zone_mock.js.map