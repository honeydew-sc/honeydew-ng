System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "../util"], function($__export) {
  "use strict";
  var isPresent,
      RegExpWrapper,
      MapWrapper,
      dashCaseToCamelCase,
      BIND_NAME_REGEXP,
      PropertyBindingParser;
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
      RegExpWrapper = $__m.RegExpWrapper;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      dashCaseToCamelCase = $__m.dashCaseToCamelCase;
    }],
    execute: function() {
      BIND_NAME_REGEXP = RegExpWrapper.create('^(?:(?:(?:(bind-)|(var-|#)|(on-)|(bindon-))(.+))|\\[\\(([^\\)]+)\\)\\]|\\[([^\\]]+)\\]|\\(([^\\)]+)\\))$');
      PropertyBindingParser = function() {
        function PropertyBindingParser(_parser) {
          this._parser = _parser;
        }
        return ($traceurRuntime.createClass)(PropertyBindingParser, {
          process: function(parent, current, control) {
            var $__0 = this;
            var attrs = current.attrs();
            var newAttrs = new Map();
            MapWrapper.forEach(attrs, function(attrValue, attrName) {
              var bindParts = RegExpWrapper.firstMatch(BIND_NAME_REGEXP, attrName);
              if (isPresent(bindParts)) {
                if (isPresent(bindParts[1])) {
                  $__0._bindProperty(bindParts[5], attrValue, current, newAttrs);
                } else if (isPresent(bindParts[2])) {
                  var identifier = bindParts[5];
                  var value = attrValue == '' ? '\$implicit' : attrValue;
                  $__0._bindVariable(identifier, value, current, newAttrs);
                } else if (isPresent(bindParts[3])) {
                  $__0._bindEvent(bindParts[5], attrValue, current, newAttrs);
                } else if (isPresent(bindParts[4])) {
                  $__0._bindProperty(bindParts[5], attrValue, current, newAttrs);
                  $__0._bindAssignmentEvent(bindParts[5], attrValue, current, newAttrs);
                } else if (isPresent(bindParts[6])) {
                  $__0._bindProperty(bindParts[6], attrValue, current, newAttrs);
                  $__0._bindAssignmentEvent(bindParts[6], attrValue, current, newAttrs);
                } else if (isPresent(bindParts[7])) {
                  $__0._bindProperty(bindParts[7], attrValue, current, newAttrs);
                } else if (isPresent(bindParts[8])) {
                  $__0._bindEvent(bindParts[8], attrValue, current, newAttrs);
                }
              } else {
                var expr = $__0._parser.parseInterpolation(attrValue, current.elementDescription);
                if (isPresent(expr)) {
                  $__0._bindPropertyAst(attrName, expr, current, newAttrs);
                }
              }
            });
            MapWrapper.forEach(newAttrs, function(attrValue, attrName) {
              attrs.set(attrName, attrValue);
            });
          },
          _bindVariable: function(identifier, value, current, newAttrs) {
            current.bindElement().bindVariable(dashCaseToCamelCase(identifier), value);
            newAttrs.set(identifier, value);
          },
          _bindProperty: function(name, expression, current, newAttrs) {
            this._bindPropertyAst(name, this._parser.parseBinding(expression, current.elementDescription), current, newAttrs);
          },
          _bindPropertyAst: function(name, ast, current, newAttrs) {
            var binder = current.bindElement();
            binder.bindProperty(dashCaseToCamelCase(name), ast);
            newAttrs.set(name, ast.source);
          },
          _bindAssignmentEvent: function(name, expression, current, newAttrs) {
            this._bindEvent(name, (expression + "=$event"), current, newAttrs);
          },
          _bindEvent: function(name, expression, current, newAttrs) {
            current.bindElement().bindEvent(dashCaseToCamelCase(name), this._parser.parseAction(expression, current.elementDescription));
          }
        }, {});
      }();
      $__export("PropertyBindingParser", PropertyBindingParser);
    }
  };
});
//# sourceMappingURL=property_binding_parser.js.map

//# sourceMappingURL=../../../../src/render/dom/compiler/property_binding_parser.js.map