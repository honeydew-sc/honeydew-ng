System.register(["./src/router/router", "./src/router/router_outlet", "./src/router/router_link", "./src/router/instruction", "./src/router/route_registry", "./src/router/location_strategy", "./src/router/hash_location_strategy", "./src/router/html5_location_strategy", "./src/router/location", "./src/router/pipeline", "./src/router/route_config_decorator", "./src/core/application_tokens", "./di", "./src/facade/lang"], function($__export) {
  "use strict";
  var LocationStrategy,
      HTML5LocationStrategy,
      Router,
      RootRouter,
      RouterOutlet,
      RouterLink,
      RouteRegistry,
      Pipeline,
      Location,
      appComponentTypeToken,
      bind,
      CONST_EXPR,
      routerDirectives,
      routerInjectables;
  var $__exportNames = {
    routerDirectives: true,
    routerInjectables: true,
    undefined: true
  };
  return {
    setters: [function($__m) {
      Router = $__m.Router;
      RootRouter = $__m.RootRouter;
      $__export("Router", $__m.Router);
      $__export("RootRouter", $__m.RootRouter);
    }, function($__m) {
      RouterOutlet = $__m.RouterOutlet;
      $__export("RouterOutlet", $__m.RouterOutlet);
    }, function($__m) {
      RouterLink = $__m.RouterLink;
      $__export("RouterLink", $__m.RouterLink);
    }, function($__m) {
      $__export("RouteParams", $__m.RouteParams);
    }, function($__m) {
      RouteRegistry = $__m.RouteRegistry;
      $__export("RouteRegistry", $__m.RouteRegistry);
    }, function($__m) {
      LocationStrategy = $__m.LocationStrategy;
      $__export("LocationStrategy", $__m.LocationStrategy);
    }, function($__m) {
      $__export("HashLocationStrategy", $__m.HashLocationStrategy);
    }, function($__m) {
      HTML5LocationStrategy = $__m.HTML5LocationStrategy;
      $__export("HTML5LocationStrategy", $__m.HTML5LocationStrategy);
    }, function($__m) {
      Location = $__m.Location;
      $__export("Location", $__m.Location);
      $__export("appBaseHrefToken", $__m.appBaseHrefToken);
    }, function($__m) {
      Pipeline = $__m.Pipeline;
      $__export("Pipeline", $__m.Pipeline);
    }, function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (p !== 'default' && !$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      appComponentTypeToken = $__m.appComponentTypeToken;
    }, function($__m) {
      bind = $__m.bind;
    }, function($__m) {
      CONST_EXPR = $__m.CONST_EXPR;
    }],
    execute: function() {
      routerDirectives = CONST_EXPR([RouterOutlet, RouterLink]);
      $__export("routerDirectives", routerDirectives);
      routerInjectables = [RouteRegistry, Pipeline, bind(LocationStrategy).toClass(HTML5LocationStrategy), Location, bind(Router).toFactory(function(registry, pipeline, location, appRoot) {
        return new RootRouter(registry, pipeline, location, appRoot);
      }, [RouteRegistry, Pipeline, Location, appComponentTypeToken])];
      $__export("routerInjectables", routerInjectables);
    }
  };
});
//# sourceMappingURL=router.js.map

//# sourceMappingURL=router.js.map