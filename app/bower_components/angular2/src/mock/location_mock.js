System.register(["angular2/test_lib", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/router/location"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      SpyObject,
      proxy,
      IMPLEMENTS,
      EventEmitter,
      ObservableWrapper,
      Location,
      SpyLocation;
  return {
    setters: [function($__m) {
      SpyObject = $__m.SpyObject;
      proxy = $__m.proxy;
    }, function($__m) {
      IMPLEMENTS = $__m.IMPLEMENTS;
    }, function($__m) {
      EventEmitter = $__m.EventEmitter;
      ObservableWrapper = $__m.ObservableWrapper;
    }, function($__m) {
      Location = $__m.Location;
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
      SpyLocation = function($__super) {
        function $__0() {
          $traceurRuntime.superConstructor($__0).call(this);
          this._path = '';
          this.urlChanges = [];
          this._subject = new EventEmitter();
          this._baseHref = '';
        }
        return ($traceurRuntime.createClass)($__0, {
          setInitialPath: function(url) {
            this._path = url;
          },
          setBaseHref: function(url) {
            this._baseHref = url;
          },
          path: function() {
            return this._path;
          },
          simulateUrlPop: function(pathname) {
            ObservableWrapper.callNext(this._subject, {'url': pathname});
          },
          normalizeAbsolutely: function(url) {
            return this._baseHref + url;
          },
          go: function(url) {
            url = this.normalizeAbsolutely(url);
            if (this._path == url) {
              return;
            }
            this._path = url;
            this.urlChanges.push(url);
          },
          forward: function() {},
          back: function() {},
          subscribe: function(onNext) {
            var onThrow = arguments[1] !== (void 0) ? arguments[1] : null;
            var onReturn = arguments[2] !== (void 0) ? arguments[2] : null;
            ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
          },
          noSuchMethod: function(m) {
            return $traceurRuntime.superGet(this, $__0.prototype, "noSuchMethod").call(this, m);
          }
        }, {}, $__super);
      }(SpyObject);
      $__export("SpyLocation", SpyLocation);
      $__export("SpyLocation", SpyLocation = __decorate([proxy, IMPLEMENTS(Location), __metadata('design:paramtypes', [])], SpyLocation));
    }
  };
});
//# sourceMappingURL=location_mock.js.map

//# sourceMappingURL=../../src/mock/location_mock.js.map