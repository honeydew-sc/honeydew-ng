System.register(["angular2/src/facade/collection", "./change_detection_jit_generator", "./coalesce", "./proto_change_detector"], function($__export) {
  "use strict";
  var ListWrapper,
      ChangeDetectorJITGenerator,
      coalesce,
      ProtoRecordBuilder,
      JitProtoChangeDetector;
  return {
    setters: [function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      ChangeDetectorJITGenerator = $__m.ChangeDetectorJITGenerator;
    }, function($__m) {
      coalesce = $__m.coalesce;
    }, function($__m) {
      ProtoRecordBuilder = $__m.ProtoRecordBuilder;
    }],
    execute: function() {
      JitProtoChangeDetector = function() {
        function JitProtoChangeDetector(_pipeRegistry, definition) {
          this._pipeRegistry = _pipeRegistry;
          this.definition = definition;
          this._factory = this._createFactory(definition);
        }
        return ($traceurRuntime.createClass)(JitProtoChangeDetector, {
          instantiate: function(dispatcher) {
            return this._factory(dispatcher, this._pipeRegistry);
          },
          _createFactory: function(definition) {
            var recordBuilder = new ProtoRecordBuilder();
            ListWrapper.forEach(definition.bindingRecords, function(b) {
              recordBuilder.add(b, definition.variableNames);
            });
            var records = coalesce(recordBuilder.records);
            return new ChangeDetectorJITGenerator(definition.id, definition.strategy, records, this.definition.directiveRecords).generate();
          }
        }, {isSupported: function() {
            return true;
          }});
      }();
      $__export("JitProtoChangeDetector", JitProtoChangeDetector);
    }
  };
});
//# sourceMappingURL=jit_proto_change_detector.js.map

//# sourceMappingURL=../../src/change_detection/jit_proto_change_detector.js.map