System.register(["angular2/src/facade/lang", "angular2/src/dom/dom_adapter", "./emulated_unscoped_shadow_dom_strategy", "./util"], function($__export) {
  "use strict";
  var isPresent,
      DOM,
      EmulatedUnscopedShadowDomStrategy,
      getContentAttribute,
      getHostAttribute,
      getComponentId,
      shimCssForComponent,
      insertStyleElement,
      EmulatedScopedShadowDomStrategy;
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      EmulatedUnscopedShadowDomStrategy = $__m.EmulatedUnscopedShadowDomStrategy;
    }, function($__m) {
      getContentAttribute = $__m.getContentAttribute;
      getHostAttribute = $__m.getHostAttribute;
      getComponentId = $__m.getComponentId;
      shimCssForComponent = $__m.shimCssForComponent;
      insertStyleElement = $__m.insertStyleElement;
    }],
    execute: function() {
      EmulatedScopedShadowDomStrategy = function($__super) {
        function EmulatedScopedShadowDomStrategy(styleHost) {
          $traceurRuntime.superConstructor(EmulatedScopedShadowDomStrategy).call(this, styleHost);
        }
        return ($traceurRuntime.createClass)(EmulatedScopedShadowDomStrategy, {
          processStyleElement: function(hostComponentId, templateUrl, styleEl) {
            var cssText = DOM.getText(styleEl);
            cssText = shimCssForComponent(cssText, hostComponentId);
            DOM.setText(styleEl, cssText);
            this._moveToStyleHost(styleEl);
          },
          _moveToStyleHost: function(styleEl) {
            DOM.remove(styleEl);
            insertStyleElement(this.styleHost, styleEl);
          },
          processElement: function(hostComponentId, elementComponentId, element) {
            if (isPresent(hostComponentId)) {
              var contentAttribute = getContentAttribute(getComponentId(hostComponentId));
              DOM.setAttribute(element, contentAttribute, '');
            }
            if (isPresent(elementComponentId)) {
              var hostAttribute = getHostAttribute(getComponentId(elementComponentId));
              DOM.setAttribute(element, hostAttribute, '');
            }
          }
        }, {}, $__super);
      }(EmulatedUnscopedShadowDomStrategy);
      $__export("EmulatedScopedShadowDomStrategy", EmulatedScopedShadowDomStrategy);
    }
  };
});
//# sourceMappingURL=emulated_scoped_shadow_dom_strategy.js.map

//# sourceMappingURL=../../../../src/render/dom/shadow_dom/emulated_scoped_shadow_dom_strategy.js.map