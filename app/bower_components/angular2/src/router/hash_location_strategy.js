System.register(["angular2/src/dom/dom_adapter", "angular2/di", "./location_strategy"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      DOM,
      Injectable,
      LocationStrategy,
      HashLocationStrategy;
  return {
    setters: [function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      LocationStrategy = $__m.LocationStrategy;
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
      HashLocationStrategy = function($__super) {
        function $__0() {
          $traceurRuntime.superConstructor($__0).call(this);
          this._location = DOM.getLocation();
          this._history = DOM.getHistory();
        }
        return ($traceurRuntime.createClass)($__0, {
          onPopState: function(fn) {
            DOM.getGlobalEventTarget('window').addEventListener('popstate', fn, false);
          },
          getBaseHref: function() {
            return '';
          },
          path: function() {
            return this._location.hash;
          },
          pushState: function(state, title, url) {
            this._history.pushState(state, title, '#' + url);
          },
          forward: function() {
            this._history.forward();
          },
          back: function() {
            this._history.back();
          }
        }, {}, $__super);
      }(LocationStrategy);
      $__export("HashLocationStrategy", HashLocationStrategy);
      $__export("HashLocationStrategy", HashLocationStrategy = __decorate([Injectable(), __metadata('design:paramtypes', [])], HashLocationStrategy));
    }
  };
});
//# sourceMappingURL=hash_location_strategy.js.map

//# sourceMappingURL=../../src/router/hash_location_strategy.js.map