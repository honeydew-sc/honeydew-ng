System.register(["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var isPresent,
      ViewRef,
      ProtoViewRef;
  function internalView(viewRef) {
    return viewRef._view;
  }
  function internalProtoView(protoViewRef) {
    return isPresent(protoViewRef) ? protoViewRef._protoView : null;
  }
  $__export("internalView", internalView);
  $__export("internalProtoView", internalProtoView);
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
    }],
    execute: function() {
      ViewRef = function() {
        function ViewRef(_view) {
          this._view = _view;
        }
        return ($traceurRuntime.createClass)(ViewRef, {
          get render() {
            return this._view.render;
          },
          setLocal: function(contextName, value) {
            this._view.setLocal(contextName, value);
          }
        }, {});
      }();
      $__export("ViewRef", ViewRef);
      ProtoViewRef = function() {
        function ProtoViewRef(_protoView) {
          this._protoView = _protoView;
        }
        return ($traceurRuntime.createClass)(ProtoViewRef, {}, {});
      }();
      $__export("ProtoViewRef", ProtoViewRef);
    }
  };
});
//# sourceMappingURL=view_ref.js.map

//# sourceMappingURL=../../../src/core/compiler/view_ref.js.map