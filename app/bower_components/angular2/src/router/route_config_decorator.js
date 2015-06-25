System.register(["./route_config_impl", "angular2/src/util/decorators"], function($__export) {
  "use strict";
  var RouteConfigAnnotation,
      makeDecorator,
      RouteConfig;
  return {
    setters: [function($__m) {
      RouteConfigAnnotation = $__m.RouteConfig;
    }, function($__m) {
      makeDecorator = $__m.makeDecorator;
    }],
    execute: function() {
      RouteConfig = makeDecorator(RouteConfigAnnotation);
      $__export("RouteConfig", RouteConfig);
    }
  };
});
//# sourceMappingURL=route_config_decorator.js.map

//# sourceMappingURL=../../src/router/route_config_decorator.js.map