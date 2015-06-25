System.register(["angular2/di", "angular2/src/core/annotations_impl/view", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/reflection/reflection"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      View,
      stringify,
      isBlank,
      BaseException,
      Map,
      reflector,
      ViewResolver;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      stringify = $__m.stringify;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
    }, function($__m) {
      Map = $__m.Map;
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
      ViewResolver = ($traceurRuntime.createClass)(function() {
        this._cache = new Map();
      }, {
        resolve: function(component) {
          var view = this._cache.get(component);
          if (isBlank(view)) {
            view = this._resolve(component);
            this._cache.set(component, view);
          }
          return view;
        },
        _resolve: function(component) {
          var annotations = reflector.annotations(component);
          for (var i = 0; i < annotations.length; i++) {
            var annotation = annotations[i];
            if (annotation instanceof View) {
              return annotation;
            }
          }
          throw new BaseException(("No View annotation found on component " + stringify(component)));
        }
      }, {});
      $__export("ViewResolver", ViewResolver);
      $__export("ViewResolver", ViewResolver = __decorate([Injectable(), __metadata('design:paramtypes', [])], ViewResolver));
    }
  };
});
//# sourceMappingURL=view_resolver.js.map

//# sourceMappingURL=../../../src/core/compiler/view_resolver.js.map