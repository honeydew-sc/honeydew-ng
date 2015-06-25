System.register(["./constants"], function($__export) {
  "use strict";
  var DETACHED,
      CHECK_ALWAYS,
      ChangeDetectorRef;
  return {
    setters: [function($__m) {
      DETACHED = $__m.DETACHED;
      CHECK_ALWAYS = $__m.CHECK_ALWAYS;
    }],
    execute: function() {
      ChangeDetectorRef = function() {
        function ChangeDetectorRef(_cd) {
          this._cd = _cd;
        }
        return ($traceurRuntime.createClass)(ChangeDetectorRef, {
          requestCheck: function() {
            this._cd.markPathToRootAsCheckOnce();
          },
          detach: function() {
            this._cd.mode = DETACHED;
          },
          reattach: function() {
            this._cd.mode = CHECK_ALWAYS;
            this.requestCheck();
          }
        }, {});
      }();
      $__export("ChangeDetectorRef", ChangeDetectorRef);
    }
  };
});
//# sourceMappingURL=change_detector_ref.js.map

//# sourceMappingURL=../../src/change_detection/change_detector_ref.js.map