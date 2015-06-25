System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "./parser/ast", "./change_detection_util", "./dynamic_change_detector", "./directive_record", "./coalesce", "./proto_record"], function($__export) {
  "use strict";
  var BaseException,
      isPresent,
      isString,
      ListWrapper,
      ImplicitReceiver,
      ChangeDetectionUtil,
      DynamicChangeDetector,
      DirectiveIndex,
      coalesce,
      ProtoRecord,
      RecordType,
      DynamicProtoChangeDetector,
      ProtoRecordBuilder,
      _ConvertAstIntoProtoRecords;
  function _arrayFn(length) {
    switch (length) {
      case 0:
        return ChangeDetectionUtil.arrayFn0;
      case 1:
        return ChangeDetectionUtil.arrayFn1;
      case 2:
        return ChangeDetectionUtil.arrayFn2;
      case 3:
        return ChangeDetectionUtil.arrayFn3;
      case 4:
        return ChangeDetectionUtil.arrayFn4;
      case 5:
        return ChangeDetectionUtil.arrayFn5;
      case 6:
        return ChangeDetectionUtil.arrayFn6;
      case 7:
        return ChangeDetectionUtil.arrayFn7;
      case 8:
        return ChangeDetectionUtil.arrayFn8;
      case 9:
        return ChangeDetectionUtil.arrayFn9;
      default:
        throw new BaseException("Does not support literal maps with more than 9 elements");
    }
  }
  function _mapPrimitiveName(keys) {
    var stringifiedKeys = ListWrapper.join(ListWrapper.map(keys, function(k) {
      return isString(k) ? ("\"" + k + "\"") : ("" + k);
    }), ", ");
    return ("mapFn([" + stringifiedKeys + "])");
  }
  function _operationToPrimitiveName(operation) {
    switch (operation) {
      case '+':
        return "operation_add";
      case '-':
        return "operation_subtract";
      case '*':
        return "operation_multiply";
      case '/':
        return "operation_divide";
      case '%':
        return "operation_remainder";
      case '==':
        return "operation_equals";
      case '!=':
        return "operation_not_equals";
      case '===':
        return "operation_identical";
      case '!==':
        return "operation_not_identical";
      case '<':
        return "operation_less_then";
      case '>':
        return "operation_greater_then";
      case '<=':
        return "operation_less_or_equals_then";
      case '>=':
        return "operation_greater_or_equals_then";
      case '&&':
        return "operation_logical_and";
      case '||':
        return "operation_logical_or";
      default:
        throw new BaseException(("Unsupported operation " + operation));
    }
  }
  function _operationToFunction(operation) {
    switch (operation) {
      case '+':
        return ChangeDetectionUtil.operation_add;
      case '-':
        return ChangeDetectionUtil.operation_subtract;
      case '*':
        return ChangeDetectionUtil.operation_multiply;
      case '/':
        return ChangeDetectionUtil.operation_divide;
      case '%':
        return ChangeDetectionUtil.operation_remainder;
      case '==':
        return ChangeDetectionUtil.operation_equals;
      case '!=':
        return ChangeDetectionUtil.operation_not_equals;
      case '===':
        return ChangeDetectionUtil.operation_identical;
      case '!==':
        return ChangeDetectionUtil.operation_not_identical;
      case '<':
        return ChangeDetectionUtil.operation_less_then;
      case '>':
        return ChangeDetectionUtil.operation_greater_then;
      case '<=':
        return ChangeDetectionUtil.operation_less_or_equals_then;
      case '>=':
        return ChangeDetectionUtil.operation_greater_or_equals_then;
      case '&&':
        return ChangeDetectionUtil.operation_logical_and;
      case '||':
        return ChangeDetectionUtil.operation_logical_or;
      default:
        throw new BaseException(("Unsupported operation " + operation));
    }
  }
  function s(v) {
    return isPresent(v) ? ("" + v) : '';
  }
  function _interpolationFn(strings) {
    var length = strings.length;
    var c0 = length > 0 ? strings[0] : null;
    var c1 = length > 1 ? strings[1] : null;
    var c2 = length > 2 ? strings[2] : null;
    var c3 = length > 3 ? strings[3] : null;
    var c4 = length > 4 ? strings[4] : null;
    var c5 = length > 5 ? strings[5] : null;
    var c6 = length > 6 ? strings[6] : null;
    var c7 = length > 7 ? strings[7] : null;
    var c8 = length > 8 ? strings[8] : null;
    var c9 = length > 9 ? strings[9] : null;
    switch (length - 1) {
      case 1:
        return function(a1) {
          return c0 + s(a1) + c1;
        };
      case 2:
        return function(a1, a2) {
          return c0 + s(a1) + c1 + s(a2) + c2;
        };
      case 3:
        return function(a1, a2, a3) {
          return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3;
        };
      case 4:
        return function(a1, a2, a3, a4) {
          return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) + c4;
        };
      case 5:
        return function(a1, a2, a3, a4, a5) {
          return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) + c4 + s(a5) + c5;
        };
      case 6:
        return function(a1, a2, a3, a4, a5, a6) {
          return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) + c4 + s(a5) + c5 + s(a6) + c6;
        };
      case 7:
        return function(a1, a2, a3, a4, a5, a6, a7) {
          return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) + c4 + s(a5) + c5 + s(a6) + c6 + s(a7) + c7;
        };
      case 8:
        return function(a1, a2, a3, a4, a5, a6, a7, a8) {
          return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) + c4 + s(a5) + c5 + s(a6) + c6 + s(a7) + c7 + s(a8) + c8;
        };
      case 9:
        return function(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
          return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) + c4 + s(a5) + c5 + s(a6) + c6 + s(a7) + c7 + s(a8) + c8 + s(a9) + c9;
        };
      default:
        throw new BaseException("Does not support more than 9 expressions");
    }
  }
  return {
    setters: [function($__m) {
      BaseException = $__m.BaseException;
      isPresent = $__m.isPresent;
      isString = $__m.isString;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      ImplicitReceiver = $__m.ImplicitReceiver;
    }, function($__m) {
      ChangeDetectionUtil = $__m.ChangeDetectionUtil;
    }, function($__m) {
      DynamicChangeDetector = $__m.DynamicChangeDetector;
    }, function($__m) {
      DirectiveIndex = $__m.DirectiveIndex;
    }, function($__m) {
      coalesce = $__m.coalesce;
    }, function($__m) {
      ProtoRecord = $__m.ProtoRecord;
      RecordType = $__m.RecordType;
    }],
    execute: function() {
      DynamicProtoChangeDetector = function() {
        function DynamicProtoChangeDetector(_pipeRegistry, definition) {
          this._pipeRegistry = _pipeRegistry;
          this.definition = definition;
          this._records = this._createRecords(definition);
        }
        return ($traceurRuntime.createClass)(DynamicProtoChangeDetector, {
          instantiate: function(dispatcher) {
            return new DynamicChangeDetector(this.definition.id, this.definition.strategy, dispatcher, this._pipeRegistry, this._records, this.definition.directiveRecords);
          },
          _createRecords: function(definition) {
            var recordBuilder = new ProtoRecordBuilder();
            ListWrapper.forEach(definition.bindingRecords, function(b) {
              recordBuilder.add(b, definition.variableNames);
            });
            return coalesce(recordBuilder.records);
          }
        }, {});
      }();
      $__export("DynamicProtoChangeDetector", DynamicProtoChangeDetector);
      ProtoRecordBuilder = function() {
        function ProtoRecordBuilder() {
          this.records = [];
        }
        return ($traceurRuntime.createClass)(ProtoRecordBuilder, {
          add: function(b) {
            var variableNames = arguments[1] !== (void 0) ? arguments[1] : null;
            var oldLast = ListWrapper.last(this.records);
            if (isPresent(oldLast) && oldLast.bindingRecord.directiveRecord == b.directiveRecord) {
              oldLast.lastInDirective = false;
            }
            this._appendRecords(b, variableNames);
            var newLast = ListWrapper.last(this.records);
            if (isPresent(newLast) && newLast !== oldLast) {
              newLast.lastInBinding = true;
              newLast.lastInDirective = true;
            }
          },
          _appendRecords: function(b, variableNames) {
            if (b.isDirectiveLifecycle()) {
              this.records.push(new ProtoRecord(RecordType.DIRECTIVE_LIFECYCLE, b.lifecycleEvent, null, [], [], -1, null, this.records.length + 1, b, null, false, false));
            } else {
              _ConvertAstIntoProtoRecords.append(this.records, b, variableNames);
            }
          }
        }, {});
      }();
      $__export("ProtoRecordBuilder", ProtoRecordBuilder);
      _ConvertAstIntoProtoRecords = function() {
        function _ConvertAstIntoProtoRecords(_records, _bindingRecord, _expressionAsString, _variableNames) {
          this._records = _records;
          this._bindingRecord = _bindingRecord;
          this._expressionAsString = _expressionAsString;
          this._variableNames = _variableNames;
        }
        return ($traceurRuntime.createClass)(_ConvertAstIntoProtoRecords, {
          visitImplicitReceiver: function(ast) {
            return this._bindingRecord.implicitReceiver;
          },
          visitInterpolation: function(ast) {
            var args = this._visitAll(ast.expressions);
            return this._addRecord(RecordType.INTERPOLATE, "interpolate", _interpolationFn(ast.strings), args, ast.strings, 0);
          },
          visitLiteralPrimitive: function(ast) {
            return this._addRecord(RecordType.CONST, "literal", ast.value, [], null, 0);
          },
          visitAccessMember: function(ast) {
            var receiver = ast.receiver.visit(this);
            if (isPresent(this._variableNames) && ListWrapper.contains(this._variableNames, ast.name) && ast.receiver instanceof ImplicitReceiver) {
              return this._addRecord(RecordType.LOCAL, ast.name, ast.name, [], null, receiver);
            } else {
              return this._addRecord(RecordType.PROPERTY, ast.name, ast.getter, [], null, receiver);
            }
          },
          visitSafeAccessMember: function(ast) {
            var receiver = ast.receiver.visit(this);
            return this._addRecord(RecordType.SAFE_PROPERTY, ast.name, ast.getter, [], null, receiver);
          },
          visitMethodCall: function(ast) {
            var receiver = ast.receiver.visit(this);
            var args = this._visitAll(ast.args);
            if (isPresent(this._variableNames) && ListWrapper.contains(this._variableNames, ast.name)) {
              var target = this._addRecord(RecordType.LOCAL, ast.name, ast.name, [], null, receiver);
              return this._addRecord(RecordType.INVOKE_CLOSURE, "closure", null, args, null, target);
            } else {
              return this._addRecord(RecordType.INVOKE_METHOD, ast.name, ast.fn, args, null, receiver);
            }
          },
          visitSafeMethodCall: function(ast) {
            var receiver = ast.receiver.visit(this);
            var args = this._visitAll(ast.args);
            return this._addRecord(RecordType.SAFE_INVOKE_METHOD, ast.name, ast.fn, args, null, receiver);
          },
          visitFunctionCall: function(ast) {
            var target = ast.target.visit(this);
            var args = this._visitAll(ast.args);
            return this._addRecord(RecordType.INVOKE_CLOSURE, "closure", null, args, null, target);
          },
          visitLiteralArray: function(ast) {
            var primitiveName = ("arrayFn" + ast.expressions.length);
            return this._addRecord(RecordType.PRIMITIVE_OP, primitiveName, _arrayFn(ast.expressions.length), this._visitAll(ast.expressions), null, 0);
          },
          visitLiteralMap: function(ast) {
            return this._addRecord(RecordType.PRIMITIVE_OP, _mapPrimitiveName(ast.keys), ChangeDetectionUtil.mapFn(ast.keys), this._visitAll(ast.values), null, 0);
          },
          visitBinary: function(ast) {
            var left = ast.left.visit(this);
            var right = ast.right.visit(this);
            return this._addRecord(RecordType.PRIMITIVE_OP, _operationToPrimitiveName(ast.operation), _operationToFunction(ast.operation), [left, right], null, 0);
          },
          visitPrefixNot: function(ast) {
            var exp = ast.expression.visit(this);
            return this._addRecord(RecordType.PRIMITIVE_OP, "operation_negate", ChangeDetectionUtil.operation_negate, [exp], null, 0);
          },
          visitConditional: function(ast) {
            var c = ast.condition.visit(this);
            var t = ast.trueExp.visit(this);
            var f = ast.falseExp.visit(this);
            return this._addRecord(RecordType.PRIMITIVE_OP, "cond", ChangeDetectionUtil.cond, [c, t, f], null, 0);
          },
          visitPipe: function(ast) {
            var value = ast.exp.visit(this);
            return this._addRecord(RecordType.PIPE, ast.name, ast.name, [], null, value);
          },
          visitKeyedAccess: function(ast) {
            var obj = ast.obj.visit(this);
            var key = ast.key.visit(this);
            return this._addRecord(RecordType.KEYED_ACCESS, "keyedAccess", ChangeDetectionUtil.keyedAccess, [key], null, obj);
          },
          visitAssignment: function(ast) {
            throw new BaseException('Not supported');
          },
          visitChain: function(ast) {
            throw new BaseException('Not supported');
          },
          visitIf: function(ast) {
            throw new BaseException('Not supported');
          },
          _visitAll: function(asts) {
            var res = ListWrapper.createFixedSize(asts.length);
            for (var i = 0; i < asts.length; ++i) {
              res[i] = asts[i].visit(this);
            }
            return res;
          },
          _addRecord: function(type, name, funcOrValue, args, fixedArgs, context) {
            var selfIndex = this._records.length + 1;
            if (context instanceof DirectiveIndex) {
              this._records.push(new ProtoRecord(type, name, funcOrValue, args, fixedArgs, -1, context, selfIndex, this._bindingRecord, this._expressionAsString, false, false));
            } else {
              this._records.push(new ProtoRecord(type, name, funcOrValue, args, fixedArgs, context, null, selfIndex, this._bindingRecord, this._expressionAsString, false, false));
            }
            return selfIndex;
          }
        }, {append: function(records, b, variableNames) {
            var c = new _ConvertAstIntoProtoRecords(records, b, b.ast.toString(), variableNames);
            b.ast.visit(c);
          }});
      }();
    }
  };
});
//# sourceMappingURL=proto_change_detector.js.map

//# sourceMappingURL=../../src/change_detection/proto_change_detector.js.map