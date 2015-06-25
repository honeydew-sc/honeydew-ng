System.register(["angular2/src/facade/lang", "angular2/src/di/annotations_impl", "angular2/change_detection"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      CONST,
      CONST_EXPR,
      Injectable,
      DEFAULT,
      Directive,
      Component,
      LifecycleEvent,
      onDestroy,
      onChange,
      onCheck,
      onInit,
      onAllChangesDone;
  return {
    setters: [function($__m) {
      CONST = $__m.CONST;
      CONST_EXPR = $__m.CONST_EXPR;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      DEFAULT = $__m.DEFAULT;
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
      Directive = function($__super) {
        function $__0() {
          var $__3;
          var $__2 = arguments[0] !== (void 0) ? arguments[0] : {},
              selector = $__2.selector,
              properties = $__2.properties,
              events = $__2.events,
              host = $__2.host,
              lifecycle = $__2.lifecycle,
              hostInjector = $__2.hostInjector,
              exportAs = $__2.exportAs,
              compileChildren = ($__3 = $__2.compileChildren) === void 0 ? true : $__3;
          $traceurRuntime.superConstructor($__0).call(this);
          this.selector = selector;
          this.properties = properties;
          this.events = events;
          this.host = host;
          this.exportAs = exportAs;
          this.lifecycle = lifecycle;
          this.compileChildren = compileChildren;
          this.hostInjector = hostInjector;
        }
        return ($traceurRuntime.createClass)($__0, {}, {}, $__super);
      }(Injectable);
      $__export("Directive", Directive);
      $__export("Directive", Directive = __decorate([CONST(), __metadata('design:paramtypes', [Object])], Directive));
      Component = function($__super) {
        function $__0() {
          var $__3,
              $__4;
          var $__2 = arguments[0] !== (void 0) ? arguments[0] : {},
              selector = $__2.selector,
              properties = $__2.properties,
              events = $__2.events,
              host = $__2.host,
              exportAs = $__2.exportAs,
              appInjector = $__2.appInjector,
              lifecycle = $__2.lifecycle,
              hostInjector = $__2.hostInjector,
              viewInjector = $__2.viewInjector,
              changeDetection = ($__3 = $__2.changeDetection) === void 0 ? DEFAULT : $__3,
              compileChildren = ($__4 = $__2.compileChildren) === void 0 ? true : $__4;
          $traceurRuntime.superConstructor($__0).call(this, {
            selector: selector,
            properties: properties,
            events: events,
            host: host,
            exportAs: exportAs,
            hostInjector: hostInjector,
            lifecycle: lifecycle,
            compileChildren: compileChildren
          });
          this.changeDetection = changeDetection;
          this.appInjector = appInjector;
          this.viewInjector = viewInjector;
        }
        return ($traceurRuntime.createClass)($__0, {}, {}, $__super);
      }(Directive);
      $__export("Component", Component);
      $__export("Component", Component = __decorate([CONST(), __metadata('design:paramtypes', [Object])], Component));
      LifecycleEvent = ($traceurRuntime.createClass)(function(name) {
        this.name = name;
      }, {}, {});
      $__export("LifecycleEvent", LifecycleEvent);
      $__export("LifecycleEvent", LifecycleEvent = __decorate([CONST(), __metadata('design:paramtypes', [String])], LifecycleEvent));
      onDestroy = CONST_EXPR(new LifecycleEvent("onDestroy"));
      $__export("onDestroy", onDestroy);
      onChange = CONST_EXPR(new LifecycleEvent("onChange"));
      $__export("onChange", onChange);
      onCheck = CONST_EXPR(new LifecycleEvent("onCheck"));
      $__export("onCheck", onCheck);
      onInit = CONST_EXPR(new LifecycleEvent("onInit"));
      $__export("onInit", onInit);
      onAllChangesDone = CONST_EXPR(new LifecycleEvent("onAllChangesDone"));
      $__export("onAllChangesDone", onAllChangesDone);
    }
  };
});
//# sourceMappingURL=annotations.js.map

//# sourceMappingURL=../../../src/core/annotations_impl/annotations.js.map