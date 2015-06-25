System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "./proto_record"], function($__export) {
  "use strict";
  var isPresent,
      ListWrapper,
      Map,
      RecordType,
      ProtoRecord;
  function coalesce(records) {
    var res = [];
    var indexMap = new Map();
    for (var i = 0; i < records.length; ++i) {
      var r = records[i];
      var record = _replaceIndices(r, res.length + 1, indexMap);
      var matchingRecord = _findMatching(record, res);
      if (isPresent(matchingRecord) && record.lastInBinding) {
        res.push(_selfRecord(record, matchingRecord.selfIndex, res.length + 1));
        indexMap.set(r.selfIndex, matchingRecord.selfIndex);
      } else if (isPresent(matchingRecord) && !record.lastInBinding) {
        indexMap.set(r.selfIndex, matchingRecord.selfIndex);
      } else {
        res.push(record);
        indexMap.set(r.selfIndex, record.selfIndex);
      }
    }
    return res;
  }
  function _selfRecord(r, contextIndex, selfIndex) {
    return new ProtoRecord(RecordType.SELF, "self", null, [], r.fixedArgs, contextIndex, r.directiveIndex, selfIndex, r.bindingRecord, r.expressionAsString, r.lastInBinding, r.lastInDirective);
  }
  function _findMatching(r, rs) {
    return ListWrapper.find(rs, function(rr) {
      return rr.mode !== RecordType.DIRECTIVE_LIFECYCLE && rr.mode === r.mode && rr.funcOrValue === r.funcOrValue && rr.contextIndex === r.contextIndex && ListWrapper.equals(rr.args, r.args);
    });
  }
  function _replaceIndices(r, selfIndex, indexMap) {
    var args = ListWrapper.map(r.args, function(a) {
      return _map(indexMap, a);
    });
    var contextIndex = _map(indexMap, r.contextIndex);
    return new ProtoRecord(r.mode, r.name, r.funcOrValue, args, r.fixedArgs, contextIndex, r.directiveIndex, selfIndex, r.bindingRecord, r.expressionAsString, r.lastInBinding, r.lastInDirective);
  }
  function _map(indexMap, value) {
    var r = indexMap.get(value);
    return isPresent(r) ? r : value;
  }
  $__export("coalesce", coalesce);
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      Map = $__m.Map;
    }, function($__m) {
      RecordType = $__m.RecordType;
      ProtoRecord = $__m.ProtoRecord;
    }],
    execute: function() {
    }
  };
});
//# sourceMappingURL=coalesce.js.map

//# sourceMappingURL=../../src/change_detection/coalesce.js.map