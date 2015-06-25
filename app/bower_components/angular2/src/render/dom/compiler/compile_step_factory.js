System.register(["./property_binding_parser", "./text_interpolation_parser", "./directive_parser", "./view_splitter", "../shadow_dom/shadow_dom_compile_step"], function($__export) {
  "use strict";
  var PropertyBindingParser,
      TextInterpolationParser,
      DirectiveParser,
      ViewSplitter,
      ShadowDomCompileStep,
      CompileStepFactory,
      DefaultStepFactory;
  return {
    setters: [function($__m) {
      PropertyBindingParser = $__m.PropertyBindingParser;
    }, function($__m) {
      TextInterpolationParser = $__m.TextInterpolationParser;
    }, function($__m) {
      DirectiveParser = $__m.DirectiveParser;
    }, function($__m) {
      ViewSplitter = $__m.ViewSplitter;
    }, function($__m) {
      ShadowDomCompileStep = $__m.ShadowDomCompileStep;
    }],
    execute: function() {
      CompileStepFactory = function() {
        function CompileStepFactory() {}
        return ($traceurRuntime.createClass)(CompileStepFactory, {createSteps: function(view) {
            return null;
          }}, {});
      }();
      $__export("CompileStepFactory", CompileStepFactory);
      DefaultStepFactory = function($__super) {
        function DefaultStepFactory(_parser, _shadowDomStrategy) {
          $traceurRuntime.superConstructor(DefaultStepFactory).call(this);
          this._parser = _parser;
          this._shadowDomStrategy = _shadowDomStrategy;
        }
        return ($traceurRuntime.createClass)(DefaultStepFactory, {createSteps: function(view) {
            return [new ViewSplitter(this._parser), new PropertyBindingParser(this._parser), new DirectiveParser(this._parser, view.directives), new TextInterpolationParser(this._parser), new ShadowDomCompileStep(this._shadowDomStrategy, view)];
          }}, {}, $__super);
      }(CompileStepFactory);
      $__export("DefaultStepFactory", DefaultStepFactory);
    }
  };
});
//# sourceMappingURL=compile_step_factory.js.map

//# sourceMappingURL=../../../../src/render/dom/compiler/compile_step_factory.js.map