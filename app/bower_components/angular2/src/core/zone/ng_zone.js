System.register(["angular2/src/facade/collection", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var StringMapWrapper,
      normalizeBlank,
      isPresent,
      global,
      NgZone;
  return {
    setters: [function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      normalizeBlank = $__m.normalizeBlank;
      isPresent = $__m.isPresent;
      global = $__m.global;
    }],
    execute: function() {
      NgZone = function() {
        function NgZone($__1) {
          var enableLongStackTrace = $__1.enableLongStackTrace;
          this._inVmTurnDone = false;
          this._onTurnStart = null;
          this._onTurnDone = null;
          this._onErrorHandler = null;
          this._pendingMicrotasks = 0;
          this._hasExecutedCodeInInnerZone = false;
          this._nestedRun = 0;
          if (global.zone) {
            this._disabled = false;
            this._mountZone = global.zone;
            this._innerZone = this._createInnerZone(this._mountZone, enableLongStackTrace);
          } else {
            this._disabled = true;
            this._mountZone = null;
          }
        }
        return ($traceurRuntime.createClass)(NgZone, {
          initCallbacks: function() {
            var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
                onTurnStart = $__1.onTurnStart,
                onTurnDone = $__1.onTurnDone,
                onErrorHandler = $__1.onErrorHandler;
            this._onTurnStart = normalizeBlank(onTurnStart);
            this._onTurnDone = normalizeBlank(onTurnDone);
            this._onErrorHandler = normalizeBlank(onErrorHandler);
          },
          run: function(fn) {
            if (this._disabled) {
              return fn();
            } else {
              return this._innerZone.run(fn);
            }
          },
          runOutsideAngular: function(fn) {
            if (this._disabled) {
              return fn();
            } else {
              return this._mountZone.run(fn);
            }
          },
          _createInnerZone: function(zone, enableLongStackTrace) {
            var ngZone = this;
            var errorHandling;
            if (enableLongStackTrace) {
              errorHandling = StringMapWrapper.merge(Zone.longStackTraceZone, {onError: function(e) {
                  ngZone._onError(this, e);
                }});
            } else {
              errorHandling = {onError: function(e) {
                  ngZone._onError(this, e);
                }};
            }
            return zone.fork(errorHandling).fork({
              '$run': function(parentRun) {
                return function() {
                  try {
                    ngZone._nestedRun++;
                    if (!ngZone._hasExecutedCodeInInnerZone) {
                      ngZone._hasExecutedCodeInInnerZone = true;
                      if (ngZone._onTurnStart) {
                        parentRun.call(ngZone._innerZone, ngZone._onTurnStart);
                      }
                    }
                    return parentRun.apply(this, arguments);
                  } finally {
                    ngZone._nestedRun--;
                    if (ngZone._pendingMicrotasks == 0 && ngZone._nestedRun == 0 && !this._inVmTurnDone) {
                      if (ngZone._onTurnDone && ngZone._hasExecutedCodeInInnerZone) {
                        try {
                          this._inVmTurnDone = true;
                          parentRun.call(ngZone._innerZone, ngZone._onTurnDone);
                        } finally {
                          this._inVmTurnDone = false;
                          ngZone._hasExecutedCodeInInnerZone = false;
                        }
                      }
                    }
                  }
                };
              },
              '$scheduleMicrotask': function(parentScheduleMicrotask) {
                return function(fn) {
                  ngZone._pendingMicrotasks++;
                  var microtask = function() {
                    try {
                      fn();
                    } finally {
                      ngZone._pendingMicrotasks--;
                    }
                  };
                  parentScheduleMicrotask.call(this, microtask);
                };
              },
              _innerZone: true
            });
          },
          _onError: function(zone, e) {
            if (isPresent(this._onErrorHandler)) {
              var trace = [normalizeBlank(e.stack)];
              while (zone && zone.constructedAtException) {
                trace.push(zone.constructedAtException.get());
                zone = zone.parent;
              }
              this._onErrorHandler(e, trace);
            } else {
              console.log('## _onError ##');
              console.log(e.stack);
              throw e;
            }
          }
        }, {});
      }();
      $__export("NgZone", NgZone);
    }
  };
});
//# sourceMappingURL=ng_zone.js.map

//# sourceMappingURL=../../../src/core/zone/ng_zone.js.map