System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/dom/dom_adapter", "./shadow_css"], function($__export) {
  "use strict";
  var isBlank,
      isPresent,
      Map,
      DOM,
      ShadowCss,
      _componentUIDs,
      _nextComponentUID,
      _sharedStyleTexts,
      _lastInsertedStyleEl;
  function getComponentId(componentStringId) {
    var id = _componentUIDs.get(componentStringId);
    if (isBlank(id)) {
      id = _nextComponentUID++;
      _componentUIDs.set(componentStringId, id);
    }
    return id;
  }
  function insertSharedStyleText(cssText, styleHost, styleEl) {
    if (!_sharedStyleTexts.has(cssText)) {
      _sharedStyleTexts.set(cssText, true);
      insertStyleElement(styleHost, styleEl);
    }
  }
  function insertStyleElement(host, styleEl) {
    if (isBlank(_lastInsertedStyleEl)) {
      var firstChild = DOM.firstChild(host);
      if (isPresent(firstChild)) {
        DOM.insertBefore(firstChild, styleEl);
      } else {
        DOM.appendChild(host, styleEl);
      }
    } else {
      DOM.insertAfter(_lastInsertedStyleEl, styleEl);
    }
    _lastInsertedStyleEl = styleEl;
  }
  function getHostAttribute(id) {
    return ("_nghost-" + id);
  }
  function getContentAttribute(id) {
    return ("_ngcontent-" + id);
  }
  function shimCssForComponent(cssText, componentId) {
    var id = getComponentId(componentId);
    var shadowCss = new ShadowCss();
    return shadowCss.shimCssText(cssText, getContentAttribute(id), getHostAttribute(id));
  }
  function resetShadowDomCache() {
    _componentUIDs.clear();
    _nextComponentUID = 0;
    _sharedStyleTexts.clear();
    _lastInsertedStyleEl = null;
  }
  $__export("getComponentId", getComponentId);
  $__export("insertSharedStyleText", insertSharedStyleText);
  $__export("insertStyleElement", insertStyleElement);
  $__export("getHostAttribute", getHostAttribute);
  $__export("getContentAttribute", getContentAttribute);
  $__export("shimCssForComponent", shimCssForComponent);
  $__export("resetShadowDomCache", resetShadowDomCache);
  return {
    setters: [function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
    }, function($__m) {
      Map = $__m.Map;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      ShadowCss = $__m.ShadowCss;
    }],
    execute: function() {
      _componentUIDs = new Map();
      _nextComponentUID = 0;
      _sharedStyleTexts = new Map();
    }
  };
});
//# sourceMappingURL=util.js.map

//# sourceMappingURL=../../../../src/render/dom/shadow_dom/util.js.map