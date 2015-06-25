System.register(["angular2/change_detection", "angular2/src/change_detection/pipes/pipe", "./test_lib"], function($__export) {
  "use strict";
  var DynamicChangeDetector,
      BasePipe,
      SpyObject,
      SpyChangeDetector,
      SpyProtoChangeDetector,
      SpyPipe,
      SpyPipeFactory;
  return {
    setters: [function($__m) {
      DynamicChangeDetector = $__m.DynamicChangeDetector;
    }, function($__m) {
      BasePipe = $__m.BasePipe;
    }, function($__m) {
      SpyObject = $__m.SpyObject;
    }],
    execute: function() {
      SpyChangeDetector = function($__super) {
        function SpyChangeDetector() {
          $traceurRuntime.superConstructor(SpyChangeDetector).call(this, DynamicChangeDetector);
        }
        return ($traceurRuntime.createClass)(SpyChangeDetector, {}, {}, $__super);
      }(SpyObject);
      $__export("SpyChangeDetector", SpyChangeDetector);
      SpyProtoChangeDetector = function($__super) {
        function SpyProtoChangeDetector() {
          $traceurRuntime.superConstructor(SpyProtoChangeDetector).call(this, DynamicChangeDetector);
        }
        return ($traceurRuntime.createClass)(SpyProtoChangeDetector, {}, {}, $__super);
      }(SpyObject);
      $__export("SpyProtoChangeDetector", SpyProtoChangeDetector);
      SpyPipe = function($__super) {
        function SpyPipe() {
          $traceurRuntime.superConstructor(SpyPipe).call(this, BasePipe);
        }
        return ($traceurRuntime.createClass)(SpyPipe, {}, {}, $__super);
      }(SpyObject);
      $__export("SpyPipe", SpyPipe);
      SpyPipeFactory = function($__super) {
        function SpyPipeFactory() {
          $traceurRuntime.superConstructor(SpyPipeFactory).apply(this, arguments);
        }
        return ($traceurRuntime.createClass)(SpyPipeFactory, {}, {}, $__super);
      }(SpyObject);
      $__export("SpyPipeFactory", SpyPipeFactory);
    }
  };
});
//# sourceMappingURL=spies.js.map

//# sourceMappingURL=../../src/test_lib/spies.js.map