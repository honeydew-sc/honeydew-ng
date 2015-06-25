System.register([], function($__export) {
  "use strict";
  var ElementBinder,
      Event,
      HostAction;
  return {
    setters: [],
    execute: function() {
      ElementBinder = function() {
        function ElementBinder() {
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              textNodeIndices = $__1.textNodeIndices,
              contentTagSelector = $__1.contentTagSelector,
              nestedProtoView = $__1.nestedProtoView,
              componentId = $__1.componentId,
              eventLocals = $__1.eventLocals,
              localEvents = $__1.localEvents,
              globalEvents = $__1.globalEvents,
              parentIndex = $__1.parentIndex,
              distanceToParent = $__1.distanceToParent,
              elementIsEmpty = $__1.elementIsEmpty;
          this.textNodeIndices = textNodeIndices;
          this.contentTagSelector = contentTagSelector;
          this.nestedProtoView = nestedProtoView;
          this.componentId = componentId;
          this.eventLocals = eventLocals;
          this.localEvents = localEvents;
          this.globalEvents = globalEvents;
          this.parentIndex = parentIndex;
          this.distanceToParent = distanceToParent;
          this.elementIsEmpty = elementIsEmpty;
        }
        return ($traceurRuntime.createClass)(ElementBinder, {}, {});
      }();
      $__export("ElementBinder", ElementBinder);
      Event = function() {
        function Event(name, target, fullName) {
          this.name = name;
          this.target = target;
          this.fullName = fullName;
        }
        return ($traceurRuntime.createClass)(Event, {}, {});
      }();
      $__export("Event", Event);
      HostAction = function() {
        function HostAction(actionName, actionExpression, expression) {
          this.actionName = actionName;
          this.actionExpression = actionExpression;
          this.expression = expression;
        }
        return ($traceurRuntime.createClass)(HostAction, {}, {});
      }();
      $__export("HostAction", HostAction);
    }
  };
});
//# sourceMappingURL=element_binder.js.map

//# sourceMappingURL=../../../../src/render/dom/view/element_binder.js.map