System.register(["./src/mock/mock_location_strategy", "./src/router/location_strategy", "angular2/src/mock/view_resolver_mock", "angular2/src/render/xhr_mock"], function($__export) {
  "use strict";
  var $__exportNames = {undefined: true};
  return {
    setters: [function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (p !== 'default' && !$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      $__export("LocationStrategy", $__m.LocationStrategy);
    }, function($__m) {
      $__export("MockViewResolver", $__m.MockViewResolver);
    }, function($__m) {
      $__export("MockXHR", $__m.MockXHR);
    }],
    execute: function() {}
  };
});
//# sourceMappingURL=mock.js.map

//# sourceMappingURL=mock.js.map