System.register(["./annotations", "./view", "./visibility", "./di", "../../util/decorators"], function($__export) {
  "use strict";
  var ComponentAnnotation,
      DirectiveAnnotation,
      ViewAnnotation,
      SelfAnnotation,
      ParentAnnotation,
      AncestorAnnotation,
      UnboundedAnnotation,
      AttributeAnnotation,
      QueryAnnotation,
      makeDecorator,
      makeParamDecorator,
      Component,
      Directive,
      View,
      Self,
      Parent,
      Ancestor,
      Unbounded,
      Attribute,
      Query;
  return {
    setters: [function($__m) {
      ComponentAnnotation = $__m.ComponentAnnotation;
      DirectiveAnnotation = $__m.DirectiveAnnotation;
    }, function($__m) {
      ViewAnnotation = $__m.ViewAnnotation;
    }, function($__m) {
      SelfAnnotation = $__m.SelfAnnotation;
      ParentAnnotation = $__m.ParentAnnotation;
      AncestorAnnotation = $__m.AncestorAnnotation;
      UnboundedAnnotation = $__m.UnboundedAnnotation;
    }, function($__m) {
      AttributeAnnotation = $__m.AttributeAnnotation;
      QueryAnnotation = $__m.QueryAnnotation;
    }, function($__m) {
      makeDecorator = $__m.makeDecorator;
      makeParamDecorator = $__m.makeParamDecorator;
    }],
    execute: function() {
      Component = makeDecorator(ComponentAnnotation, function(fn) {
        return fn.View = View;
      });
      $__export("Component", Component);
      Directive = makeDecorator(DirectiveAnnotation);
      $__export("Directive", Directive);
      View = makeDecorator(ViewAnnotation, function(fn) {
        return fn.View = View;
      });
      $__export("View", View);
      Self = makeParamDecorator(SelfAnnotation);
      $__export("Self", Self);
      Parent = makeParamDecorator(ParentAnnotation);
      $__export("Parent", Parent);
      Ancestor = makeParamDecorator(AncestorAnnotation);
      $__export("Ancestor", Ancestor);
      Unbounded = makeParamDecorator(UnboundedAnnotation);
      $__export("Unbounded", Unbounded);
      Attribute = makeParamDecorator(AttributeAnnotation);
      $__export("Attribute", Attribute);
      Query = makeParamDecorator(QueryAnnotation);
      $__export("Query", Query);
    }
  };
});
//# sourceMappingURL=decorators.js.map

//# sourceMappingURL=../../../src/core/annotations/decorators.js.map