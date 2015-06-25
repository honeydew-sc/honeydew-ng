System.register(["angular2/src/di/decorators", "./static_request", "./backends/xhr_backend", "./base_request_options", "./enums", "rx"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      Request,
      XHRBackend,
      BaseRequestOptions,
      RequestMethods,
      Rx,
      Http,
      Observable;
  function httpRequest(backend, request) {
    return (Observable.create(function(observer) {
      var connection = backend.createConnection(request);
      var internalSubscription = connection.response.subscribe(observer);
      return function() {
        internalSubscription.dispose();
        connection.dispose();
      };
    }));
  }
  function HttpFactory(backend, defaultOptions) {
    return function(url, options) {
      if (typeof url === 'string') {
        return httpRequest(backend, new Request(url, defaultOptions.merge(options)));
      } else if (url instanceof Request) {
        return httpRequest(backend, url);
      }
    };
  }
  $__export("HttpFactory", HttpFactory);
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      Request = $__m.Request;
    }, function($__m) {
      XHRBackend = $__m.XHRBackend;
    }, function($__m) {
      BaseRequestOptions = $__m.BaseRequestOptions;
    }, function($__m) {
      RequestMethods = $__m.RequestMethods;
    }, function($__m) {
      Rx = $__m;
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
      Http = ($traceurRuntime.createClass)(function(_backend, _defaultOptions) {
        this._backend = _backend;
        this._defaultOptions = _defaultOptions;
      }, {
        request: function(url, options) {
          if (typeof url === 'string') {
            return httpRequest(this._backend, new Request(url, this._defaultOptions.merge(options)));
          } else if (url instanceof Request) {
            return httpRequest(this._backend, url);
          }
        },
        get: function(url, options) {
          return httpRequest(this._backend, new Request(url, this._defaultOptions.merge(options).merge({method: RequestMethods.GET})));
        },
        post: function(url, body, options) {
          return httpRequest(this._backend, new Request(url, this._defaultOptions.merge(options).merge({
            body: body,
            method: RequestMethods.POST
          })));
        },
        put: function(url, body, options) {
          return httpRequest(this._backend, new Request(url, this._defaultOptions.merge(options).merge({
            body: body,
            method: RequestMethods.PUT
          })));
        },
        delete: function(url, options) {
          return httpRequest(this._backend, new Request(url, this._defaultOptions.merge(options).merge({method: RequestMethods.DELETE})));
        },
        patch: function(url, body, options) {
          return httpRequest(this._backend, new Request(url, this._defaultOptions.merge(options).merge({
            body: body,
            method: RequestMethods.PATCH
          })));
        },
        head: function(url, options) {
          return httpRequest(this._backend, new Request(url, this._defaultOptions.merge(options).merge({method: RequestMethods.HEAD})));
        }
      }, {});
      $__export("Http", Http);
      $__export("Http", Http = __decorate([Injectable(), __metadata('design:paramtypes', [XHRBackend, BaseRequestOptions])], Http));
      if (Rx.hasOwnProperty('default')) {
        Observable = Rx.default.Rx.Observable;
      } else {
        Observable = Rx.Observable;
      }
    }
  };
});
//# sourceMappingURL=http.js.map

//# sourceMappingURL=../../src/http/http.js.map