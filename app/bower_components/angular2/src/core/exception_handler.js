System.register(["angular2/di", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/dom/dom_adapter"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      isPresent,
      ListWrapper,
      isListLikeIterable,
      DOM,
      ExceptionHandler;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      isListLikeIterable = $__m.isListLikeIterable;
    }, function($__m) {
      DOM = $__m.DOM;
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
      ExceptionHandler = ($traceurRuntime.createClass)(function() {}, {call: function(error) {
          var stackTrace = arguments[1] !== (void 0) ? arguments[1] : null;
          var reason = arguments[2] !== (void 0) ? arguments[2] : null;
          var longStackTrace = isListLikeIterable(stackTrace) ? ListWrapper.join(stackTrace, "\n\n") : stackTrace;
          var reasonStr = isPresent(reason) ? ("\n" + reason) : '';
          DOM.logError(("" + error + reasonStr + "\nSTACKTRACE:\n" + longStackTrace));
        }}, {});
      $__export("ExceptionHandler", ExceptionHandler);
      $__export("ExceptionHandler", ExceptionHandler = __decorate([Injectable(), __metadata('design:paramtypes', [])], ExceptionHandler));
    }
  };
});
//# sourceMappingURL=exception_handler.js.map

//# sourceMappingURL=../../src/core/exception_handler.js.map