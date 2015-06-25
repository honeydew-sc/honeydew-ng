System.register(["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var BaseException,
      ExpressionChangedAfterItHasBeenChecked,
      ChangeDetectionError,
      DehydratedException;
  return {
    setters: [function($__m) {
      BaseException = $__m.BaseException;
    }],
    execute: function() {
      ExpressionChangedAfterItHasBeenChecked = function($__super) {
        function ExpressionChangedAfterItHasBeenChecked(proto, change) {
          $traceurRuntime.superConstructor(ExpressionChangedAfterItHasBeenChecked).call(this);
          this.message = ("Expression '" + proto.expressionAsString + "' has changed after it was checked. ") + ("Previous value: '" + change.previousValue + "'. Current value: '" + change.currentValue + "'");
        }
        return ($traceurRuntime.createClass)(ExpressionChangedAfterItHasBeenChecked, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(BaseException);
      $__export("ExpressionChangedAfterItHasBeenChecked", ExpressionChangedAfterItHasBeenChecked);
      ChangeDetectionError = function($__super) {
        function ChangeDetectionError(proto, originalException) {
          $traceurRuntime.superConstructor(ChangeDetectionError).call(this);
          this.originalException = originalException;
          this.location = proto.expressionAsString;
          this.message = (this.originalException + " in [" + this.location + "]");
        }
        return ($traceurRuntime.createClass)(ChangeDetectionError, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(BaseException);
      $__export("ChangeDetectionError", ChangeDetectionError);
      DehydratedException = function($__super) {
        function DehydratedException() {
          $traceurRuntime.superConstructor(DehydratedException).call(this, 'Attempt to detect changes on a dehydrated detector.');
        }
        return ($traceurRuntime.createClass)(DehydratedException, {}, {}, $__super);
      }(BaseException);
      $__export("DehydratedException", DehydratedException);
    }
  };
});
//# sourceMappingURL=exceptions.js.map

//# sourceMappingURL=../../src/change_detection/exceptions.js.map