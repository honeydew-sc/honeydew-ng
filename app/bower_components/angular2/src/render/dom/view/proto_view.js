System.register(["angular2/src/facade/lang", "angular2/src/dom/dom_adapter", "../util", "../../api"], function($__export) {
  "use strict";
  var isPresent,
      DOM,
      NG_BINDING_CLASS,
      RenderProtoViewRef,
      DomProtoViewRef,
      DomProtoView;
  function resolveInternalDomProtoView(protoViewRef) {
    return protoViewRef._protoView;
  }
  $__export("resolveInternalDomProtoView", resolveInternalDomProtoView);
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      NG_BINDING_CLASS = $__m.NG_BINDING_CLASS;
    }, function($__m) {
      RenderProtoViewRef = $__m.RenderProtoViewRef;
    }],
    execute: function() {
      DomProtoViewRef = function($__super) {
        function DomProtoViewRef(_protoView) {
          $traceurRuntime.superConstructor(DomProtoViewRef).call(this);
          this._protoView = _protoView;
        }
        return ($traceurRuntime.createClass)(DomProtoViewRef, {}, {}, $__super);
      }(RenderProtoViewRef);
      $__export("DomProtoViewRef", DomProtoViewRef);
      DomProtoView = function() {
        function DomProtoView($__1) {
          var $__2 = $__1,
              elementBinders = $__2.elementBinders,
              element = $__2.element,
              transitiveContentTagCount = $__2.transitiveContentTagCount,
              boundTextNodeCount = $__2.boundTextNodeCount;
          this.element = element;
          this.elementBinders = elementBinders;
          this.transitiveContentTagCount = transitiveContentTagCount;
          this.isTemplateElement = DOM.isTemplateElement(this.element);
          this.rootBindingOffset = (isPresent(this.element) && DOM.hasClass(this.element, NG_BINDING_CLASS)) ? 1 : 0;
          this.boundTextNodeCount = boundTextNodeCount;
          this.rootNodeCount = this.isTemplateElement ? DOM.childNodes(DOM.content(this.element)).length : 1;
        }
        return ($traceurRuntime.createClass)(DomProtoView, {}, {});
      }();
      $__export("DomProtoView", DomProtoView);
    }
  };
});
//# sourceMappingURL=proto_view.js.map

//# sourceMappingURL=../../../../src/render/dom/view/proto_view.js.map