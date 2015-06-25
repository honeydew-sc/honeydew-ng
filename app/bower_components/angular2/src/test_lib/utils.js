System.register(["angular2/src/facade/collection", "angular2/src/dom/dom_adapter", "angular2/src/facade/lang", "angular2/src/render/dom/view/view"], function($__export) {
  "use strict";
  var ListWrapper,
      MapWrapper,
      DOM,
      isPresent,
      isString,
      RegExpWrapper,
      StringWrapper,
      resolveInternalDomView,
      Log,
      _RE_SPECIAL_CHARS,
      _ESCAPE_RE,
      _singleTagWhitelist;
  function viewRootNodes(view) {
    return resolveInternalDomView(view.render).rootNodes;
  }
  function queryView(view, selector) {
    var rootNodes = viewRootNodes(view);
    for (var i = 0; i < rootNodes.length; ++i) {
      var res = DOM.querySelector(rootNodes[i], selector);
      if (isPresent(res)) {
        return res;
      }
    }
    return null;
  }
  function dispatchEvent(element, eventType) {
    DOM.dispatchEvent(element, DOM.createEvent(eventType));
  }
  function el(html) {
    return DOM.firstChild(DOM.content(DOM.createTemplate(html)));
  }
  function containsRegexp(input) {
    return RegExpWrapper.create(StringWrapper.replaceAllMapped(input, _ESCAPE_RE, function(match) {
      return ("\\" + match[0]);
    }));
  }
  function normalizeCSS(css) {
    css = StringWrapper.replaceAll(css, RegExpWrapper.create('\\s+'), ' ');
    css = StringWrapper.replaceAll(css, RegExpWrapper.create(':\\s'), ':');
    css = StringWrapper.replaceAll(css, RegExpWrapper.create("\\'"), '"');
    css = StringWrapper.replaceAllMapped(css, RegExpWrapper.create('url\\(\\"(.+)\\"\\)'), function(match) {
      return ("url(" + match[1] + ")");
    });
    css = StringWrapper.replaceAllMapped(css, RegExpWrapper.create('\\[(.+)=([^"\\]]+)\\]'), function(match) {
      return ("[" + match[1] + "=\"" + match[2] + "\"]");
    });
    return css;
  }
  function stringifyElement(el) {
    var result = '';
    if (DOM.isElementNode(el)) {
      var tagName = StringWrapper.toLowerCase(DOM.tagName(el));
      result += ("<" + tagName);
      var attributeMap = DOM.attributeMap(el);
      var keys = [];
      MapWrapper.forEach(attributeMap, function(v, k) {
        keys.push(k);
      });
      ListWrapper.sort(keys);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var attValue = attributeMap.get(key);
        if (!isString(attValue)) {
          result += (" " + key);
        } else {
          result += (" " + key + "=\"" + attValue + "\"");
        }
      }
      result += '>';
      var children = DOM.childNodes(DOM.templateAwareRoot(el));
      for (var j = 0; j < children.length; j++) {
        result += stringifyElement(children[j]);
      }
      if (!ListWrapper.contains(_singleTagWhitelist, tagName)) {
        result += ("</" + tagName + ">");
      }
    } else {
      result += DOM.getText(el);
    }
    return result;
  }
  $__export("viewRootNodes", viewRootNodes);
  $__export("queryView", queryView);
  $__export("dispatchEvent", dispatchEvent);
  $__export("el", el);
  $__export("containsRegexp", containsRegexp);
  $__export("normalizeCSS", normalizeCSS);
  $__export("stringifyElement", stringifyElement);
  return {
    setters: [function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isString = $__m.isString;
      RegExpWrapper = $__m.RegExpWrapper;
      StringWrapper = $__m.StringWrapper;
    }, function($__m) {
      resolveInternalDomView = $__m.resolveInternalDomView;
    }],
    execute: function() {
      Log = function() {
        function Log() {
          this._result = [];
        }
        return ($traceurRuntime.createClass)(Log, {
          add: function(value) {
            this._result.push(value);
          },
          fn: function(value) {
            var $__0 = this;
            return function() {
              var a1 = arguments[0] !== (void 0) ? arguments[0] : null;
              var a2 = arguments[1] !== (void 0) ? arguments[1] : null;
              var a3 = arguments[2] !== (void 0) ? arguments[2] : null;
              var a4 = arguments[3] !== (void 0) ? arguments[3] : null;
              var a5 = arguments[4] !== (void 0) ? arguments[4] : null;
              $__0._result.push(value);
            };
          },
          result: function() {
            return ListWrapper.join(this._result, "; ");
          }
        }, {});
      }();
      $__export("Log", Log);
      _RE_SPECIAL_CHARS = ['-', '[', ']', '/', '{', '}', '\\', '(', ')', '*', '+', '?', '.', '^', '$', '|'];
      _ESCAPE_RE = RegExpWrapper.create(("[\\" + _RE_SPECIAL_CHARS.join('\\') + "]"));
      _singleTagWhitelist = ['br', 'hr', 'input'];
    }
  };
});
//# sourceMappingURL=utils.js.map

//# sourceMappingURL=../../src/test_lib/utils.js.map