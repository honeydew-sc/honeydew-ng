System.register(["angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var isPresent,
      isBlank,
      RegExpWrapper,
      Map,
      MapWrapper,
      EventBinding,
      PropertyBindingType,
      ElementPropertyBinding,
      ElementBinder,
      DirectiveBinder,
      ViewType,
      ProtoViewDto,
      hostRegExp,
      DirectiveMetadata,
      RenderProtoViewRef,
      RenderViewRef,
      ViewDefinition,
      RenderCompiler,
      Renderer;
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      RegExpWrapper = $__m.RegExpWrapper;
    }, function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
    }],
    execute: function() {
      EventBinding = function() {
        function EventBinding(fullName, source) {
          this.fullName = fullName;
          this.source = source;
        }
        return ($traceurRuntime.createClass)(EventBinding, {}, {});
      }();
      $__export("EventBinding", EventBinding);
      $__export("PropertyBindingType", PropertyBindingType);
      (function(PropertyBindingType) {
        PropertyBindingType[PropertyBindingType["PROPERTY"] = 0] = "PROPERTY";
        PropertyBindingType[PropertyBindingType["ATTRIBUTE"] = 1] = "ATTRIBUTE";
        PropertyBindingType[PropertyBindingType["CLASS"] = 2] = "CLASS";
        PropertyBindingType[PropertyBindingType["STYLE"] = 3] = "STYLE";
      })(PropertyBindingType || ($__export("PropertyBindingType", PropertyBindingType = {})));
      ElementPropertyBinding = function() {
        function ElementPropertyBinding(type, astWithSource, property) {
          var unit = arguments[3] !== (void 0) ? arguments[3] : null;
          this.type = type;
          this.astWithSource = astWithSource;
          this.property = property;
          this.unit = unit;
        }
        return ($traceurRuntime.createClass)(ElementPropertyBinding, {}, {});
      }();
      $__export("ElementPropertyBinding", ElementPropertyBinding);
      ElementBinder = function() {
        function ElementBinder() {
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              index = $__1.index,
              parentIndex = $__1.parentIndex,
              distanceToParent = $__1.distanceToParent,
              directives = $__1.directives,
              nestedProtoView = $__1.nestedProtoView,
              propertyBindings = $__1.propertyBindings,
              variableBindings = $__1.variableBindings,
              eventBindings = $__1.eventBindings,
              textBindings = $__1.textBindings,
              readAttributes = $__1.readAttributes;
          this.index = index;
          this.parentIndex = parentIndex;
          this.distanceToParent = distanceToParent;
          this.directives = directives;
          this.nestedProtoView = nestedProtoView;
          this.propertyBindings = propertyBindings;
          this.variableBindings = variableBindings;
          this.eventBindings = eventBindings;
          this.textBindings = textBindings;
          this.readAttributes = readAttributes;
        }
        return ($traceurRuntime.createClass)(ElementBinder, {}, {});
      }();
      $__export("ElementBinder", ElementBinder);
      DirectiveBinder = function() {
        function DirectiveBinder($__1) {
          var $__2 = $__1,
              directiveIndex = $__2.directiveIndex,
              propertyBindings = $__2.propertyBindings,
              eventBindings = $__2.eventBindings,
              hostPropertyBindings = $__2.hostPropertyBindings;
          this.directiveIndex = directiveIndex;
          this.propertyBindings = propertyBindings;
          this.eventBindings = eventBindings;
          this.hostPropertyBindings = hostPropertyBindings;
        }
        return ($traceurRuntime.createClass)(DirectiveBinder, {}, {});
      }();
      $__export("DirectiveBinder", DirectiveBinder);
      $__export("ViewType", ViewType);
      (function(ViewType) {
        ViewType[ViewType["HOST"] = 0] = "HOST";
        ViewType[ViewType["COMPONENT"] = 1] = "COMPONENT";
        ViewType[ViewType["EMBEDDED"] = 2] = "EMBEDDED";
      })(ViewType || ($__export("ViewType", ViewType = {})));
      ProtoViewDto = function() {
        function ProtoViewDto($__1) {
          var $__2 = $__1,
              render = $__2.render,
              elementBinders = $__2.elementBinders,
              variableBindings = $__2.variableBindings,
              type = $__2.type;
          this.render = render;
          this.elementBinders = elementBinders;
          this.variableBindings = variableBindings;
          this.type = type;
        }
        return ($traceurRuntime.createClass)(ProtoViewDto, {}, {});
      }();
      $__export("ProtoViewDto", ProtoViewDto);
      hostRegExp = RegExpWrapper.create('^(?:(?:\\[([^\\]]+)\\])|(?:\\(([^\\)]+)\\))|(?:@(.+)))$');
      DirectiveMetadata = function() {
        function DirectiveMetadata($__1) {
          var $__2 = $__1,
              id = $__2.id,
              selector = $__2.selector,
              compileChildren = $__2.compileChildren,
              events = $__2.events,
              hostListeners = $__2.hostListeners,
              hostProperties = $__2.hostProperties,
              hostAttributes = $__2.hostAttributes,
              hostActions = $__2.hostActions,
              properties = $__2.properties,
              readAttributes = $__2.readAttributes,
              type = $__2.type,
              callOnDestroy = $__2.callOnDestroy,
              callOnChange = $__2.callOnChange,
              callOnCheck = $__2.callOnCheck,
              callOnInit = $__2.callOnInit,
              callOnAllChangesDone = $__2.callOnAllChangesDone,
              changeDetection = $__2.changeDetection,
              exportAs = $__2.exportAs;
          this.id = id;
          this.selector = selector;
          this.compileChildren = isPresent(compileChildren) ? compileChildren : true;
          this.events = events;
          this.hostListeners = hostListeners;
          this.hostAttributes = hostAttributes;
          this.hostProperties = hostProperties;
          this.hostActions = hostActions;
          this.properties = properties;
          this.readAttributes = readAttributes;
          this.type = type;
          this.callOnDestroy = callOnDestroy;
          this.callOnChange = callOnChange;
          this.callOnCheck = callOnCheck;
          this.callOnInit = callOnInit;
          this.callOnAllChangesDone = callOnAllChangesDone;
          this.changeDetection = changeDetection;
          this.exportAs = exportAs;
        }
        return ($traceurRuntime.createClass)(DirectiveMetadata, {}, {
          get DIRECTIVE_TYPE() {
            return 0;
          },
          get COMPONENT_TYPE() {
            return 1;
          },
          create: function($__1) {
            var $__2 = $__1,
                id = $__2.id,
                selector = $__2.selector,
                compileChildren = $__2.compileChildren,
                events = $__2.events,
                host = $__2.host,
                properties = $__2.properties,
                readAttributes = $__2.readAttributes,
                type = $__2.type,
                callOnDestroy = $__2.callOnDestroy,
                callOnChange = $__2.callOnChange,
                callOnCheck = $__2.callOnCheck,
                callOnInit = $__2.callOnInit,
                callOnAllChangesDone = $__2.callOnAllChangesDone,
                changeDetection = $__2.changeDetection,
                exportAs = $__2.exportAs;
            var hostListeners = new Map();
            var hostProperties = new Map();
            var hostAttributes = new Map();
            var hostActions = new Map();
            if (isPresent(host)) {
              MapWrapper.forEach(host, function(value, key) {
                var matches = RegExpWrapper.firstMatch(hostRegExp, key);
                if (isBlank(matches)) {
                  hostAttributes.set(key, value);
                } else if (isPresent(matches[1])) {
                  hostProperties.set(matches[1], value);
                } else if (isPresent(matches[2])) {
                  hostListeners.set(matches[2], value);
                } else if (isPresent(matches[3])) {
                  hostActions.set(matches[3], value);
                }
              });
            }
            return new DirectiveMetadata({
              id: id,
              selector: selector,
              compileChildren: compileChildren,
              events: events,
              hostListeners: hostListeners,
              hostProperties: hostProperties,
              hostAttributes: hostAttributes,
              hostActions: hostActions,
              properties: properties,
              readAttributes: readAttributes,
              type: type,
              callOnDestroy: callOnDestroy,
              callOnChange: callOnChange,
              callOnCheck: callOnCheck,
              callOnInit: callOnInit,
              callOnAllChangesDone: callOnAllChangesDone,
              changeDetection: changeDetection,
              exportAs: exportAs
            });
          }
        });
      }();
      $__export("DirectiveMetadata", DirectiveMetadata);
      RenderProtoViewRef = function() {
        function RenderProtoViewRef() {}
        return ($traceurRuntime.createClass)(RenderProtoViewRef, {}, {});
      }();
      $__export("RenderProtoViewRef", RenderProtoViewRef);
      RenderViewRef = function() {
        function RenderViewRef() {}
        return ($traceurRuntime.createClass)(RenderViewRef, {}, {});
      }();
      $__export("RenderViewRef", RenderViewRef);
      ViewDefinition = function() {
        function ViewDefinition($__1) {
          var $__2 = $__1,
              componentId = $__2.componentId,
              templateAbsUrl = $__2.templateAbsUrl,
              template = $__2.template,
              styleAbsUrls = $__2.styleAbsUrls,
              styles = $__2.styles,
              directives = $__2.directives;
          this.componentId = componentId;
          this.templateAbsUrl = templateAbsUrl;
          this.template = template;
          this.styleAbsUrls = styleAbsUrls;
          this.styles = styles;
          this.directives = directives;
        }
        return ($traceurRuntime.createClass)(ViewDefinition, {}, {});
      }();
      $__export("ViewDefinition", ViewDefinition);
      RenderCompiler = function() {
        function RenderCompiler() {}
        return ($traceurRuntime.createClass)(RenderCompiler, {
          compileHost: function(directiveMetadata) {
            return null;
          },
          compile: function(view) {
            return null;
          }
        }, {});
      }();
      $__export("RenderCompiler", RenderCompiler);
      Renderer = function() {
        function Renderer() {}
        return ($traceurRuntime.createClass)(Renderer, {
          createRootHostView: function(hostProtoViewRef, hostElementSelector) {
            return null;
          },
          createView: function(protoViewRef) {
            return null;
          },
          destroyView: function(viewRef) {},
          attachComponentView: function(location, componentViewRef) {},
          detachComponentView: function(location, componentViewRef) {},
          attachViewInContainer: function(location, atIndex, viewRef) {},
          detachViewInContainer: function(location, atIndex, viewRef) {},
          hydrateView: function(viewRef) {},
          dehydrateView: function(viewRef) {},
          getNativeElementSync: function(location) {
            return null;
          },
          setElementProperty: function(location, propertyName, propertyValue) {},
          setElementAttribute: function(location, attributeName, attributeValue) {},
          setElementClass: function(location, className, isAdd) {},
          setElementStyle: function(location, styleName, styleValue) {},
          invokeElementMethod: function(location, methodName, args) {},
          setText: function(viewRef, textNodeIndex, text) {},
          setEventDispatcher: function(viewRef, dispatcher) {}
        }, {});
      }();
      $__export("Renderer", Renderer);
    }
  };
});
//# sourceMappingURL=api.js.map

//# sourceMappingURL=../../src/render/api.js.map