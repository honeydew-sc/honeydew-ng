System.register(["angular2/annotations", "angular2/angular2", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Directive,
      ViewContainerRef,
      ProtoViewRef,
      PipeRegistry,
      onCheck,
      isPresent,
      isBlank,
      NgFor,
      RecordViewTuple;
  return {
    setters: [function($__m) {
      Directive = $__m.Directive;
    }, function($__m) {
      ViewContainerRef = $__m.ViewContainerRef;
      ProtoViewRef = $__m.ProtoViewRef;
      PipeRegistry = $__m.PipeRegistry;
      onCheck = $__m.onCheck;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      NgFor = ($traceurRuntime.createClass)(function(viewContainer, protoViewRef, pipes) {
        this.viewContainer = viewContainer;
        this.protoViewRef = protoViewRef;
        this.pipes = pipes;
      }, {
        set ngForOf(value) {
          this._ngForOf = value;
          this._pipe = this.pipes.get("iterableDiff", value, null, this._pipe);
        },
        onCheck: function() {
          var diff = this._pipe.transform(this._ngForOf);
          if (isPresent(diff))
            this._applyChanges(diff.wrapped);
        },
        _applyChanges: function(changes) {
          if (isBlank(changes)) {
            this.viewContainer.clear();
            return;
          }
          var recordViewTuples = [];
          changes.forEachRemovedItem(function(removedRecord) {
            return recordViewTuples.push(new RecordViewTuple(removedRecord, null));
          });
          changes.forEachMovedItem(function(movedRecord) {
            return recordViewTuples.push(new RecordViewTuple(movedRecord, null));
          });
          var insertTuples = NgFor.bulkRemove(recordViewTuples, this.viewContainer);
          changes.forEachAddedItem(function(addedRecord) {
            return insertTuples.push(new RecordViewTuple(addedRecord, null));
          });
          NgFor.bulkInsert(insertTuples, this.viewContainer, this.protoViewRef);
          for (var i = 0; i < insertTuples.length; i++) {
            this._perViewChange(insertTuples[i].view, insertTuples[i].record);
          }
        },
        _perViewChange: function(view, record) {
          view.setLocal('\$implicit', record.item);
          view.setLocal('index', record.currentIndex);
        }
      }, {
        bulkRemove: function(tuples, viewContainer) {
          tuples.sort(function(a, b) {
            return a.record.previousIndex - b.record.previousIndex;
          });
          var movedTuples = [];
          for (var i = tuples.length - 1; i >= 0; i--) {
            var tuple = tuples[i];
            if (isPresent(tuple.record.currentIndex)) {
              tuple.view = viewContainer.detach(tuple.record.previousIndex);
              movedTuples.push(tuple);
            } else {
              viewContainer.remove(tuple.record.previousIndex);
            }
          }
          return movedTuples;
        },
        bulkInsert: function(tuples, viewContainer, protoViewRef) {
          tuples.sort(function(a, b) {
            return a.record.currentIndex - b.record.currentIndex;
          });
          for (var i = 0; i < tuples.length; i++) {
            var tuple = tuples[i];
            if (isPresent(tuple.view)) {
              viewContainer.insert(tuple.view, tuple.record.currentIndex);
            } else {
              tuple.view = viewContainer.create(protoViewRef, tuple.record.currentIndex);
            }
          }
          return tuples;
        }
      });
      $__export("NgFor", NgFor);
      $__export("NgFor", NgFor = __decorate([Directive({
        selector: '[ng-for][ng-for-of]',
        properties: ['ngForOf'],
        lifecycle: [onCheck]
      }), __metadata('design:paramtypes', [ViewContainerRef, ProtoViewRef, PipeRegistry])], NgFor));
      RecordViewTuple = function() {
        function RecordViewTuple(record, view) {
          this.record = record;
          this.view = view;
        }
        return ($traceurRuntime.createClass)(RecordViewTuple, {}, {});
      }();
    }
  };
});
//# sourceMappingURL=ng_for.js.map

//# sourceMappingURL=../../src/directives/ng_for.js.map