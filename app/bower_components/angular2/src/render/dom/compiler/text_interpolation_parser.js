System.register(["angular2/src/facade/lang", "angular2/src/dom/dom_adapter"], function($__export) {
  "use strict";
  var isPresent,
      DOM,
      TextInterpolationParser;
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      DOM = $__m.DOM;
    }],
    execute: function() {
      TextInterpolationParser = function() {
        function TextInterpolationParser(_parser) {
          this._parser = _parser;
        }
        return ($traceurRuntime.createClass)(TextInterpolationParser, {process: function(parent, current, control) {
            if (!current.compileChildren) {
              return;
            }
            var element = current.element;
            var childNodes = DOM.childNodes(DOM.templateAwareRoot(element));
            for (var i = 0; i < childNodes.length; i++) {
              var node = childNodes[i];
              if (DOM.isTextNode(node)) {
                var text = DOM.nodeValue(node);
                var expr = this._parser.parseInterpolation(text, current.elementDescription);
                if (isPresent(expr)) {
                  DOM.setText(node, ' ');
                  current.bindElement().bindText(node, expr);
                }
              }
            }
          }}, {});
      }();
      $__export("TextInterpolationParser", TextInterpolationParser);
    }
  };
});
//# sourceMappingURL=text_interpolation_parser.js.map

//# sourceMappingURL=../../../../src/render/dom/compiler/text_interpolation_parser.js.map