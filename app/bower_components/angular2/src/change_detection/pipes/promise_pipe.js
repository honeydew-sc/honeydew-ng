System.register(["angular2/src/facade/lang", "./pipe"], function($__export) {
  "use strict";
  var isBlank,
      isPresent,
      isPromise,
      WrappedValue,
      PromisePipe,
      PromisePipeFactory;
  return {
    setters: [function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      isPromise = $__m.isPromise;
    }, function($__m) {
      WrappedValue = $__m.WrappedValue;
    }],
    execute: function() {
      PromisePipe = function() {
        function PromisePipe(_ref) {
          this._ref = _ref;
          this._latestValue = null;
          this._latestReturnedValue = null;
        }
        return ($traceurRuntime.createClass)(PromisePipe, {
          supports: function(promise) {
            return isPromise(promise);
          },
          onDestroy: function() {
            if (isPresent(this._sourcePromise)) {
              this._latestValue = null;
              this._latestReturnedValue = null;
              this._sourcePromise = null;
            }
          },
          transform: function(promise) {
            var $__0 = this;
            if (isBlank(this._sourcePromise)) {
              this._sourcePromise = promise;
              promise.then(function(val) {
                if ($__0._sourcePromise === promise) {
                  $__0._updateLatestValue(val);
                }
              });
              return null;
            }
            if (promise !== this._sourcePromise) {
              this._sourcePromise = null;
              return this.transform(promise);
            }
            if (this._latestValue === this._latestReturnedValue) {
              return this._latestReturnedValue;
            } else {
              this._latestReturnedValue = this._latestValue;
              return WrappedValue.wrap(this._latestValue);
            }
          },
          _updateLatestValue: function(value) {
            this._latestValue = value;
            this._ref.requestCheck();
          }
        }, {});
      }();
      $__export("PromisePipe", PromisePipe);
      PromisePipeFactory = function() {
        function PromisePipeFactory() {}
        return ($traceurRuntime.createClass)(PromisePipeFactory, {
          supports: function(promise) {
            return isPromise(promise);
          },
          create: function(cdRef) {
            return new PromisePipe(cdRef);
          }
        }, {});
      }();
      $__export("PromisePipeFactory", PromisePipeFactory);
    }
  };
});
//# sourceMappingURL=promise_pipe.js.map

//# sourceMappingURL=../../../src/change_detection/pipes/promise_pipe.js.map