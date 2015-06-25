System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "./abstract_change_detector", "./change_detection_util", "./proto_record"], function($__export) {
  "use strict";
  var BaseException,
      ListWrapper,
      AbstractChangeDetector,
      ChangeDetectionUtil,
      RecordType,
      ABSTRACT_CHANGE_DETECTOR,
      UTIL,
      DISPATCHER_ACCESSOR,
      PIPE_REGISTRY_ACCESSOR,
      PROTOS_ACCESSOR,
      DIRECTIVES_ACCESSOR,
      CONTEXT_ACCESSOR,
      IS_CHANGED_LOCAL,
      CHANGES_LOCAL,
      LOCALS_ACCESSOR,
      MODE_ACCESSOR,
      CURRENT_PROTO,
      ALREADY_CHECKED_ACCESSOR,
      ChangeDetectorJITGenerator;
  function _sanitizeName(s) {
    return s.replace(new RegExp("\\W", "g"), '');
  }
  return {
    setters: [function($__m) {
      BaseException = $__m.BaseException;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      AbstractChangeDetector = $__m.AbstractChangeDetector;
    }, function($__m) {
      ChangeDetectionUtil = $__m.ChangeDetectionUtil;
    }, function($__m) {
      RecordType = $__m.RecordType;
    }],
    execute: function() {
      ABSTRACT_CHANGE_DETECTOR = "AbstractChangeDetector";
      UTIL = "ChangeDetectionUtil";
      DISPATCHER_ACCESSOR = "this.dispatcher";
      PIPE_REGISTRY_ACCESSOR = "this.pipeRegistry";
      PROTOS_ACCESSOR = "this.protos";
      DIRECTIVES_ACCESSOR = "this.directiveRecords";
      CONTEXT_ACCESSOR = "this.context";
      IS_CHANGED_LOCAL = "isChanged";
      CHANGES_LOCAL = "changes";
      LOCALS_ACCESSOR = "this.locals";
      MODE_ACCESSOR = "this.mode";
      CURRENT_PROTO = "currentProto";
      ALREADY_CHECKED_ACCESSOR = "this.alreadyChecked";
      ChangeDetectorJITGenerator = function() {
        function ChangeDetectorJITGenerator(id, changeDetectionStrategy, records, directiveRecords) {
          this.id = id;
          this.changeDetectionStrategy = changeDetectionStrategy;
          this.records = records;
          this.directiveRecords = directiveRecords;
          this._localNames = this._getLocalNames(records);
          this._changeNames = this._getChangeNames(this._localNames);
          this._fieldNames = this._getFieldNames(this._localNames);
          this._pipeNames = this._getPipeNames(this._localNames);
        }
        return ($traceurRuntime.createClass)(ChangeDetectorJITGenerator, {
          _getLocalNames: function(records) {
            var index = 0;
            var names = records.map(function(r) {
              return _sanitizeName(("" + r.name + index++));
            });
            return ["context"].concat(names);
          },
          _getChangeNames: function(_localNames) {
            return _localNames.map(function(n) {
              return ("change_" + n);
            });
          },
          _getFieldNames: function(_localNames) {
            return _localNames.map(function(n) {
              return ("this." + n);
            });
          },
          _getPipeNames: function(_localNames) {
            return _localNames.map(function(n) {
              return ("this." + n + "_pipe");
            });
          },
          generate: function() {
            var $__0 = this;
            var typeName = _sanitizeName(("ChangeDetector_" + this.id));
            var classDefinition = ("\n      var " + typeName + " = function " + typeName + "(dispatcher, pipeRegistry, protos, directiveRecords) {\n        " + ABSTRACT_CHANGE_DETECTOR + ".call(this, " + JSON.stringify(this.id) + ");\n        " + DISPATCHER_ACCESSOR + " = dispatcher;\n        " + PIPE_REGISTRY_ACCESSOR + " = pipeRegistry;\n        " + PROTOS_ACCESSOR + " = protos;\n        " + DIRECTIVES_ACCESSOR + " = directiveRecords;\n        " + LOCALS_ACCESSOR + " = null;\n        " + ALREADY_CHECKED_ACCESSOR + " = false;\n        " + this._genFieldDefinitions() + "\n      }\n\n      " + typeName + ".prototype = Object.create(" + ABSTRACT_CHANGE_DETECTOR + ".prototype);\n\n      " + typeName + ".prototype.detectChangesInRecords = function(throwOnChange) {\n        if (!this.hydrated()) {\n          " + UTIL + ".throwDehydrated();\n        }\n        " + this._genLocalDefinitions() + "\n        " + this._genChangeDefinitions() + "\n        var " + IS_CHANGED_LOCAL + " = false;\n        var " + CURRENT_PROTO + ";\n        var " + CHANGES_LOCAL + " = null;\n\n        context = " + CONTEXT_ACCESSOR + ";\n\n        " + this.records.map(function(r) {
              return $__0._genRecord(r);
            }).join("\n") + "\n\n        " + ALREADY_CHECKED_ACCESSOR + " = true;\n      }\n\n      " + typeName + ".prototype.callOnAllChangesDone = function() {\n        " + this._genCallOnAllChangesDoneBody() + "\n      }\n\n      " + typeName + ".prototype.hydrate = function(context, locals, directives) {\n        " + MODE_ACCESSOR + " = \"" + ChangeDetectionUtil.changeDetectionMode(this.changeDetectionStrategy) + "\";\n        " + CONTEXT_ACCESSOR + " = context;\n        " + LOCALS_ACCESSOR + " = locals;\n        " + this._genHydrateDirectives() + "\n        " + this._genHydrateDetectors() + "\n        " + ALREADY_CHECKED_ACCESSOR + " = false;\n      }\n\n      " + typeName + ".prototype.dehydrate = function() {\n        " + this._genPipeOnDestroy() + "\n        " + this._genFieldDefinitions() + "\n        " + LOCALS_ACCESSOR + " = null;\n      }\n\n      " + typeName + ".prototype.hydrated = function() {\n        return " + CONTEXT_ACCESSOR + " !== null;\n      }\n\n      return function(dispatcher, pipeRegistry) {\n        return new " + typeName + "(dispatcher, pipeRegistry, protos, directiveRecords);\n      }\n    ");
            return new Function('AbstractChangeDetector', 'ChangeDetectionUtil', 'protos', 'directiveRecords', classDefinition)(AbstractChangeDetector, ChangeDetectionUtil, this.records, this.directiveRecords);
          },
          _genGetDirectiveFieldNames: function() {
            var $__0 = this;
            return this.directiveRecords.map(function(d) {
              return $__0._genGetDirective(d.directiveIndex);
            });
          },
          _genGetDetectorFieldNames: function() {
            var $__0 = this;
            return this.directiveRecords.filter(function(r) {
              return r.isOnPushChangeDetection();
            }).map(function(d) {
              return $__0._genGetDetector(d.directiveIndex);
            });
          },
          _genGetDirective: function(d) {
            return ("this.directive_" + d.name);
          },
          _genGetDetector: function(d) {
            return ("this.detector_" + d.name);
          },
          _getNonNullPipeNames: function() {
            var $__0 = this;
            var pipes = [];
            this.records.forEach(function(r) {
              if (r.isPipeRecord()) {
                pipes.push($__0._pipeNames[r.selfIndex]);
              }
            });
            return pipes;
          },
          _genFieldDefinitions: function() {
            var fields = [];
            fields = fields.concat(this._fieldNames);
            fields = fields.concat(this._getNonNullPipeNames());
            fields = fields.concat(this._genGetDirectiveFieldNames());
            fields = fields.concat(this._genGetDetectorFieldNames());
            return fields.map(function(n) {
              return n == CONTEXT_ACCESSOR ? (n + " = null;") : (n + " = " + UTIL + ".uninitialized();");
            }).join("\n");
          },
          _genHydrateDirectives: function() {
            var directiveFieldNames = this._genGetDirectiveFieldNames();
            var lines = ListWrapper.createFixedSize(directiveFieldNames.length);
            for (var i = 0,
                iLen = directiveFieldNames.length; i < iLen; ++i) {
              lines[i] = (directiveFieldNames[i] + " = directives.getDirectiveFor(" + DIRECTIVES_ACCESSOR + "[" + i + "].directiveIndex);");
            }
            return lines.join('\n');
          },
          _genHydrateDetectors: function() {
            var detectorFieldNames = this._genGetDetectorFieldNames();
            var lines = ListWrapper.createFixedSize(detectorFieldNames.length);
            for (var i = 0,
                iLen = detectorFieldNames.length; i < iLen; ++i) {
              lines[i] = (detectorFieldNames[i] + " =\n          directives.getDetectorFor(" + DIRECTIVES_ACCESSOR + "[" + i + "].directiveIndex);");
            }
            return lines.join('\n');
          },
          _genPipeOnDestroy: function() {
            return this._getNonNullPipeNames().map(function(p) {
              return (p + ".onDestroy();");
            }).join("\n");
          },
          _genCallOnAllChangesDoneBody: function() {
            var notifications = [];
            var dirs = this.directiveRecords;
            for (var i = dirs.length - 1; i >= 0; --i) {
              var dir = dirs[i];
              if (dir.callOnAllChangesDone) {
                notifications.push((this._genGetDirective(dir.directiveIndex) + ".onAllChangesDone();"));
              }
            }
            var directiveNotifications = notifications.join("\n");
            return ("\n      this.dispatcher.notifyOnAllChangesDone();\n      " + directiveNotifications + "\n    ");
          },
          _genLocalDefinitions: function() {
            return this._localNames.map(function(n) {
              return ("var " + n + ";");
            }).join("\n");
          },
          _genChangeDefinitions: function() {
            return this._changeNames.map(function(n) {
              return ("var " + n + " = false;");
            }).join("\n");
          },
          _genRecord: function(r) {
            var rec;
            if (r.isLifeCycleRecord()) {
              rec = this._genDirectiveLifecycle(r);
            } else if (r.isPipeRecord()) {
              rec = this._genPipeCheck(r);
            } else {
              rec = this._genReferenceCheck(r);
            }
            return ("" + rec + this._maybeGenLastInDirective(r));
          },
          _genDirectiveLifecycle: function(r) {
            if (r.name === "onCheck") {
              return this._genOnCheck(r);
            } else if (r.name === "onInit") {
              return this._genOnInit(r);
            } else if (r.name === "onChange") {
              return this._genOnChange(r);
            } else {
              throw new BaseException(("Unknown lifecycle event '" + r.name + "'"));
            }
          },
          _genPipeCheck: function(r) {
            var context = this._localNames[r.contextIndex];
            var oldValue = this._fieldNames[r.selfIndex];
            var newValue = this._localNames[r.selfIndex];
            var change = this._changeNames[r.selfIndex];
            var pipe = this._pipeNames[r.selfIndex];
            var cdRef = "this.ref";
            var protoIndex = r.selfIndex - 1;
            var pipeType = r.name;
            return ("\n      " + CURRENT_PROTO + " = " + PROTOS_ACCESSOR + "[" + protoIndex + "];\n      if (" + pipe + " === " + UTIL + ".uninitialized()) {\n        " + pipe + " = " + PIPE_REGISTRY_ACCESSOR + ".get('" + pipeType + "', " + context + ", " + cdRef + ");\n      } else if (!" + pipe + ".supports(" + context + ")) {\n        " + pipe + ".onDestroy();\n        " + pipe + " = " + PIPE_REGISTRY_ACCESSOR + ".get('" + pipeType + "', " + context + ", " + cdRef + ");\n      }\n\n      " + newValue + " = " + pipe + ".transform(" + context + ");\n      if (" + oldValue + " !== " + newValue + ") {\n        " + newValue + " = " + UTIL + ".unwrapValue(" + newValue + ");\n        " + change + " = true;\n        " + this._genUpdateDirectiveOrElement(r) + "\n        " + this._genAddToChanges(r) + "\n        " + oldValue + " = " + newValue + ";\n      }\n    ");
          },
          _genReferenceCheck: function(r) {
            var $__0 = this;
            var oldValue = this._fieldNames[r.selfIndex];
            var newValue = this._localNames[r.selfIndex];
            var protoIndex = r.selfIndex - 1;
            var check = ("\n      " + CURRENT_PROTO + " = " + PROTOS_ACCESSOR + "[" + protoIndex + "];\n      " + this._genUpdateCurrentValue(r) + "\n      if (" + newValue + " !== " + oldValue + ") {\n        " + this._changeNames[r.selfIndex] + " = true;\n        " + this._genUpdateDirectiveOrElement(r) + "\n        " + this._genAddToChanges(r) + "\n        " + oldValue + " = " + newValue + ";\n      }\n    ");
            if (r.isPureFunction()) {
              var condition = r.args.map(function(a) {
                return $__0._changeNames[a];
              }).join(" || ");
              return ("if (" + condition + ") { " + check + " } else { " + newValue + " = " + oldValue + "; }");
            } else {
              return check;
            }
          },
          _genUpdateCurrentValue: function(r) {
            var $__0 = this;
            var context = (r.contextIndex == -1) ? this._genGetDirective(r.directiveIndex) : this._localNames[r.contextIndex];
            var newValue = this._localNames[r.selfIndex];
            var argString = r.args.map(function(arg) {
              return $__0._localNames[arg];
            }).join(", ");
            var rhs;
            switch (r.mode) {
              case RecordType.SELF:
                rhs = context;
                break;
              case RecordType.CONST:
                rhs = JSON.stringify(r.funcOrValue);
                break;
              case RecordType.PROPERTY:
                rhs = (context + "." + r.name);
                break;
              case RecordType.SAFE_PROPERTY:
                rhs = (UTIL + ".isValueBlank(" + context + ") ? null : " + context + "." + r.name);
                break;
              case RecordType.LOCAL:
                rhs = (LOCALS_ACCESSOR + ".get('" + r.name + "')");
                break;
              case RecordType.INVOKE_METHOD:
                rhs = (context + "." + r.name + "(" + argString + ")");
                break;
              case RecordType.SAFE_INVOKE_METHOD:
                rhs = (UTIL + ".isValueBlank(" + context + ") ? null : " + context + "." + r.name + "(" + argString + ")");
                break;
              case RecordType.INVOKE_CLOSURE:
                rhs = (context + "(" + argString + ")");
                break;
              case RecordType.PRIMITIVE_OP:
                rhs = (UTIL + "." + r.name + "(" + argString + ")");
                break;
              case RecordType.INTERPOLATE:
                rhs = this._genInterpolation(r);
                break;
              case RecordType.KEYED_ACCESS:
                rhs = (context + "[" + this._localNames[r.args[0]] + "]");
                break;
              default:
                throw new BaseException(("Unknown operation " + r.mode));
            }
            return (newValue + " = " + rhs);
          },
          _genInterpolation: function(r) {
            var res = "";
            for (var i = 0; i < r.args.length; ++i) {
              res += JSON.stringify(r.fixedArgs[i]);
              res += " + ";
              res += this._localNames[r.args[i]];
              res += " + ";
            }
            res += JSON.stringify(r.fixedArgs[r.args.length]);
            return res;
          },
          _genUpdateDirectiveOrElement: function(r) {
            if (!r.lastInBinding)
              return "";
            var newValue = this._localNames[r.selfIndex];
            var oldValue = this._fieldNames[r.selfIndex];
            var br = r.bindingRecord;
            if (br.isDirective()) {
              var directiveProperty = (this._genGetDirective(br.directiveRecord.directiveIndex) + "." + br.propertyName);
              return ("\n        " + this._genThrowOnChangeCheck(oldValue, newValue) + "\n        " + directiveProperty + " = " + newValue + ";\n        " + IS_CHANGED_LOCAL + " = true;\n      ");
            } else {
              return ("\n        " + this._genThrowOnChangeCheck(oldValue, newValue) + "\n        " + DISPATCHER_ACCESSOR + ".notifyOnBinding(" + CURRENT_PROTO + ".bindingRecord, " + newValue + ");\n      ");
            }
          },
          _genThrowOnChangeCheck: function(oldValue, newValue) {
            return ("\n      if(throwOnChange) {\n        " + UTIL + ".throwOnChange(" + CURRENT_PROTO + ", " + UTIL + ".simpleChange(" + oldValue + ", " + newValue + "));\n      }\n      ");
          },
          _genAddToChanges: function(r) {
            var newValue = this._localNames[r.selfIndex];
            var oldValue = this._fieldNames[r.selfIndex];
            if (!r.bindingRecord.callOnChange())
              return "";
            return ("\n      " + CHANGES_LOCAL + " = " + UTIL + ".addChange(\n          " + CHANGES_LOCAL + ", " + CURRENT_PROTO + ".bindingRecord.propertyName,\n          " + UTIL + ".simpleChange(" + oldValue + ", " + newValue + "));\n    ");
          },
          _maybeGenLastInDirective: function(r) {
            if (!r.lastInDirective)
              return "";
            return ("\n      " + CHANGES_LOCAL + " = null;\n      " + this._genNotifyOnPushDetectors(r) + "\n      " + IS_CHANGED_LOCAL + " = false;\n    ");
          },
          _genOnCheck: function(r) {
            var br = r.bindingRecord;
            return ("if (!throwOnChange) " + this._genGetDirective(br.directiveRecord.directiveIndex) + ".onCheck();");
          },
          _genOnInit: function(r) {
            var br = r.bindingRecord;
            return ("if (!throwOnChange && !" + ALREADY_CHECKED_ACCESSOR + ") " + this._genGetDirective(br.directiveRecord.directiveIndex) + ".onInit();");
          },
          _genOnChange: function(r) {
            var br = r.bindingRecord;
            return ("if (!throwOnChange && " + CHANGES_LOCAL + ") " + this._genGetDirective(br.directiveRecord.directiveIndex) + ".onChange(" + CHANGES_LOCAL + ");");
          },
          _genNotifyOnPushDetectors: function(r) {
            var br = r.bindingRecord;
            if (!r.lastInDirective || !br.isOnPushChangeDetection())
              return "";
            var retVal = ("\n      if(" + IS_CHANGED_LOCAL + ") {\n        " + this._genGetDetector(br.directiveRecord.directiveIndex) + ".markAsCheckOnce();\n      }\n    ");
            return retVal;
          }
        }, {});
      }();
      $__export("ChangeDetectorJITGenerator", ChangeDetectorJITGenerator);
    }
  };
});
//# sourceMappingURL=change_detection_jit_generator.js.map

//# sourceMappingURL=../../src/change_detection/change_detection_jit_generator.js.map