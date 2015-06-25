System.register([], function($__export) {
  "use strict";
  var RequestModesOpts,
      RequestCacheOpts,
      RequestCredentialsOpts,
      RequestMethods,
      ReadyStates,
      ResponseTypes;
  return {
    setters: [],
    execute: function() {
      $__export("RequestModesOpts", RequestModesOpts);
      (function(RequestModesOpts) {
        RequestModesOpts[RequestModesOpts["Cors"] = 0] = "Cors";
        RequestModesOpts[RequestModesOpts["NoCors"] = 1] = "NoCors";
        RequestModesOpts[RequestModesOpts["SameOrigin"] = 2] = "SameOrigin";
      })(RequestModesOpts || ($__export("RequestModesOpts", RequestModesOpts = {})));
      $__export("RequestCacheOpts", RequestCacheOpts);
      (function(RequestCacheOpts) {
        RequestCacheOpts[RequestCacheOpts["Default"] = 0] = "Default";
        RequestCacheOpts[RequestCacheOpts["NoStore"] = 1] = "NoStore";
        RequestCacheOpts[RequestCacheOpts["Reload"] = 2] = "Reload";
        RequestCacheOpts[RequestCacheOpts["NoCache"] = 3] = "NoCache";
        RequestCacheOpts[RequestCacheOpts["ForceCache"] = 4] = "ForceCache";
        RequestCacheOpts[RequestCacheOpts["OnlyIfCached"] = 5] = "OnlyIfCached";
      })(RequestCacheOpts || ($__export("RequestCacheOpts", RequestCacheOpts = {})));
      $__export("RequestCredentialsOpts", RequestCredentialsOpts);
      (function(RequestCredentialsOpts) {
        RequestCredentialsOpts[RequestCredentialsOpts["Omit"] = 0] = "Omit";
        RequestCredentialsOpts[RequestCredentialsOpts["SameOrigin"] = 1] = "SameOrigin";
        RequestCredentialsOpts[RequestCredentialsOpts["Include"] = 2] = "Include";
      })(RequestCredentialsOpts || ($__export("RequestCredentialsOpts", RequestCredentialsOpts = {})));
      $__export("RequestMethods", RequestMethods);
      (function(RequestMethods) {
        RequestMethods[RequestMethods["GET"] = 0] = "GET";
        RequestMethods[RequestMethods["POST"] = 1] = "POST";
        RequestMethods[RequestMethods["PUT"] = 2] = "PUT";
        RequestMethods[RequestMethods["DELETE"] = 3] = "DELETE";
        RequestMethods[RequestMethods["OPTIONS"] = 4] = "OPTIONS";
        RequestMethods[RequestMethods["HEAD"] = 5] = "HEAD";
        RequestMethods[RequestMethods["PATCH"] = 6] = "PATCH";
      })(RequestMethods || ($__export("RequestMethods", RequestMethods = {})));
      $__export("ReadyStates", ReadyStates);
      (function(ReadyStates) {
        ReadyStates[ReadyStates["UNSENT"] = 0] = "UNSENT";
        ReadyStates[ReadyStates["OPEN"] = 1] = "OPEN";
        ReadyStates[ReadyStates["HEADERS_RECEIVED"] = 2] = "HEADERS_RECEIVED";
        ReadyStates[ReadyStates["LOADING"] = 3] = "LOADING";
        ReadyStates[ReadyStates["DONE"] = 4] = "DONE";
        ReadyStates[ReadyStates["CANCELLED"] = 5] = "CANCELLED";
      })(ReadyStates || ($__export("ReadyStates", ReadyStates = {})));
      $__export("ResponseTypes", ResponseTypes);
      (function(ResponseTypes) {
        ResponseTypes[ResponseTypes["Basic"] = 0] = "Basic";
        ResponseTypes[ResponseTypes["Cors"] = 1] = "Cors";
        ResponseTypes[ResponseTypes["Default"] = 2] = "Default";
        ResponseTypes[ResponseTypes["Error"] = 3] = "Error";
        ResponseTypes[ResponseTypes["Opaque"] = 4] = "Opaque";
      })(ResponseTypes || ($__export("ResponseTypes", ResponseTypes = {})));
    }
  };
});
//# sourceMappingURL=enums.js.map

//# sourceMappingURL=../../src/http/enums.js.map