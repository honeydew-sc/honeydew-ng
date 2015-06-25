System.register(["angular2/src/facade/lang", "angular2/src/dom/dom_adapter", "./compile_element", "./compile_control", "../view/proto_view_builder", "../../api"], function($__export) {
  "use strict";
  var isPresent,
      isBlank,
      DOM,
      CompileElement,
      CompileControl,
      ProtoViewBuilder,
      ViewType,
      CompilePipeline;
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      ProtoViewBuilder = $__m.ProtoViewBuilder;
    }, function($__m) {
      ViewType = $__m.ViewType;
    }],
    execute: function() {
      CompilePipeline = function() {
        function CompilePipeline(steps) {
          this._control = new CompileControl(steps);
        }
        return ($traceurRuntime.createClass)(CompilePipeline, {
          process: function(rootElement) {
            var protoViewType = arguments[1] !== (void 0) ? arguments[1] : null;
            var compilationCtxtDescription = arguments[2] !== (void 0) ? arguments[2] : '';
            if (isBlank(protoViewType)) {
              protoViewType = ViewType.COMPONENT;
            }
            var results = [];
            var rootCompileElement = new CompileElement(rootElement, compilationCtxtDescription);
            rootCompileElement.inheritedProtoView = new ProtoViewBuilder(rootElement, protoViewType);
            rootCompileElement.isViewRoot = true;
            this._process(results, null, rootCompileElement, compilationCtxtDescription);
            return results;
          },
          _process: function(results, parent, current) {
            var compilationCtxtDescription = arguments[3] !== (void 0) ? arguments[3] : '';
            var additionalChildren = this._control.internalProcess(results, 0, parent, current);
            if (current.compileChildren) {
              var node = DOM.firstChild(DOM.templateAwareRoot(current.element));
              while (isPresent(node)) {
                var nextNode = DOM.nextSibling(node);
                if (DOM.isElementNode(node)) {
                  var childCompileElement = new CompileElement(node, compilationCtxtDescription);
                  childCompileElement.inheritedProtoView = current.inheritedProtoView;
                  childCompileElement.inheritedElementBinder = current.inheritedElementBinder;
                  childCompileElement.distanceToInheritedBinder = current.distanceToInheritedBinder + 1;
                  this._process(results, current, childCompileElement);
                }
                node = nextNode;
              }
            }
            if (isPresent(additionalChildren)) {
              for (var i = 0; i < additionalChildren.length; i++) {
                this._process(results, current, additionalChildren[i]);
              }
            }
          }
        }, {});
      }();
      $__export("CompilePipeline", CompilePipeline);
    }
  };
});
//# sourceMappingURL=compile_pipeline.js.map

//# sourceMappingURL=../../../../src/render/dom/compiler/compile_pipeline.js.map