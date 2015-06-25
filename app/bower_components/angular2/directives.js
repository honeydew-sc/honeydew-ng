System.register(["./src/facade/lang", "./src/directives/ng_for", "./src/directives/ng_if", "./src/directives/ng_non_bindable", "./src/directives/ng_switch", "./src/directives/class"], function($__export) {
  "use strict";
  var CONST_EXPR,
      NgFor,
      NgIf,
      NgNonBindable,
      NgSwitch,
      NgSwitchWhen,
      NgSwitchDefault,
      coreDirectives;
  var $__exportNames = {coreDirectives: true};
  var $__exportNames = {coreDirectives: true};
  var $__exportNames = {coreDirectives: true};
  var $__exportNames = {coreDirectives: true};
  var $__exportNames = {coreDirectives: true};
  return {
    setters: [function($__m) {
      CONST_EXPR = $__m.CONST_EXPR;
    }, function($__m) {
      NgFor = $__m.NgFor;
      Object.keys($__m).forEach(function(p) {
        if (p !== 'default' && !$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      NgIf = $__m.NgIf;
      Object.keys($__m).forEach(function(p) {
        if (p !== 'default' && !$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      NgNonBindable = $__m.NgNonBindable;
      Object.keys($__m).forEach(function(p) {
        if (p !== 'default' && !$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      NgSwitch = $__m.NgSwitch;
      NgSwitchWhen = $__m.NgSwitchWhen;
      NgSwitchDefault = $__m.NgSwitchDefault;
      Object.keys($__m).forEach(function(p) {
        if (p !== 'default' && !$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (p !== 'default' && !$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }],
    execute: function() {
      coreDirectives = CONST_EXPR([NgFor, NgIf, NgNonBindable, NgSwitch, NgSwitchWhen, NgSwitchDefault]);
      $__export("coreDirectives", coreDirectives);
    }
  };
});
//# sourceMappingURL=directives.js.map

//# sourceMappingURL=directives.js.map