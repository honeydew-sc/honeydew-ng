System.register([], function($__export) {
  "use strict";
  var ShadowDomStrategy;
  return {
    setters: [],
    execute: function() {
      ShadowDomStrategy = function() {
        function ShadowDomStrategy() {}
        return ($traceurRuntime.createClass)(ShadowDomStrategy, {
          hasNativeContentElement: function() {
            return true;
          },
          prepareShadowRoot: function(el) {
            return null;
          },
          constructLightDom: function(lightDomView, el) {
            return null;
          },
          processStyleElement: function(hostComponentId, templateUrl, styleElement) {},
          processElement: function(hostComponentId, elementComponentId, element) {}
        }, {});
      }();
      $__export("ShadowDomStrategy", ShadowDomStrategy);
    }
  };
});
//# sourceMappingURL=shadow_dom_strategy.js.map

//# sourceMappingURL=../../../../src/render/dom/shadow_dom/shadow_dom_strategy.js.map