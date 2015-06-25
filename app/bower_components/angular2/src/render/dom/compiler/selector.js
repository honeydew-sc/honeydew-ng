System.register(["angular2/src/facade/collection", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var Map,
      ListWrapper,
      isPresent,
      isBlank,
      RegExpWrapper,
      RegExpMatcherWrapper,
      StringWrapper,
      BaseException,
      _EMPTY_ATTR_VALUE,
      _SELECTOR_REGEXP,
      CssSelector,
      SelectorMatcher,
      SelectorListContext,
      SelectorContext;
  return {
    setters: [function($__m) {
      Map = $__m.Map;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      RegExpWrapper = $__m.RegExpWrapper;
      RegExpMatcherWrapper = $__m.RegExpMatcherWrapper;
      StringWrapper = $__m.StringWrapper;
      BaseException = $__m.BaseException;
    }],
    execute: function() {
      _EMPTY_ATTR_VALUE = '';
      _SELECTOR_REGEXP = RegExpWrapper.create('(\\:not\\()|' + '([-\\w]+)|' + '(?:\\.([-\\w]+))|' + '(?:\\[([-\\w*]+)(?:=([^\\]]*))?\\])|' + '(\\))|' + '(\\s*,\\s*)');
      CssSelector = function() {
        function CssSelector() {
          this.element = null;
          this.classNames = [];
          this.attrs = [];
          this.notSelectors = [];
        }
        return ($traceurRuntime.createClass)(CssSelector, {
          isElementSelector: function() {
            return isPresent(this.element) && ListWrapper.isEmpty(this.classNames) && ListWrapper.isEmpty(this.attrs) && this.notSelectors.length === 0;
          },
          setElement: function() {
            var element = arguments[0] !== (void 0) ? arguments[0] : null;
            if (isPresent(element)) {
              element = element.toLowerCase();
            }
            this.element = element;
          },
          addAttribute: function(name) {
            var value = arguments[1] !== (void 0) ? arguments[1] : _EMPTY_ATTR_VALUE;
            this.attrs.push(name.toLowerCase());
            if (isPresent(value)) {
              value = value.toLowerCase();
            } else {
              value = _EMPTY_ATTR_VALUE;
            }
            this.attrs.push(value);
          },
          addClassName: function(name) {
            this.classNames.push(name.toLowerCase());
          },
          toString: function() {
            var res = '';
            if (isPresent(this.element)) {
              res += this.element;
            }
            if (isPresent(this.classNames)) {
              for (var i = 0; i < this.classNames.length; i++) {
                res += '.' + this.classNames[i];
              }
            }
            if (isPresent(this.attrs)) {
              for (var i = 0; i < this.attrs.length; ) {
                var attrName = this.attrs[i++];
                var attrValue = this.attrs[i++];
                res += '[' + attrName;
                if (attrValue.length > 0) {
                  res += '=' + attrValue;
                }
                res += ']';
              }
            }
            ListWrapper.forEach(this.notSelectors, function(notSelector) {
              res += ":not(" + notSelector.toString() + ")";
            });
            return res;
          }
        }, {parse: function(selector) {
            var results = [];
            var _addResult = function(res, cssSel) {
              if (cssSel.notSelectors.length > 0 && isBlank(cssSel.element) && ListWrapper.isEmpty(cssSel.classNames) && ListWrapper.isEmpty(cssSel.attrs)) {
                cssSel.element = "*";
              }
              res.push(cssSel);
            };
            var cssSelector = new CssSelector();
            var matcher = RegExpWrapper.matcher(_SELECTOR_REGEXP, selector);
            var match;
            var current = cssSelector;
            var inNot = false;
            while (isPresent(match = RegExpMatcherWrapper.next(matcher))) {
              if (isPresent(match[1])) {
                if (inNot) {
                  throw new BaseException('Nesting :not is not allowed in a selector');
                }
                inNot = true;
                current = new CssSelector();
                cssSelector.notSelectors.push(current);
              }
              if (isPresent(match[2])) {
                current.setElement(match[2]);
              }
              if (isPresent(match[3])) {
                current.addClassName(match[3]);
              }
              if (isPresent(match[4])) {
                current.addAttribute(match[4], match[5]);
              }
              if (isPresent(match[6])) {
                inNot = false;
                current = cssSelector;
              }
              if (isPresent(match[7])) {
                if (inNot) {
                  throw new BaseException('Multiple selectors in :not are not supported');
                }
                _addResult(results, cssSelector);
                cssSelector = current = new CssSelector();
              }
            }
            _addResult(results, cssSelector);
            return results;
          }});
      }();
      $__export("CssSelector", CssSelector);
      SelectorMatcher = function() {
        function SelectorMatcher() {
          this._elementMap = new Map();
          this._elementPartialMap = new Map();
          this._classMap = new Map();
          this._classPartialMap = new Map();
          this._attrValueMap = new Map();
          this._attrValuePartialMap = new Map();
          this._listContexts = [];
        }
        return ($traceurRuntime.createClass)(SelectorMatcher, {
          addSelectables: function(cssSelectors, callbackCtxt) {
            var listContext = null;
            if (cssSelectors.length > 1) {
              listContext = new SelectorListContext(cssSelectors);
              this._listContexts.push(listContext);
            }
            for (var i = 0; i < cssSelectors.length; i++) {
              this._addSelectable(cssSelectors[i], callbackCtxt, listContext);
            }
          },
          _addSelectable: function(cssSelector, callbackCtxt, listContext) {
            var matcher = this;
            var element = cssSelector.element;
            var classNames = cssSelector.classNames;
            var attrs = cssSelector.attrs;
            var selectable = new SelectorContext(cssSelector, callbackCtxt, listContext);
            if (isPresent(element)) {
              var isTerminal = attrs.length === 0 && classNames.length === 0;
              if (isTerminal) {
                this._addTerminal(matcher._elementMap, element, selectable);
              } else {
                matcher = this._addPartial(matcher._elementPartialMap, element);
              }
            }
            if (isPresent(classNames)) {
              for (var index = 0; index < classNames.length; index++) {
                var isTerminal = attrs.length === 0 && index === classNames.length - 1;
                var className = classNames[index];
                if (isTerminal) {
                  this._addTerminal(matcher._classMap, className, selectable);
                } else {
                  matcher = this._addPartial(matcher._classPartialMap, className);
                }
              }
            }
            if (isPresent(attrs)) {
              for (var index = 0; index < attrs.length; ) {
                var isTerminal = index === attrs.length - 2;
                var attrName = attrs[index++];
                var attrValue = attrs[index++];
                if (isTerminal) {
                  var terminalMap = matcher._attrValueMap;
                  var terminalValuesMap = terminalMap.get(attrName);
                  if (isBlank(terminalValuesMap)) {
                    terminalValuesMap = new Map();
                    terminalMap.set(attrName, terminalValuesMap);
                  }
                  this._addTerminal(terminalValuesMap, attrValue, selectable);
                } else {
                  var parttialMap = matcher._attrValuePartialMap;
                  var partialValuesMap = parttialMap.get(attrName);
                  if (isBlank(partialValuesMap)) {
                    partialValuesMap = new Map();
                    parttialMap.set(attrName, partialValuesMap);
                  }
                  matcher = this._addPartial(partialValuesMap, attrValue);
                }
              }
            }
          },
          _addTerminal: function(map, name, selectable) {
            var terminalList = map.get(name);
            if (isBlank(terminalList)) {
              terminalList = [];
              map.set(name, terminalList);
            }
            terminalList.push(selectable);
          },
          _addPartial: function(map, name) {
            var matcher = map.get(name);
            if (isBlank(matcher)) {
              matcher = new SelectorMatcher();
              map.set(name, matcher);
            }
            return matcher;
          },
          match: function(cssSelector, matchedCallback) {
            var result = false;
            var element = cssSelector.element;
            var classNames = cssSelector.classNames;
            var attrs = cssSelector.attrs;
            for (var i = 0; i < this._listContexts.length; i++) {
              this._listContexts[i].alreadyMatched = false;
            }
            result = this._matchTerminal(this._elementMap, element, cssSelector, matchedCallback) || result;
            result = this._matchPartial(this._elementPartialMap, element, cssSelector, matchedCallback) || result;
            if (isPresent(classNames)) {
              for (var index = 0; index < classNames.length; index++) {
                var className = classNames[index];
                result = this._matchTerminal(this._classMap, className, cssSelector, matchedCallback) || result;
                result = this._matchPartial(this._classPartialMap, className, cssSelector, matchedCallback) || result;
              }
            }
            if (isPresent(attrs)) {
              for (var index = 0; index < attrs.length; ) {
                var attrName = attrs[index++];
                var attrValue = attrs[index++];
                var terminalValuesMap = this._attrValueMap.get(attrName);
                if (!StringWrapper.equals(attrValue, _EMPTY_ATTR_VALUE)) {
                  result = this._matchTerminal(terminalValuesMap, _EMPTY_ATTR_VALUE, cssSelector, matchedCallback) || result;
                }
                result = this._matchTerminal(terminalValuesMap, attrValue, cssSelector, matchedCallback) || result;
                var partialValuesMap = this._attrValuePartialMap.get(attrName);
                if (!StringWrapper.equals(attrValue, _EMPTY_ATTR_VALUE)) {
                  result = this._matchPartial(partialValuesMap, _EMPTY_ATTR_VALUE, cssSelector, matchedCallback) || result;
                }
                result = this._matchPartial(partialValuesMap, attrValue, cssSelector, matchedCallback) || result;
              }
            }
            return result;
          },
          _matchTerminal: function(map, name, cssSelector, matchedCallback) {
            if (isBlank(map) || isBlank(name)) {
              return false;
            }
            var selectables = map.get(name);
            var starSelectables = map.get("*");
            if (isPresent(starSelectables)) {
              selectables = ListWrapper.concat(selectables, starSelectables);
            }
            if (isBlank(selectables)) {
              return false;
            }
            var selectable;
            var result = false;
            for (var index = 0; index < selectables.length; index++) {
              selectable = selectables[index];
              result = selectable.finalize(cssSelector, matchedCallback) || result;
            }
            return result;
          },
          _matchPartial: function(map, name, cssSelector, matchedCallback) {
            if (isBlank(map) || isBlank(name)) {
              return false;
            }
            var nestedSelector = map.get(name);
            if (isBlank(nestedSelector)) {
              return false;
            }
            return nestedSelector.match(cssSelector, matchedCallback);
          }
        }, {createNotMatcher: function(notSelectors) {
            var notMatcher = new SelectorMatcher();
            notMatcher.addSelectables(notSelectors, null);
            return notMatcher;
          }});
      }();
      $__export("SelectorMatcher", SelectorMatcher);
      SelectorListContext = function() {
        function SelectorListContext(selectors) {
          this.selectors = selectors;
          this.alreadyMatched = false;
        }
        return ($traceurRuntime.createClass)(SelectorListContext, {}, {});
      }();
      SelectorContext = function() {
        function SelectorContext(selector, cbContext, listContext) {
          this.selector = selector;
          this.cbContext = cbContext;
          this.listContext = listContext;
          this.notSelectors = selector.notSelectors;
        }
        return ($traceurRuntime.createClass)(SelectorContext, {finalize: function(cssSelector, callback) {
            var result = true;
            if (this.notSelectors.length > 0 && (isBlank(this.listContext) || !this.listContext.alreadyMatched)) {
              var notMatcher = SelectorMatcher.createNotMatcher(this.notSelectors);
              result = !notMatcher.match(cssSelector, null);
            }
            if (result && isPresent(callback) && (isBlank(this.listContext) || !this.listContext.alreadyMatched)) {
              if (isPresent(this.listContext)) {
                this.listContext.alreadyMatched = true;
              }
              callback(this.selector, this.cbContext);
            }
            return result;
          }}, {});
      }();
    }
  };
});
//# sourceMappingURL=selector.js.map

//# sourceMappingURL=../../../../src/render/dom/compiler/selector.js.map