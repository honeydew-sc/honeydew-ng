System.register([], function($__export) {
  "use strict";
  var ChangeDetection,
      ChangeDetectorDefinition;
  return {
    setters: [],
    execute: function() {
      ChangeDetection = function() {
        function ChangeDetection() {}
        return ($traceurRuntime.createClass)(ChangeDetection, {createProtoChangeDetector: function(definition) {
            return null;
          }}, {});
      }();
      $__export("ChangeDetection", ChangeDetection);
      ChangeDetectorDefinition = function() {
        function ChangeDetectorDefinition(id, strategy, variableNames, bindingRecords, directiveRecords) {
          this.id = id;
          this.strategy = strategy;
          this.variableNames = variableNames;
          this.bindingRecords = bindingRecords;
          this.directiveRecords = directiveRecords;
        }
        return ($traceurRuntime.createClass)(ChangeDetectorDefinition, {}, {});
      }();
      $__export("ChangeDetectorDefinition", ChangeDetectorDefinition);
    }
  };
});
//# sourceMappingURL=interfaces.js.map

//# sourceMappingURL=../../src/change_detection/interfaces.js.map