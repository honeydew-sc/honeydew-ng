System.register(["angular2/di", "angular2/src/dom/dom_adapter", "angular2/src/facade/collection", "angular2/src/facade/lang", "./get_testability"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      DOM,
      Map,
      ListWrapper,
      BaseException,
      getTestabilityModule,
      Testability,
      TestabilityRegistry;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Map = $__m.Map;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      BaseException = $__m.BaseException;
    }, function($__m) {
      getTestabilityModule = $__m;
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
      Testability = ($traceurRuntime.createClass)(function() {
        this._pendingCount = 0;
        this._callbacks = [];
      }, {
        increaseCount: function() {
          var delta = arguments[0] !== (void 0) ? arguments[0] : 1;
          this._pendingCount += delta;
          if (this._pendingCount < 0) {
            throw new BaseException('pending async requests below zero');
          } else if (this._pendingCount == 0) {
            this._runCallbacks();
          }
          return this._pendingCount;
        },
        _runCallbacks: function() {
          while (this._callbacks.length !== 0) {
            ListWrapper.removeLast(this._callbacks)();
          }
        },
        whenStable: function(callback) {
          this._callbacks.push(callback);
          if (this._pendingCount === 0) {
            this._runCallbacks();
          }
        },
        getPendingCount: function() {
          return this._pendingCount;
        },
        findBindings: function(using, binding, exactMatch) {
          return [];
        }
      }, {});
      $__export("Testability", Testability);
      $__export("Testability", Testability = __decorate([Injectable(), __metadata('design:paramtypes', [])], Testability));
      TestabilityRegistry = ($traceurRuntime.createClass)(function() {
        this._applications = new Map();
        getTestabilityModule.GetTestability.addToWindow(this);
      }, {
        registerApplication: function(token, testability) {
          this._applications.set(token, testability);
        },
        findTestabilityInTree: function(elem) {
          if (elem == null) {
            return null;
          }
          if (this._applications.has(elem)) {
            return this._applications.get(elem);
          }
          if (DOM.isShadowRoot(elem)) {
            return this.findTestabilityInTree(DOM.getHost(elem));
          }
          return this.findTestabilityInTree(DOM.parentElement(elem));
        }
      }, {});
      $__export("TestabilityRegistry", TestabilityRegistry);
      $__export("TestabilityRegistry", TestabilityRegistry = __decorate([Injectable(), __metadata('design:paramtypes', [])], TestabilityRegistry));
    }
  };
});
//# sourceMappingURL=testability.js.map

//# sourceMappingURL=../../../src/core/testability/testability.js.map