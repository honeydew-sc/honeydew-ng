System.register(["angular2/di", "angular2/src/facade/lang", "../annotations_impl/annotations", "angular2/src/reflection/reflection"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      resolveForwardRef,
      Injectable,
      isPresent,
      BaseException,
      stringify,
      Directive,
      reflector,
      DirectiveResolver;
  return {
    setters: [function($__m) {
      resolveForwardRef = $__m.resolveForwardRef;
      Injectable = $__m.Injectable;
    }, function($__m) {
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      stringify = $__m.stringify;
    }, function($__m) {
      Directive = $__m.Directive;
    }, function($__m) {
      reflector = $__m.reflector;
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
      DirectiveResolver = ($traceurRuntime.createClass)(function() {}, {resolve: function(type) {
          var annotations = reflector.annotations(resolveForwardRef(type));
          if (isPresent(annotations)) {
            for (var i = 0; i < annotations.length; i++) {
              var annotation = annotations[i];
              if (annotation instanceof Directive) {
                return annotation;
              }
            }
          }
          throw new BaseException(("No Directive annotation found on " + stringify(type)));
        }}, {});
      $__export("DirectiveResolver", DirectiveResolver);
      $__export("DirectiveResolver", DirectiveResolver = __decorate([Injectable(), __metadata('design:paramtypes', [])], DirectiveResolver));
    }
  };
});
//# sourceMappingURL=directive_resolver.js.map

//# sourceMappingURL=../../../src/core/compiler/directive_resolver.js.map