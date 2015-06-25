System.register(["./enums", "angular2/di", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      RequestModesOpts,
      RequestMethods,
      Injectable,
      StringMapWrapper,
      RequestOptions,
      BaseRequestOptions;
  return {
    setters: [function($__m) {
      RequestModesOpts = $__m.RequestModesOpts;
      RequestMethods = $__m.RequestMethods;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
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
      RequestOptions = function() {
        function RequestOptions() {
          var $__2 = arguments[0] !== (void 0) ? arguments[0] : {
            method: RequestMethods.GET,
            mode: RequestModesOpts.Cors
          },
              method = $__2.method,
              headers = $__2.headers,
              body = $__2.body,
              mode = $__2.mode,
              credentials = $__2.credentials,
              cache = $__2.cache;
          this.method = RequestMethods.GET;
          this.mode = RequestModesOpts.Cors;
          this.method = method;
          this.headers = headers;
          this.body = body;
          this.mode = mode;
          this.credentials = credentials;
          this.cache = cache;
        }
        return ($traceurRuntime.createClass)(RequestOptions, {merge: function() {
            var opts = arguments[0] !== (void 0) ? arguments[0] : {};
            return new RequestOptions(StringMapWrapper.merge(this, opts));
          }}, {});
      }();
      $__export("RequestOptions", RequestOptions);
      BaseRequestOptions = function($__super) {
        function $__0() {
          $traceurRuntime.superConstructor($__0).call(this);
        }
        return ($traceurRuntime.createClass)($__0, {}, {}, $__super);
      }(RequestOptions);
      $__export("BaseRequestOptions", BaseRequestOptions);
      $__export("BaseRequestOptions", BaseRequestOptions = __decorate([Injectable(), __metadata('design:paramtypes', [])], BaseRequestOptions));
    }
  };
});
//# sourceMappingURL=base_request_options.js.map

//# sourceMappingURL=../../src/http/base_request_options.js.map