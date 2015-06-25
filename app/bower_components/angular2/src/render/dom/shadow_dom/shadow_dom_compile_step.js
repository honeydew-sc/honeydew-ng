System.register(["angular2/src/facade/lang", "angular2/src/dom/dom_adapter"], function($__export) {
  "use strict";
  var isPresent,
      assertionsEnabled,
      DOM,
      ShadowDomCompileStep;
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
      assertionsEnabled = $__m.assertionsEnabled;
    }, function($__m) {
      DOM = $__m.DOM;
    }],
    execute: function() {
      ShadowDomCompileStep = function() {
        function ShadowDomCompileStep(_shadowDomStrategy, _view) {
          this._shadowDomStrategy = _shadowDomStrategy;
          this._view = _view;
        }
        return ($traceurRuntime.createClass)(ShadowDomCompileStep, {
          process: function(parent, current, control) {
            var tagName = DOM.tagName(current.element).toUpperCase();
            if (tagName == 'STYLE') {
              this._processStyleElement(current, control);
            } else if (tagName == 'CONTENT') {
              this._processContentElement(current);
            } else {
              var componentId = current.isBound() ? current.inheritedElementBinder.componentId : null;
              this._shadowDomStrategy.processElement(this._view.componentId, componentId, current.element);
            }
          },
          _processStyleElement: function(current, control) {
            this._shadowDomStrategy.processStyleElement(this._view.componentId, this._view.templateAbsUrl, current.element);
            control.ignoreCurrentElement();
          },
          _processContentElement: function(current) {
            if (this._shadowDomStrategy.hasNativeContentElement()) {
              return;
            }
            var attrs = current.attrs();
            var selector = attrs.get('select');
            selector = isPresent(selector) ? selector : '';
            var contentStart = DOM.createScriptTag('type', 'ng/contentStart');
            if (assertionsEnabled()) {
              DOM.setAttribute(contentStart, 'select', selector);
            }
            var contentEnd = DOM.createScriptTag('type', 'ng/contentEnd');
            DOM.insertBefore(current.element, contentStart);
            DOM.insertBefore(current.element, contentEnd);
            DOM.remove(current.element);
            current.element = contentStart;
            current.bindElement().setContentTagSelector(selector);
          }
        }, {});
      }();
      $__export("ShadowDomCompileStep", ShadowDomCompileStep);
    }
  };
});
//# sourceMappingURL=shadow_dom_compile_step.js.map

//# sourceMappingURL=../../../../src/render/dom/shadow_dom/shadow_dom_compile_step.js.map