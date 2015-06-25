System.register(["angular2/src/dom/dom_adapter", "angular2/src/facade/collection", "angular2/src/facade/lang", "../../api", "../util"], function($__export) {
  "use strict";
  var DOM,
      Map,
      isPresent,
      stringify,
      RenderViewRef,
      camelCaseToDashCase,
      DomViewRef,
      DomView;
  function resolveInternalDomView(viewRef) {
    return viewRef._view;
  }
  $__export("resolveInternalDomView", resolveInternalDomView);
  return {
    setters: [function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Map = $__m.Map;
    }, function($__m) {
      isPresent = $__m.isPresent;
      stringify = $__m.stringify;
    }, function($__m) {
      RenderViewRef = $__m.RenderViewRef;
    }, function($__m) {
      camelCaseToDashCase = $__m.camelCaseToDashCase;
    }],
    execute: function() {
      DomViewRef = function($__super) {
        function DomViewRef(_view) {
          $traceurRuntime.superConstructor(DomViewRef).call(this);
          this._view = _view;
        }
        return ($traceurRuntime.createClass)(DomViewRef, {}, {}, $__super);
      }(RenderViewRef);
      $__export("DomViewRef", DomViewRef);
      DomView = function() {
        function DomView(proto, rootNodes, boundTextNodes, boundElements) {
          this.proto = proto;
          this.rootNodes = rootNodes;
          this.boundTextNodes = boundTextNodes;
          this.boundElements = boundElements;
          this.hostLightDom = null;
          this.shadowRoot = null;
          this.hydrated = false;
          this.eventDispatcher = null;
          this.eventHandlerRemovers = [];
        }
        return ($traceurRuntime.createClass)(DomView, {
          getDirectParentElement: function(boundElementIndex) {
            var binder = this.proto.elementBinders[boundElementIndex];
            var parent = null;
            if (binder.parentIndex !== -1 && binder.distanceToParent === 1) {
              parent = this.boundElements[binder.parentIndex];
            }
            return parent;
          },
          setElementProperty: function(elementIndex, propertyName, value) {
            DOM.setProperty(this.boundElements[elementIndex].element, propertyName, value);
          },
          setElementAttribute: function(elementIndex, attributeName, value) {
            var element = this.boundElements[elementIndex].element;
            var dashCasedAttributeName = camelCaseToDashCase(attributeName);
            if (isPresent(value)) {
              DOM.setAttribute(element, dashCasedAttributeName, stringify(value));
            } else {
              DOM.removeAttribute(element, dashCasedAttributeName);
            }
          },
          setElementClass: function(elementIndex, className, isAdd) {
            var element = this.boundElements[elementIndex].element;
            var dashCasedClassName = camelCaseToDashCase(className);
            if (isAdd) {
              DOM.addClass(element, dashCasedClassName);
            } else {
              DOM.removeClass(element, dashCasedClassName);
            }
          },
          setElementStyle: function(elementIndex, styleName, value) {
            var element = this.boundElements[elementIndex].element;
            var dashCasedStyleName = camelCaseToDashCase(styleName);
            if (isPresent(value)) {
              DOM.setStyle(element, dashCasedStyleName, stringify(value));
            } else {
              DOM.removeStyle(element, dashCasedStyleName);
            }
          },
          invokeElementMethod: function(elementIndex, methodName, args) {
            var element = this.boundElements[elementIndex].element;
            DOM.invoke(element, methodName, args);
          },
          setText: function(textIndex, value) {
            DOM.setText(this.boundTextNodes[textIndex], value);
          },
          dispatchEvent: function(elementIndex, eventName, event) {
            var allowDefaultBehavior = true;
            if (isPresent(this.eventDispatcher)) {
              var evalLocals = new Map();
              evalLocals.set('$event', event);
              allowDefaultBehavior = this.eventDispatcher.dispatchEvent(elementIndex, eventName, evalLocals);
              if (!allowDefaultBehavior) {
                event.preventDefault();
              }
            }
            return allowDefaultBehavior;
          }
        }, {});
      }();
      $__export("DomView", DomView);
    }
  };
});
//# sourceMappingURL=view.js.map

//# sourceMappingURL=../../../../src/render/dom/view/view.js.map