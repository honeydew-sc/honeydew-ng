System.register(["angular2/src/dom/dom_adapter", "./light_dom", "./shadow_dom_strategy", "./util"], function($__export) {
  "use strict";
  var DOM,
      LightDom,
      ShadowDomStrategy,
      insertSharedStyleText,
      EmulatedUnscopedShadowDomStrategy;
  return {
    setters: [function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      LightDom = $__m.LightDom;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }, function($__m) {
      insertSharedStyleText = $__m.insertSharedStyleText;
    }],
    execute: function() {
      EmulatedUnscopedShadowDomStrategy = function($__super) {
        function EmulatedUnscopedShadowDomStrategy(styleHost) {
          $traceurRuntime.superConstructor(EmulatedUnscopedShadowDomStrategy).call(this);
          this.styleHost = styleHost;
        }
        return ($traceurRuntime.createClass)(EmulatedUnscopedShadowDomStrategy, {
          hasNativeContentElement: function() {
            return false;
          },
          prepareShadowRoot: function(el) {
            return el;
          },
          constructLightDom: function(lightDomView, el) {
            return new LightDom(lightDomView, el);
          },
          processStyleElement: function(hostComponentId, templateUrl, styleEl) {
            var cssText = DOM.getText(styleEl);
            insertSharedStyleText(cssText, this.styleHost, styleEl);
          }
        }, {}, $__super);
      }(ShadowDomStrategy);
      $__export("EmulatedUnscopedShadowDomStrategy", EmulatedUnscopedShadowDomStrategy);
    }
  };
});
//# sourceMappingURL=emulated_unscoped_shadow_dom_strategy.js.map

//# sourceMappingURL=../../../../src/render/dom/shadow_dom/emulated_unscoped_shadow_dom_strategy.js.map