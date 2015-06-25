System.register(["angular2/src/facade/collection"], function($__export) {
  "use strict";
  var ListWrapper,
      BaseQueryList;
  return {
    setters: [function($__m) {
      ListWrapper = $__m.ListWrapper;
    }],
    execute: function() {
      BaseQueryList = function() {
        var $__1;
        function BaseQueryList() {
          this._results = [];
          this._callbacks = [];
          this._dirty = false;
        }
        return ($traceurRuntime.createClass)(BaseQueryList, ($__1 = {}, Object.defineProperty($__1, Symbol.iterator, {
          value: function() {
            return this._results[Symbol.iterator]();
          },
          configurable: true,
          enumerable: true,
          writable: true
        }), Object.defineProperty($__1, "reset", {
          value: function(newList) {
            this._results = newList;
            this._dirty = true;
          },
          configurable: true,
          enumerable: true,
          writable: true
        }), Object.defineProperty($__1, "add", {
          value: function(obj) {
            this._results.push(obj);
            this._dirty = true;
          },
          configurable: true,
          enumerable: true,
          writable: true
        }), Object.defineProperty($__1, "fireCallbacks", {
          value: function() {
            if (this._dirty) {
              ListWrapper.forEach(this._callbacks, function(c) {
                return c();
              });
              this._dirty = false;
            }
          },
          configurable: true,
          enumerable: true,
          writable: true
        }), Object.defineProperty($__1, "onChange", {
          value: function(callback) {
            this._callbacks.push(callback);
          },
          configurable: true,
          enumerable: true,
          writable: true
        }), Object.defineProperty($__1, "removeCallback", {
          value: function(callback) {
            ListWrapper.remove(this._callbacks, callback);
          },
          configurable: true,
          enumerable: true,
          writable: true
        }), Object.defineProperty($__1, "length", {
          get: function() {
            return this._results.length;
          },
          configurable: true,
          enumerable: true
        }), Object.defineProperty($__1, "first", {
          get: function() {
            return ListWrapper.first(this._results);
          },
          configurable: true,
          enumerable: true
        }), Object.defineProperty($__1, "last", {
          get: function() {
            return ListWrapper.last(this._results);
          },
          configurable: true,
          enumerable: true
        }), $__1), {});
      }();
      $__export("BaseQueryList", BaseQueryList);
    }
  };
});
//# sourceMappingURL=base_query_list.js.map

//# sourceMappingURL=../../../src/core/compiler/base_query_list.js.map