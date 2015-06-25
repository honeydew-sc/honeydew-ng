System.register(["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var BaseException,
      isBlank,
      DOM,
      DomAdapter;
  function setRootDomAdapter(adapter) {
    if (isBlank(DOM)) {
      $__export("DOM", DOM = adapter);
    }
  }
  function _abstract() {
    return new BaseException('This method is abstract');
  }
  $__export("setRootDomAdapter", setRootDomAdapter);
  return {
    setters: [function($__m) {
      BaseException = $__m.BaseException;
      isBlank = $__m.isBlank;
    }],
    execute: function() {
      $__export("DOM", DOM);
      DomAdapter = function() {
        function DomAdapter() {}
        return ($traceurRuntime.createClass)(DomAdapter, {
          hasProperty: function(element, name) {
            throw _abstract();
          },
          setProperty: function(el, name, value) {
            throw _abstract();
          },
          getProperty: function(el, name) {
            throw _abstract();
          },
          invoke: function(el, methodName, args) {
            throw _abstract();
          },
          logError: function(error) {
            throw _abstract();
          },
          get attrToPropMap() {
            throw _abstract();
          },
          parse: function(templateHtml) {
            throw _abstract();
          },
          query: function(selector) {
            throw _abstract();
          },
          querySelector: function(el, selector) {
            throw _abstract();
          },
          querySelectorAll: function(el, selector) {
            throw _abstract();
          },
          on: function(el, evt, listener) {
            throw _abstract();
          },
          onAndCancel: function(el, evt, listener) {
            throw _abstract();
          },
          dispatchEvent: function(el, evt) {
            throw _abstract();
          },
          createMouseEvent: function(eventType) {
            throw _abstract();
          },
          createEvent: function(eventType) {
            throw _abstract();
          },
          preventDefault: function(evt) {
            throw _abstract();
          },
          getInnerHTML: function(el) {
            throw _abstract();
          },
          getOuterHTML: function(el) {
            throw _abstract();
          },
          nodeName: function(node) {
            throw _abstract();
          },
          nodeValue: function(node) {
            throw _abstract();
          },
          type: function(node) {
            throw _abstract();
          },
          content: function(node) {
            throw _abstract();
          },
          firstChild: function(el) {
            throw _abstract();
          },
          nextSibling: function(el) {
            throw _abstract();
          },
          parentElement: function(el) {
            throw _abstract();
          },
          childNodes: function(el) {
            throw _abstract();
          },
          childNodesAsList: function(el) {
            throw _abstract();
          },
          clearNodes: function(el) {
            throw _abstract();
          },
          appendChild: function(el, node) {
            throw _abstract();
          },
          removeChild: function(el, node) {
            throw _abstract();
          },
          replaceChild: function(el, newNode, oldNode) {
            throw _abstract();
          },
          remove: function(el) {
            throw _abstract();
          },
          insertBefore: function(el, node) {
            throw _abstract();
          },
          insertAllBefore: function(el, nodes) {
            throw _abstract();
          },
          insertAfter: function(el, node) {
            throw _abstract();
          },
          setInnerHTML: function(el, value) {
            throw _abstract();
          },
          getText: function(el) {
            throw _abstract();
          },
          setText: function(el, value) {
            throw _abstract();
          },
          getValue: function(el) {
            throw _abstract();
          },
          setValue: function(el, value) {
            throw _abstract();
          },
          getChecked: function(el) {
            throw _abstract();
          },
          setChecked: function(el, value) {
            throw _abstract();
          },
          createTemplate: function(html) {
            throw _abstract();
          },
          createElement: function(tagName) {
            var doc = arguments[1] !== (void 0) ? arguments[1] : null;
            throw _abstract();
          },
          createTextNode: function(text) {
            var doc = arguments[1] !== (void 0) ? arguments[1] : null;
            throw _abstract();
          },
          createScriptTag: function(attrName, attrValue) {
            var doc = arguments[2] !== (void 0) ? arguments[2] : null;
            throw _abstract();
          },
          createStyleElement: function(css) {
            var doc = arguments[1] !== (void 0) ? arguments[1] : null;
            throw _abstract();
          },
          createShadowRoot: function(el) {
            throw _abstract();
          },
          getShadowRoot: function(el) {
            throw _abstract();
          },
          getHost: function(el) {
            throw _abstract();
          },
          getDistributedNodes: function(el) {
            throw _abstract();
          },
          clone: function(node) {
            throw _abstract();
          },
          getElementsByClassName: function(element, name) {
            throw _abstract();
          },
          getElementsByTagName: function(element, name) {
            throw _abstract();
          },
          classList: function(element) {
            throw _abstract();
          },
          addClass: function(element, classname) {
            throw _abstract();
          },
          removeClass: function(element, classname) {
            throw _abstract();
          },
          hasClass: function(element, classname) {
            throw _abstract();
          },
          setStyle: function(element, stylename, stylevalue) {
            throw _abstract();
          },
          removeStyle: function(element, stylename) {
            throw _abstract();
          },
          getStyle: function(element, stylename) {
            throw _abstract();
          },
          tagName: function(element) {
            throw _abstract();
          },
          attributeMap: function(element) {
            throw _abstract();
          },
          hasAttribute: function(element, attribute) {
            throw _abstract();
          },
          getAttribute: function(element, attribute) {
            throw _abstract();
          },
          setAttribute: function(element, name, value) {
            throw _abstract();
          },
          removeAttribute: function(element, attribute) {
            throw _abstract();
          },
          templateAwareRoot: function(el) {
            throw _abstract();
          },
          createHtmlDocument: function() {
            throw _abstract();
          },
          defaultDoc: function() {
            throw _abstract();
          },
          getBoundingClientRect: function(el) {
            throw _abstract();
          },
          getTitle: function() {
            throw _abstract();
          },
          setTitle: function(newTitle) {
            throw _abstract();
          },
          elementMatches: function(n, selector) {
            throw _abstract();
          },
          isTemplateElement: function(el) {
            throw _abstract();
          },
          isTextNode: function(node) {
            throw _abstract();
          },
          isCommentNode: function(node) {
            throw _abstract();
          },
          isElementNode: function(node) {
            throw _abstract();
          },
          hasShadowRoot: function(node) {
            throw _abstract();
          },
          isShadowRoot: function(node) {
            throw _abstract();
          },
          importIntoDoc: function(node) {
            throw _abstract();
          },
          isPageRule: function(rule) {
            throw _abstract();
          },
          isStyleRule: function(rule) {
            throw _abstract();
          },
          isMediaRule: function(rule) {
            throw _abstract();
          },
          isKeyframesRule: function(rule) {
            throw _abstract();
          },
          getHref: function(element) {
            throw _abstract();
          },
          getEventKey: function(event) {
            throw _abstract();
          },
          resolveAndSetHref: function(element, baseUrl, href) {
            throw _abstract();
          },
          cssToRules: function(css) {
            throw _abstract();
          },
          supportsDOMEvents: function() {
            throw _abstract();
          },
          supportsNativeShadowDOM: function() {
            throw _abstract();
          },
          getGlobalEventTarget: function(target) {
            throw _abstract();
          },
          getHistory: function() {
            throw _abstract();
          },
          getLocation: function() {
            throw _abstract();
          },
          getBaseHref: function() {
            throw _abstract();
          },
          getUserAgent: function() {
            throw _abstract();
          },
          setData: function(element, name, value) {
            throw _abstract();
          },
          getData: function(element, name) {
            throw _abstract();
          },
          setGlobalVar: function(name, value) {
            throw _abstract();
          }
        }, {});
      }();
      $__export("DomAdapter", DomAdapter);
    }
  };
});
//# sourceMappingURL=dom_adapter.js.map

//# sourceMappingURL=../../src/dom/dom_adapter.js.map