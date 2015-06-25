System.register(["../enums", "../static_response", "angular2/di", "./browser_xhr", "rx"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      RequestMethods,
      Response,
      Injectable,
      BrowserXHR,
      Rx,
      XHRConnection,
      XHRBackend;
  return {
    setters: [function($__m) {
      RequestMethods = $__m.RequestMethods;
    }, function($__m) {
      Response = $__m.Response;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      BrowserXHR = $__m.BrowserXHR;
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
      XHRConnection = function() {
        function XHRConnection(req, NativeConstruct) {
          var $__0 = this;
          this.request = req;
          if (Rx.hasOwnProperty('default')) {
            this.response = new Rx.default.Rx.Subject();
          } else {
            this.response = new Rx.Subject();
          }
          this._xhr = new NativeConstruct();
          this._xhr.open(RequestMethods[req.method], req.url);
          this._xhr.addEventListener('load', function() {
            $__0.response.onNext(new Response($__0._xhr.response || $__0._xhr.responseText));
          });
          this._xhr.send(this.request.text());
        }
        return ($traceurRuntime.createClass)(XHRConnection, {dispose: function() {
            this._xhr.abort();
          }}, {});
      }();
      $__export("XHRConnection", XHRConnection);
      XHRBackend = ($traceurRuntime.createClass)(function(_NativeConstruct) {
        this._NativeConstruct = _NativeConstruct;
      }, {createConnection: function(request) {
          return new XHRConnection(request, this._NativeConstruct);
        }}, {});
      $__export("XHRBackend", XHRBackend);
      $__export("XHRBackend", XHRBackend = __decorate([Injectable(), __metadata('design:paramtypes', [BrowserXHR])], XHRBackend));
    }
  };
});
//# sourceMappingURL=xhr_backend.js.map

//# sourceMappingURL=../../../src/http/backends/xhr_backend.js.map