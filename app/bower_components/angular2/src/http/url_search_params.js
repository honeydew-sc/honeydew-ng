System.register(["angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var StringWrapper,
      Map,
      MapWrapper,
      ListWrapper,
      URLSearchParams;
  function paramParser(rawParams) {
    var map = new Map();
    var params = StringWrapper.split(rawParams, '&');
    ListWrapper.forEach(params, function(param) {
      var split = StringWrapper.split(param, '=');
      var key = ListWrapper.get(split, 0);
      var val = ListWrapper.get(split, 1);
      var list = map.get(key) || [];
      list.push(val);
      map.set(key, list);
    });
    return map;
  }
  return {
    setters: [function($__m) {
      StringWrapper = $__m.StringWrapper;
    }, function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }],
    execute: function() {
      URLSearchParams = function() {
        function URLSearchParams(rawParams) {
          this.rawParams = rawParams;
          this.paramsMap = paramParser(rawParams);
        }
        return ($traceurRuntime.createClass)(URLSearchParams, {
          has: function(param) {
            return this.paramsMap.has(param);
          },
          get: function(param) {
            return ListWrapper.first(this.paramsMap.get(param));
          },
          getAll: function(param) {
            return this.paramsMap.get(param) || [];
          },
          append: function(param, val) {
            var list = this.paramsMap.get(param) || [];
            list.push(val);
            this.paramsMap.set(param, list);
          },
          toString: function() {
            var paramsList = [];
            MapWrapper.forEach(this.paramsMap, function(values, k) {
              ListWrapper.forEach(values, function(v) {
                paramsList.push(k + '=' + v);
              });
            });
            return ListWrapper.join(paramsList, '&');
          },
          delete: function(param) {
            MapWrapper.delete(this.paramsMap, param);
          }
        }, {});
      }();
      $__export("URLSearchParams", URLSearchParams);
    }
  };
});
//# sourceMappingURL=url_search_params.js.map

//# sourceMappingURL=../../src/http/url_search_params.js.map