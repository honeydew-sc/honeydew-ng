System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/dom/dom_adapter", "angular2/src/render/dom/compiler/selector", "../../api", "../util"], function($__export) {
  "use strict";
  var isPresent,
      isBlank,
      BaseException,
      StringWrapper,
      MapWrapper,
      ListWrapper,
      DOM,
      SelectorMatcher,
      CssSelector,
      DirectiveMetadata,
      dashCaseToCamelCase,
      camelCaseToDashCase,
      EVENT_TARGET_SEPARATOR,
      DirectiveParser;
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
      StringWrapper = $__m.StringWrapper;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      SelectorMatcher = $__m.SelectorMatcher;
      CssSelector = $__m.CssSelector;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      dashCaseToCamelCase = $__m.dashCaseToCamelCase;
      camelCaseToDashCase = $__m.camelCaseToDashCase;
      EVENT_TARGET_SEPARATOR = $__m.EVENT_TARGET_SEPARATOR;
    }],
    execute: function() {
      DirectiveParser = function() {
        function DirectiveParser(_parser, _directives) {
          this._parser = _parser;
          this._directives = _directives;
          this._selectorMatcher = new SelectorMatcher();
          for (var i = 0; i < _directives.length; i++) {
            var directive = _directives[i];
            var selector = CssSelector.parse(directive.selector);
            this._ensureComponentOnlyHasElementSelector(selector, directive);
            this._selectorMatcher.addSelectables(selector, i);
          }
        }
        return ($traceurRuntime.createClass)(DirectiveParser, {
          _ensureComponentOnlyHasElementSelector: function(selector, directive) {
            var isElementSelector = selector.length === 1 && selector[0].isElementSelector();
            if (!isElementSelector && directive.type === DirectiveMetadata.COMPONENT_TYPE) {
              throw new BaseException(("Component '" + directive.id + "' can only have an element selector, but had '" + directive.selector + "'"));
            }
          },
          process: function(parent, current, control) {
            var $__0 = this;
            var attrs = current.attrs();
            var classList = current.classList();
            var cssSelector = new CssSelector();
            var nodeName = DOM.nodeName(current.element);
            cssSelector.setElement(nodeName);
            for (var i = 0; i < classList.length; i++) {
              cssSelector.addClassName(classList[i]);
            }
            MapWrapper.forEach(attrs, function(attrValue, attrName) {
              cssSelector.addAttribute(attrName, attrValue);
            });
            var componentDirective;
            var foundDirectiveIndices = [];
            var elementBinder = null;
            this._selectorMatcher.match(cssSelector, function(selector, directiveIndex) {
              elementBinder = current.bindElement();
              var directive = $__0._directives[directiveIndex];
              if (directive.type === DirectiveMetadata.COMPONENT_TYPE) {
                ListWrapper.insert(foundDirectiveIndices, 0, directiveIndex);
                if (isPresent(componentDirective)) {
                  throw new BaseException(("Only one component directive is allowed per element - check " + current.elementDescription));
                }
                componentDirective = directive;
                elementBinder.setComponentId(directive.id);
              } else {
                foundDirectiveIndices.push(directiveIndex);
              }
            });
            ListWrapper.forEach(foundDirectiveIndices, function(directiveIndex) {
              var dirMetadata = $__0._directives[directiveIndex];
              var directiveBinderBuilder = elementBinder.bindDirective(directiveIndex);
              current.compileChildren = current.compileChildren && dirMetadata.compileChildren;
              if (isPresent(dirMetadata.properties)) {
                ListWrapper.forEach(dirMetadata.properties, function(bindConfig) {
                  $__0._bindDirectiveProperty(bindConfig, current, directiveBinderBuilder);
                });
              }
              if (isPresent(dirMetadata.hostListeners)) {
                MapWrapper.forEach(dirMetadata.hostListeners, function(action, eventName) {
                  $__0._bindDirectiveEvent(eventName, action, current, directiveBinderBuilder);
                });
              }
              if (isPresent(dirMetadata.hostProperties)) {
                MapWrapper.forEach(dirMetadata.hostProperties, function(expression, hostPropertyName) {
                  $__0._bindHostProperty(hostPropertyName, expression, current, directiveBinderBuilder);
                });
              }
              if (isPresent(dirMetadata.hostAttributes)) {
                MapWrapper.forEach(dirMetadata.hostAttributes, function(hostAttrValue, hostAttrName) {
                  $__0._addHostAttribute(hostAttrName, hostAttrValue, current);
                });
              }
              if (isPresent(dirMetadata.readAttributes)) {
                ListWrapper.forEach(dirMetadata.readAttributes, function(attrName) {
                  elementBinder.readAttribute(attrName);
                });
              }
            });
          },
          _bindDirectiveProperty: function(bindConfig, compileElement, directiveBinderBuilder) {
            var dirProperty;
            var elProp;
            var pipes;
            var assignIndex = bindConfig.indexOf(':');
            if (assignIndex > -1) {
              dirProperty = StringWrapper.substring(bindConfig, 0, assignIndex).trim();
              pipes = this._splitBindConfig(StringWrapper.substring(bindConfig, assignIndex + 1));
              elProp = ListWrapper.removeAt(pipes, 0);
            } else {
              dirProperty = bindConfig;
              elProp = bindConfig;
              pipes = [];
            }
            elProp = dashCaseToCamelCase(elProp);
            var bindingAst = compileElement.bindElement().propertyBindings.get(elProp);
            if (isBlank(bindingAst)) {
              var attributeValue = compileElement.attrs().get(camelCaseToDashCase(elProp));
              if (isPresent(attributeValue)) {
                bindingAst = this._parser.wrapLiteralPrimitive(attributeValue, compileElement.elementDescription);
              }
            }
            if (isPresent(bindingAst)) {
              directiveBinderBuilder.bindProperty(dirProperty, bindingAst, elProp);
            }
          },
          _bindDirectiveEvent: function(eventName, action, compileElement, directiveBinderBuilder) {
            var ast = this._parser.parseAction(action, compileElement.elementDescription);
            if (StringWrapper.contains(eventName, EVENT_TARGET_SEPARATOR)) {
              var parts = eventName.split(EVENT_TARGET_SEPARATOR);
              directiveBinderBuilder.bindEvent(parts[1], ast, parts[0]);
            } else {
              directiveBinderBuilder.bindEvent(eventName, ast);
            }
          },
          _bindHostProperty: function(hostPropertyName, expression, compileElement, directiveBinderBuilder) {
            var ast = this._parser.parseSimpleBinding(expression, ("hostProperties of " + compileElement.elementDescription));
            directiveBinderBuilder.bindHostProperty(hostPropertyName, ast);
          },
          _addHostAttribute: function(attrName, attrValue, compileElement) {
            if (StringWrapper.equals(attrName, 'class')) {
              ListWrapper.forEach(attrValue.split(' '), function(className) {
                DOM.addClass(compileElement.element, className);
              });
            } else if (!DOM.hasAttribute(compileElement.element, attrName)) {
              DOM.setAttribute(compileElement.element, attrName, attrValue);
            }
          },
          _splitBindConfig: function(bindConfig) {
            return ListWrapper.map(bindConfig.split('|'), function(s) {
              return s.trim();
            });
          }
        }, {});
      }();
      $__export("DirectiveParser", DirectiveParser);
    }
  };
});
//# sourceMappingURL=directive_parser.js.map

//# sourceMappingURL=../../../../src/render/dom/compiler/directive_parser.js.map