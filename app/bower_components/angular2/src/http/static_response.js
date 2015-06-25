System.register(["./base_response_options", "angular2/src/facade/lang", "./headers"], function($__export) {
  "use strict";
  var baseResponseOptions,
      BaseException,
      isJsObject,
      isString,
      global,
      Headers,
      Response;
  return {
    setters: [function($__m) {
      baseResponseOptions = $__m.baseResponseOptions;
    }, function($__m) {
      BaseException = $__m.BaseException;
      isJsObject = $__m.isJsObject;
      isString = $__m.isString;
      global = $__m.global;
    }, function($__m) {
      Headers = $__m.Headers;
    }],
    execute: function() {
      Response = function() {
        function Response(_body) {
          var $__1 = arguments[1] !== (void 0) ? arguments[1] : baseResponseOptions,
              status = $__1.status,
              statusText = $__1.statusText,
              headers = $__1.headers,
              type = $__1.type,
              url = $__1.url;
          this._body = _body;
          if (isJsObject(headers)) {
            headers = new Headers(headers);
          }
          this.status = status;
          this.statusText = statusText;
          this.headers = headers;
          this.type = type;
          this.url = url;
        }
        return ($traceurRuntime.createClass)(Response, {
          blob: function() {
            throw new BaseException('"blob()" method not implemented on Response superclass');
          },
          json: function() {
            if (isJsObject(this._body)) {
              return this._body;
            } else if (isString(this._body)) {
              return global.JSON.parse(this._body);
            }
          },
          text: function() {
            return this._body.toString();
          },
          arrayBuffer: function() {
            throw new BaseException('"arrayBuffer()" method not implemented on Response superclass');
          }
        }, {});
      }();
      $__export("Response", Response);
    }
  };
});
//# sourceMappingURL=static_response.js.map

//# sourceMappingURL=../../src/http/static_response.js.map