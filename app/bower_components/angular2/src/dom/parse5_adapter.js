System.register(["angular2/src/facade/collection", "./dom_adapter", "angular2/src/facade/lang", "angular2/src/render/dom/compiler/selector"], function($__export) {
  "use strict";
  var parse5,
      parser,
      serializer,
      treeAdapter,
      cssParse,
      url,
      ListWrapper,
      StringMapWrapper,
      DomAdapter,
      setRootDomAdapter,
      BaseException,
      isPresent,
      isBlank,
      global,
      SelectorMatcher,
      CssSelector,
      _attrToPropMap,
      defDoc,
      Parse5DomAdapter,
      _HTMLElementPropertyList;
  function _notImplemented(methodName) {
    return new BaseException('This method is not implemented in Parse5DomAdapter: ' + methodName);
  }
  return {
    setters: [function($__m) {
      ListWrapper = $__m.ListWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      DomAdapter = $__m.DomAdapter;
      setRootDomAdapter = $__m.setRootDomAdapter;
    }, function($__m) {
      BaseException = $__m.BaseException;
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      global = $__m.global;
    }, function($__m) {
      SelectorMatcher = $__m.SelectorMatcher;
      CssSelector = $__m.CssSelector;
    }],
    execute: function() {
      parse5 = require('parse5');
      parser = new parse5.Parser(parse5.TreeAdapters.htmlparser2);
      serializer = new parse5.Serializer(parse5.TreeAdapters.htmlparser2);
      treeAdapter = parser.treeAdapter;
      cssParse = require('css').parse;
      url = require('url');
      _attrToPropMap = {
        'innerHtml': 'innerHTML',
        'readonly': 'readOnly',
        'tabindex': 'tabIndex'
      };
      defDoc = null;
      Parse5DomAdapter = function($__super) {
        function Parse5DomAdapter() {
          $traceurRuntime.superConstructor(Parse5DomAdapter).apply(this, arguments);
        }
        return ($traceurRuntime.createClass)(Parse5DomAdapter, {
          hasProperty: function(element, name) {
            return _HTMLElementPropertyList.indexOf(name) > -1;
          },
          setProperty: function(el, name, value) {
            if (name === 'innerHTML') {
              this.setInnerHTML(el, value);
            } else {
              el[name] = value;
            }
          },
          getProperty: function(el, name) {
            return el[name];
          },
          logError: function(error) {
            console.error(error);
          },
          get attrToPropMap() {
            return _attrToPropMap;
          },
          query: function(selector) {
            throw _notImplemented('query');
          },
          querySelector: function(el, selector) {
            return this.querySelectorAll(el, selector)[0];
          },
          querySelectorAll: function(el, selector) {
            var $__0 = this;
            var res = [];
            var _recursive = function(result, node, selector, matcher) {
              var cNodes = node.childNodes;
              if (cNodes && cNodes.length > 0) {
                for (var i = 0; i < cNodes.length; i++) {
                  var childNode = cNodes[i];
                  if ($__0.elementMatches(childNode, selector, matcher)) {
                    result.push(childNode);
                  }
                  _recursive(result, childNode, selector, matcher);
                }
              }
            };
            var matcher = new SelectorMatcher();
            matcher.addSelectables(CssSelector.parse(selector));
            _recursive(res, el, selector, matcher);
            return res;
          },
          elementMatches: function(node, selector) {
            var matcher = arguments[2] !== (void 0) ? arguments[2] : null;
            var result = false;
            if (selector && selector.charAt(0) == "#") {
              result = this.getAttribute(node, 'id') == selector.substring(1);
            } else if (selector) {
              var result = false;
              if (matcher == null) {
                matcher = new SelectorMatcher();
                matcher.addSelectables(CssSelector.parse(selector));
              }
              var cssSelector = new CssSelector();
              cssSelector.setElement(this.tagName(node));
              if (node.attribs) {
                for (var attrName in node.attribs) {
                  cssSelector.addAttribute(attrName, node.attribs[attrName]);
                }
              }
              var classList = this.classList(node);
              for (var i = 0; i < classList.length; i++) {
                cssSelector.addClassName(classList[i]);
              }
              matcher.match(cssSelector, function(selector, cb) {
                result = true;
              });
            }
            return result;
          },
          on: function(el, evt, listener) {
            var listenersMap = el._eventListenersMap;
            if (isBlank(listenersMap)) {
              var listenersMap = StringMapWrapper.create();
              el._eventListenersMap = listenersMap;
            }
            var listeners = StringMapWrapper.get(listenersMap, evt);
            if (isBlank(listeners)) {
              listeners = [];
            }
            listeners.push(listener);
            StringMapWrapper.set(listenersMap, evt, listeners);
          },
          onAndCancel: function(el, evt, listener) {
            this.on(el, evt, listener);
            return function() {
              ListWrapper.remove(StringMapWrapper.get(el._eventListenersMap, evt), listener);
            };
          },
          dispatchEvent: function(el, evt) {
            if (isBlank(evt.target)) {
              evt.target = el;
            }
            if (isPresent(el._eventListenersMap)) {
              var listeners = StringMapWrapper.get(el._eventListenersMap, evt.type);
              if (isPresent(listeners)) {
                for (var i = 0; i < listeners.length; i++) {
                  listeners[i](evt);
                }
              }
            }
            if (isPresent(el.parent)) {
              this.dispatchEvent(el.parent, evt);
            }
            if (isPresent(el._window)) {
              this.dispatchEvent(el._window, evt);
            }
          },
          createMouseEvent: function(eventType) {
            return this.createEvent(eventType);
          },
          createEvent: function(eventType) {
            var evt = {
              type: eventType,
              defaultPrevented: false,
              preventDefault: function() {
                evt.defaultPrevented = true;
              }
            };
            return evt;
          },
          preventDefault: function(evt) {
            evt.returnValue = false;
          },
          getInnerHTML: function(el) {
            return serializer.serialize(this.templateAwareRoot(el));
          },
          getOuterHTML: function(el) {
            serializer.html = '';
            serializer._serializeElement(el);
            return serializer.html;
          },
          nodeName: function(node) {
            return node.tagName;
          },
          nodeValue: function(node) {
            return node.nodeValue;
          },
          type: function(node) {
            throw _notImplemented('type');
          },
          content: function(node) {
            return node.childNodes[0];
          },
          firstChild: function(el) {
            return el.firstChild;
          },
          nextSibling: function(el) {
            return el.nextSibling;
          },
          parentElement: function(el) {
            return el.parent;
          },
          childNodes: function(el) {
            return el.childNodes;
          },
          childNodesAsList: function(el) {
            var childNodes = el.childNodes;
            var res = ListWrapper.createFixedSize(childNodes.length);
            for (var i = 0; i < childNodes.length; i++) {
              res[i] = childNodes[i];
            }
            return res;
          },
          clearNodes: function(el) {
            while (el.childNodes.length > 0) {
              this.remove(el.childNodes[0]);
            }
          },
          appendChild: function(el, node) {
            this.remove(node);
            treeAdapter.appendChild(this.templateAwareRoot(el), node);
          },
          removeChild: function(el, node) {
            if (ListWrapper.contains(el.childNodes, node)) {
              this.remove(node);
            }
          },
          remove: function(el) {
            var parent = el.parent;
            if (parent) {
              var index = parent.childNodes.indexOf(el);
              parent.childNodes.splice(index, 1);
            }
            var prev = el.previousSibling;
            var next = el.nextSibling;
            if (prev) {
              prev.next = next;
            }
            if (next) {
              next.prev = prev;
            }
            el.prev = null;
            el.next = null;
            el.parent = null;
            return el;
          },
          insertBefore: function(el, node) {
            this.remove(node);
            treeAdapter.insertBefore(el.parent, node, el);
          },
          insertAllBefore: function(el, nodes) {
            var $__0 = this;
            ListWrapper.forEach(nodes, function(n) {
              $__0.insertBefore(el, n);
            });
          },
          insertAfter: function(el, node) {
            if (el.nextSibling) {
              this.insertBefore(el.nextSibling, node);
            } else {
              this.appendChild(el.parent, node);
            }
          },
          setInnerHTML: function(el, value) {
            this.clearNodes(el);
            var content = parser.parseFragment(value);
            for (var i = 0; i < content.childNodes.length; i++) {
              treeAdapter.appendChild(el, content.childNodes[i]);
            }
          },
          getText: function(el) {
            if (this.isTextNode(el)) {
              return el.data;
            } else if (isBlank(el.childNodes) || el.childNodes.length == 0) {
              return "";
            } else {
              var textContent = "";
              for (var i = 0; i < el.childNodes.length; i++) {
                textContent += this.getText(el.childNodes[i]);
              }
              return textContent;
            }
          },
          setText: function(el, value) {
            if (this.isTextNode(el)) {
              el.data = value;
            } else {
              this.clearNodes(el);
              if (value !== '')
                treeAdapter.insertText(el, value);
            }
          },
          getValue: function(el) {
            return el.value;
          },
          setValue: function(el, value) {
            el.value = value;
          },
          getChecked: function(el) {
            return el.checked;
          },
          setChecked: function(el, value) {
            el.checked = value;
          },
          createTemplate: function(html) {
            var template = treeAdapter.createElement("template", 'http://www.w3.org/1999/xhtml', []);
            var content = parser.parseFragment(html);
            treeAdapter.appendChild(template, content);
            return template;
          },
          createElement: function(tagName) {
            return treeAdapter.createElement(tagName, 'http://www.w3.org/1999/xhtml', []);
          },
          createTextNode: function(text) {
            throw _notImplemented('createTextNode');
          },
          createScriptTag: function(attrName, attrValue) {
            return treeAdapter.createElement("script", 'http://www.w3.org/1999/xhtml', [{
              name: attrName,
              value: attrValue
            }]);
          },
          createStyleElement: function(css) {
            var style = this.createElement('style');
            this.setText(style, css);
            return style;
          },
          createShadowRoot: function(el) {
            el.shadowRoot = treeAdapter.createDocumentFragment();
            el.shadowRoot.parent = el;
            return el.shadowRoot;
          },
          getShadowRoot: function(el) {
            return el.shadowRoot;
          },
          getHost: function(el) {
            return el.host;
          },
          getDistributedNodes: function(el) {
            throw _notImplemented('getDistributedNodes');
          },
          clone: function(node) {
            if (node.type === 'root') {
              var serialized = serializer.serialize(node);
              var newParser = new parse5.Parser(parse5.TreeAdapters.htmlparser2);
              return newParser.parseFragment(serialized);
            } else {
              var temp = treeAdapter.createElement("template", null, []);
              treeAdapter.appendChild(temp, node);
              var serialized = serializer.serialize(temp);
              var newParser = new parse5.Parser(parse5.TreeAdapters.htmlparser2);
              return newParser.parseFragment(serialized).childNodes[0];
            }
          },
          getElementsByClassName: function(element, name) {
            return this.querySelectorAll(element, "." + name);
          },
          getElementsByTagName: function(element, name) {
            throw _notImplemented('getElementsByTagName');
          },
          classList: function(element) {
            var classAttrValue = null;
            var attributes = element.attribs;
            if (attributes && attributes.hasOwnProperty("class")) {
              classAttrValue = attributes["class"];
            }
            return classAttrValue ? classAttrValue.trim().split(/\s+/g) : [];
          },
          addClass: function(element, classname) {
            var classList = this.classList(element);
            var index = classList.indexOf(classname);
            if (index == -1) {
              classList.push(classname);
              element.attribs["class"] = element.className = ListWrapper.join(classList, " ");
            }
          },
          removeClass: function(element, classname) {
            var classList = this.classList(element);
            var index = classList.indexOf(classname);
            if (index > -1) {
              classList.splice(index, 1);
              element.attribs["class"] = element.className = ListWrapper.join(classList, " ");
            }
          },
          hasClass: function(element, classname) {
            return ListWrapper.contains(this.classList(element), classname);
          },
          _readStyleAttribute: function(element) {
            var styleMap = {};
            var attributes = element.attribs;
            if (attributes && attributes.hasOwnProperty("style")) {
              var styleAttrValue = attributes["style"];
              var styleList = styleAttrValue.split(/;+/g);
              for (var i = 0; i < styleList.length; i++) {
                if (styleList[i].length > 0) {
                  var elems = styleList[i].split(/:+/g);
                  styleMap[elems[0].trim()] = elems[1].trim();
                }
              }
            }
            return styleMap;
          },
          _writeStyleAttribute: function(element, styleMap) {
            var styleAttrValue = "";
            for (var key in styleMap) {
              var newValue = styleMap[key];
              if (newValue && newValue.length > 0) {
                styleAttrValue += key + ":" + styleMap[key] + ";";
              }
            }
            element.attribs["style"] = styleAttrValue;
          },
          setStyle: function(element, stylename, stylevalue) {
            var styleMap = this._readStyleAttribute(element);
            styleMap[stylename] = stylevalue;
            this._writeStyleAttribute(element, styleMap);
          },
          removeStyle: function(element, stylename) {
            this.setStyle(element, stylename, null);
          },
          getStyle: function(element, stylename) {
            var styleMap = this._readStyleAttribute(element);
            return styleMap.hasOwnProperty(stylename) ? styleMap[stylename] : "";
          },
          tagName: function(element) {
            return element.tagName == "style" ? "STYLE" : element.tagName;
          },
          attributeMap: function(element) {
            var res = new Map();
            var elAttrs = treeAdapter.getAttrList(element);
            for (var i = 0; i < elAttrs.length; i++) {
              var attrib = elAttrs[i];
              res.set(attrib.name, attrib.value);
            }
            return res;
          },
          hasAttribute: function(element, attribute) {
            return element.attribs && element.attribs.hasOwnProperty(attribute);
          },
          getAttribute: function(element, attribute) {
            return element.attribs && element.attribs.hasOwnProperty(attribute) ? element.attribs[attribute] : null;
          },
          setAttribute: function(element, attribute, value) {
            if (attribute) {
              element.attribs[attribute] = value;
            }
          },
          removeAttribute: function(element, attribute) {
            if (attribute) {
              StringMapWrapper.delete(element.attribs, attribute);
            }
          },
          templateAwareRoot: function(el) {
            return this.isTemplateElement(el) ? this.content(el) : el;
          },
          createHtmlDocument: function() {
            var newDoc = treeAdapter.createDocument();
            newDoc.title = "fake title";
            var head = treeAdapter.createElement("head", null, []);
            var body = treeAdapter.createElement("body", 'http://www.w3.org/1999/xhtml', []);
            this.appendChild(newDoc, head);
            this.appendChild(newDoc, body);
            StringMapWrapper.set(newDoc, "head", head);
            StringMapWrapper.set(newDoc, "body", body);
            StringMapWrapper.set(newDoc, "_window", StringMapWrapper.create());
            return newDoc;
          },
          defaultDoc: function() {
            if (defDoc === null) {
              defDoc = this.createHtmlDocument();
            }
            return defDoc;
          },
          getBoundingClientRect: function(el) {
            return {
              left: 0,
              top: 0,
              width: 0,
              height: 0
            };
          },
          getTitle: function() {
            return this.defaultDoc().title || "";
          },
          setTitle: function(newTitle) {
            this.defaultDoc().title = newTitle;
          },
          isTemplateElement: function(el) {
            return this.isElementNode(el) && this.tagName(el) === "template";
          },
          isTextNode: function(node) {
            return treeAdapter.isTextNode(node);
          },
          isCommentNode: function(node) {
            return treeAdapter.isCommentNode(node);
          },
          isElementNode: function(node) {
            return node ? treeAdapter.isElementNode(node) : false;
          },
          hasShadowRoot: function(node) {
            return isPresent(node.shadowRoot);
          },
          isShadowRoot: function(node) {
            return this.getShadowRoot(node) == node;
          },
          importIntoDoc: function(node) {
            return this.clone(node);
          },
          isPageRule: function(rule) {
            return rule.type === 6;
          },
          isStyleRule: function(rule) {
            return rule.type === 1;
          },
          isMediaRule: function(rule) {
            return rule.type === 4;
          },
          isKeyframesRule: function(rule) {
            return rule.type === 7;
          },
          getHref: function(el) {
            return el.href;
          },
          resolveAndSetHref: function(el, baseUrl, href) {
            if (href == null) {
              el.href = baseUrl;
            } else {
              el.href = url.resolve(baseUrl, href);
            }
          },
          _buildRules: function(parsedRules, css) {
            var rules = [];
            for (var i = 0; i < parsedRules.length; i++) {
              var parsedRule = parsedRules[i];
              var rule = StringMapWrapper.create();
              StringMapWrapper.set(rule, "cssText", css);
              StringMapWrapper.set(rule, "style", {
                content: "",
                cssText: ""
              });
              if (parsedRule.type == "rule") {
                StringMapWrapper.set(rule, "type", 1);
                StringMapWrapper.set(rule, "selectorText", parsedRule.selectors.join(", ").replace(/\s{2,}/g, " ").replace(/\s*~\s*/g, " ~ ").replace(/\s*\+\s*/g, " + ").replace(/\s*>\s*/g, " > ").replace(/\[(\w+)=(\w+)\]/g, '[$1="$2"]'));
                if (isBlank(parsedRule.declarations)) {
                  continue;
                }
                for (var j = 0; j < parsedRule.declarations.length; j++) {
                  var declaration = parsedRule.declarations[j];
                  StringMapWrapper.set(StringMapWrapper.get(rule, "style"), declaration.property, declaration.value);
                  StringMapWrapper.get(rule, "style").cssText += declaration.property + ": " + declaration.value + ";";
                }
              } else if (parsedRule.type == "media") {
                StringMapWrapper.set(rule, "type", 4);
                StringMapWrapper.set(rule, "media", {mediaText: parsedRule.media});
                if (parsedRule.rules) {
                  StringMapWrapper.set(rule, "cssRules", this._buildRules(parsedRule.rules));
                }
              }
              rules.push(rule);
            }
            return rules;
          },
          cssToRules: function(css) {
            css = css.replace(/url\(\'(.+)\'\)/g, 'url($1)');
            var rules = [];
            var parsedCSS = cssParse(css, {silent: true});
            if (parsedCSS.stylesheet && parsedCSS.stylesheet.rules) {
              rules = this._buildRules(parsedCSS.stylesheet.rules, css);
            }
            return rules;
          },
          supportsDOMEvents: function() {
            return false;
          },
          supportsNativeShadowDOM: function() {
            return false;
          },
          getGlobalEventTarget: function(target) {
            if (target == "window") {
              return this.defaultDoc()._window;
            } else if (target == "document") {
              return this.defaultDoc();
            } else if (target == "body") {
              return this.defaultDoc().body;
            }
          },
          getHistory: function() {
            throw 'not implemented';
          },
          getLocation: function() {
            throw 'not implemented';
          },
          getUserAgent: function() {
            return "Fake user agent";
          },
          getData: function(el, name) {
            return this.getAttribute(el, 'data-' + name);
          },
          setData: function(el, name, value) {
            this.setAttribute(el, 'data-' + name, value);
          },
          setGlobalVar: function(name, value) {
            global[name] = value;
          }
        }, {makeCurrent: function() {
            setRootDomAdapter(new Parse5DomAdapter());
          }}, $__super);
      }(DomAdapter);
      $__export("Parse5DomAdapter", Parse5DomAdapter);
      _HTMLElementPropertyList = ["webkitEntries", "incremental", "webkitdirectory", "selectionDirection", "selectionEnd", "selectionStart", "labels", "validationMessage", "validity", "willValidate", "width", "valueAsNumber", "valueAsDate", "value", "useMap", "defaultValue", "type", "step", "src", "size", "required", "readOnly", "placeholder", "pattern", "name", "multiple", "min", "minLength", "maxLength", "max", "list", "indeterminate", "height", "formTarget", "formNoValidate", "formMethod", "formEnctype", "formAction", "files", "form", "disabled", "dirName", "checked", "defaultChecked", "autofocus", "autocomplete", "alt", "align", "accept", "onautocompleteerror", "onautocomplete", "onwaiting", "onvolumechange", "ontoggle", "ontimeupdate", "onsuspend", "onsubmit", "onstalled", "onshow", "onselect", "onseeking", "onseeked", "onscroll", "onresize", "onreset", "onratechange", "onprogress", "onplaying", "onplay", "onpause", "onmousewheel", "onmouseup", "onmouseover", "onmouseout", "onmousemove", "onmouseleave", "onmouseenter", "onmousedown", "onloadstart", "onloadedmetadata", "onloadeddata", "onload", "onkeyup", "onkeypress", "onkeydown", "oninvalid", "oninput", "onfocus", "onerror", "onended", "onemptied", "ondurationchange", "ondrop", "ondragstart", "ondragover", "ondragleave", "ondragenter", "ondragend", "ondrag", "ondblclick", "oncuechange", "oncontextmenu", "onclose", "onclick", "onchange", "oncanplaythrough", "oncanplay", "oncancel", "onblur", "onabort", "spellcheck", "isContentEditable", "contentEditable", "outerText", "innerText", "accessKey", "hidden", "webkitdropzone", "draggable", "tabIndex", "dir", "translate", "lang", "title", "childElementCount", "lastElementChild", "firstElementChild", "children", "onwebkitfullscreenerror", "onwebkitfullscreenchange", "nextElementSibling", "previousElementSibling", "onwheel", "onselectstart", "onsearch", "onpaste", "oncut", "oncopy", "onbeforepaste", "onbeforecut", "onbeforecopy", "shadowRoot", "dataset", "classList", "className", "outerHTML", "innerHTML", "scrollHeight", "scrollWidth", "scrollTop", "scrollLeft", "clientHeight", "clientWidth", "clientTop", "clientLeft", "offsetParent", "offsetHeight", "offsetWidth", "offsetTop", "offsetLeft", "localName", "prefix", "namespaceURI", "id", "style", "attributes", "tagName", "parentElement", "textContent", "baseURI", "ownerDocument", "nextSibling", "previousSibling", "lastChild", "firstChild", "childNodes", "parentNode", "nodeType", "nodeValue", "nodeName", "closure_lm_714617", "__jsaction"];
    }
  };
});
//# sourceMappingURL=parse5_adapter.js.map

//# sourceMappingURL=../../src/dom/parse5_adapter.js.map