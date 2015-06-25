System.register(["angular2/src/facade/collection", "angular2/src/facade/lang", "./type_literal", "./forward_ref"], function($__export) {
  "use strict";
  var MapWrapper,
      stringify,
      isBlank,
      BaseException,
      TypeLiteral,
      resolveForwardRef,
      Key,
      KeyRegistry,
      _globalKeyRegistry;
  return {
    setters: [function($__m) {
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      stringify = $__m.stringify;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
    }, function($__m) {
      TypeLiteral = $__m.TypeLiteral;
      $__export("TypeLiteral", $__m.TypeLiteral);
    }, function($__m) {
      resolveForwardRef = $__m.resolveForwardRef;
    }],
    execute: function() {
      Key = function() {
        function Key(token, id) {
          this.token = token;
          this.id = id;
          if (isBlank(token)) {
            throw new BaseException('Token must be defined!');
          }
        }
        return ($traceurRuntime.createClass)(Key, {get displayName() {
            return stringify(this.token);
          }}, {
          get: function(token) {
            return _globalKeyRegistry.get(resolveForwardRef(token));
          },
          get numberOfKeys() {
            return _globalKeyRegistry.numberOfKeys;
          }
        });
      }();
      $__export("Key", Key);
      KeyRegistry = function() {
        function KeyRegistry() {
          this._allKeys = new Map();
        }
        return ($traceurRuntime.createClass)(KeyRegistry, {
          get: function(token) {
            if (token instanceof Key)
              return token;
            var theToken = token;
            if (token instanceof TypeLiteral) {
              theToken = token.type;
            }
            token = theToken;
            if (this._allKeys.has(token)) {
              return this._allKeys.get(token);
            }
            var newKey = new Key(token, Key.numberOfKeys);
            this._allKeys.set(token, newKey);
            return newKey;
          },
          get numberOfKeys() {
            return MapWrapper.size(this._allKeys);
          }
        }, {});
      }();
      $__export("KeyRegistry", KeyRegistry);
      _globalKeyRegistry = new KeyRegistry();
    }
  };
});
//# sourceMappingURL=key.js.map

//# sourceMappingURL=../../src/di/key.js.map