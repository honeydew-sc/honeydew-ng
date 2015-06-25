System.register(["angular2/di", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/facade/collection", "./directive_resolver", "./view_ref", "./element_injector", "./view_resolver", "./component_url_mapper", "./proto_view_factory", "angular2/src/services/url_resolver", "angular2/src/services/app_root_url", "angular2/src/render/api"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Binding,
      resolveForwardRef,
      Injectable,
      Type,
      isBlank,
      isPresent,
      BaseException,
      normalizeBlank,
      stringify,
      isArray,
      isPromise,
      PromiseWrapper,
      ListWrapper,
      Map,
      MapWrapper,
      DirectiveResolver,
      ProtoViewRef,
      DirectiveBinding,
      ViewResolver,
      ComponentUrlMapper,
      ProtoViewFactory,
      UrlResolver,
      AppRootUrl,
      renderApi,
      CompilerCache,
      Compiler;
  return {
    setters: [function($__m) {
      Binding = $__m.Binding;
      resolveForwardRef = $__m.resolveForwardRef;
      Injectable = $__m.Injectable;
    }, function($__m) {
      Type = $__m.Type;
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      normalizeBlank = $__m.normalizeBlank;
      stringify = $__m.stringify;
      isArray = $__m.isArray;
      isPromise = $__m.isPromise;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      DirectiveResolver = $__m.DirectiveResolver;
    }, function($__m) {
      ProtoViewRef = $__m.ProtoViewRef;
    }, function($__m) {
      DirectiveBinding = $__m.DirectiveBinding;
    }, function($__m) {
      ViewResolver = $__m.ViewResolver;
    }, function($__m) {
      ComponentUrlMapper = $__m.ComponentUrlMapper;
    }, function($__m) {
      ProtoViewFactory = $__m.ProtoViewFactory;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      AppRootUrl = $__m.AppRootUrl;
    }, function($__m) {
      renderApi = $__m;
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
      CompilerCache = ($traceurRuntime.createClass)(function() {
        this._cache = new Map();
        this._hostCache = new Map();
      }, {
        set: function(component, protoView) {
          this._cache.set(component, protoView);
        },
        get: function(component) {
          var result = this._cache.get(component);
          return normalizeBlank(result);
        },
        setHost: function(component, protoView) {
          this._hostCache.set(component, protoView);
        },
        getHost: function(component) {
          var result = this._hostCache.get(component);
          return normalizeBlank(result);
        },
        clear: function() {
          this._cache.clear();
          this._hostCache.clear();
        }
      }, {});
      $__export("CompilerCache", CompilerCache);
      $__export("CompilerCache", CompilerCache = __decorate([Injectable(), __metadata('design:paramtypes', [])], CompilerCache));
      Compiler = ($traceurRuntime.createClass)(function(reader, cache, viewResolver, componentUrlMapper, urlResolver, render, protoViewFactory, appUrl) {
        this._reader = reader;
        this._compilerCache = cache;
        this._compiling = new Map();
        this._viewResolver = viewResolver;
        this._componentUrlMapper = componentUrlMapper;
        this._urlResolver = urlResolver;
        this._appUrl = appUrl.value;
        this._render = render;
        this._protoViewFactory = protoViewFactory;
      }, {
        _bindDirective: function(directiveTypeOrBinding) {
          if (directiveTypeOrBinding instanceof DirectiveBinding) {
            return directiveTypeOrBinding;
          } else if (directiveTypeOrBinding instanceof Binding) {
            var annotation = this._reader.resolve(directiveTypeOrBinding.token);
            return DirectiveBinding.createFromBinding(directiveTypeOrBinding, annotation);
          } else {
            var annotation$__3 = this._reader.resolve(directiveTypeOrBinding);
            return DirectiveBinding.createFromType(directiveTypeOrBinding, annotation$__3);
          }
        },
        compileInHost: function(componentTypeOrBinding) {
          var $__0 = this;
          var componentBinding = this._bindDirective(componentTypeOrBinding);
          Compiler._assertTypeIsComponent(componentBinding);
          var directiveMetadata = componentBinding.metadata;
          var hostPvPromise;
          var component = componentBinding.key.token;
          var hostAppProtoView = this._compilerCache.getHost(component);
          if (isPresent(hostAppProtoView)) {
            hostPvPromise = PromiseWrapper.resolve(hostAppProtoView);
          } else {
            hostPvPromise = this._render.compileHost(directiveMetadata).then(function(hostRenderPv) {
              return $__0._compileNestedProtoViews(componentBinding, hostRenderPv, [componentBinding]);
            });
          }
          return hostPvPromise.then(function(hostAppProtoView) {
            return new ProtoViewRef(hostAppProtoView);
          });
        },
        _compile: function(componentBinding) {
          var $__0 = this;
          var component = componentBinding.key.token;
          var protoView = this._compilerCache.get(component);
          if (isPresent(protoView)) {
            return protoView;
          }
          var pvPromise = this._compiling.get(component);
          if (isPresent(pvPromise)) {
            return pvPromise;
          }
          var view = this._viewResolver.resolve(component);
          var directives = this._flattenDirectives(view);
          for (var i = 0; i < directives.length; i++) {
            if (!Compiler._isValidDirective(directives[i])) {
              throw new BaseException(("Unexpected directive value '" + stringify(directives[i]) + "' on the View of component '" + stringify(component) + "'"));
            }
          }
          var boundDirectives = ListWrapper.map(directives, function(directive) {
            return $__0._bindDirective(directive);
          });
          var renderTemplate = this._buildRenderTemplate(component, view, boundDirectives);
          pvPromise = this._render.compile(renderTemplate).then(function(renderPv) {
            return $__0._compileNestedProtoViews(componentBinding, renderPv, boundDirectives);
          });
          this._compiling.set(component, pvPromise);
          return pvPromise;
        },
        _compileNestedProtoViews: function(componentBinding, renderPv, directives) {
          var $__0 = this;
          var protoViews = this._protoViewFactory.createAppProtoViews(componentBinding, renderPv, directives);
          var protoView = protoViews[0];
          if (isPresent(componentBinding)) {
            var component = componentBinding.key.token;
            if (renderPv.type === renderApi.ViewType.COMPONENT) {
              this._compilerCache.set(component, protoView);
              MapWrapper.delete(this._compiling, component);
            } else {
              this._compilerCache.setHost(component, protoView);
            }
          }
          var nestedPVPromises = [];
          ListWrapper.forEach(this._collectComponentElementBinders(protoViews), function(elementBinder) {
            var nestedComponent = elementBinder.componentDirective;
            var elementBinderDone = function(nestedPv) {
              elementBinder.nestedProtoView = nestedPv;
            };
            var nestedCall = $__0._compile(nestedComponent);
            if (isPromise(nestedCall)) {
              nestedPVPromises.push(nestedCall.then(elementBinderDone));
            } else {
              elementBinderDone(nestedCall);
            }
          });
          if (nestedPVPromises.length > 0) {
            return PromiseWrapper.all(nestedPVPromises).then(function(_) {
              return protoView;
            });
          } else {
            return protoView;
          }
        },
        _collectComponentElementBinders: function(protoViews) {
          var componentElementBinders = [];
          ListWrapper.forEach(protoViews, function(protoView) {
            ListWrapper.forEach(protoView.elementBinders, function(elementBinder) {
              if (isPresent(elementBinder.componentDirective)) {
                componentElementBinders.push(elementBinder);
              }
            });
          });
          return componentElementBinders;
        },
        _buildRenderTemplate: function(component, view, directives) {
          var $__0 = this;
          var componentUrl = this._urlResolver.resolve(this._appUrl, this._componentUrlMapper.getUrl(component));
          var templateAbsUrl = null;
          var styleAbsUrls = null;
          if (isPresent(view.templateUrl)) {
            templateAbsUrl = this._urlResolver.resolve(componentUrl, view.templateUrl);
          } else if (isPresent(view.template)) {
            templateAbsUrl = componentUrl;
          }
          if (isPresent(view.styleUrls)) {
            styleAbsUrls = ListWrapper.map(view.styleUrls, function(url) {
              return $__0._urlResolver.resolve(componentUrl, url);
            });
          }
          return new renderApi.ViewDefinition({
            componentId: stringify(component),
            templateAbsUrl: templateAbsUrl,
            template: view.template,
            styleAbsUrls: styleAbsUrls,
            styles: view.styles,
            directives: ListWrapper.map(directives, function(directiveBinding) {
              return directiveBinding.metadata;
            })
          });
        },
        _flattenDirectives: function(template) {
          if (isBlank(template.directives))
            return [];
          var directives = [];
          this._flattenList(template.directives, directives);
          return directives;
        },
        _flattenList: function(tree, out) {
          for (var i = 0; i < tree.length; i++) {
            var item = resolveForwardRef(tree[i]);
            if (isArray(item)) {
              this._flattenList(item, out);
            } else {
              out.push(item);
            }
          }
        }
      }, {
        _isValidDirective: function(value) {
          return isPresent(value) && (value instanceof Type || value instanceof Binding);
        },
        _assertTypeIsComponent: function(directiveBinding) {
          if (directiveBinding.metadata.type !== renderApi.DirectiveMetadata.COMPONENT_TYPE) {
            throw new BaseException(("Could not load '" + stringify(directiveBinding.key.token) + "' because it is not a component."));
          }
        }
      });
      $__export("Compiler", Compiler);
      $__export("Compiler", Compiler = __decorate([Injectable(), __metadata('design:paramtypes', [DirectiveResolver, CompilerCache, ViewResolver, ComponentUrlMapper, UrlResolver, renderApi.RenderCompiler, ProtoViewFactory, AppRootUrl])], Compiler));
    }
  };
});
//# sourceMappingURL=compiler.js.map

//# sourceMappingURL=../../../src/core/compiler/compiler.js.map