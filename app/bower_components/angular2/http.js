System.register(["angular2/di", "./src/http/http", "angular2/src/http/backends/xhr_backend", "angular2/src/http/backends/browser_xhr", "angular2/src/http/base_request_options", "angular2/src/http/backends/mock_backend", "angular2/src/http/static_request", "angular2/src/http/static_response", "angular2/src/http/headers", "angular2/src/http/enums", "angular2/src/http/url_search_params"], function($__export) {
  "use strict";
  var bind,
      Http,
      HttpFactory,
      XHRBackend,
      XHRConnection,
      BrowserXHR,
      BaseRequestOptions,
      RequestOptions,
      httpInjectables;
  var $__exportNames = {
    Http: true,
    XHRBackend: true,
    XHRConnection: true,
    BaseRequestOptions: true,
    RequestOptions: true,
    HttpFactory: true,
    httpInjectables: true,
    undefined: true
  };
  return {
    setters: [function($__m) {
      bind = $__m.bind;
    }, function($__m) {
      Http = $__m.Http;
      HttpFactory = $__m.HttpFactory;
    }, function($__m) {
      XHRBackend = $__m.XHRBackend;
      XHRConnection = $__m.XHRConnection;
    }, function($__m) {
      BrowserXHR = $__m.BrowserXHR;
    }, function($__m) {
      BaseRequestOptions = $__m.BaseRequestOptions;
      RequestOptions = $__m.RequestOptions;
    }, function($__m) {
      $__export("MockConnection", $__m.MockConnection);
      $__export("MockBackend", $__m.MockBackend);
    }, function($__m) {
      $__export("Request", $__m.Request);
    }, function($__m) {
      $__export("Response", $__m.Response);
    }, function($__m) {
      $__export("Headers", $__m.Headers);
    }, function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (p !== 'default' && !$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      $__export("URLSearchParams", $__m.URLSearchParams);
    }],
    execute: function() {
      $__export("Http", Http), $__export("XHRBackend", XHRBackend), $__export("XHRConnection", XHRConnection), $__export("BaseRequestOptions", BaseRequestOptions), $__export("RequestOptions", RequestOptions), $__export("HttpFactory", HttpFactory);
      httpInjectables = [bind(BrowserXHR).toValue(BrowserXHR), XHRBackend, BaseRequestOptions, bind(HttpFactory).toFactory(HttpFactory, [XHRBackend, BaseRequestOptions]), Http];
      $__export("httpInjectables", httpInjectables);
    }
  };
});
//# sourceMappingURL=http.js.map

//# sourceMappingURL=http.js.map