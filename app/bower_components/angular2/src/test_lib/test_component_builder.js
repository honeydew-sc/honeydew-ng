System.register(["angular2/di", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/core/compiler/view_resolver", "angular2/src/core/compiler/view_ref", "angular2/src/core/compiler/dynamic_component_loader", "./utils", "angular2/src/render/dom/dom_renderer", "angular2/src/dom/dom_adapter", "angular2/src/debug/debug_element"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injector,
      Injectable,
      isPresent,
      MapWrapper,
      ViewResolver,
      internalView,
      DynamicComponentLoader,
      el,
      DOCUMENT_TOKEN,
      DOM,
      DebugElement,
      RootTestComponent,
      _nextRootElementId,
      TestComponentBuilder;
  return {
    setters: [function($__m) {
      Injector = $__m.Injector;
      Injectable = $__m.Injectable;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      ViewResolver = $__m.ViewResolver;
    }, function($__m) {
      internalView = $__m.internalView;
    }, function($__m) {
      DynamicComponentLoader = $__m.DynamicComponentLoader;
    }, function($__m) {
      el = $__m.el;
    }, function($__m) {
      DOCUMENT_TOKEN = $__m.DOCUMENT_TOKEN;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      DebugElement = $__m.DebugElement;
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
      RootTestComponent = function($__super) {
        function RootTestComponent(componentRef) {
          $traceurRuntime.superConstructor(RootTestComponent).call(this, internalView(componentRef.hostView), 0);
          this._componentParentView = internalView(componentRef.hostView);
          this._componentRef = componentRef;
        }
        return ($traceurRuntime.createClass)(RootTestComponent, {
          detectChanges: function() {
            this._componentParentView.changeDetector.detectChanges();
            this._componentParentView.changeDetector.checkNoChanges();
          },
          destroy: function() {
            this._componentRef.dispose();
          }
        }, {}, $__super);
      }(DebugElement);
      $__export("RootTestComponent", RootTestComponent);
      _nextRootElementId = 0;
      TestComponentBuilder = ($traceurRuntime.createClass)(function(injector) {
        this._injector = injector;
        this._viewOverrides = new Map();
        this._directiveOverrides = new Map();
        this._templateOverrides = new Map();
      }, {
        _clone: function() {
          var clone = new TestComponentBuilder(this._injector);
          clone._viewOverrides = MapWrapper.clone(this._viewOverrides);
          clone._directiveOverrides = MapWrapper.clone(this._directiveOverrides);
          clone._templateOverrides = MapWrapper.clone(this._templateOverrides);
          return clone;
        },
        overrideTemplate: function(componentType, template) {
          var clone = this._clone();
          clone._templateOverrides.set(componentType, template);
          return clone;
        },
        overrideView: function(componentType, view) {
          var clone = this._clone();
          clone._viewOverrides.set(componentType, view);
          return clone;
        },
        overrideDirective: function(componentType, from, to) {
          var clone = this._clone();
          var overridesForComponent = clone._directiveOverrides.get(componentType);
          if (!isPresent(overridesForComponent)) {
            clone._directiveOverrides.set(componentType, new Map());
            overridesForComponent = clone._directiveOverrides.get(componentType);
          }
          overridesForComponent.set(from, to);
          return clone;
        },
        createAsync: function(rootComponentType) {
          var mockViewResolver = this._injector.get(ViewResolver);
          MapWrapper.forEach(this._viewOverrides, function(view, type) {
            mockViewResolver.setView(type, view);
          });
          MapWrapper.forEach(this._templateOverrides, function(template, type) {
            mockViewResolver.setInlineTemplate(type, template);
          });
          MapWrapper.forEach(this._directiveOverrides, function(overrides, component) {
            MapWrapper.forEach(overrides, function(to, from) {
              mockViewResolver.overrideViewDirective(component, from, to);
            });
          });
          var rootElId = ("root" + _nextRootElementId++);
          var rootEl = el(("<div id=\"" + rootElId + "\"></div>"));
          var doc = this._injector.get(DOCUMENT_TOKEN);
          DOM.appendChild(doc.body, rootEl);
          return this._injector.get(DynamicComponentLoader).loadAsRoot(rootComponentType, ("#" + rootElId), this._injector).then(function(componentRef) {
            return new RootTestComponent(componentRef);
          });
        }
      }, {});
      $__export("TestComponentBuilder", TestComponentBuilder);
      $__export("TestComponentBuilder", TestComponentBuilder = __decorate([Injectable(), __metadata('design:paramtypes', [Injector])], TestComponentBuilder));
    }
  };
});
//# sourceMappingURL=test_component_builder.js.map

//# sourceMappingURL=../../src/test_lib/test_component_builder.js.map