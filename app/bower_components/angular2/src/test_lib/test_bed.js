System.register(["angular2/di", "angular2/src/facade/lang", "angular2/src/core/compiler/view_resolver", "angular2/src/core/compiler/view_ref", "angular2/src/core/compiler/dynamic_component_loader", "./utils", "./lang_utils", "angular2/src/render/dom/dom_renderer", "angular2/src/dom/dom_adapter"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injector,
      bind,
      Injectable,
      isPresent,
      BaseException,
      isBlank,
      ViewResolver,
      internalView,
      DynamicComponentLoader,
      queryView,
      viewRootNodes,
      el,
      instantiateType,
      getTypeOf,
      DOCUMENT_TOKEN,
      DOM,
      TestBed,
      ViewProxy;
  return {
    setters: [function($__m) {
      Injector = $__m.Injector;
      bind = $__m.bind;
      Injectable = $__m.Injectable;
    }, function($__m) {
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      isBlank = $__m.isBlank;
    }, function($__m) {
      ViewResolver = $__m.ViewResolver;
    }, function($__m) {
      internalView = $__m.internalView;
    }, function($__m) {
      DynamicComponentLoader = $__m.DynamicComponentLoader;
    }, function($__m) {
      queryView = $__m.queryView;
      viewRootNodes = $__m.viewRootNodes;
      el = $__m.el;
    }, function($__m) {
      instantiateType = $__m.instantiateType;
      getTypeOf = $__m.getTypeOf;
    }, function($__m) {
      DOCUMENT_TOKEN = $__m.DOCUMENT_TOKEN;
    }, function($__m) {
      DOM = $__m.DOM;
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
      TestBed = ($traceurRuntime.createClass)(function(injector) {
        this._injector = injector;
      }, {
        overrideView: function(component, view) {
          this._injector.get(ViewResolver).setView(component, view);
        },
        setInlineTemplate: function(component, html) {
          this._injector.get(ViewResolver).setInlineTemplate(component, html);
        },
        overrideDirective: function(component, from, to) {
          this._injector.get(ViewResolver).overrideViewDirective(component, from, to);
        },
        createView: function(component) {
          var $__3,
              $__4;
          var $__2 = arguments[1] !== (void 0) ? arguments[1] : {},
              context = ($__3 = $__2.context) === void 0 ? null : $__3,
              html = ($__4 = $__2.html) === void 0 ? null : $__4;
          if (isBlank(component) && isBlank(context)) {
            throw new BaseException('You must specified at least a component or a context');
          }
          if (isBlank(component)) {
            component = getTypeOf(context);
          } else if (isBlank(context)) {
            context = instantiateType(component);
          }
          if (isPresent(html)) {
            this.setInlineTemplate(component, html);
          }
          var doc = this._injector.get(DOCUMENT_TOKEN);
          var rootEl = el('<div id="root"></div>');
          DOM.appendChild(doc.body, rootEl);
          var componentBinding = bind(component).toValue(context);
          return this._injector.get(DynamicComponentLoader).loadAsRoot(componentBinding, '#root', this._injector).then(function(hostComponentRef) {
            return new ViewProxy(hostComponentRef);
          });
        }
      }, {});
      $__export("TestBed", TestBed);
      $__export("TestBed", TestBed = __decorate([Injectable(), __metadata('design:paramtypes', [Injector])], TestBed));
      ViewProxy = function() {
        function ViewProxy(componentRef) {
          this._componentRef = componentRef;
          this._view = internalView(componentRef.hostView).componentChildViews[0];
        }
        return ($traceurRuntime.createClass)(ViewProxy, {
          get context() {
            return this._view.context;
          },
          get rootNodes() {
            return viewRootNodes(this._view);
          },
          detectChanges: function() {
            this._view.changeDetector.detectChanges();
            this._view.changeDetector.checkNoChanges();
          },
          querySelector: function(selector) {
            return queryView(this._view, selector);
          },
          destroy: function() {
            this._componentRef.dispose();
          },
          get rawView() {
            return this._view;
          }
        }, {});
      }();
      $__export("ViewProxy", ViewProxy);
    }
  };
});
//# sourceMappingURL=test_bed.js.map

//# sourceMappingURL=../../src/test_lib/test_bed.js.map