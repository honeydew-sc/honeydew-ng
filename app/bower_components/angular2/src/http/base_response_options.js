System.register(["./headers", "./enums"], function($__export) {
  "use strict";
  var Headers,
      ResponseTypes,
      BaseResponseOptions,
      baseResponseOptions;
  return {
    setters: [function($__m) {
      Headers = $__m.Headers;
    }, function($__m) {
      ResponseTypes = $__m.ResponseTypes;
    }],
    execute: function() {
      BaseResponseOptions = function() {
        function BaseResponseOptions() {
          var $__2,
              $__3,
              $__4,
              $__5,
              $__6;
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              status = ($__2 = $__1.status) === void 0 ? 200 : $__2,
              statusText = ($__3 = $__1.statusText) === void 0 ? 'Ok' : $__3,
              type = ($__4 = $__1.type) === void 0 ? ResponseTypes.Default : $__4,
              headers = ($__5 = $__1.headers) === void 0 ? new Headers() : $__5,
              url = ($__6 = $__1.url) === void 0 ? '' : $__6;
          this.status = status;
          this.statusText = statusText;
          this.type = type;
          this.headers = headers;
          this.url = url;
        }
        return ($traceurRuntime.createClass)(BaseResponseOptions, {}, {});
      }();
      $__export("BaseResponseOptions", BaseResponseOptions);
      ;
      baseResponseOptions = Object.freeze(new BaseResponseOptions());
      $__export("baseResponseOptions", baseResponseOptions);
    }
  };
});
//# sourceMappingURL=base_response_options.js.map

//# sourceMappingURL=../../src/http/base_response_options.js.map