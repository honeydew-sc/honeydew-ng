System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "./types"], function($__export) {
  "use strict";
  var isPresent,
      Map,
      StringMapWrapper,
      Reflector;
  function _mergeMaps(target, config) {
    StringMapWrapper.forEach(config, function(v, k) {
      return target.set(k, v);
    });
  }
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      Map = $__m.Map;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      $__export("SetterFn", $__m.SetterFn);
      $__export("GetterFn", $__m.GetterFn);
      $__export("MethodFn", $__m.MethodFn);
    }],
    execute: function() {
      Reflector = function() {
        function Reflector(reflectionCapabilities) {
          this._typeInfo = new Map();
          this._getters = new Map();
          this._setters = new Map();
          this._methods = new Map();
          this.reflectionCapabilities = reflectionCapabilities;
        }
        return ($traceurRuntime.createClass)(Reflector, {
          registerType: function(type, typeInfo) {
            this._typeInfo.set(type, typeInfo);
          },
          registerGetters: function(getters) {
            _mergeMaps(this._getters, getters);
          },
          registerSetters: function(setters) {
            _mergeMaps(this._setters, setters);
          },
          registerMethods: function(methods) {
            _mergeMaps(this._methods, methods);
          },
          factory: function(type) {
            if (this._containsTypeInfo(type)) {
              return this._getTypeInfoField(type, "factory", null);
            } else {
              return this.reflectionCapabilities.factory(type);
            }
          },
          parameters: function(typeOrFunc) {
            if (this._typeInfo.has(typeOrFunc)) {
              return this._getTypeInfoField(typeOrFunc, "parameters", []);
            } else {
              return this.reflectionCapabilities.parameters(typeOrFunc);
            }
          },
          annotations: function(typeOrFunc) {
            if (this._typeInfo.has(typeOrFunc)) {
              return this._getTypeInfoField(typeOrFunc, "annotations", []);
            } else {
              return this.reflectionCapabilities.annotations(typeOrFunc);
            }
          },
          interfaces: function(type) {
            if (this._typeInfo.has(type)) {
              return this._getTypeInfoField(type, "interfaces", []);
            } else {
              return this.reflectionCapabilities.interfaces(type);
            }
          },
          getter: function(name) {
            if (this._getters.has(name)) {
              return this._getters.get(name);
            } else {
              return this.reflectionCapabilities.getter(name);
            }
          },
          setter: function(name) {
            if (this._setters.has(name)) {
              return this._setters.get(name);
            } else {
              return this.reflectionCapabilities.setter(name);
            }
          },
          method: function(name) {
            if (this._methods.has(name)) {
              return this._methods.get(name);
            } else {
              return this.reflectionCapabilities.method(name);
            }
          },
          _getTypeInfoField: function(typeOrFunc, key, defaultValue) {
            var res = this._typeInfo.get(typeOrFunc)[key];
            return isPresent(res) ? res : defaultValue;
          },
          _containsTypeInfo: function(typeOrFunc) {
            return this._typeInfo.has(typeOrFunc);
          }
        }, {});
      }();
      $__export("Reflector", Reflector);
    }
  };
});
//# sourceMappingURL=reflector.js.map

//# sourceMappingURL=../../src/reflection/reflector.js.map