System.register(["angular2/di", "angular2/src/facade/lang", "angular2/src/dom/browser_adapter", "angular2/src/dom/dom_adapter", "./compiler/compiler", "angular2/src/reflection/reflection", "angular2/change_detection", "./exception_handler", "angular2/src/render/dom/compiler/view_loader", "angular2/src/render/dom/compiler/style_url_resolver", "angular2/src/render/dom/compiler/style_inliner", "./compiler/view_resolver", "./compiler/directive_resolver", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/src/core/zone/ng_zone", "angular2/src/core/life_cycle/life_cycle", "angular2/src/render/dom/shadow_dom/shadow_dom_strategy", "angular2/src/render/dom/shadow_dom/emulated_unscoped_shadow_dom_strategy", "angular2/src/render/xhr", "angular2/src/render/xhr_impl", "angular2/src/render/dom/events/event_manager", "angular2/src/render/dom/events/key_events", "angular2/src/render/dom/events/hammer_gestures", "angular2/src/core/compiler/component_url_mapper", "angular2/src/services/url_resolver", "angular2/src/services/app_root_url", "angular2/src/core/compiler/dynamic_component_loader", "angular2/src/core/testability/testability", "angular2/src/core/compiler/view_pool", "angular2/src/core/compiler/view_manager", "angular2/src/core/compiler/view_manager_utils", "angular2/src/core/compiler/view_listener", "angular2/src/core/compiler/proto_view_factory", "angular2/src/render/api", "angular2/src/render/dom/dom_renderer", "angular2/src/render/dom/compiler/compiler", "angular2/src/core/compiler/view_ref", "./application_tokens"], function($__export) {
  "use strict";
  var Injector,
      bind,
      isBlank,
      isPresent,
      assertionsEnabled,
      BrowserDomAdapter,
      DOM,
      Compiler,
      CompilerCache,
      Reflector,
      reflector,
      Parser,
      Lexer,
      ChangeDetection,
      DynamicChangeDetection,
      JitChangeDetection,
      PreGeneratedChangeDetection,
      PipeRegistry,
      defaultPipeRegistry,
      ExceptionHandler,
      ViewLoader,
      StyleUrlResolver,
      StyleInliner,
      ViewResolver,
      DirectiveResolver,
      ListWrapper,
      PromiseWrapper,
      NgZone,
      LifeCycle,
      ShadowDomStrategy,
      EmulatedUnscopedShadowDomStrategy,
      XHR,
      XHRImpl,
      EventManager,
      DomEventsPlugin,
      KeyEventsPlugin,
      HammerGesturesPlugin,
      ComponentUrlMapper,
      UrlResolver,
      AppRootUrl,
      DynamicComponentLoader,
      TestabilityRegistry,
      Testability,
      AppViewPool,
      APP_VIEW_POOL_CAPACITY,
      AppViewManager,
      AppViewManagerUtils,
      AppViewListener,
      ProtoViewFactory,
      Renderer,
      RenderCompiler,
      DomRenderer,
      DOCUMENT_TOKEN,
      DefaultDomCompiler,
      internalView,
      appComponentRefToken,
      appComponentTypeToken,
      _rootInjector,
      _rootBindings,
      ApplicationRef;
  function _injectorBindings(appComponentType) {
    var bestChangeDetection = DynamicChangeDetection;
    if (PreGeneratedChangeDetection.isSupported()) {
      bestChangeDetection = PreGeneratedChangeDetection;
    } else if (JitChangeDetection.isSupported()) {
      bestChangeDetection = JitChangeDetection;
    }
    return [bind(DOCUMENT_TOKEN).toValue(DOM.defaultDoc()), bind(appComponentTypeToken).toValue(appComponentType), bind(appComponentRefToken).toAsyncFactory(function(dynamicComponentLoader, injector, testability, registry) {
      return dynamicComponentLoader.loadAsRoot(appComponentType, null, injector).then(function(componentRef) {
        registry.registerApplication(componentRef.location.nativeElement, testability);
        return componentRef;
      });
    }, [DynamicComponentLoader, Injector, Testability, TestabilityRegistry]), bind(appComponentType).toFactory(function(ref) {
      return ref.instance;
    }, [appComponentRefToken]), bind(LifeCycle).toFactory(function(exceptionHandler) {
      return new LifeCycle(exceptionHandler, null, assertionsEnabled());
    }, [ExceptionHandler]), bind(EventManager).toFactory(function(ngZone) {
      var plugins = [new HammerGesturesPlugin(), new KeyEventsPlugin(), new DomEventsPlugin()];
      return new EventManager(plugins, ngZone);
    }, [NgZone]), bind(ShadowDomStrategy).toFactory(function(doc) {
      return new EmulatedUnscopedShadowDomStrategy(doc.head);
    }, [DOCUMENT_TOKEN]), DomRenderer, DefaultDomCompiler, bind(Renderer).toAlias(DomRenderer), bind(RenderCompiler).toAlias(DefaultDomCompiler), ProtoViewFactory, AppViewPool, bind(APP_VIEW_POOL_CAPACITY).toValue(10000), AppViewManager, AppViewManagerUtils, AppViewListener, Compiler, CompilerCache, ViewResolver, bind(PipeRegistry).toValue(defaultPipeRegistry), bind(ChangeDetection).toClass(bestChangeDetection), ViewLoader, DirectiveResolver, Parser, Lexer, ExceptionHandler, bind(XHR).toValue(new XHRImpl()), ComponentUrlMapper, UrlResolver, StyleUrlResolver, StyleInliner, DynamicComponentLoader, Testability, AppRootUrl];
  }
  function _createNgZone(givenReporter) {
    var defaultErrorReporter = function(exception, stackTrace) {
      var longStackTrace = ListWrapper.join(stackTrace, "\n\n-----async gap-----\n");
      DOM.logError((exception + "\n\n" + longStackTrace));
      throw exception;
    };
    var reporter = isPresent(givenReporter) ? givenReporter : defaultErrorReporter;
    var zone = new NgZone({enableLongStackTrace: assertionsEnabled()});
    zone.initCallbacks({onErrorHandler: reporter});
    return zone;
  }
  function bootstrap(appComponentType) {
    var componentInjectableBindings = arguments[1] !== (void 0) ? arguments[1] : null;
    var errorReporter = arguments[2] !== (void 0) ? arguments[2] : null;
    BrowserDomAdapter.makeCurrent();
    var bootstrapProcess = PromiseWrapper.completer();
    var zone = _createNgZone(errorReporter);
    zone.run(function() {
      var appInjector = _createAppInjector(appComponentType, componentInjectableBindings, zone);
      PromiseWrapper.then(appInjector.asyncGet(appComponentRefToken), function(componentRef) {
        var appChangeDetector = internalView(componentRef.hostView).changeDetector;
        var lc = appInjector.get(LifeCycle);
        lc.registerWith(zone, appChangeDetector);
        lc.tick();
        bootstrapProcess.resolve(new ApplicationRef(componentRef, appComponentType, appInjector));
      }, function(err, stackTrace) {
        bootstrapProcess.reject(err, stackTrace);
      });
    });
    return bootstrapProcess.promise;
  }
  function _createAppInjector(appComponentType, bindings, zone) {
    if (isBlank(_rootInjector))
      _rootInjector = Injector.resolveAndCreate(_rootBindings);
    var mergedBindings = isPresent(bindings) ? ListWrapper.concat(_injectorBindings(appComponentType), bindings) : _injectorBindings(appComponentType);
    mergedBindings.push(bind(NgZone).toValue(zone));
    return _rootInjector.resolveAndCreateChild(mergedBindings);
  }
  $__export("bootstrap", bootstrap);
  return {
    setters: [function($__m) {
      Injector = $__m.Injector;
      bind = $__m.bind;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      assertionsEnabled = $__m.assertionsEnabled;
    }, function($__m) {
      BrowserDomAdapter = $__m.BrowserDomAdapter;
    }, function($__m) {
      DOM = $__m.DOM;
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
      JitChangeDetection = $__m.JitChangeDetection;
      PreGeneratedChangeDetection = $__m.PreGeneratedChangeDetection;
      PipeRegistry = $__m.PipeRegistry;
      defaultPipeRegistry = $__m.defaultPipeRegistry;
    }, function($__m) {
      ExceptionHandler = $__m.ExceptionHandler;
    }, function($__m) {
      ViewLoader = $__m.ViewLoader;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
    }, function($__m) {
      StyleInliner = $__m.StyleInliner;
    }, function($__m) {
      ViewResolver = $__m.ViewResolver;
    }, function($__m) {
      DirectiveResolver = $__m.DirectiveResolver;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      NgZone = $__m.NgZone;
    }, function($__m) {
      LifeCycle = $__m.LifeCycle;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }, function($__m) {
      EmulatedUnscopedShadowDomStrategy = $__m.EmulatedUnscopedShadowDomStrategy;
    }, function($__m) {
      XHR = $__m.XHR;
    }, function($__m) {
      XHRImpl = $__m.XHRImpl;
    }, function($__m) {
      EventManager = $__m.EventManager;
      DomEventsPlugin = $__m.DomEventsPlugin;
    }, function($__m) {
      KeyEventsPlugin = $__m.KeyEventsPlugin;
    }, function($__m) {
      HammerGesturesPlugin = $__m.HammerGesturesPlugin;
    }, function($__m) {
      ComponentUrlMapper = $__m.ComponentUrlMapper;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      AppRootUrl = $__m.AppRootUrl;
    }, function($__m) {
      DynamicComponentLoader = $__m.DynamicComponentLoader;
    }, function($__m) {
      TestabilityRegistry = $__m.TestabilityRegistry;
      Testability = $__m.Testability;
    }, function($__m) {
      AppViewPool = $__m.AppViewPool;
      APP_VIEW_POOL_CAPACITY = $__m.APP_VIEW_POOL_CAPACITY;
    }, function($__m) {
      AppViewManager = $__m.AppViewManager;
    }, function($__m) {
      AppViewManagerUtils = $__m.AppViewManagerUtils;
    }, function($__m) {
      AppViewListener = $__m.AppViewListener;
    }, function($__m) {
      ProtoViewFactory = $__m.ProtoViewFactory;
    }, function($__m) {
      Renderer = $__m.Renderer;
      RenderCompiler = $__m.RenderCompiler;
    }, function($__m) {
      DomRenderer = $__m.DomRenderer;
      DOCUMENT_TOKEN = $__m.DOCUMENT_TOKEN;
    }, function($__m) {
      DefaultDomCompiler = $__m.DefaultDomCompiler;
    }, function($__m) {
      internalView = $__m.internalView;
    }, function($__m) {
      appComponentRefToken = $__m.appComponentRefToken;
      appComponentTypeToken = $__m.appComponentTypeToken;
    }],
    execute: function() {
      _rootBindings = [bind(Reflector).toValue(reflector), TestabilityRegistry];
      ApplicationRef = function() {
        function ApplicationRef(hostComponent, hostComponentType, injector) {
          this._hostComponent = hostComponent;
          this._injector = injector;
          this._hostComponentType = hostComponentType;
        }
        return ($traceurRuntime.createClass)(ApplicationRef, {
          get hostComponentType() {
            return this._hostComponentType;
          },
          get hostComponent() {
            return this._hostComponent.instance;
          },
          dispose: function() {
            return this._hostComponent.dispose();
          },
          get injector() {
            return this._injector;
          }
        }, {});
      }();
      $__export("ApplicationRef", ApplicationRef);
    }
  };
});
//# sourceMappingURL=application.js.map

//# sourceMappingURL=../../src/core/application.js.map