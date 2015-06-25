System.register(["angular2/di", "angular2/src/facade/collection", "./element_injector", "angular2/src/facade/lang", "./view"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      ListWrapper,
      MapWrapper,
      eli,
      isPresent,
      isBlank,
      viewModule,
      AppViewManagerUtils;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      eli = $__m;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }, function($__m) {
      viewModule = $__m;
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
      AppViewManagerUtils = ($traceurRuntime.createClass)(function() {}, {
        getComponentInstance: function(parentView, boundElementIndex) {
          var eli = parentView.elementInjectors[boundElementIndex];
          return eli.getComponent();
        },
        createView: function(protoView, renderView, viewManager, renderer) {
          var view = new viewModule.AppView(renderer, protoView, protoView.protoLocals);
          view.render = renderView;
          var changeDetector = protoView.protoChangeDetector.instantiate(view);
          var binders = protoView.elementBinders;
          var elementInjectors = ListWrapper.createFixedSize(binders.length);
          var rootElementInjectors = [];
          var preBuiltObjects = ListWrapper.createFixedSize(binders.length);
          var componentChildViews = ListWrapper.createFixedSize(binders.length);
          for (var binderIdx = 0; binderIdx < binders.length; binderIdx++) {
            var binder = binders[binderIdx];
            var elementInjector = null;
            var protoElementInjector = binder.protoElementInjector;
            if (isPresent(protoElementInjector)) {
              if (isPresent(protoElementInjector.parent)) {
                var parentElementInjector = elementInjectors[protoElementInjector.parent.index];
                elementInjector = protoElementInjector.instantiate(parentElementInjector);
              } else {
                elementInjector = protoElementInjector.instantiate(null);
                rootElementInjectors.push(elementInjector);
              }
            }
            elementInjectors[binderIdx] = elementInjector;
            if (isPresent(elementInjector)) {
              var embeddedProtoView = binder.hasEmbeddedProtoView() ? binder.nestedProtoView : null;
              preBuiltObjects[binderIdx] = new eli.PreBuiltObjects(viewManager, view, embeddedProtoView);
            }
          }
          view.init(changeDetector, elementInjectors, rootElementInjectors, preBuiltObjects, componentChildViews);
          return view;
        },
        attachComponentView: function(hostView, boundElementIndex, componentView) {
          var childChangeDetector = componentView.changeDetector;
          hostView.changeDetector.addShadowDomChild(childChangeDetector);
          hostView.componentChildViews[boundElementIndex] = componentView;
        },
        detachComponentView: function(hostView, boundElementIndex) {
          var componentView = hostView.componentChildViews[boundElementIndex];
          hostView.changeDetector.removeShadowDomChild(componentView.changeDetector);
          hostView.componentChildViews[boundElementIndex] = null;
        },
        hydrateComponentView: function(hostView, boundElementIndex) {
          var injector = arguments[2] !== (void 0) ? arguments[2] : null;
          var elementInjector = hostView.elementInjectors[boundElementIndex];
          var componentView = hostView.componentChildViews[boundElementIndex];
          var component = this.getComponentInstance(hostView, boundElementIndex);
          this._hydrateView(componentView, injector, elementInjector, component, null);
        },
        hydrateRootHostView: function(hostView) {
          var injector = arguments[1] !== (void 0) ? arguments[1] : null;
          this._hydrateView(hostView, injector, null, new Object(), null);
        },
        attachViewInContainer: function(parentView, boundElementIndex, contextView, contextBoundElementIndex, atIndex, view) {
          if (isBlank(contextView)) {
            contextView = parentView;
            contextBoundElementIndex = boundElementIndex;
          }
          parentView.changeDetector.addChild(view.changeDetector);
          var viewContainer = this._getOrCreateViewContainer(parentView, boundElementIndex);
          ListWrapper.insert(viewContainer.views, atIndex, view);
          var sibling;
          if (atIndex == 0) {
            sibling = null;
          } else {
            sibling = ListWrapper.last(viewContainer.views[atIndex - 1].rootElementInjectors);
          }
          var elementInjector = contextView.elementInjectors[contextBoundElementIndex];
          for (var i = view.rootElementInjectors.length - 1; i >= 0; i--) {
            if (isPresent(elementInjector.parent)) {
              view.rootElementInjectors[i].linkAfter(elementInjector.parent, sibling);
            } else {
              contextView.rootElementInjectors.push(view.rootElementInjectors[i]);
            }
          }
        },
        detachViewInContainer: function(parentView, boundElementIndex, atIndex) {
          var viewContainer = parentView.viewContainers[boundElementIndex];
          var view = viewContainer.views[atIndex];
          view.changeDetector.remove();
          ListWrapper.removeAt(viewContainer.views, atIndex);
          for (var i = 0; i < view.rootElementInjectors.length; ++i) {
            var inj = view.rootElementInjectors[i];
            if (isPresent(inj.parent)) {
              inj.unlink();
            } else {
              var removeIdx = ListWrapper.indexOf(parentView.rootElementInjectors, inj);
              ListWrapper.removeAt(parentView.rootElementInjectors, removeIdx);
            }
          }
        },
        hydrateViewInContainer: function(parentView, boundElementIndex, contextView, contextBoundElementIndex, atIndex, injector) {
          if (isBlank(contextView)) {
            contextView = parentView;
            contextBoundElementIndex = boundElementIndex;
          }
          var viewContainer = parentView.viewContainers[boundElementIndex];
          var view = viewContainer.views[atIndex];
          var elementInjector = contextView.elementInjectors[contextBoundElementIndex];
          if (isBlank(elementInjector.getHost()) && isBlank(injector)) {
            injector = elementInjector.getShadowDomAppInjector();
          }
          this._hydrateView(view, injector, elementInjector.getHost(), contextView.context, contextView.locals);
        },
        _hydrateView: function(view, appInjector, hostElementInjector, context, parentLocals) {
          if (isBlank(appInjector)) {
            appInjector = hostElementInjector.getShadowDomAppInjector();
          }
          if (isBlank(appInjector)) {
            appInjector = hostElementInjector.getLightDomAppInjector();
          }
          view.context = context;
          view.locals.parent = parentLocals;
          var binders = view.proto.elementBinders;
          for (var i = 0; i < binders.length; ++i) {
            var elementInjector = view.elementInjectors[i];
            if (isPresent(elementInjector)) {
              elementInjector.hydrate(appInjector, hostElementInjector, view.preBuiltObjects[i]);
              this._populateViewLocals(view, elementInjector);
              this._setUpEventEmitters(view, elementInjector, i);
              this._setUpHostActions(view, elementInjector, i);
            }
          }
          view.changeDetector.hydrate(view.context, view.locals, view);
        },
        _populateViewLocals: function(view, elementInjector) {
          if (isPresent(elementInjector.getDirectiveVariableBindings())) {
            MapWrapper.forEach(elementInjector.getDirectiveVariableBindings(), function(directiveIndex, name) {
              if (isBlank(directiveIndex)) {
                view.locals.set(name, elementInjector.getElementRef().nativeElement);
              } else {
                view.locals.set(name, elementInjector.getDirectiveAtIndex(directiveIndex));
              }
            });
          }
        },
        _getOrCreateViewContainer: function(parentView, boundElementIndex) {
          var viewContainer = parentView.viewContainers[boundElementIndex];
          if (isBlank(viewContainer)) {
            viewContainer = new viewModule.AppViewContainer();
            parentView.viewContainers[boundElementIndex] = viewContainer;
          }
          return viewContainer;
        },
        _setUpEventEmitters: function(view, elementInjector, boundElementIndex) {
          var emitters = elementInjector.getEventEmitterAccessors();
          for (var directiveIndex = 0; directiveIndex < emitters.length; ++directiveIndex) {
            var directiveEmitters = emitters[directiveIndex];
            var directive = elementInjector.getDirectiveAtIndex(directiveIndex);
            for (var eventIndex = 0; eventIndex < directiveEmitters.length; ++eventIndex) {
              var eventEmitterAccessor = directiveEmitters[eventIndex];
              eventEmitterAccessor.subscribe(view, boundElementIndex, directive);
            }
          }
        },
        _setUpHostActions: function(view, elementInjector, boundElementIndex) {
          var hostActions = elementInjector.getHostActionAccessors();
          for (var directiveIndex = 0; directiveIndex < hostActions.length; ++directiveIndex) {
            var directiveHostActions = hostActions[directiveIndex];
            var directive = elementInjector.getDirectiveAtIndex(directiveIndex);
            for (var index = 0; index < directiveHostActions.length; ++index) {
              var hostActionAccessor = directiveHostActions[index];
              hostActionAccessor.subscribe(view, boundElementIndex, directive);
            }
          }
        },
        dehydrateView: function(view) {
          var binders = view.proto.elementBinders;
          for (var i = 0; i < binders.length; ++i) {
            var elementInjector = view.elementInjectors[i];
            if (isPresent(elementInjector)) {
              elementInjector.dehydrate();
            }
          }
          if (isPresent(view.locals)) {
            view.locals.clearValues();
          }
          view.context = null;
          view.changeDetector.dehydrate();
        }
      }, {});
      $__export("AppViewManagerUtils", AppViewManagerUtils);
      $__export("AppViewManagerUtils", AppViewManagerUtils = __decorate([Injectable(), __metadata('design:paramtypes', [])], AppViewManagerUtils));
    }
  };
});
//# sourceMappingURL=view_manager_utils.js.map

//# sourceMappingURL=../../../src/core/compiler/view_manager_utils.js.map