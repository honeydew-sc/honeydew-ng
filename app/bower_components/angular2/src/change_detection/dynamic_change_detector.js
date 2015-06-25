System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "./abstract_change_detector", "./change_detection_util", "./proto_record", "./exceptions"], function($__export) {
  "use strict";
  var isPresent,
      isBlank,
      BaseException,
      FunctionWrapper,
      ListWrapper,
      AbstractChangeDetector,
      ChangeDetectionUtil,
      uninitialized,
      RecordType,
      ChangeDetectionError,
      DynamicChangeDetector;
  function isSame(a, b) {
    if (a === b)
      return true;
    if (a instanceof String && b instanceof String && a == b)
      return true;
    if ((a !== a) && (b !== b))
      return true;
    return false;
  }
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
      FunctionWrapper = $__m.FunctionWrapper;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      AbstractChangeDetector = $__m.AbstractChangeDetector;
    }, function($__m) {
      ChangeDetectionUtil = $__m.ChangeDetectionUtil;
      uninitialized = $__m.uninitialized;
    }, function($__m) {
      RecordType = $__m.RecordType;
    }, function($__m) {
      ChangeDetectionError = $__m.ChangeDetectionError;
    }],
    execute: function() {
      DynamicChangeDetector = function($__super) {
        function DynamicChangeDetector(id, changeControlStrategy, dispatcher, pipeRegistry, protos, directiveRecords) {
          $traceurRuntime.superConstructor(DynamicChangeDetector).call(this, id);
          this.changeControlStrategy = changeControlStrategy;
          this.dispatcher = dispatcher;
          this.pipeRegistry = pipeRegistry;
          this.protos = protos;
          this.directiveRecords = directiveRecords;
          this.locals = null;
          this.directives = null;
          this.alreadyChecked = false;
          this.values = ListWrapper.createFixedSize(protos.length + 1);
          this.pipes = ListWrapper.createFixedSize(protos.length + 1);
          this.prevContexts = ListWrapper.createFixedSize(protos.length + 1);
          this.changes = ListWrapper.createFixedSize(protos.length + 1);
          this.values[0] = null;
          ListWrapper.fill(this.values, uninitialized, 1);
          ListWrapper.fill(this.pipes, null);
          ListWrapper.fill(this.prevContexts, uninitialized);
          ListWrapper.fill(this.changes, false);
        }
        return ($traceurRuntime.createClass)(DynamicChangeDetector, {
          hydrate: function(context, locals, directives) {
            this.mode = ChangeDetectionUtil.changeDetectionMode(this.changeControlStrategy);
            this.values[0] = context;
            this.locals = locals;
            this.directives = directives;
            this.alreadyChecked = false;
          },
          dehydrate: function() {
            this._destroyPipes();
            this.values[0] = null;
            ListWrapper.fill(this.values, uninitialized, 1);
            ListWrapper.fill(this.changes, false);
            ListWrapper.fill(this.pipes, null);
            ListWrapper.fill(this.prevContexts, uninitialized);
            this.locals = null;
          },
          _destroyPipes: function() {
            for (var i = 0; i < this.pipes.length; ++i) {
              if (isPresent(this.pipes[i])) {
                this.pipes[i].onDestroy();
              }
            }
          },
          hydrated: function() {
            return this.values[0] !== null;
          },
          detectChangesInRecords: function(throwOnChange) {
            if (!this.hydrated()) {
              ChangeDetectionUtil.throwDehydrated();
            }
            var protos = this.protos;
            var changes = null;
            var isChanged = false;
            for (var i = 0; i < protos.length; ++i) {
              var proto = protos[i];
              var bindingRecord = proto.bindingRecord;
              var directiveRecord = bindingRecord.directiveRecord;
              if (proto.isLifeCycleRecord()) {
                if (proto.name === "onCheck" && !throwOnChange) {
                  this._getDirectiveFor(directiveRecord.directiveIndex).onCheck();
                } else if (proto.name === "onInit" && !throwOnChange && !this.alreadyChecked) {
                  this._getDirectiveFor(directiveRecord.directiveIndex).onInit();
                } else if (proto.name === "onChange" && isPresent(changes) && !throwOnChange) {
                  this._getDirectiveFor(directiveRecord.directiveIndex).onChange(changes);
                }
              } else {
                var change = this._check(proto, throwOnChange);
                if (isPresent(change)) {
                  this._updateDirectiveOrElement(change, bindingRecord);
                  isChanged = true;
                  changes = this._addChange(bindingRecord, change, changes);
                }
              }
              if (proto.lastInDirective) {
                changes = null;
                if (isChanged && bindingRecord.isOnPushChangeDetection()) {
                  this._getDetectorFor(directiveRecord.directiveIndex).markAsCheckOnce();
                }
                isChanged = false;
              }
            }
            this.alreadyChecked = true;
          },
          callOnAllChangesDone: function() {
            this.dispatcher.notifyOnAllChangesDone();
            var dirs = this.directiveRecords;
            for (var i = dirs.length - 1; i >= 0; --i) {
              var dir = dirs[i];
              if (dir.callOnAllChangesDone) {
                this._getDirectiveFor(dir.directiveIndex).onAllChangesDone();
              }
            }
          },
          _updateDirectiveOrElement: function(change, bindingRecord) {
            if (isBlank(bindingRecord.directiveRecord)) {
              this.dispatcher.notifyOnBinding(bindingRecord, change.currentValue);
            } else {
              var directiveIndex = bindingRecord.directiveRecord.directiveIndex;
              bindingRecord.setter(this._getDirectiveFor(directiveIndex), change.currentValue);
            }
          },
          _addChange: function(bindingRecord, change, changes) {
            if (bindingRecord.callOnChange()) {
              return ChangeDetectionUtil.addChange(changes, bindingRecord.propertyName, change);
            } else {
              return changes;
            }
          },
          _getDirectiveFor: function(directiveIndex) {
            return this.directives.getDirectiveFor(directiveIndex);
          },
          _getDetectorFor: function(directiveIndex) {
            return this.directives.getDetectorFor(directiveIndex);
          },
          _check: function(proto, throwOnChange) {
            try {
              if (proto.isPipeRecord()) {
                return this._pipeCheck(proto, throwOnChange);
              } else {
                return this._referenceCheck(proto, throwOnChange);
              }
            } catch (e) {
              throw new ChangeDetectionError(proto, e);
            }
          },
          _referenceCheck: function(proto, throwOnChange) {
            if (this._pureFuncAndArgsDidNotChange(proto)) {
              this._setChanged(proto, false);
              return null;
            }
            var prevValue = this._readSelf(proto);
            var currValue = this._calculateCurrValue(proto);
            if (!isSame(prevValue, currValue)) {
              if (proto.lastInBinding) {
                var change = ChangeDetectionUtil.simpleChange(prevValue, currValue);
                if (throwOnChange)
                  ChangeDetectionUtil.throwOnChange(proto, change);
                this._writeSelf(proto, currValue);
                this._setChanged(proto, true);
                return change;
              } else {
                this._writeSelf(proto, currValue);
                this._setChanged(proto, true);
                return null;
              }
            } else {
              this._setChanged(proto, false);
              return null;
            }
          },
          _calculateCurrValue: function(proto) {
            switch (proto.mode) {
              case RecordType.SELF:
                return this._readContext(proto);
              case RecordType.CONST:
                return proto.funcOrValue;
              case RecordType.PROPERTY:
                var context = this._readContext(proto);
                return proto.funcOrValue(context);
              case RecordType.SAFE_PROPERTY:
                var context = this._readContext(proto);
                return isBlank(context) ? null : proto.funcOrValue(context);
              case RecordType.LOCAL:
                return this.locals.get(proto.name);
              case RecordType.INVOKE_METHOD:
                var context = this._readContext(proto);
                var args = this._readArgs(proto);
                return proto.funcOrValue(context, args);
              case RecordType.SAFE_INVOKE_METHOD:
                var context = this._readContext(proto);
                if (isBlank(context)) {
                  return null;
                }
                var args = this._readArgs(proto);
                return proto.funcOrValue(context, args);
              case RecordType.KEYED_ACCESS:
                var arg = this._readArgs(proto)[0];
                return this._readContext(proto)[arg];
              case RecordType.INVOKE_CLOSURE:
                return FunctionWrapper.apply(this._readContext(proto), this._readArgs(proto));
              case RecordType.INTERPOLATE:
              case RecordType.PRIMITIVE_OP:
                return FunctionWrapper.apply(proto.funcOrValue, this._readArgs(proto));
              default:
                throw new BaseException(("Unknown operation " + proto.mode));
            }
          },
          _pipeCheck: function(proto, throwOnChange) {
            var context = this._readContext(proto);
            var pipe = this._pipeFor(proto, context);
            var prevValue = this._readSelf(proto);
            var currValue = pipe.transform(context);
            if (!isSame(prevValue, currValue)) {
              currValue = ChangeDetectionUtil.unwrapValue(currValue);
              if (proto.lastInBinding) {
                var change = ChangeDetectionUtil.simpleChange(prevValue, currValue);
                if (throwOnChange)
                  ChangeDetectionUtil.throwOnChange(proto, change);
                this._writeSelf(proto, currValue);
                this._setChanged(proto, true);
                return change;
              } else {
                this._writeSelf(proto, currValue);
                this._setChanged(proto, true);
                return null;
              }
            } else {
              this._setChanged(proto, false);
              return null;
            }
          },
          _pipeFor: function(proto, context) {
            var storedPipe = this._readPipe(proto);
            if (isPresent(storedPipe) && storedPipe.supports(context)) {
              return storedPipe;
            }
            if (isPresent(storedPipe)) {
              storedPipe.onDestroy();
            }
            var pipe = this.pipeRegistry.get(proto.name, context, this.ref);
            this._writePipe(proto, pipe);
            return pipe;
          },
          _readContext: function(proto) {
            if (proto.contextIndex == -1) {
              return this._getDirectiveFor(proto.directiveIndex);
            } else {
              return this.values[proto.contextIndex];
            }
            return this.values[proto.contextIndex];
          },
          _readSelf: function(proto) {
            return this.values[proto.selfIndex];
          },
          _writeSelf: function(proto, value) {
            this.values[proto.selfIndex] = value;
          },
          _readPipe: function(proto) {
            return this.pipes[proto.selfIndex];
          },
          _writePipe: function(proto, value) {
            this.pipes[proto.selfIndex] = value;
          },
          _setChanged: function(proto, value) {
            this.changes[proto.selfIndex] = value;
          },
          _pureFuncAndArgsDidNotChange: function(proto) {
            return proto.isPureFunction() && !this._argsChanged(proto);
          },
          _argsChanged: function(proto) {
            var args = proto.args;
            for (var i = 0; i < args.length; ++i) {
              if (this.changes[args[i]]) {
                return true;
              }
            }
            return false;
          },
          _readArgs: function(proto) {
            var res = ListWrapper.createFixedSize(proto.args.length);
            var args = proto.args;
            for (var i = 0; i < args.length; ++i) {
              res[i] = this.values[args[i]];
            }
            return res;
          }
        }, {}, $__super);
      }(AbstractChangeDetector);
      $__export("DynamicChangeDetector", DynamicChangeDetector);
    }
  };
});
//# sourceMappingURL=dynamic_change_detector.js.map

//# sourceMappingURL=../../src/change_detection/dynamic_change_detector.js.map