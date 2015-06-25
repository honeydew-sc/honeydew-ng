System.register([], function($__export) {
  "use strict";
  var RecordType,
      ProtoRecord;
  return {
    setters: [],
    execute: function() {
      $__export("RecordType", RecordType);
      (function(RecordType) {
        RecordType[RecordType["SELF"] = 0] = "SELF";
        RecordType[RecordType["CONST"] = 1] = "CONST";
        RecordType[RecordType["PRIMITIVE_OP"] = 2] = "PRIMITIVE_OP";
        RecordType[RecordType["PROPERTY"] = 3] = "PROPERTY";
        RecordType[RecordType["LOCAL"] = 4] = "LOCAL";
        RecordType[RecordType["INVOKE_METHOD"] = 5] = "INVOKE_METHOD";
        RecordType[RecordType["INVOKE_CLOSURE"] = 6] = "INVOKE_CLOSURE";
        RecordType[RecordType["KEYED_ACCESS"] = 7] = "KEYED_ACCESS";
        RecordType[RecordType["PIPE"] = 8] = "PIPE";
        RecordType[RecordType["INTERPOLATE"] = 9] = "INTERPOLATE";
        RecordType[RecordType["SAFE_PROPERTY"] = 10] = "SAFE_PROPERTY";
        RecordType[RecordType["SAFE_INVOKE_METHOD"] = 11] = "SAFE_INVOKE_METHOD";
        RecordType[RecordType["DIRECTIVE_LIFECYCLE"] = 12] = "DIRECTIVE_LIFECYCLE";
      })(RecordType || ($__export("RecordType", RecordType = {})));
      ProtoRecord = function() {
        function ProtoRecord(mode, name, funcOrValue, args, fixedArgs, contextIndex, directiveIndex, selfIndex, bindingRecord, expressionAsString, lastInBinding, lastInDirective) {
          this.mode = mode;
          this.name = name;
          this.funcOrValue = funcOrValue;
          this.args = args;
          this.fixedArgs = fixedArgs;
          this.contextIndex = contextIndex;
          this.directiveIndex = directiveIndex;
          this.selfIndex = selfIndex;
          this.bindingRecord = bindingRecord;
          this.expressionAsString = expressionAsString;
          this.lastInBinding = lastInBinding;
          this.lastInDirective = lastInDirective;
        }
        return ($traceurRuntime.createClass)(ProtoRecord, {
          isPureFunction: function() {
            return this.mode === RecordType.INTERPOLATE || this.mode === RecordType.PRIMITIVE_OP;
          },
          isPipeRecord: function() {
            return this.mode === RecordType.PIPE;
          },
          isLifeCycleRecord: function() {
            return this.mode === RecordType.DIRECTIVE_LIFECYCLE;
          }
        }, {});
      }();
      $__export("ProtoRecord", ProtoRecord);
    }
  };
});
//# sourceMappingURL=proto_record.js.map

//# sourceMappingURL=../../src/change_detection/proto_record.js.map