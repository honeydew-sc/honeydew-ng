System.register(["./annotations", "../util/decorators"], function($__export) {
  "use strict";
  var InjectAnnotation,
      InjectPromiseAnnotation,
      InjectLazyAnnotation,
      OptionalAnnotation,
      InjectableAnnotation,
      makeDecorator,
      makeParamDecorator,
      Inject,
      InjectPromise,
      InjectLazy,
      Optional,
      Injectable;
  return {
    setters: [function($__m) {
      InjectAnnotation = $__m.InjectAnnotation;
      InjectPromiseAnnotation = $__m.InjectPromiseAnnotation;
      InjectLazyAnnotation = $__m.InjectLazyAnnotation;
      OptionalAnnotation = $__m.OptionalAnnotation;
      InjectableAnnotation = $__m.InjectableAnnotation;
    }, function($__m) {
      makeDecorator = $__m.makeDecorator;
      makeParamDecorator = $__m.makeParamDecorator;
    }],
    execute: function() {
      Inject = makeParamDecorator(InjectAnnotation);
      $__export("Inject", Inject);
      InjectPromise = makeParamDecorator(InjectPromiseAnnotation);
      $__export("InjectPromise", InjectPromise);
      InjectLazy = makeParamDecorator(InjectLazyAnnotation);
      $__export("InjectLazy", InjectLazy);
      Optional = makeParamDecorator(OptionalAnnotation);
      $__export("Optional", Optional);
      Injectable = makeDecorator(InjectableAnnotation);
      $__export("Injectable", Injectable);
    }
  };
});
//# sourceMappingURL=decorators.js.map

//# sourceMappingURL=../../src/di/decorators.js.map