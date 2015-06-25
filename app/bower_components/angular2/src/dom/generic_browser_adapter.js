System.register(["angular2/src/facade/collection", "angular2/src/facade/lang", "./dom_adapter"], function($__export) {
  "use strict";
  var ListWrapper,
      isPresent,
      isFunction,
      DomAdapter,
      GenericBrowserDomAdapter;
  return {
    setters: [function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isFunction = $__m.isFunction;
    }, function($__m) {
      DomAdapter = $__m.DomAdapter;
    }],
    execute: function() {
      GenericBrowserDomAdapter = function($__super) {
        function GenericBrowserDomAdapter() {
          $traceurRuntime.superConstructor(GenericBrowserDomAdapter).apply(this, arguments);
        }
        return ($traceurRuntime.createClass)(GenericBrowserDomAdapter, {
          getDistributedNodes: function(el) {
            return el.getDistributedNodes();
          },
          resolveAndSetHref: function(el, baseUrl, href) {
            el.href = href == null ? baseUrl : baseUrl + '/../' + href;
          },
          cssToRules: function(css) {
            var style = this.createStyleElement(css);
            this.appendChild(this.defaultDoc().head, style);
            var rules = [];
            if (isPresent(style.sheet)) {
              try {
                var rawRules = style.sheet.cssRules;
                rules = ListWrapper.createFixedSize(rawRules.length);
                for (var i = 0; i < rawRules.length; i++) {
                  rules[i] = rawRules[i];
                }
              } catch (e) {}
            } else {}
            this.remove(style);
            return rules;
          },
          supportsDOMEvents: function() {
            return true;
          },
          supportsNativeShadowDOM: function() {
            return isFunction(this.defaultDoc().body.createShadowRoot);
          }
        }, {}, $__super);
      }(DomAdapter);
      $__export("GenericBrowserDomAdapter", GenericBrowserDomAdapter);
    }
  };
});
//# sourceMappingURL=generic_browser_adapter.js.map

//# sourceMappingURL=../../src/dom/generic_browser_adapter.js.map