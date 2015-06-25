System.register(["./location_strategy", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/di"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      __param,
      LocationStrategy,
      isPresent,
      CONST_EXPR,
      EventEmitter,
      ObservableWrapper,
      OpaqueToken,
      Injectable,
      Optional,
      Inject,
      appBaseHrefToken,
      Location;
  function stripIndexHtml(url) {
    if (/\/index.html$/g.test(url)) {
      return url.substring(0, url.length - 11);
    }
    return url;
  }
  function stripTrailingSlash(url) {
    if (/\/$/g.test(url)) {
      url = url.substring(0, url.length - 1);
    }
    return url;
  }
  return {
    setters: [function($__m) {
      LocationStrategy = $__m.LocationStrategy;
    }, function($__m) {
      isPresent = $__m.isPresent;
      CONST_EXPR = $__m.CONST_EXPR;
    }, function($__m) {
      EventEmitter = $__m.EventEmitter;
      ObservableWrapper = $__m.ObservableWrapper;
    }, function($__m) {
      OpaqueToken = $__m.OpaqueToken;
      Injectable = $__m.Injectable;
      Optional = $__m.Optional;
      Inject = $__m.Inject;
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
      __param = (this && this.__param) || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      appBaseHrefToken = CONST_EXPR(new OpaqueToken('locationHrefToken'));
      $__export("appBaseHrefToken", appBaseHrefToken);
      Location = ($traceurRuntime.createClass)(function(_platformStrategy, href) {
        var $__0 = this;
        this._platformStrategy = _platformStrategy;
        this._subject = new EventEmitter();
        this._baseHref = stripTrailingSlash(stripIndexHtml(isPresent(href) ? href : this._platformStrategy.getBaseHref()));
        this._platformStrategy.onPopState(function(_) {
          return $__0._onPopState(_);
        });
      }, {
        _onPopState: function(_) {
          ObservableWrapper.callNext(this._subject, {'url': this.path()});
        },
        path: function() {
          return this.normalize(this._platformStrategy.path());
        },
        normalize: function(url) {
          return stripTrailingSlash(this._stripBaseHref(stripIndexHtml(url)));
        },
        normalizeAbsolutely: function(url) {
          if (!url.startsWith('/')) {
            url = '/' + url;
          }
          return stripTrailingSlash(this._addBaseHref(url));
        },
        _stripBaseHref: function(url) {
          if (this._baseHref.length > 0 && url.startsWith(this._baseHref)) {
            return url.substring(this._baseHref.length);
          }
          return url;
        },
        _addBaseHref: function(url) {
          if (!url.startsWith(this._baseHref)) {
            return this._baseHref + url;
          }
          return url;
        },
        go: function(url) {
          var finalUrl = this.normalizeAbsolutely(url);
          this._platformStrategy.pushState(null, '', finalUrl);
        },
        forward: function() {
          this._platformStrategy.forward();
        },
        back: function() {
          this._platformStrategy.back();
        },
        subscribe: function(onNext) {
          var onThrow = arguments[1] !== (void 0) ? arguments[1] : null;
          var onReturn = arguments[2] !== (void 0) ? arguments[2] : null;
          ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
        }
      }, {});
      $__export("Location", Location);
      $__export("Location", Location = __decorate([Injectable(), __param(1, Optional()), __param(1, Inject(appBaseHrefToken)), __metadata('design:paramtypes', [LocationStrategy, String])], Location));
    }
  };
});
//# sourceMappingURL=location.js.map

//# sourceMappingURL=../../src/router/location.js.map