System.register(["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      CONST,
      View;
  return {
    setters: [function($__m) {
      CONST = $__m.CONST;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      View = ($traceurRuntime.createClass)(function() {
        var $__2 = arguments[0] !== (void 0) ? arguments[0] : {},
            templateUrl = $__2.templateUrl,
            template = $__2.template,
            directives = $__2.directives,
            renderer = $__2.renderer,
            styles = $__2.styles,
            styleUrls = $__2.styleUrls;
        this.templateUrl = templateUrl;
        this.template = template;
        this.styleUrls = styleUrls;
        this.styles = styles;
        this.directives = directives;
        this.renderer = renderer;
      }, {}, {});
      $__export("View", View);
      $__export("View", View = __decorate([CONST(), __metadata('design:paramtypes', [Object])], View));
    }
  };
});
//# sourceMappingURL=view.js.map

//# sourceMappingURL=../../../src/core/annotations_impl/view.js.map