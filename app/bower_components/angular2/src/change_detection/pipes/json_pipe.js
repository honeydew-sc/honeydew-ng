System.register(["angular2/src/facade/lang", "./pipe"], function($__export) {
  "use strict";
  var Json,
      BasePipe,
      JsonPipe;
  return {
    setters: [function($__m) {
      Json = $__m.Json;
    }, function($__m) {
      BasePipe = $__m.BasePipe;
    }],
    execute: function() {
      JsonPipe = function($__super) {
        function JsonPipe() {
          $traceurRuntime.superConstructor(JsonPipe).apply(this, arguments);
        }
        return ($traceurRuntime.createClass)(JsonPipe, {
          transform: function(value) {
            return Json.stringify(value);
          },
          create: function(cdRef) {
            return this;
          }
        }, {}, $__super);
      }(BasePipe);
      $__export("JsonPipe", JsonPipe);
    }
  };
});
//# sourceMappingURL=json_pipe.js.map

//# sourceMappingURL=../../../src/change_detection/pipes/json_pipe.js.map