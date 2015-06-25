System.register(["angular2/src/core/annotations/annotations", "angular2/src/core/annotations/decorators", "angular2/core", "angular2/src/facade/collection", "angular2/src/facade/lang", "./router", "./location", "angular2/src/render/api"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      onAllChangesDone,
      Directive,
      ElementRef,
      StringMapWrapper,
      isPresent,
      Router,
      Location,
      Renderer,
      RouterLink;
  return {
    setters: [function($__m) {
      onAllChangesDone = $__m.onAllChangesDone;
    }, function($__m) {
      Directive = $__m.Directive;
    }, function($__m) {
      ElementRef = $__m.ElementRef;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      Router = $__m.Router;
    }, function($__m) {
      Location = $__m.Location;
    }, function($__m) {
      Renderer = $__m.Renderer;
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
      RouterLink = ($traceurRuntime.createClass)(function(_elementRef, _router, _location, _renderer) {
        this._elementRef = _elementRef;
        this._router = _router;
        this._location = _location;
        this._renderer = _renderer;
        this._params = StringMapWrapper.create();
      }, {
        set route(changes) {
          this._route = changes;
        },
        set params(changes) {
          this._params = changes;
        },
        onClick: function() {
          this._router.navigate(this._navigationHref);
          return false;
        },
        onAllChangesDone: function() {
          if (isPresent(this._route) && isPresent(this._params)) {
            this._navigationHref = this._router.generate(this._route, this._params);
            this._visibleHref = this._location.normalizeAbsolutely(this._navigationHref);
            this._renderer.setElementAttribute(this._elementRef, 'href', this._visibleHref);
          }
        }
      }, {});
      $__export("RouterLink", RouterLink);
      $__export("RouterLink", RouterLink = __decorate([Directive({
        selector: '[router-link]',
        properties: ['route: routerLink', 'params: routerParams'],
        lifecycle: [onAllChangesDone],
        host: {'(^click)': 'onClick()'}
      }), __metadata('design:paramtypes', [ElementRef, Router, Location, Renderer])], RouterLink));
    }
  };
});
//# sourceMappingURL=router_link.js.map

//# sourceMappingURL=../../src/router/router_link.js.map