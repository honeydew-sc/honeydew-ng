System.register(["./constants", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var ON_PUSH,
      StringWrapper,
      normalizeBool,
      DirectiveIndex,
      DirectiveRecord;
  return {
    setters: [function($__m) {
      ON_PUSH = $__m.ON_PUSH;
    }, function($__m) {
      StringWrapper = $__m.StringWrapper;
      normalizeBool = $__m.normalizeBool;
    }],
    execute: function() {
      DirectiveIndex = function() {
        function DirectiveIndex(elementIndex, directiveIndex) {
          this.elementIndex = elementIndex;
          this.directiveIndex = directiveIndex;
        }
        return ($traceurRuntime.createClass)(DirectiveIndex, {get name() {
            return (this.elementIndex + "_" + this.directiveIndex);
          }}, {});
      }();
      $__export("DirectiveIndex", DirectiveIndex);
      DirectiveRecord = function() {
        function DirectiveRecord() {
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              directiveIndex = $__1.directiveIndex,
              callOnAllChangesDone = $__1.callOnAllChangesDone,
              callOnChange = $__1.callOnChange,
              callOnCheck = $__1.callOnCheck,
              callOnInit = $__1.callOnInit,
              changeDetection = $__1.changeDetection;
          this.directiveIndex = directiveIndex;
          this.callOnAllChangesDone = normalizeBool(callOnAllChangesDone);
          this.callOnChange = normalizeBool(callOnChange);
          this.callOnCheck = normalizeBool(callOnCheck);
          this.callOnInit = normalizeBool(callOnInit);
          this.changeDetection = changeDetection;
        }
        return ($traceurRuntime.createClass)(DirectiveRecord, {isOnPushChangeDetection: function() {
            return StringWrapper.equals(this.changeDetection, ON_PUSH);
          }}, {});
      }();
      $__export("DirectiveRecord", DirectiveRecord);
    }
  };
});
//# sourceMappingURL=directive_record.js.map

//# sourceMappingURL=../../src/change_detection/directive_record.js.map