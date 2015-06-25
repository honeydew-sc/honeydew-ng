System.register(["angular2/di", "angular2/src/core/compiler/compiler", "angular2/src/reflection/reflection", "angular2/change_detection", "angular2/src/core/exception_handler", "angular2/src/render/dom/compiler/view_loader", "angular2/src/core/compiler/view_resolver", "angular2/src/core/compiler/directive_resolver", "angular2/src/core/compiler/dynamic_component_loader", "angular2/src/render/dom/shadow_dom/shadow_dom_strategy", "angular2/src/render/dom/shadow_dom/emulated_unscoped_shadow_dom_strategy", "angular2/src/render/xhr", "angular2/src/core/compiler/component_url_mapper", "angular2/src/services/url_resolver", "angular2/src/services/app_root_url", "angular2/src/render/dom/compiler/style_url_resolver", "angular2/src/render/dom/compiler/style_inliner", "angular2/src/core/zone/ng_zone", "angular2/src/dom/dom_adapter", "angular2/src/render/dom/events/event_manager", "angular2/src/mock/view_resolver_mock", "angular2/src/render/xhr_mock", "angular2/src/mock/mock_location_strategy", "angular2/src/router/location_strategy", "angular2/src/mock/ng_zone_mock", "./test_bed", "./test_component_builder", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/core/compiler/view_pool", "angular2/src/core/compiler/view_manager", "angular2/src/core/compiler/view_manager_utils", "angular2/debug", "angular2/src/core/compiler/proto_view_factory", "angular2/src/render/api", "angular2/src/render/dom/dom_renderer", "angular2/src/render/dom/compiler/compiler"], function($__export) {
  "use strict";
  var bind,
      Compiler,
      CompilerCache,
      Reflector,
      reflector,
      Parser,
      Lexer,
      ChangeDetection,
      DynamicChangeDetection,
      PipeRegistry,
      defaultPipeRegistry,
      ExceptionHandler,
      ViewLoader,
      ViewResolver,
      DirectiveResolver,
      DynamicComponentLoader,
      ShadowDomStrategy,
      EmulatedUnscopedShadowDomStrategy,
      XHR,
      ComponentUrlMapper,
      UrlResolver,
      AppRootUrl,
      StyleUrlResolver,
      StyleInliner,
      NgZone,
      DOM,
      EventManager,
      DomEventsPlugin,
      MockViewResolver,
      MockXHR,
      MockLocationStrategy,
      LocationStrategy,
      MockNgZone,
      TestBed,
      TestComponentBuilder,
      Injector,
      ListWrapper,
      FunctionWrapper,
      AppViewPool,
      APP_VIEW_POOL_CAPACITY,
      AppViewManager,
      AppViewManagerUtils,
      ELEMENT_PROBE_CONFIG,
      ProtoViewFactory,
      RenderCompiler,
      Renderer,
      DomRenderer,
      DOCUMENT_TOKEN,
      DefaultDomCompiler,
      FunctionWithParamTokens;
  function _getRootBindings() {
    return [bind(Reflector).toValue(reflector)];
  }
  function _getAppBindings() {
    var appDoc;
    try {
      appDoc = DOM.defaultDoc();
    } catch (e) {
      appDoc = null;
    }
    return [bind(DOCUMENT_TOKEN).toValue(appDoc), bind(ShadowDomStrategy).toFactory(function(doc) {
      return new EmulatedUnscopedShadowDomStrategy(doc.head);
    }, [DOCUMENT_TOKEN]), DomRenderer, DefaultDomCompiler, bind(Renderer).toAlias(DomRenderer), bind(RenderCompiler).toAlias(DefaultDomCompiler), ProtoViewFactory, AppViewPool, AppViewManager, AppViewManagerUtils, ELEMENT_PROBE_CONFIG, bind(APP_VIEW_POOL_CAPACITY).toValue(500), Compiler, CompilerCache, bind(ViewResolver).toClass(MockViewResolver), bind(PipeRegistry).toValue(defaultPipeRegistry), bind(ChangeDetection).toClass(DynamicChangeDetection), ViewLoader, DynamicComponentLoader, DirectiveResolver, Parser, Lexer, ExceptionHandler, bind(LocationStrategy).toClass(MockLocationStrategy), bind(XHR).toClass(MockXHR), ComponentUrlMapper, UrlResolver, AppRootUrl, StyleUrlResolver, StyleInliner, TestBed, TestComponentBuilder, bind(NgZone).toClass(MockNgZone), bind(EventManager).toFactory(function(zone) {
      var plugins = [new DomEventsPlugin()];
      return new EventManager(plugins, zone);
    }, [NgZone])];
  }
  function createTestInjector(bindings) {
    var rootInjector = Injector.resolveAndCreate(_getRootBindings());
    return rootInjector.resolveAndCreateChild(ListWrapper.concat(_getAppBindings(), bindings));
  }
  function inject(tokens, fn) {
    return new FunctionWithParamTokens(tokens, fn);
  }
  $__export("createTestInjector", createTestInjector);
  $__export("inject", inject);
  return {
    setters: [function($__m) {
      bind = $__m.bind;
      Injector = $__m.Injector;
    }, function($__m) {
      Compiler = $__m.Compiler;
      CompilerCache = $__m.CompilerCache;
    }, function($__m) {
      Reflector = $__m.Reflector;
      reflector = $__m.reflector;
    }, function($__m) {
      Parser = $__m.Parser;
      Lexer = $__m.Lexer;
      ChangeDetection = $__m.ChangeDetection;
      DynamicChangeDetection = $__m.DynamicChangeDetection;
      PipeRegistry = $__m.PipeRegistry;
      defaultPipeRegistry = $__m.defaultPipeRegistry;
    }, function($__m) {
      ExceptionHandler = $__m.ExceptionHandler;
    }, function($__m) {
      ViewLoader = $__m.ViewLoader;
    }, function($__m) {
      ViewResolver = $__m.ViewResolver;
    }, function($__m) {
      DirectiveResolver = $__m.DirectiveResolver;
    }, function($__m) {
      DynamicComponentLoader = $__m.DynamicComponentLoader;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }, function($__m) {
      EmulatedUnscopedShadowDomStrategy = $__m.EmulatedUnscopedShadowDomStrategy;
    }, function($__m) {
      XHR = $__m.XHR;
    }, function($__m) {
      ComponentUrlMapper = $__m.ComponentUrlMapper;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      AppRootUrl = $__m.AppRootUrl;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
    }, function($__m) {
      StyleInliner = $__m.StyleInliner;
    }, function($__m) {
      NgZone = $__m.NgZone;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      EventManager = $__m.EventManager;
      DomEventsPlugin = $__m.DomEventsPlugin;
    }, function($__m) {
      MockViewResolver = $__m.MockViewResolver;
    }, function($__m) {
      MockXHR = $__m.MockXHR;
    }, function($__m) {
      MockLocationStrategy = $__m.MockLocationStrategy;
    }, function($__m) {
      LocationStrategy = $__m.LocationStrategy;
    }, function($__m) {
      MockNgZone = $__m.MockNgZone;
    }, function($__m) {
      TestBed = $__m.TestBed;
    }, function($__m) {
      TestComponentBuilder = $__m.TestComponentBuilder;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      FunctionWrapper = $__m.FunctionWrapper;
    }, function($__m) {
      AppViewPool = $__m.AppViewPool;
      APP_VIEW_POOL_CAPACITY = $__m.APP_VIEW_POOL_CAPACITY;
    }, function($__m) {
      AppViewManager = $__m.AppViewManager;
    }, function($__m) {
      AppViewManagerUtils = $__m.AppViewManagerUtils;
    }, function($__m) {
      ELEMENT_PROBE_CONFIG = $__m.ELEMENT_PROBE_CONFIG;
    }, function($__m) {
      ProtoViewFactory = $__m.ProtoViewFactory;
    }, function($__m) {
      RenderCompiler = $__m.RenderCompiler;
      Renderer = $__m.Renderer;
    }, function($__m) {
      DomRenderer = $__m.DomRenderer;
      DOCUMENT_TOKEN = $__m.DOCUMENT_TOKEN;
    }, function($__m) {
      DefaultDomCompiler = $__m.DefaultDomCompiler;
    }],
    execute: function() {
      FunctionWithParamTokens = function() {
        function FunctionWithParamTokens(tokens, fn) {
          this._tokens = tokens;
          this._fn = fn;
        }
        return ($traceurRuntime.createClass)(FunctionWithParamTokens, {execute: function(injector) {
            var params = ListWrapper.map(this._tokens, function(t) {
              return injector.get(t);
            });
            FunctionWrapper.apply(this._fn, params);
          }}, {});
      }();
      $__export("FunctionWithParamTokens", FunctionWithParamTokens);
    }
  };
});
//# sourceMappingURL=test_injector.js.map

//# sourceMappingURL=../../src/test_lib/test_injector.js.map