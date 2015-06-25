System.register(["angular2/di", "angular2/src/core/exception_handler", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      ExceptionHandler,
      isPresent,
      BaseException,
      LifeCycle;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      ExceptionHandler = $__m.ExceptionHandler;
    }, function($__m) {
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      LifeCycle = ($traceurRuntime.createClass)(function(exceptionHandler) {
        var changeDetector = arguments[1] !== (void 0) ? arguments[1] : null;
        var enforceNoNewChanges = arguments[2] !== (void 0) ? arguments[2] : false;
        this._runningTick = false;
        this._errorHandler = function(exception, stackTrace) {
          exceptionHandler.call(exception, stackTrace);
          throw exception;
        };
        this._changeDetector = changeDetector;
        this._enforceNoNewChanges = enforceNoNewChanges;
      }, {
        registerWith: function(zone) {
          var changeDetector = arguments[1] !== (void 0) ? arguments[1] : null;
          var $__0 = this;
          if (isPresent(changeDetector)) {
            this._changeDetector = changeDetector;
          }
          zone.initCallbacks({
            onErrorHandler: this._errorHandler,
            onTurnDone: function() {
              return $__0.tick();
            }
          });
        },
        tick: function() {
          if (this._runningTick) {
            throw new BaseException("LifeCycle.tick is called recursively");
          }
          try {
            this._runningTick = true;
            this._changeDetector.detectChanges();
            if (this._enforceNoNewChanges) {
              this._changeDetector.checkNoChanges();
            }
          } finally {
            this._runningTick = false;
          }
        }
      }, {});
      $__export("LifeCycle", LifeCycle);
      $__export("LifeCycle", LifeCycle = __decorate([Injectable(), __metadata('design:paramtypes', [ExceptionHandler, Object, Boolean])], LifeCycle));
    }
  };
});
//# sourceMappingURL=life_cycle.js.map

//# sourceMappingURL=../../../src/core/life_cycle/life_cycle.js.map