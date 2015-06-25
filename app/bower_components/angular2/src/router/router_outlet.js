System.register(["angular2/src/facade/async", "angular2/src/facade/lang", "angular2/src/core/annotations/decorators", "angular2/core", "angular2/di", "./router", "./instruction"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      __param,
      PromiseWrapper,
      isPresent,
      Directive,
      Attribute,
      DynamicComponentLoader,
      ElementRef,
      Injector,
      bind,
      routerMod,
      RouteParams,
      RouterOutlet;
  return {
    setters: [function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      Directive = $__m.Directive;
      Attribute = $__m.Attribute;
    }, function($__m) {
      DynamicComponentLoader = $__m.DynamicComponentLoader;
      ElementRef = $__m.ElementRef;
    }, function($__m) {
      Injector = $__m.Injector;
      bind = $__m.bind;
    }, function($__m) {
      routerMod = $__m;
    }, function($__m) {
      RouteParams = $__m.RouteParams;
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
      __param = (this && this.__param) || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      RouterOutlet = ($traceurRuntime.createClass)(function(elementRef, _loader, _parentRouter, _injector, nameAttr) {
        this._loader = _loader;
        this._parentRouter = _parentRouter;
        this._injector = _injector;
        this._elementRef = elementRef;
        this._childRouter = null;
        this._componentRef = null;
        this._currentInstruction = null;
        this._parentRouter.registerOutlet(this);
      }, {
        activate: function(instruction) {
          var $__0 = this;
          if ((instruction == this._currentInstruction || instruction.reuse) && isPresent(this._childRouter)) {
            return this._childRouter.commit(instruction.child);
          }
          this._currentInstruction = instruction;
          this._childRouter = this._parentRouter.childRouter(instruction.component);
          var outletInjector = this._injector.resolveAndCreateChild([bind(RouteParams).toValue(new RouteParams(instruction.params)), bind(routerMod.Router).toValue(this._childRouter)]);
          return this.deactivate().then(function(_) {
            return $__0._loader.loadNextToLocation(instruction.component, $__0._elementRef, outletInjector);
          }).then(function(componentRef) {
            $__0._componentRef = componentRef;
            return $__0._childRouter.commit(instruction.child);
          });
        },
        deactivate: function() {
          var $__0 = this;
          return (isPresent(this._childRouter) ? this._childRouter.deactivate() : PromiseWrapper.resolve(true)).then(function(_) {
            if (isPresent($__0._componentRef)) {
              $__0._componentRef.dispose();
              $__0._componentRef = null;
            }
          });
        },
        canDeactivate: function(instruction) {
          return PromiseWrapper.resolve(true);
        }
      }, {});
      $__export("RouterOutlet", RouterOutlet);
      $__export("RouterOutlet", RouterOutlet = __decorate([Directive({selector: 'router-outlet'}), __param(4, Attribute('name')), __metadata('design:paramtypes', [ElementRef, DynamicComponentLoader, routerMod.Router, Injector, String])], RouterOutlet));
    }
  };
});
//# sourceMappingURL=router_outlet.js.map

//# sourceMappingURL=../../src/router/router_outlet.js.map