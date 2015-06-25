System.register(["angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var isPresent,
      isBlank,
      isJsObject,
      BaseException,
      isListLikeIterable,
      Map,
      MapWrapper,
      ListWrapper,
      Headers;
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      isJsObject = $__m.isJsObject;
      BaseException = $__m.BaseException;
    }, function($__m) {
      isListLikeIterable = $__m.isListLikeIterable;
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }],
    execute: function() {
      Headers = function() {
        function Headers(headers) {
          var $__0 = this;
          if (isBlank(headers)) {
            this._headersMap = new Map();
            return;
          }
          if (isPresent(headers._headersMap)) {
            this._headersMap = headers._headersMap;
          } else if (isJsObject(headers)) {
            this._headersMap = MapWrapper.createFromStringMap(headers);
            MapWrapper.forEach(this._headersMap, function(v, k) {
              if (!isListLikeIterable(v)) {
                var list = [];
                list.push(v);
                $__0._headersMap.set(k, list);
              }
            });
          }
        }
        return ($traceurRuntime.createClass)(Headers, {
          append: function(name, value) {
            var list = this._headersMap.get(name) || [];
            list.push(value);
            this._headersMap.set(name, list);
          },
          delete: function(name) {
            MapWrapper.delete(this._headersMap, name);
          },
          forEach: function(fn) {
            return MapWrapper.forEach(this._headersMap, fn);
          },
          get: function(header) {
            return ListWrapper.first(this._headersMap.get(header));
          },
          has: function(header) {
            return this._headersMap.has(header);
          },
          keys: function() {
            return MapWrapper.keys(this._headersMap);
          },
          set: function(header, value) {
            var list = [];
            if (!isListLikeIterable(value)) {
              list.push(value);
            } else {
              list.push(ListWrapper.toString(value));
            }
            this._headersMap.set(header, list);
          },
          values: function() {
            return MapWrapper.values(this._headersMap);
          },
          getAll: function(header) {
            return this._headersMap.get(header) || [];
          },
          entries: function() {
            throw new BaseException('"entries" method is not implemented on Headers class');
          }
        }, {});
      }();
      $__export("Headers", Headers);
    }
  };
});
//# sourceMappingURL=headers.js.map

//# sourceMappingURL=../../src/http/headers.js.map