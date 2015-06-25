System.register(["angular2/src/facade/collection", "angular2/change_detection", "./element_binder", "angular2/src/facade/lang", "./view_ref", "./element_ref"], function($__export) {
  "use strict";
  var ListWrapper,
      MapWrapper,
      Map,
      StringMapWrapper,
      Locals,
      ElementBinder,
      isPresent,
      isBlank,
      BaseException,
      ViewRef,
      ElementRef,
      AppViewContainer,
      AppView,
      AppProtoView;
  return {
    setters: [function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      Map = $__m.Map;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      Locals = $__m.Locals;
    }, function($__m) {
      ElementBinder = $__m.ElementBinder;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
    }, function($__m) {
      ViewRef = $__m.ViewRef;
    }, function($__m) {
      ElementRef = $__m.ElementRef;
    }],
    execute: function() {
      AppViewContainer = function() {
        function AppViewContainer() {
          this.views = [];
        }
        return ($traceurRuntime.createClass)(AppViewContainer, {}, {});
      }();
      $__export("AppViewContainer", AppViewContainer);
      AppView = function() {
        function AppView(renderer, proto, protoLocals) {
          this.renderer = renderer;
          this.proto = proto;
          this.render = null;
          this.elementInjectors = null;
          this.changeDetector = null;
          this.componentChildViews = null;
          this.preBuiltObjects = null;
          this.context = null;
          this.viewContainers = ListWrapper.createFixedSize(this.proto.elementBinders.length);
          this.elementRefs = ListWrapper.createFixedSize(this.proto.elementBinders.length);
          this.ref = new ViewRef(this);
          for (var i = 0; i < this.elementRefs.length; i++) {
            this.elementRefs[i] = new ElementRef(this.ref, i, renderer);
          }
          this.locals = new Locals(null, MapWrapper.clone(protoLocals));
        }
        return ($traceurRuntime.createClass)(AppView, {
          init: function(changeDetector, elementInjectors, rootElementInjectors, preBuiltObjects, componentChildViews) {
            this.changeDetector = changeDetector;
            this.elementInjectors = elementInjectors;
            this.rootElementInjectors = rootElementInjectors;
            this.preBuiltObjects = preBuiltObjects;
            this.componentChildViews = componentChildViews;
          },
          setLocal: function(contextName, value) {
            if (!this.hydrated())
              throw new BaseException('Cannot set locals on dehydrated view.');
            if (!this.proto.variableBindings.has(contextName)) {
              return;
            }
            var templateName = this.proto.variableBindings.get(contextName);
            this.locals.set(templateName, value);
          },
          hydrated: function() {
            return isPresent(this.context);
          },
          triggerEventHandlers: function(eventName, eventObj, binderIndex) {
            var locals = new Map();
            locals.set('$event', eventObj);
            this.dispatchEvent(binderIndex, eventName, locals);
          },
          notifyOnBinding: function(b, currentValue) {
            if (b.isElementProperty()) {
              this.renderer.setElementProperty(this.elementRefs[b.elementIndex], b.propertyName, currentValue);
            } else if (b.isElementAttribute()) {
              this.renderer.setElementAttribute(this.elementRefs[b.elementIndex], b.propertyName, currentValue);
            } else if (b.isElementClass()) {
              this.renderer.setElementClass(this.elementRefs[b.elementIndex], b.propertyName, currentValue);
            } else if (b.isElementStyle()) {
              var unit = isPresent(b.propertyUnit) ? b.propertyUnit : '';
              this.renderer.setElementStyle(this.elementRefs[b.elementIndex], b.propertyName, ("" + currentValue + unit));
            } else if (b.isTextNode()) {
              this.renderer.setText(this.render, b.elementIndex, currentValue);
            } else {
              throw new BaseException('Unsupported directive record');
            }
          },
          notifyOnAllChangesDone: function() {
            var ei = this.elementInjectors;
            for (var i = ei.length - 1; i >= 0; i--) {
              if (isPresent(ei[i]))
                ei[i].onAllChangesDone();
            }
          },
          getDirectiveFor: function(directive) {
            var elementInjector = this.elementInjectors[directive.elementIndex];
            return elementInjector.getDirectiveAtIndex(directive.directiveIndex);
          },
          getDetectorFor: function(directive) {
            var childView = this.componentChildViews[directive.elementIndex];
            return isPresent(childView) ? childView.changeDetector : null;
          },
          invokeElementMethod: function(elementIndex, methodName, args) {
            this.renderer.invokeElementMethod(this.elementRefs[elementIndex], methodName, args);
          },
          dispatchEvent: function(elementIndex, eventName, locals) {
            var $__0 = this;
            var allowDefaultBehavior = true;
            if (this.hydrated()) {
              var elBinder = this.proto.elementBinders[elementIndex];
              if (isBlank(elBinder.hostListeners))
                return allowDefaultBehavior;
              var eventMap = elBinder.hostListeners[eventName];
              if (isBlank(eventMap))
                return allowDefaultBehavior;
              MapWrapper.forEach(eventMap, function(expr, directiveIndex) {
                var context;
                if (directiveIndex === -1) {
                  context = $__0.context;
                } else {
                  context = $__0.elementInjectors[elementIndex].getDirectiveAtIndex(directiveIndex);
                }
                var result = expr.eval(context, new Locals($__0.locals, locals));
                if (isPresent(result)) {
                  allowDefaultBehavior = allowDefaultBehavior && result == true;
                }
              });
            }
            return allowDefaultBehavior;
          }
        }, {});
      }();
      $__export("AppView", AppView);
      AppProtoView = function() {
        function AppProtoView(render, protoChangeDetector, variableBindings, variableLocations) {
          var $__0 = this;
          this.render = render;
          this.protoChangeDetector = protoChangeDetector;
          this.variableBindings = variableBindings;
          this.variableLocations = variableLocations;
          this.elementBinders = [];
          this.protoLocals = new Map();
          if (isPresent(variableBindings)) {
            MapWrapper.forEach(variableBindings, function(templateName, _) {
              $__0.protoLocals.set(templateName, null);
            });
          }
        }
        return ($traceurRuntime.createClass)(AppProtoView, {
          bindElement: function(parent, distanceToParent, protoElementInjector) {
            var componentDirective = arguments[3] !== (void 0) ? arguments[3] : null;
            var elBinder = new ElementBinder(this.elementBinders.length, parent, distanceToParent, protoElementInjector, componentDirective);
            this.elementBinders.push(elBinder);
            return elBinder;
          },
          bindEvent: function(eventBindings, boundElementIndex) {
            var directiveIndex = arguments[2] !== (void 0) ? arguments[2] : -1;
            var elBinder = this.elementBinders[boundElementIndex];
            var events = elBinder.hostListeners;
            if (isBlank(events)) {
              events = StringMapWrapper.create();
              elBinder.hostListeners = events;
            }
            for (var i = 0; i < eventBindings.length; i++) {
              var eventBinding = eventBindings[i];
              var eventName = eventBinding.fullName;
              var event = StringMapWrapper.get(events, eventName);
              if (isBlank(event)) {
                event = new Map();
                StringMapWrapper.set(events, eventName, event);
              }
              event.set(directiveIndex, eventBinding.source);
            }
          }
        }, {});
      }();
      $__export("AppProtoView", AppProtoView);
    }
  };
});
//# sourceMappingURL=view.js.map

//# sourceMappingURL=../../../src/core/compiler/view.js.map