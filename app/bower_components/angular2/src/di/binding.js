System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/reflection/reflection", "./key", "./annotations_impl", "./exceptions", "./forward_ref"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Type,
      isBlank,
      isPresent,
      CONST,
      CONST_EXPR,
      BaseException,
      stringify,
      isArray,
      ListWrapper,
      reflector,
      Key,
      Inject,
      InjectLazy,
      InjectPromise,
      Optional,
      DependencyAnnotation,
      NoAnnotationError,
      resolveForwardRef,
      Dependency,
      _EMPTY_LIST,
      Binding,
      ResolvedBinding,
      BindingBuilder;
  function bind(token) {
    return new BindingBuilder(token);
  }
  function _constructDependencies(factoryFunction, dependencies) {
    if (isBlank(dependencies)) {
      return _dependenciesFor(factoryFunction);
    } else {
      var params = ListWrapper.map(dependencies, function(t) {
        return [t];
      });
      return ListWrapper.map(dependencies, function(t) {
        return _extractToken(factoryFunction, t, params);
      });
    }
  }
  function _dependenciesFor(typeOrFunc) {
    var params = reflector.parameters(typeOrFunc);
    if (isBlank(params))
      return [];
    if (ListWrapper.any(params, function(p) {
      return isBlank(p);
    })) {
      throw new NoAnnotationError(typeOrFunc, params);
    }
    return ListWrapper.map(params, function(p) {
      return _extractToken(typeOrFunc, p, params);
    });
  }
  function _extractToken(typeOrFunc, annotations, params) {
    var depProps = [];
    var token = null;
    var optional = false;
    var lazy = false;
    var asPromise = false;
    if (!isArray(annotations)) {
      return _createDependency(annotations, asPromise, lazy, optional, depProps);
    }
    for (var i = 0; i < annotations.length; ++i) {
      var paramAnnotation = annotations[i];
      if (paramAnnotation instanceof Type) {
        token = paramAnnotation;
      } else if (paramAnnotation instanceof Inject) {
        token = paramAnnotation.token;
      } else if (paramAnnotation instanceof InjectPromise) {
        token = paramAnnotation.token;
        asPromise = true;
      } else if (paramAnnotation instanceof InjectLazy) {
        token = paramAnnotation.token;
        lazy = true;
      } else if (paramAnnotation instanceof Optional) {
        optional = true;
      } else if (paramAnnotation instanceof DependencyAnnotation) {
        if (isPresent(paramAnnotation.token)) {
          token = paramAnnotation.token;
        }
        depProps.push(paramAnnotation);
      }
    }
    token = resolveForwardRef(token);
    if (isPresent(token)) {
      return _createDependency(token, asPromise, lazy, optional, depProps);
    } else {
      throw new NoAnnotationError(typeOrFunc, params);
    }
  }
  function _createDependency(token, asPromise, lazy, optional, depProps) {
    return new Dependency(Key.get(token), asPromise, lazy, optional, depProps);
  }
  $__export("bind", bind);
  return {
    setters: [function($__m) {
      Type = $__m.Type;
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      CONST = $__m.CONST;
      CONST_EXPR = $__m.CONST_EXPR;
      BaseException = $__m.BaseException;
      stringify = $__m.stringify;
      isArray = $__m.isArray;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      reflector = $__m.reflector;
    }, function($__m) {
      Key = $__m.Key;
    }, function($__m) {
      Inject = $__m.Inject;
      InjectLazy = $__m.InjectLazy;
      InjectPromise = $__m.InjectPromise;
      Optional = $__m.Optional;
      DependencyAnnotation = $__m.DependencyAnnotation;
    }, function($__m) {
      NoAnnotationError = $__m.NoAnnotationError;
    }, function($__m) {
      resolveForwardRef = $__m.resolveForwardRef;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Dependency = function() {
        function Dependency(key, asPromise, lazy, optional, properties) {
          this.key = key;
          this.asPromise = asPromise;
          this.lazy = lazy;
          this.optional = optional;
          this.properties = properties;
        }
        return ($traceurRuntime.createClass)(Dependency, {}, {fromKey: function(key) {
            return new Dependency(key, false, false, false, []);
          }});
      }();
      $__export("Dependency", Dependency);
      _EMPTY_LIST = CONST_EXPR([]);
      Binding = ($traceurRuntime.createClass)(function(token, $__3) {
        var $__4 = $__3,
            toClass = $__4.toClass,
            toValue = $__4.toValue,
            toAlias = $__4.toAlias,
            toFactory = $__4.toFactory,
            toAsyncFactory = $__4.toAsyncFactory,
            deps = $__4.deps;
        this.token = token;
        this.toClass = toClass;
        this.toValue = toValue;
        this.toAlias = toAlias;
        this.toFactory = toFactory;
        this.toAsyncFactory = toAsyncFactory;
        this.dependencies = deps;
      }, {resolve: function() {
          var $__0 = this;
          var factoryFn;
          var resolvedDeps;
          var isAsync = false;
          if (isPresent(this.toClass)) {
            var toClass = resolveForwardRef(this.toClass);
            factoryFn = reflector.factory(toClass);
            resolvedDeps = _dependenciesFor(toClass);
          } else if (isPresent(this.toAlias)) {
            factoryFn = function(aliasInstance) {
              return aliasInstance;
            };
            resolvedDeps = [Dependency.fromKey(Key.get(this.toAlias))];
          } else if (isPresent(this.toFactory)) {
            factoryFn = this.toFactory;
            resolvedDeps = _constructDependencies(this.toFactory, this.dependencies);
          } else if (isPresent(this.toAsyncFactory)) {
            factoryFn = this.toAsyncFactory;
            resolvedDeps = _constructDependencies(this.toAsyncFactory, this.dependencies);
            isAsync = true;
          } else {
            factoryFn = function() {
              return $__0.toValue;
            };
            resolvedDeps = _EMPTY_LIST;
          }
          return new ResolvedBinding(Key.get(this.token), factoryFn, resolvedDeps, isAsync);
        }}, {});
      $__export("Binding", Binding);
      $__export("Binding", Binding = __decorate([CONST(), __metadata('design:paramtypes', [Object, Object])], Binding));
      ResolvedBinding = function() {
        function ResolvedBinding(key, factory, dependencies, providedAsPromise) {
          this.key = key;
          this.factory = factory;
          this.dependencies = dependencies;
          this.providedAsPromise = providedAsPromise;
        }
        return ($traceurRuntime.createClass)(ResolvedBinding, {}, {});
      }();
      $__export("ResolvedBinding", ResolvedBinding);
      BindingBuilder = function() {
        function BindingBuilder(token) {
          this.token = token;
        }
        return ($traceurRuntime.createClass)(BindingBuilder, {
          toClass: function(type) {
            return new Binding(this.token, {toClass: type});
          },
          toValue: function(value) {
            return new Binding(this.token, {toValue: value});
          },
          toAlias: function(aliasToken) {
            if (isBlank(aliasToken)) {
              throw new BaseException(("Can not alias " + stringify(this.token) + " to a blank value!"));
            }
            return new Binding(this.token, {toAlias: aliasToken});
          },
          toFactory: function(factoryFunction, dependencies) {
            return new Binding(this.token, {
              toFactory: factoryFunction,
              deps: dependencies
            });
          },
          toAsyncFactory: function(factoryFunction, dependencies) {
            return new Binding(this.token, {
              toAsyncFactory: factoryFunction,
              deps: dependencies
            });
          }
        }, {});
      }();
      $__export("BindingBuilder", BindingBuilder);
    }
  };
});
//# sourceMappingURL=binding.js.map

//# sourceMappingURL=../../src/di/binding.js.map