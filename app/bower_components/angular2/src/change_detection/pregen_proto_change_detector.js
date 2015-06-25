System.register(["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var BaseException,
      PregenProtoChangeDetector;
  return {
    setters: [function($__m) {
      BaseException = $__m.BaseException;
    }],
    execute: function() {
      $__export("PregenProtoChangeDetectorFactory", Function);
      PregenProtoChangeDetector = function() {
        function PregenProtoChangeDetector() {}
        return ($traceurRuntime.createClass)(PregenProtoChangeDetector, {instantiate: function(dispatcher) {
            throw new BaseException('Pregen change detection not supported in Js');
          }}, {isSupported: function() {
            return false;
          }});
      }();
      $__export("PregenProtoChangeDetector", PregenProtoChangeDetector);
    }
  };
});
//# sourceMappingURL=pregen_proto_change_detector.js.map

//# sourceMappingURL=../../src/change_detection/pregen_proto_change_detector.js.map