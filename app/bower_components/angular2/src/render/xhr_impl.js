System.register(["angular2/di", "angular2/src/facade/async", "./xhr"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      PromiseWrapper,
      XHR,
      XHRImpl;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      XHR = $__m.XHR;
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
      XHRImpl = function($__super) {
        function $__0() {
          $traceurRuntime.superConstructor($__0).apply(this, arguments);
        }
        return ($traceurRuntime.createClass)($__0, {get: function(url) {
            var completer = PromiseWrapper.completer();
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'text';
            xhr.onload = function() {
              var response = ('response' in xhr) ? xhr.response : xhr.responseText;
              var status = xhr.status === 1223 ? 204 : xhr.status;
              if (status === 0) {
                status = response ? 200 : 0;
              }
              if (200 <= status && status <= 300) {
                completer.resolve(response);
              } else {
                completer.reject(("Failed to load " + url), null);
              }
            };
            xhr.onerror = function() {
              completer.reject(("Failed to load " + url), null);
            };
            xhr.send();
            return completer.promise;
          }}, {}, $__super);
      }(XHR);
      $__export("XHRImpl", XHRImpl);
      $__export("XHRImpl", XHRImpl = __decorate([Injectable(), __metadata('design:paramtypes', [])], XHRImpl));
    }
  };
});
//# sourceMappingURL=xhr_impl.js.map

//# sourceMappingURL=../../src/render/xhr_impl.js.map