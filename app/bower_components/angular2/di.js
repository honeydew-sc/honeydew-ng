System.register(["./src/di/annotations", "./src/di/decorators", "./src/di/forward_ref", "./src/di/injector", "./src/di/binding", "./src/di/key", "./src/di/exceptions", "./src/di/opaque_token"], function($__export) {
  "use strict";
  return {
    setters: [function($__m) {
      $__export("InjectAnnotation", $__m.InjectAnnotation);
      $__export("InjectPromiseAnnotation", $__m.InjectPromiseAnnotation);
      $__export("InjectLazyAnnotation", $__m.InjectLazyAnnotation);
      $__export("OptionalAnnotation", $__m.OptionalAnnotation);
      $__export("InjectableAnnotation", $__m.InjectableAnnotation);
      $__export("DependencyAnnotation", $__m.DependencyAnnotation);
    }, function($__m) {
      $__export("Inject", $__m.Inject);
      $__export("InjectPromise", $__m.InjectPromise);
      $__export("InjectLazy", $__m.InjectLazy);
      $__export("Optional", $__m.Optional);
      $__export("Injectable", $__m.Injectable);
    }, function($__m) {
      $__export("forwardRef", $__m.forwardRef);
      $__export("resolveForwardRef", $__m.resolveForwardRef);
    }, function($__m) {
      $__export("resolveBindings", $__m.resolveBindings);
      $__export("Injector", $__m.Injector);
    }, function($__m) {
      $__export("Binding", $__m.Binding);
      $__export("BindingBuilder", $__m.BindingBuilder);
      $__export("ResolvedBinding", $__m.ResolvedBinding);
      $__export("Dependency", $__m.Dependency);
      $__export("bind", $__m.bind);
    }, function($__m) {
      $__export("Key", $__m.Key);
      $__export("KeyRegistry", $__m.KeyRegistry);
      $__export("TypeLiteral", $__m.TypeLiteral);
    }, function($__m) {
      $__export("NoBindingError", $__m.NoBindingError);
      $__export("AbstractBindingError", $__m.AbstractBindingError);
      $__export("AsyncBindingError", $__m.AsyncBindingError);
      $__export("CyclicDependencyError", $__m.CyclicDependencyError);
      $__export("InstantiationError", $__m.InstantiationError);
      $__export("InvalidBindingError", $__m.InvalidBindingError);
      $__export("NoAnnotationError", $__m.NoAnnotationError);
    }, function($__m) {
      $__export("OpaqueToken", $__m.OpaqueToken);
    }],
    execute: function() {}
  };
});
//# sourceMappingURL=di.js.map

//# sourceMappingURL=di.js.map