System.register(["angular2/di", "angular2/src/facade/lang", "./view_ref", "angular2/src/render/api", "./view_manager_utils", "./view_pool", "./view_listener"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      isPresent,
      isBlank,
      BaseException,
      internalView,
      internalProtoView,
      Renderer,
      AppViewManagerUtils,
      AppViewPool,
      AppViewListener,
      AppViewManager;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
    }, function($__m) {
      internalView = $__m.internalView;
      internalProtoView = $__m.internalProtoView;
    }, function($__m) {
      Renderer = $__m.Renderer;
    }, function($__m) {
      AppViewManagerUtils = $__m.AppViewManagerUtils;
    }, function($__m) {
      AppViewPool = $__m.AppViewPool;
    }, function($__m) {
      AppViewListener = $__m.AppViewListener;
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
      AppViewManager = ($traceurRuntime.createClass)(function(_viewPool, _viewListener, _utils, _renderer) {
        this._viewPool = _viewPool;
        this._viewListener = _viewListener;
        this._utils = _utils;
        this._renderer = _renderer;
      }, {
        getComponentView: function(hostLocation) {
          var hostView = internalView(hostLocation.parentView);
          var boundElementIndex = hostLocation.boundElementIndex;
          return hostView.componentChildViews[boundElementIndex].ref;
        },
        getViewContainer: function(location) {
          var hostView = internalView(location.parentView);
          return hostView.elementInjectors[location.boundElementIndex].getViewContainerRef();
        },
        getHostElement: function(hostViewRef) {
          return internalView(hostViewRef).elementRefs[0];
        },
        getNamedElementInComponentView: function(hostLocation, variableName) {
          var hostView = internalView(hostLocation.parentView);
          var boundElementIndex = hostLocation.boundElementIndex;
          var componentView = hostView.componentChildViews[boundElementIndex];
          if (isBlank(componentView)) {
            throw new BaseException(("There is no component directive at element " + boundElementIndex));
          }
          var elementIndex = componentView.proto.variableLocations.get(variableName);
          if (isBlank(elementIndex)) {
            throw new BaseException(("Could not find variable " + variableName));
          }
          return componentView.elementRefs[elementIndex];
        },
        getComponent: function(hostLocation) {
          var hostView = internalView(hostLocation.parentView);
          var boundElementIndex = hostLocation.boundElementIndex;
          return this._utils.getComponentInstance(hostView, boundElementIndex);
        },
        createRootHostView: function(hostProtoViewRef, overrideSelector, injector) {
          var hostProtoView = internalProtoView(hostProtoViewRef);
          var hostElementSelector = overrideSelector;
          if (isBlank(hostElementSelector)) {
            hostElementSelector = hostProtoView.elementBinders[0].componentDirective.metadata.selector;
          }
          var renderView = this._renderer.createRootHostView(hostProtoView.render, hostElementSelector);
          var hostView = this._utils.createView(hostProtoView, renderView, this, this._renderer);
          this._renderer.setEventDispatcher(hostView.render, hostView);
          this._createViewRecurse(hostView);
          this._viewListener.viewCreated(hostView);
          this._utils.hydrateRootHostView(hostView, injector);
          this._viewHydrateRecurse(hostView);
          return hostView.ref;
        },
        destroyRootHostView: function(hostViewRef) {
          var hostView = internalView(hostViewRef);
          this._viewDehydrateRecurse(hostView, true);
          this._renderer.destroyView(hostView.render);
          this._viewListener.viewDestroyed(hostView);
        },
        createViewInContainer: function(viewContainerLocation, atIndex, protoViewRef) {
          var context = arguments[3] !== (void 0) ? arguments[3] : null;
          var injector = arguments[4] !== (void 0) ? arguments[4] : null;
          var protoView = internalProtoView(protoViewRef);
          var parentView = internalView(viewContainerLocation.parentView);
          var boundElementIndex = viewContainerLocation.boundElementIndex;
          var contextView = null;
          var contextBoundElementIndex = null;
          if (isPresent(context)) {
            contextView = internalView(context.parentView);
            contextBoundElementIndex = context.boundElementIndex;
          }
          var view = this._createPooledView(protoView);
          this._renderer.attachViewInContainer(viewContainerLocation, atIndex, view.render);
          this._utils.attachViewInContainer(parentView, boundElementIndex, contextView, contextBoundElementIndex, atIndex, view);
          this._utils.hydrateViewInContainer(parentView, boundElementIndex, contextView, contextBoundElementIndex, atIndex, injector);
          this._viewHydrateRecurse(view);
          return view.ref;
        },
        destroyViewInContainer: function(viewContainerLocation, atIndex) {
          var parentView = internalView(viewContainerLocation.parentView);
          var boundElementIndex = viewContainerLocation.boundElementIndex;
          this._destroyViewInContainer(parentView, boundElementIndex, atIndex);
        },
        attachViewInContainer: function(viewContainerLocation, atIndex, viewRef) {
          var view = internalView(viewRef);
          var parentView = internalView(viewContainerLocation.parentView);
          var boundElementIndex = viewContainerLocation.boundElementIndex;
          this._utils.attachViewInContainer(parentView, boundElementIndex, null, null, atIndex, view);
          this._renderer.attachViewInContainer(viewContainerLocation, atIndex, view.render);
          return viewRef;
        },
        detachViewInContainer: function(viewContainerLocation, atIndex) {
          var parentView = internalView(viewContainerLocation.parentView);
          var boundElementIndex = viewContainerLocation.boundElementIndex;
          var viewContainer = parentView.viewContainers[boundElementIndex];
          var view = viewContainer.views[atIndex];
          this._utils.detachViewInContainer(parentView, boundElementIndex, atIndex);
          this._renderer.detachViewInContainer(viewContainerLocation, atIndex, view.render);
          return view.ref;
        },
        _createPooledView: function(protoView) {
          var view = this._viewPool.getView(protoView);
          if (isBlank(view)) {
            view = this._utils.createView(protoView, this._renderer.createView(protoView.render), this, this._renderer);
            this._renderer.setEventDispatcher(view.render, view);
            this._createViewRecurse(view);
            this._viewListener.viewCreated(view);
          }
          return view;
        },
        _createViewRecurse: function(view) {
          var binders = view.proto.elementBinders;
          for (var binderIdx = 0; binderIdx < binders.length; binderIdx++) {
            var binder = binders[binderIdx];
            if (binder.hasStaticComponent()) {
              var childView = this._createPooledView(binder.nestedProtoView);
              this._renderer.attachComponentView(view.elementRefs[binderIdx], childView.render);
              this._utils.attachComponentView(view, binderIdx, childView);
            }
          }
        },
        _destroyPooledView: function(view) {
          var wasReturned = this._viewPool.returnView(view);
          if (!wasReturned) {
            this._renderer.destroyView(view.render);
            this._viewListener.viewDestroyed(view);
          }
        },
        _destroyViewInContainer: function(parentView, boundElementIndex, atIndex) {
          var viewContainer = parentView.viewContainers[boundElementIndex];
          var view = viewContainer.views[atIndex];
          this._viewDehydrateRecurse(view, false);
          this._utils.detachViewInContainer(parentView, boundElementIndex, atIndex);
          this._renderer.detachViewInContainer(parentView.elementRefs[boundElementIndex], atIndex, view.render);
          this._destroyPooledView(view);
        },
        _destroyComponentView: function(hostView, boundElementIndex, componentView) {
          this._viewDehydrateRecurse(componentView, false);
          this._renderer.detachComponentView(hostView.elementRefs[boundElementIndex], componentView.render);
          this._utils.detachComponentView(hostView, boundElementIndex);
          this._destroyPooledView(componentView);
        },
        _viewHydrateRecurse: function(view) {
          this._renderer.hydrateView(view.render);
          var binders = view.proto.elementBinders;
          for (var i = 0; i < binders.length; ++i) {
            if (binders[i].hasStaticComponent()) {
              this._utils.hydrateComponentView(view, i);
              this._viewHydrateRecurse(view.componentChildViews[i]);
            }
          }
        },
        _viewDehydrateRecurse: function(view, forceDestroyComponents) {
          this._utils.dehydrateView(view);
          this._renderer.dehydrateView(view.render);
          var binders = view.proto.elementBinders;
          for (var i = 0; i < binders.length; i++) {
            var componentView = view.componentChildViews[i];
            if (isPresent(componentView)) {
              if (forceDestroyComponents) {
                this._destroyComponentView(view, i, componentView);
              } else {
                this._viewDehydrateRecurse(componentView, false);
              }
            }
            var vc = view.viewContainers[i];
            if (isPresent(vc)) {
              for (var j = vc.views.length - 1; j >= 0; j--) {
                this._destroyViewInContainer(view, i, j);
              }
            }
          }
        }
      }, {});
      $__export("AppViewManager", AppViewManager);
      $__export("AppViewManager", AppViewManager = __decorate([Injectable(), __metadata('design:paramtypes', [AppViewPool, AppViewListener, AppViewManagerUtils, Renderer])], AppViewManager));
    }
  };
});
//# sourceMappingURL=view_manager.js.map

//# sourceMappingURL=../../../src/core/compiler/view_manager.js.map