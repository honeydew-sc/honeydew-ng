System.register(["angular2/di", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/dom/dom_adapter", "./shadow_dom/content_tag", "./shadow_dom/shadow_dom_strategy", "./events/event_manager", "./view/proto_view", "./view/view", "./view/element", "./view/view_container", "./util", "../api"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      __param,
      Inject,
      Injectable,
      OpaqueToken,
      isPresent,
      isBlank,
      BaseException,
      CONST_EXPR,
      ListWrapper,
      DOM,
      Content,
      ShadowDomStrategy,
      EventManager,
      resolveInternalDomProtoView,
      DomView,
      DomViewRef,
      resolveInternalDomView,
      DomElement,
      DomViewContainer,
      NG_BINDING_CLASS_SELECTOR,
      NG_BINDING_CLASS,
      Renderer,
      DOCUMENT_TOKEN,
      DomRenderer;
  return {
    setters: [function($__m) {
      Inject = $__m.Inject;
      Injectable = $__m.Injectable;
      OpaqueToken = $__m.OpaqueToken;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
      CONST_EXPR = $__m.CONST_EXPR;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Content = $__m.Content;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }, function($__m) {
      EventManager = $__m.EventManager;
    }, function($__m) {
      resolveInternalDomProtoView = $__m.resolveInternalDomProtoView;
    }, function($__m) {
      DomView = $__m.DomView;
      DomViewRef = $__m.DomViewRef;
      resolveInternalDomView = $__m.resolveInternalDomView;
    }, function($__m) {
      DomElement = $__m.DomElement;
    }, function($__m) {
      DomViewContainer = $__m.DomViewContainer;
    }, function($__m) {
      NG_BINDING_CLASS_SELECTOR = $__m.NG_BINDING_CLASS_SELECTOR;
      NG_BINDING_CLASS = $__m.NG_BINDING_CLASS;
    }, function($__m) {
      Renderer = $__m.Renderer;
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
      __param = (this && this.__param) || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      DOCUMENT_TOKEN = CONST_EXPR(new OpaqueToken('DocumentToken'));
      $__export("DOCUMENT_TOKEN", DOCUMENT_TOKEN);
      DomRenderer = function($__super) {
        function $__0(_eventManager, _shadowDomStrategy, document) {
          $traceurRuntime.superConstructor($__0).call(this);
          this._eventManager = _eventManager;
          this._shadowDomStrategy = _shadowDomStrategy;
          this._document = document;
        }
        return ($traceurRuntime.createClass)($__0, {
          createRootHostView: function(hostProtoViewRef, hostElementSelector) {
            var hostProtoView = resolveInternalDomProtoView(hostProtoViewRef);
            var element = DOM.querySelector(this._document, hostElementSelector);
            if (isBlank(element)) {
              throw new BaseException(("The selector \"" + hostElementSelector + "\" did not match any elements"));
            }
            return new DomViewRef(this._createView(hostProtoView, element));
          },
          createView: function(protoViewRef) {
            var protoView = resolveInternalDomProtoView(protoViewRef);
            return new DomViewRef(this._createView(protoView, null));
          },
          destroyView: function(view) {},
          getNativeElementSync: function(location) {
            return resolveInternalDomView(location.renderView).boundElements[location.boundElementIndex].element;
          },
          attachComponentView: function(location, componentViewRef) {
            var hostView = resolveInternalDomView(location.renderView);
            var componentView = resolveInternalDomView(componentViewRef);
            var element = hostView.boundElements[location.boundElementIndex].element;
            var lightDom = hostView.boundElements[location.boundElementIndex].lightDom;
            if (isPresent(lightDom)) {
              lightDom.attachShadowDomView(componentView);
            }
            var shadowRoot = this._shadowDomStrategy.prepareShadowRoot(element);
            this._moveViewNodesIntoParent(shadowRoot, componentView);
            componentView.hostLightDom = lightDom;
            componentView.shadowRoot = shadowRoot;
          },
          setComponentViewRootNodes: function(componentViewRef, rootNodes) {
            var componentView = resolveInternalDomView(componentViewRef);
            this._removeViewNodes(componentView);
            componentView.rootNodes = rootNodes;
            this._moveViewNodesIntoParent(componentView.shadowRoot, componentView);
          },
          getRootNodes: function(viewRef) {
            return resolveInternalDomView(viewRef).rootNodes;
          },
          detachComponentView: function(location, componentViewRef) {
            var hostView = resolveInternalDomView(location.renderView);
            var componentView = resolveInternalDomView(componentViewRef);
            this._removeViewNodes(componentView);
            var lightDom = hostView.boundElements[location.boundElementIndex].lightDom;
            if (isPresent(lightDom)) {
              lightDom.detachShadowDomView();
            }
            componentView.hostLightDom = null;
            componentView.shadowRoot = null;
          },
          attachViewInContainer: function(location, atIndex, viewRef) {
            var parentView = resolveInternalDomView(location.renderView);
            var view = resolveInternalDomView(viewRef);
            var viewContainer = this._getOrCreateViewContainer(parentView, location.boundElementIndex);
            ListWrapper.insert(viewContainer.views, atIndex, view);
            view.hostLightDom = parentView.hostLightDom;
            var directParentLightDom = this._directParentLightDom(parentView, location.boundElementIndex);
            if (isBlank(directParentLightDom)) {
              var siblingToInsertAfter;
              if (atIndex == 0) {
                siblingToInsertAfter = parentView.boundElements[location.boundElementIndex].element;
              } else {
                siblingToInsertAfter = ListWrapper.last(viewContainer.views[atIndex - 1].rootNodes);
              }
              this._moveViewNodesAfterSibling(siblingToInsertAfter, view);
            } else {
              directParentLightDom.redistribute();
            }
            if (isPresent(parentView.hostLightDom)) {
              parentView.hostLightDom.redistribute();
            }
          },
          detachViewInContainer: function(location, atIndex, viewRef) {
            var parentView = resolveInternalDomView(location.renderView);
            var view = resolveInternalDomView(viewRef);
            var viewContainer = parentView.boundElements[location.boundElementIndex].viewContainer;
            var detachedView = viewContainer.views[atIndex];
            ListWrapper.removeAt(viewContainer.views, atIndex);
            var directParentLightDom = this._directParentLightDom(parentView, location.boundElementIndex);
            if (isBlank(directParentLightDom)) {
              this._removeViewNodes(detachedView);
            } else {
              directParentLightDom.redistribute();
            }
            view.hostLightDom = null;
            if (isPresent(parentView.hostLightDom)) {
              parentView.hostLightDom.redistribute();
            }
          },
          hydrateView: function(viewRef) {
            var view = resolveInternalDomView(viewRef);
            if (view.hydrated)
              throw new BaseException('The view is already hydrated.');
            view.hydrated = true;
            for (var i = 0; i < view.boundElements.length; ++i) {
              var lightDom = view.boundElements[i].lightDom;
              if (isPresent(lightDom)) {
                lightDom.redistribute();
              }
            }
            view.eventHandlerRemovers = [];
            var binders = view.proto.elementBinders;
            for (var binderIdx = 0; binderIdx < binders.length; binderIdx++) {
              var binder = binders[binderIdx];
              if (isPresent(binder.globalEvents)) {
                for (var i = 0; i < binder.globalEvents.length; i++) {
                  var globalEvent = binder.globalEvents[i];
                  var remover = this._createGlobalEventListener(view, binderIdx, globalEvent.name, globalEvent.target, globalEvent.fullName);
                  view.eventHandlerRemovers.push(remover);
                }
              }
            }
            if (isPresent(view.hostLightDom)) {
              view.hostLightDom.redistribute();
            }
          },
          dehydrateView: function(viewRef) {
            var view = resolveInternalDomView(viewRef);
            for (var i = 0; i < view.eventHandlerRemovers.length; i++) {
              view.eventHandlerRemovers[i]();
            }
            view.eventHandlerRemovers = null;
            view.hydrated = false;
          },
          setElementProperty: function(location, propertyName, propertyValue) {
            var view = resolveInternalDomView(location.renderView);
            view.setElementProperty(location.boundElementIndex, propertyName, propertyValue);
          },
          setElementAttribute: function(location, attributeName, attributeValue) {
            var view = resolveInternalDomView(location.renderView);
            view.setElementAttribute(location.boundElementIndex, attributeName, attributeValue);
          },
          setElementClass: function(location, className, isAdd) {
            var view = resolveInternalDomView(location.renderView);
            view.setElementClass(location.boundElementIndex, className, isAdd);
          },
          setElementStyle: function(location, styleName, styleValue) {
            var view = resolveInternalDomView(location.renderView);
            view.setElementStyle(location.boundElementIndex, styleName, styleValue);
          },
          invokeElementMethod: function(location, methodName, args) {
            var view = resolveInternalDomView(location.renderView);
            view.invokeElementMethod(location.boundElementIndex, methodName, args);
          },
          setText: function(viewRef, textNodeIndex, text) {
            var view = resolveInternalDomView(viewRef);
            DOM.setText(view.boundTextNodes[textNodeIndex], text);
          },
          setEventDispatcher: function(viewRef, dispatcher) {
            var view = resolveInternalDomView(viewRef);
            view.eventDispatcher = dispatcher;
          },
          _createView: function(protoView, inplaceElement) {
            var rootElementClone;
            var elementsWithBindingsDynamic;
            var viewRootNodes;
            if (isPresent(inplaceElement)) {
              rootElementClone = inplaceElement;
              elementsWithBindingsDynamic = [];
              viewRootNodes = [inplaceElement];
            } else if (protoView.isTemplateElement) {
              rootElementClone = DOM.importIntoDoc(DOM.content(protoView.element));
              elementsWithBindingsDynamic = DOM.querySelectorAll(rootElementClone, NG_BINDING_CLASS_SELECTOR);
              viewRootNodes = ListWrapper.createFixedSize(protoView.rootNodeCount);
              var childNode = DOM.firstChild(rootElementClone);
              for (var i = 0; i < protoView.rootNodeCount; i++, childNode = DOM.nextSibling(childNode)) {
                viewRootNodes[i] = childNode;
              }
            } else {
              rootElementClone = DOM.importIntoDoc(protoView.element);
              elementsWithBindingsDynamic = DOM.getElementsByClassName(rootElementClone, NG_BINDING_CLASS);
              viewRootNodes = [rootElementClone];
            }
            var binders = protoView.elementBinders;
            var boundTextNodes = ListWrapper.createFixedSize(protoView.boundTextNodeCount);
            var boundElements = ListWrapper.createFixedSize(binders.length);
            var boundTextNodeIdx = 0;
            for (var binderIdx = 0; binderIdx < binders.length; binderIdx++) {
              var binder = binders[binderIdx];
              var element = void 0;
              var childNodes = void 0;
              if (binderIdx === 0 && protoView.rootBindingOffset === 1) {
                element = protoView.isTemplateElement ? null : rootElementClone;
                childNodes = DOM.childNodes(rootElementClone);
              } else {
                element = elementsWithBindingsDynamic[binderIdx - protoView.rootBindingOffset];
                childNodes = DOM.childNodes(element);
              }
              var textNodeIndices = binder.textNodeIndices;
              for (var i = 0; i < textNodeIndices.length; i++) {
                boundTextNodes[boundTextNodeIdx++] = childNodes[textNodeIndices[i]];
              }
              var contentTag = null;
              if (isPresent(binder.contentTagSelector)) {
                contentTag = new Content(element, binder.contentTagSelector);
              }
              boundElements[binderIdx] = new DomElement(binder, element, contentTag);
            }
            var view = new DomView(protoView, viewRootNodes, boundTextNodes, boundElements);
            for (var binderIdx = 0; binderIdx < binders.length; binderIdx++) {
              var binder = binders[binderIdx];
              var element = boundElements[binderIdx];
              var domEl = element.element;
              var lightDom = null;
              if (isPresent(binder.componentId) && (!binder.elementIsEmpty || isPresent(inplaceElement))) {
                lightDom = this._shadowDomStrategy.constructLightDom(view, domEl);
              }
              element.lightDom = lightDom;
              var contentTag = element.contentTag;
              if (isPresent(contentTag)) {
                var directParentLightDom = this._directParentLightDom(view, binderIdx);
                contentTag.init(directParentLightDom);
              }
              if (isPresent(binder.eventLocals) && isPresent(binder.localEvents)) {
                for (var i = 0; i < binder.localEvents.length; i++) {
                  this._createEventListener(view, domEl, binderIdx, binder.localEvents[i].name, binder.eventLocals);
                }
              }
            }
            return view;
          },
          _createEventListener: function(view, element, elementIndex, eventName, eventLocals) {
            this._eventManager.addEventListener(element, eventName, function(event) {
              view.dispatchEvent(elementIndex, eventName, event);
            });
          },
          _moveViewNodesAfterSibling: function(sibling, view) {
            for (var i = view.rootNodes.length - 1; i >= 0; --i) {
              DOM.insertAfter(sibling, view.rootNodes[i]);
            }
          },
          _moveViewNodesIntoParent: function(parent, view) {
            for (var i = 0; i < view.rootNodes.length; ++i) {
              DOM.appendChild(parent, view.rootNodes[i]);
            }
          },
          _removeViewNodes: function(view) {
            var len = view.rootNodes.length;
            if (len == 0)
              return;
            var parent = view.rootNodes[0].parentNode;
            for (var i = len - 1; i >= 0; --i) {
              DOM.removeChild(parent, view.rootNodes[i]);
            }
          },
          _getOrCreateViewContainer: function(parentView, boundElementIndex) {
            var el = parentView.boundElements[boundElementIndex];
            var vc = el.viewContainer;
            if (isBlank(vc)) {
              vc = new DomViewContainer();
              el.viewContainer = vc;
            }
            return vc;
          },
          _directParentLightDom: function(view, boundElementIndex) {
            var directParentEl = view.getDirectParentElement(boundElementIndex);
            return isPresent(directParentEl) ? directParentEl.lightDom : null;
          },
          _createGlobalEventListener: function(view, elementIndex, eventName, eventTarget, fullName) {
            return this._eventManager.addGlobalEventListener(eventTarget, eventName, function(event) {
              view.dispatchEvent(elementIndex, fullName, event);
            });
          }
        }, {}, $__super);
      }(Renderer);
      $__export("DomRenderer", DomRenderer);
      $__export("DomRenderer", DomRenderer = __decorate([Injectable(), __param(2, Inject(DOCUMENT_TOKEN)), __metadata('design:paramtypes', [EventManager, ShadowDomStrategy, Object])], DomRenderer));
    }
  };
});
//# sourceMappingURL=dom_renderer.js.map

//# sourceMappingURL=../../../src/render/dom/dom_renderer.js.map