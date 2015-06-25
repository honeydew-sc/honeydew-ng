System.register(["./enums", "./headers"], function($__export) {
  "use strict";
  var RequestMethods,
      RequestModesOpts,
      RequestCredentialsOpts,
      Headers,
      Request;
  return {
    setters: [function($__m) {
      RequestMethods = $__m.RequestMethods;
      RequestModesOpts = $__m.RequestModesOpts;
      RequestCredentialsOpts = $__m.RequestCredentialsOpts;
    }, function($__m) {
      Headers = $__m.Headers;
    }],
    execute: function() {
      Request = function() {
        function Request(url) {
          var $__2,
              $__3,
              $__4,
              $__5;
          var $__1 = arguments[1] !== (void 0) ? arguments[1] : {},
              body = $__1.body,
              method = ($__2 = $__1.method) === void 0 ? RequestMethods.GET : $__2,
              mode = ($__3 = $__1.mode) === void 0 ? RequestModesOpts.Cors : $__3,
              credentials = ($__4 = $__1.credentials) === void 0 ? RequestCredentialsOpts.Omit : $__4,
              headers = ($__5 = $__1.headers) === void 0 ? new Headers() : $__5;
          this.url = url;
          this._body = body;
          this.method = method;
          this.mode = mode;
          this.credentials = credentials;
          this.headers = headers;
        }
        return ($traceurRuntime.createClass)(Request, {text: function() {
            return this._body ? this._body.toString() : '';
          }}, {});
      }();
      $__export("Request", Request);
    }
  };
});
//# sourceMappingURL=static_request.js.map

//# sourceMappingURL=../../src/http/static_request.js.map