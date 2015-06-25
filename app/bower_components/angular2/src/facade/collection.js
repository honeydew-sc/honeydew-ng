System.register(["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var isJsObject,
      global,
      isPresent,
      isArray,
      List,
      Map,
      Set,
      StringMap,
      createMapFromPairs,
      createMapFromMap,
      _clearValues,
      MapWrapper,
      StringMapWrapper,
      ListWrapper,
      createSetFromList,
      SetWrapper;
  function isListLikeIterable(obj) {
    if (!isJsObject(obj))
      return false;
    return isArray(obj) || (!(obj instanceof Map) && Symbol.iterator in obj);
  }
  function iterateListLike(obj, fn) {
    if (isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        fn(obj[i]);
      }
    } else {
      var iterator = obj[Symbol.iterator]();
      var item;
      while (!((item = iterator.next()).done)) {
        fn(item.value);
      }
    }
  }
  function iterableToList(ii) {
    var res = [];
    var $__4 = true;
    var $__5 = false;
    var $__6 = undefined;
    try {
      for (var $__2 = void 0,
          $__1 = (ii)[$traceurRuntime.toProperty(Symbol.iterator)](); !($__4 = ($__2 = $__1.next()).done); $__4 = true) {
        var i = $__2.value;
        {
          res.push(i);
        }
      }
    } catch ($__7) {
      $__5 = true;
      $__6 = $__7;
    } finally {
      try {
        if (!$__4 && $__1.return != null) {
          $__1.return();
        }
      } finally {
        if ($__5) {
          throw $__6;
        }
      }
    }
    return res;
  }
  $__export("isListLikeIterable", isListLikeIterable);
  $__export("iterateListLike", iterateListLike);
  $__export("iterableToList", iterableToList);
  return {
    setters: [function($__m) {
      isJsObject = $__m.isJsObject;
      global = $__m.global;
      isPresent = $__m.isPresent;
      isArray = $__m.isArray;
    }],
    execute: function() {
      List = global.Array;
      $__export("List", List);
      Map = global.Map;
      $__export("Map", Map);
      Set = global.Set;
      $__export("Set", Set);
      StringMap = global.Object;
      $__export("StringMap", StringMap);
      createMapFromPairs = (function() {
        try {
          if (new Map([1, 2]).size === 2) {
            return function createMapFromPairs(pairs) {
              return new Map(pairs);
            };
          }
        } catch (e) {}
        return function createMapAndPopulateFromPairs(pairs) {
          var map = new Map();
          for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            map.set(pair[0], pair[1]);
          }
          return map;
        };
      })();
      createMapFromMap = (function() {
        try {
          if (new Map(new Map())) {
            return function createMapFromMap(m) {
              return new Map(m);
            };
          }
        } catch (e) {}
        return function createMapAndPopulateFromMap(m) {
          var map = new Map();
          m.forEach(function(v, k) {
            map.set(k, v);
          });
          return map;
        };
      })();
      _clearValues = (function() {
        if ((new Map()).keys().next) {
          return function _clearValues(m) {
            var keyIterator = m.keys();
            var k;
            while (!((k = keyIterator.next()).done)) {
              m.set(k.value, null);
            }
          };
        } else {
          return function _clearValuesWithForeEach(m) {
            m.forEach(function(v, k) {
              m.set(k, null);
            });
          };
        }
      })();
      MapWrapper = function() {
        function MapWrapper() {}
        return ($traceurRuntime.createClass)(MapWrapper, {}, {
          clone: function(m) {
            return createMapFromMap(m);
          },
          createFromStringMap: function(stringMap) {
            var result = new Map();
            for (var prop in stringMap) {
              result.set(prop, stringMap[prop]);
            }
            return result;
          },
          createFromPairs: function(pairs) {
            return createMapFromPairs(pairs);
          },
          forEach: function(m, fn) {
            m.forEach(fn);
          },
          size: function(m) {
            return m.size;
          },
          delete: function(m, k) {
            m.delete(k);
          },
          clearValues: function(m) {
            _clearValues(m);
          },
          iterable: function(m) {
            return m;
          },
          keys: function(m) {
            return Array.from(m.keys());
          },
          values: function(m) {
            return Array.from(m.values());
          }
        });
      }();
      $__export("MapWrapper", MapWrapper);
      StringMapWrapper = function() {
        function StringMapWrapper() {}
        return ($traceurRuntime.createClass)(StringMapWrapper, {}, {
          create: function() {
            return {};
          },
          contains: function(map, key) {
            return map.hasOwnProperty(key);
          },
          get: function(map, key) {
            return map.hasOwnProperty(key) ? map[key] : undefined;
          },
          set: function(map, key, value) {
            map[key] = value;
          },
          keys: function(map) {
            return Object.keys(map);
          },
          isEmpty: function(map) {
            for (var prop in map) {
              return false;
            }
            return true;
          },
          delete: function(map, key) {
            delete map[key];
          },
          forEach: function(map, callback) {
            for (var prop in map) {
              if (map.hasOwnProperty(prop)) {
                callback(map[prop], prop);
              }
            }
          },
          merge: function(m1, m2) {
            var m = {};
            for (var attr in m1) {
              if (m1.hasOwnProperty(attr)) {
                m[attr] = m1[attr];
              }
            }
            for (var attr in m2) {
              if (m2.hasOwnProperty(attr)) {
                m[attr] = m2[attr];
              }
            }
            return m;
          },
          equals: function(m1, m2) {
            var k1 = Object.keys(m1);
            var k2 = Object.keys(m2);
            if (k1.length != k2.length) {
              return false;
            }
            var key;
            for (var i = 0; i < k1.length; i++) {
              key = k1[i];
              if (m1[key] !== m2[key]) {
                return false;
              }
            }
            return true;
          }
        });
      }();
      $__export("StringMapWrapper", StringMapWrapper);
      ListWrapper = function() {
        function ListWrapper() {}
        return ($traceurRuntime.createClass)(ListWrapper, {}, {
          createFixedSize: function(size) {
            return new List(size);
          },
          createGrowableSize: function(size) {
            return new List(size);
          },
          get: function(m, k) {
            return m[k];
          },
          set: function(m, k, v) {
            m[k] = v;
          },
          clone: function(array) {
            return array.slice(0);
          },
          map: function(array, fn) {
            return array.map(fn);
          },
          forEach: function(array, fn) {
            for (var i = 0; i < array.length; i++) {
              fn(array[i]);
            }
          },
          first: function(array) {
            if (!array)
              return null;
            return array[0];
          },
          last: function(array) {
            if (!array || array.length == 0)
              return null;
            return array[array.length - 1];
          },
          find: function(list, pred) {
            for (var i = 0; i < list.length; ++i) {
              if (pred(list[i]))
                return list[i];
            }
            return null;
          },
          indexOf: function(array, value) {
            var startIndex = arguments[2] !== (void 0) ? arguments[2] : 0;
            return array.indexOf(value, startIndex);
          },
          reduce: function(list, fn, init) {
            return list.reduce(fn, init);
          },
          filter: function(array, pred) {
            return array.filter(pred);
          },
          any: function(list, pred) {
            for (var i = 0; i < list.length; ++i) {
              if (pred(list[i]))
                return true;
            }
            return false;
          },
          contains: function(list, el) {
            return list.indexOf(el) !== -1;
          },
          reversed: function(array) {
            var a = ListWrapper.clone(array);
            return a.reverse();
          },
          concat: function(a, b) {
            return a.concat(b);
          },
          insert: function(list, index, value) {
            list.splice(index, 0, value);
          },
          removeAt: function(list, index) {
            var res = list[index];
            list.splice(index, 1);
            return res;
          },
          removeAll: function(list, items) {
            for (var i = 0; i < items.length; ++i) {
              var index = list.indexOf(items[i]);
              list.splice(index, 1);
            }
          },
          removeLast: function(list) {
            return list.pop();
          },
          remove: function(list, el) {
            var index = list.indexOf(el);
            if (index > -1) {
              list.splice(index, 1);
              return true;
            }
            return false;
          },
          clear: function(list) {
            list.splice(0, list.length);
          },
          join: function(list, s) {
            return list.join(s);
          },
          isEmpty: function(list) {
            return list.length == 0;
          },
          fill: function(list, value) {
            var start = arguments[2] !== (void 0) ? arguments[2] : 0;
            var end = arguments[3] !== (void 0) ? arguments[3] : null;
            list.fill(value, start, end === null ? undefined : end);
          },
          equals: function(a, b) {
            if (a.length != b.length)
              return false;
            for (var i = 0; i < a.length; ++i) {
              if (a[i] !== b[i])
                return false;
            }
            return true;
          },
          slice: function(l) {
            var from = arguments[1] !== (void 0) ? arguments[1] : 0;
            var to = arguments[2] !== (void 0) ? arguments[2] : null;
            return l.slice(from, to === null ? undefined : to);
          },
          splice: function(l, from, length) {
            return l.splice(from, length);
          },
          sort: function(l, compareFn) {
            if (isPresent(compareFn)) {
              l.sort(compareFn);
            } else {
              l.sort();
            }
          },
          toString: function(l) {
            return l.toString();
          }
        });
      }();
      $__export("ListWrapper", ListWrapper);
      createSetFromList = (function() {
        var test = new Set([1, 2, 3]);
        if (test.size === 3) {
          return function createSetFromList(lst) {
            return new Set(lst);
          };
        } else {
          return function createSetAndPopulateFromList(lst) {
            var res = new Set(lst);
            if (res.size !== lst.length) {
              for (var i = 0; i < lst.length; i++) {
                res.add(lst[i]);
              }
            }
            return res;
          };
        }
      })();
      SetWrapper = function() {
        function SetWrapper() {}
        return ($traceurRuntime.createClass)(SetWrapper, {}, {
          createFromList: function(lst) {
            return createSetFromList(lst);
          },
          has: function(s, key) {
            return s.has(key);
          }
        });
      }();
      $__export("SetWrapper", SetWrapper);
    }
  };
});
//# sourceMappingURL=collection.js.map

//# sourceMappingURL=../../src/facade/collection.js.map