System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/dom/dom_adapter", "angular2/change_detection", "./proto_view", "./element_binder", "../../api", "../util"], function($__export) {
  "use strict";
  var isPresent,
      isBlank,
      BaseException,
      StringWrapper,
      ListWrapper,
      MapWrapper,
      Set,
      SetWrapper,
      StringMapWrapper,
      DOM,
      ASTWithSource,
      AstTransformer,
      AccessMember,
      LiteralArray,
      ImplicitReceiver,
      DomProtoView,
      DomProtoViewRef,
      resolveInternalDomProtoView,
      ElementBinder,
      Event,
      api,
      NG_BINDING_CLASS,
      EVENT_TARGET_SEPARATOR,
      ProtoViewBuilder,
      _ChildNodesInfo,
      ElementBinderBuilder,
      DirectiveBuilder,
      EventBuilder,
      PROPERTY_PARTS_SEPARATOR,
      ATTRIBUTE_PREFIX,
      CLASS_PREFIX,
      STYLE_PREFIX;
  function buildElementPropertyBindings(protoElement, isNgComponent, bindingsInTemplate, directiveTempaltePropertyNames) {
    var propertyBindings = [];
    MapWrapper.forEach(bindingsInTemplate, function(ast, propertyNameInTemplate) {
      var propertyBinding = createElementPropertyBinding(ast, propertyNameInTemplate);
      if (isValidElementPropertyBinding(protoElement, isNgComponent, propertyBinding)) {
        propertyBindings.push(propertyBinding);
      } else if (!SetWrapper.has(directiveTempaltePropertyNames, propertyNameInTemplate)) {
        throw new BaseException(("Can't bind to '" + propertyNameInTemplate + "' since it isn't a know property of the '" + DOM.tagName(protoElement).toLowerCase() + "' element and there are no matching directives with a corresponding property"));
      }
    });
    return propertyBindings;
  }
  function isValidElementPropertyBinding(protoElement, isNgComponent, binding) {
    if (binding.type === api.PropertyBindingType.PROPERTY) {
      var tagName = DOM.tagName(protoElement);
      var possibleCustomElement = tagName.indexOf('-') !== -1;
      if (possibleCustomElement && !isNgComponent) {
        return true;
      } else {
        return DOM.hasProperty(protoElement, binding.property);
      }
    }
    return true;
  }
  function createElementPropertyBinding(ast, propertyNameInTemplate) {
    var parts = StringWrapper.split(propertyNameInTemplate, PROPERTY_PARTS_SEPARATOR);
    if (parts.length === 1) {
      var propName = parts[0];
      var mappedPropName = StringMapWrapper.get(DOM.attrToPropMap, propName);
      propName = isPresent(mappedPropName) ? mappedPropName : propName;
      return new api.ElementPropertyBinding(api.PropertyBindingType.PROPERTY, ast, propName);
    } else if (parts[0] == ATTRIBUTE_PREFIX) {
      return new api.ElementPropertyBinding(api.PropertyBindingType.ATTRIBUTE, ast, parts[1]);
    } else if (parts[0] == CLASS_PREFIX) {
      return new api.ElementPropertyBinding(api.PropertyBindingType.CLASS, ast, parts[1]);
    } else if (parts[0] == STYLE_PREFIX) {
      var unit = parts.length > 2 ? parts[2] : null;
      return new api.ElementPropertyBinding(api.PropertyBindingType.STYLE, ast, parts[1], unit);
    } else {
      throw new BaseException(("Invalid property name " + propertyNameInTemplate));
    }
  }
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
      StringWrapper = $__m.StringWrapper;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      Set = $__m.Set;
      SetWrapper = $__m.SetWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      ASTWithSource = $__m.ASTWithSource;
      AstTransformer = $__m.AstTransformer;
      AccessMember = $__m.AccessMember;
      LiteralArray = $__m.LiteralArray;
      ImplicitReceiver = $__m.ImplicitReceiver;
    }, function($__m) {
      DomProtoView = $__m.DomProtoView;
      DomProtoViewRef = $__m.DomProtoViewRef;
      resolveInternalDomProtoView = $__m.resolveInternalDomProtoView;
    }, function($__m) {
      ElementBinder = $__m.ElementBinder;
      Event = $__m.Event;
    }, function($__m) {
      api = $__m;
    }, function($__m) {
      NG_BINDING_CLASS = $__m.NG_BINDING_CLASS;
      EVENT_TARGET_SEPARATOR = $__m.EVENT_TARGET_SEPARATOR;
    }],
    execute: function() {
      ProtoViewBuilder = function() {
        function ProtoViewBuilder(rootElement, type) {
          this.rootElement = rootElement;
          this.type = type;
          this.variableBindings = new Map();
          this.elements = [];
        }
        return ($traceurRuntime.createClass)(ProtoViewBuilder, {
          bindElement: function(element) {
            var description = arguments[1] !== (void 0) ? arguments[1] : null;
            var builder = new ElementBinderBuilder(this.elements.length, element, description);
            this.elements.push(builder);
            DOM.addClass(element, NG_BINDING_CLASS);
            return builder;
          },
          bindVariable: function(name, value) {
            this.variableBindings.set(value, name);
          },
          build: function() {
            var $__0 = this;
            var renderElementBinders = [];
            var apiElementBinders = [];
            var transitiveContentTagCount = 0;
            var boundTextNodeCount = 0;
            ListWrapper.forEach(this.elements, function(ebb) {
              var directiveTemplatePropertyNames = new Set();
              var apiDirectiveBinders = ListWrapper.map(ebb.directives, function(dbb) {
                ebb.eventBuilder.merge(dbb.eventBuilder);
                ListWrapper.forEach(dbb.templatePropertyNames, function(name) {
                  return directiveTemplatePropertyNames.add(name);
                });
                return new api.DirectiveBinder({
                  directiveIndex: dbb.directiveIndex,
                  propertyBindings: dbb.propertyBindings,
                  eventBindings: dbb.eventBindings,
                  hostPropertyBindings: buildElementPropertyBindings(ebb.element, isPresent(ebb.componentId), dbb.hostPropertyBindings, directiveTemplatePropertyNames)
                });
              });
              var nestedProtoView = isPresent(ebb.nestedProtoView) ? ebb.nestedProtoView.build() : null;
              var nestedRenderProtoView = isPresent(nestedProtoView) ? resolveInternalDomProtoView(nestedProtoView.render) : null;
              if (isPresent(nestedRenderProtoView)) {
                transitiveContentTagCount += nestedRenderProtoView.transitiveContentTagCount;
              }
              if (isPresent(ebb.contentTagSelector)) {
                transitiveContentTagCount++;
              }
              var parentIndex = isPresent(ebb.parent) ? ebb.parent.index : -1;
              apiElementBinders.push(new api.ElementBinder({
                index: ebb.index,
                parentIndex: parentIndex,
                distanceToParent: ebb.distanceToParent,
                directives: apiDirectiveBinders,
                nestedProtoView: nestedProtoView,
                propertyBindings: buildElementPropertyBindings(ebb.element, isPresent(ebb.componentId), ebb.propertyBindings, directiveTemplatePropertyNames),
                variableBindings: ebb.variableBindings,
                eventBindings: ebb.eventBindings,
                textBindings: ebb.textBindings,
                readAttributes: ebb.readAttributes
              }));
              var childNodeInfo = $__0._analyzeChildNodes(ebb.element, ebb.textBindingNodes);
              boundTextNodeCount += ebb.textBindingNodes.length;
              renderElementBinders.push(new ElementBinder({
                textNodeIndices: childNodeInfo.boundTextNodeIndices,
                contentTagSelector: ebb.contentTagSelector,
                parentIndex: parentIndex,
                distanceToParent: ebb.distanceToParent,
                nestedProtoView: isPresent(nestedProtoView) ? resolveInternalDomProtoView(nestedProtoView.render) : null,
                componentId: ebb.componentId,
                eventLocals: new LiteralArray(ebb.eventBuilder.buildEventLocals()),
                localEvents: ebb.eventBuilder.buildLocalEvents(),
                globalEvents: ebb.eventBuilder.buildGlobalEvents(),
                elementIsEmpty: childNodeInfo.elementIsEmpty
              }));
            });
            return new api.ProtoViewDto({
              render: new DomProtoViewRef(new DomProtoView({
                element: this.rootElement,
                elementBinders: renderElementBinders,
                transitiveContentTagCount: transitiveContentTagCount,
                boundTextNodeCount: boundTextNodeCount
              })),
              type: this.type,
              elementBinders: apiElementBinders,
              variableBindings: this.variableBindings
            });
          },
          _analyzeChildNodes: function(parentElement, boundTextNodes) {
            var childNodes = DOM.childNodes(DOM.templateAwareRoot(parentElement));
            var boundTextNodeIndices = [];
            var indexInBoundTextNodes = 0;
            var elementIsEmpty = true;
            for (var i = 0; i < childNodes.length; i++) {
              var node = childNodes[i];
              if (indexInBoundTextNodes < boundTextNodes.length && node === boundTextNodes[indexInBoundTextNodes]) {
                boundTextNodeIndices.push(i);
                indexInBoundTextNodes++;
                elementIsEmpty = false;
              } else if ((DOM.isTextNode(node) && DOM.getText(node).trim().length > 0) || (DOM.isElementNode(node))) {
                elementIsEmpty = false;
              }
            }
            return new _ChildNodesInfo(boundTextNodeIndices, elementIsEmpty);
          }
        }, {});
      }();
      $__export("ProtoViewBuilder", ProtoViewBuilder);
      _ChildNodesInfo = function() {
        function _ChildNodesInfo(boundTextNodeIndices, elementIsEmpty) {
          this.boundTextNodeIndices = boundTextNodeIndices;
          this.elementIsEmpty = elementIsEmpty;
        }
        return ($traceurRuntime.createClass)(_ChildNodesInfo, {}, {});
      }();
      ElementBinderBuilder = function() {
        function ElementBinderBuilder(index, element, description) {
          this.index = index;
          this.element = element;
          this.parent = null;
          this.distanceToParent = 0;
          this.directives = [];
          this.nestedProtoView = null;
          this.propertyBindings = new Map();
          this.variableBindings = new Map();
          this.propertyBindingsToDirectives = new Set();
          this.eventBindings = [];
          this.eventBuilder = new EventBuilder();
          this.textBindingNodes = [];
          this.textBindings = [];
          this.contentTagSelector = null;
          this.readAttributes = new Map();
          this.componentId = null;
        }
        return ($traceurRuntime.createClass)(ElementBinderBuilder, {
          setParent: function(parent, distanceToParent) {
            this.parent = parent;
            if (isPresent(parent)) {
              this.distanceToParent = distanceToParent;
            }
            return this;
          },
          readAttribute: function(attrName) {
            if (isBlank(this.readAttributes.get(attrName))) {
              this.readAttributes.set(attrName, DOM.getAttribute(this.element, attrName));
            }
          },
          bindDirective: function(directiveIndex) {
            var directive = new DirectiveBuilder(directiveIndex);
            this.directives.push(directive);
            return directive;
          },
          bindNestedProtoView: function(rootElement) {
            if (isPresent(this.nestedProtoView)) {
              throw new BaseException('Only one nested view per element is allowed');
            }
            this.nestedProtoView = new ProtoViewBuilder(rootElement, api.ViewType.EMBEDDED);
            return this.nestedProtoView;
          },
          bindProperty: function(name, expression) {
            this.propertyBindings.set(name, expression);
          },
          bindPropertyToDirective: function(name) {
            this.propertyBindingsToDirectives.add(name);
          },
          bindVariable: function(name, value) {
            if (isPresent(this.nestedProtoView)) {
              this.nestedProtoView.bindVariable(name, value);
            } else {
              this.variableBindings.set(value, name);
            }
          },
          bindEvent: function(name, expression) {
            var target = arguments[2] !== (void 0) ? arguments[2] : null;
            this.eventBindings.push(this.eventBuilder.add(name, expression, target));
          },
          bindText: function(textNode, expression) {
            this.textBindingNodes.push(textNode);
            this.textBindings.push(expression);
          },
          setContentTagSelector: function(value) {
            this.contentTagSelector = value;
          },
          setComponentId: function(componentId) {
            this.componentId = componentId;
          }
        }, {});
      }();
      $__export("ElementBinderBuilder", ElementBinderBuilder);
      DirectiveBuilder = function() {
        function DirectiveBuilder(directiveIndex) {
          this.directiveIndex = directiveIndex;
          this.propertyBindings = new Map();
          this.templatePropertyNames = [];
          this.hostPropertyBindings = new Map();
          this.eventBindings = [];
          this.eventBuilder = new EventBuilder();
        }
        return ($traceurRuntime.createClass)(DirectiveBuilder, {
          bindProperty: function(name, expression, elProp) {
            this.propertyBindings.set(name, expression);
            if (isPresent(elProp)) {
              this.templatePropertyNames.push(elProp);
            }
          },
          bindHostProperty: function(name, expression) {
            this.hostPropertyBindings.set(name, expression);
          },
          bindEvent: function(name, expression) {
            var target = arguments[2] !== (void 0) ? arguments[2] : null;
            this.eventBindings.push(this.eventBuilder.add(name, expression, target));
          }
        }, {});
      }();
      $__export("DirectiveBuilder", DirectiveBuilder);
      EventBuilder = function($__super) {
        function EventBuilder() {
          $traceurRuntime.superConstructor(EventBuilder).call(this);
          this.locals = [];
          this.localEvents = [];
          this.globalEvents = [];
          this._implicitReceiver = new ImplicitReceiver();
        }
        return ($traceurRuntime.createClass)(EventBuilder, {
          add: function(name, source, target) {
            var adjustedAst = source.ast;
            var fullName = isPresent(target) ? target + EVENT_TARGET_SEPARATOR + name : name;
            var result = new api.EventBinding(fullName, new ASTWithSource(adjustedAst, source.source, source.location));
            var event = new Event(name, target, fullName);
            if (isBlank(target)) {
              this.localEvents.push(event);
            } else {
              this.globalEvents.push(event);
            }
            return result;
          },
          visitAccessMember: function(ast) {
            var isEventAccess = false;
            var current = ast;
            while (!isEventAccess && (current instanceof AccessMember)) {
              var am = current;
              if (am.name == '$event') {
                isEventAccess = true;
              }
              current = am.receiver;
            }
            if (isEventAccess) {
              this.locals.push(ast);
              var index = this.locals.length - 1;
              return new AccessMember(this._implicitReceiver, ("" + index), function(arr) {
                return arr[index];
              }, null);
            } else {
              return ast;
            }
          },
          buildEventLocals: function() {
            return this.locals;
          },
          buildLocalEvents: function() {
            return this.localEvents;
          },
          buildGlobalEvents: function() {
            return this.globalEvents;
          },
          merge: function(eventBuilder) {
            this._merge(this.localEvents, eventBuilder.localEvents);
            this._merge(this.globalEvents, eventBuilder.globalEvents);
            ListWrapper.concat(this.locals, eventBuilder.locals);
          },
          _merge: function(host, tobeAdded) {
            var names = [];
            for (var i = 0; i < host.length; i++) {
              names.push(host[i].fullName);
            }
            for (var j = 0; j < tobeAdded.length; j++) {
              if (!ListWrapper.contains(names, tobeAdded[j].fullName)) {
                host.push(tobeAdded[j]);
              }
            }
          }
        }, {}, $__super);
      }(AstTransformer);
      $__export("EventBuilder", EventBuilder);
      PROPERTY_PARTS_SEPARATOR = new RegExp('\\.');
      ATTRIBUTE_PREFIX = 'attr';
      CLASS_PREFIX = 'class';
      STYLE_PREFIX = 'style';
    }
  };
});
//# sourceMappingURL=proto_view_builder.js.map

//# sourceMappingURL=../../../../src/render/dom/view/proto_view_builder.js.map