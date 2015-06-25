System.register(["./angular2", "./router"], function($__export) {
  "use strict";
  var ng,
      router,
      angular,
      _prevAngular;
  return {
    setters: [function($__m) {
      ng = $__m;
    }, function($__m) {
      router = $__m;
    }],
    execute: function() {
      angular = ng;
      window.angular = angular;
      _prevAngular = window.angular;
      angular.router = router;
      angular.noConflict = function() {
        window.angular = _prevAngular;
        return angular;
      };
    }
  };
});
//# sourceMappingURL=angular2_sfx.js.map

//# sourceMappingURL=angular2_sfx.js.map