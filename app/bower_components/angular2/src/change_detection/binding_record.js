System.register(["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var isPresent,
      DIRECTIVE,
      DIRECTIVE_LIFECYCLE,
      ELEMENT_PROPERTY,
      ELEMENT_ATTRIBUTE,
      ELEMENT_CLASS,
      ELEMENT_STYLE,
      TEXT_NODE,
      BindingRecord;
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
    }],
    execute: function() {
      DIRECTIVE = "directive";
      DIRECTIVE_LIFECYCLE = "directiveLifecycle";
      ELEMENT_PROPERTY = "elementProperty";
      ELEMENT_ATTRIBUTE = "elementAttribute";
      ELEMENT_CLASS = "elementClass";
      ELEMENT_STYLE = "elementStyle";
      TEXT_NODE = "textNode";
      BindingRecord = function() {
        function BindingRecord(mode, implicitReceiver, ast, elementIndex, propertyName, propertyUnit, setter, lifecycleEvent, directiveRecord) {
          this.mode = mode;
          this.implicitReceiver = implicitReceiver;
          this.ast = ast;
          this.elementIndex = elementIndex;
          this.propertyName = propertyName;
          this.propertyUnit = propertyUnit;
          this.setter = setter;
          this.lifecycleEvent = lifecycleEvent;
          this.directiveRecord = directiveRecord;
        }
        return ($traceurRuntime.createClass)(BindingRecord, {
          callOnChange: function() {
            return isPresent(this.directiveRecord) && this.directiveRecord.callOnChange;
          },
          isOnPushChangeDetection: function() {
            return isPresent(this.directiveRecord) && this.directiveRecord.isOnPushChangeDetection();
          },
          isDirective: function() {
            return this.mode === DIRECTIVE;
          },
          isDirectiveLifecycle: function() {
            return this.mode === DIRECTIVE_LIFECYCLE;
          },
          isElementProperty: function() {
            return this.mode === ELEMENT_PROPERTY;
          },
          isElementAttribute: function() {
            return this.mode === ELEMENT_ATTRIBUTE;
          },
          isElementClass: function() {
            return this.mode === ELEMENT_CLASS;
          },
          isElementStyle: function() {
            return this.mode === ELEMENT_STYLE;
          },
          isTextNode: function() {
            return this.mode === TEXT_NODE;
          }
        }, {
          createForDirective: function(ast, propertyName, setter, directiveRecord) {
            return new BindingRecord(DIRECTIVE, 0, ast, 0, propertyName, null, setter, null, directiveRecord);
          },
          createDirectiveOnCheck: function(directiveRecord) {
            return new BindingRecord(DIRECTIVE_LIFECYCLE, 0, null, 0, null, null, null, "onCheck", directiveRecord);
          },
          createDirectiveOnInit: function(directiveRecord) {
            return new BindingRecord(DIRECTIVE_LIFECYCLE, 0, null, 0, null, null, null, "onInit", directiveRecord);
          },
          createDirectiveOnChange: function(directiveRecord) {
            return new BindingRecord(DIRECTIVE_LIFECYCLE, 0, null, 0, null, null, null, "onChange", directiveRecord);
          },
          createForElementProperty: function(ast, elementIndex, propertyName) {
            return new BindingRecord(ELEMENT_PROPERTY, 0, ast, elementIndex, propertyName, null, null, null, null);
          },
          createForElementAttribute: function(ast, elementIndex, attributeName) {
            return new BindingRecord(ELEMENT_ATTRIBUTE, 0, ast, elementIndex, attributeName, null, null, null, null);
          },
          createForElementClass: function(ast, elementIndex, className) {
            return new BindingRecord(ELEMENT_CLASS, 0, ast, elementIndex, className, null, null, null, null);
          },
          createForElementStyle: function(ast, elementIndex, styleName, unit) {
            return new BindingRecord(ELEMENT_STYLE, 0, ast, elementIndex, styleName, unit, null, null, null);
          },
          createForHostProperty: function(directiveIndex, ast, propertyName) {
            return new BindingRecord(ELEMENT_PROPERTY, directiveIndex, ast, directiveIndex.elementIndex, propertyName, null, null, null, null);
          },
          createForHostAttribute: function(directiveIndex, ast, attributeName) {
            return new BindingRecord(ELEMENT_ATTRIBUTE, directiveIndex, ast, directiveIndex.elementIndex, attributeName, null, null, null, null);
          },
          createForHostClass: function(directiveIndex, ast, className) {
            return new BindingRecord(ELEMENT_CLASS, directiveIndex, ast, directiveIndex.elementIndex, className, null, null, null, null);
          },
          createForHostStyle: function(directiveIndex, ast, styleName, unit) {
            return new BindingRecord(ELEMENT_STYLE, directiveIndex, ast, directiveIndex.elementIndex, styleName, unit, null, null, null);
          },
          createForTextNode: function(ast, elementIndex) {
            return new BindingRecord(TEXT_NODE, 0, ast, elementIndex, null, null, null, null, null);
          }
        });
      }();
      $__export("BindingRecord", BindingRecord);
    }
  };
});
//# sourceMappingURL=binding_record.js.map

//# sourceMappingURL=../../src/change_detection/binding_record.js.map