System.register(["angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var isPresent,
      isFunction,
      global,
      stringify,
      BaseException,
      ListWrapper,
      ReflectionCapabilities;
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
      isFunction = $__m.isFunction;
      global = $__m.global;
      stringify = $__m.stringify;
      BaseException = $__m.BaseException;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }],
    execute: function() {
      ReflectionCapabilities = function() {
        function ReflectionCapabilities(reflect) {
          this._reflect = isPresent(reflect) ? reflect : global.Reflect;
        }
        return ($traceurRuntime.createClass)(ReflectionCapabilities, {
          factory: function(t) {
            switch (t.length) {
              case 0:
                return function() {
                  return new t();
                };
              case 1:
                return function(a1) {
                  return new t(a1);
                };
              case 2:
                return function(a1, a2) {
                  return new t(a1, a2);
                };
              case 3:
                return function(a1, a2, a3) {
                  return new t(a1, a2, a3);
                };
              case 4:
                return function(a1, a2, a3, a4) {
                  return new t(a1, a2, a3, a4);
                };
              case 5:
                return function(a1, a2, a3, a4, a5) {
                  return new t(a1, a2, a3, a4, a5);
                };
              case 6:
                return function(a1, a2, a3, a4, a5, a6) {
                  return new t(a1, a2, a3, a4, a5, a6);
                };
              case 7:
                return function(a1, a2, a3, a4, a5, a6, a7) {
                  return new t(a1, a2, a3, a4, a5, a6, a7);
                };
              case 8:
                return function(a1, a2, a3, a4, a5, a6, a7, a8) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8);
                };
              case 9:
                return function(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9);
                };
              case 10:
                return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
                };
              case 11:
                return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
                };
              case 12:
                return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);
                };
              case 13:
                return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13);
                };
              case 14:
                return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14);
                };
              case 15:
                return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15);
                };
              case 16:
                return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16);
                };
              case 17:
                return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17);
                };
              case 18:
                return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18);
                };
              case 19:
                return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19);
                };
              case 20:
                return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20);
                };
            }
            ;
            throw new Error(("Cannot create a factory for '" + stringify(t) + "' because its constructor has more than 20 arguments"));
          },
          _zipTypesAndAnnotaions: function(paramTypes, paramAnnotations) {
            var result;
            if (typeof paramTypes === 'undefined') {
              result = ListWrapper.createFixedSize(paramAnnotations.length);
            } else {
              result = ListWrapper.createFixedSize(paramTypes.length);
            }
            for (var i = 0; i < result.length; i++) {
              if (typeof paramTypes === 'undefined') {
                result[i] = [];
              } else if (paramTypes[i] != Object) {
                result[i] = [paramTypes[i]];
              } else {
                result[i] = [];
              }
              if (isPresent(paramAnnotations) && isPresent(paramAnnotations[i])) {
                result[i] = result[i].concat(paramAnnotations[i]);
              }
            }
            return result;
          },
          parameters: function(typeOfFunc) {
            if (isPresent(typeOfFunc.parameters)) {
              return typeOfFunc.parameters;
            }
            if (isPresent(this._reflect) && isPresent(this._reflect.getMetadata)) {
              var paramAnnotations = this._reflect.getMetadata('parameters', typeOfFunc);
              var paramTypes = this._reflect.getMetadata('design:paramtypes', typeOfFunc);
              if (isPresent(paramTypes) || isPresent(paramAnnotations)) {
                return this._zipTypesAndAnnotaions(paramTypes, paramAnnotations);
              }
            }
            return ListWrapper.createFixedSize(typeOfFunc.length);
          },
          annotations: function(typeOfFunc) {
            if (isPresent(typeOfFunc.annotations)) {
              var annotations = typeOfFunc.annotations;
              if (isFunction(annotations) && annotations.annotations) {
                annotations = annotations.annotations;
              }
              return annotations;
            }
            if (isPresent(this._reflect) && isPresent(this._reflect.getMetadata)) {
              var annotations = this._reflect.getMetadata('annotations', typeOfFunc);
              if (isPresent(annotations))
                return annotations;
            }
            return [];
          },
          interfaces: function(type) {
            throw new BaseException("JavaScript does not support interfaces");
          },
          getter: function(name) {
            return new Function('o', 'return o.' + name + ';');
          },
          setter: function(name) {
            return new Function('o', 'v', 'return o.' + name + ' = v;');
          },
          method: function(name) {
            var functionBody = ("if (!o." + name + ") throw new Error('\"" + name + "\" is undefined');\n        return o." + name + ".apply(o, args);");
            return new Function('o', 'args', functionBody);
          }
        }, {});
      }();
      $__export("ReflectionCapabilities", ReflectionCapabilities);
    }
  };
});
//# sourceMappingURL=reflection_capabilities.js.map

//# sourceMappingURL=../../src/reflection/reflection_capabilities.js.map