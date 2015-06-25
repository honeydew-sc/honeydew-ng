System.register(["angular2/di", "./compiler", "angular2/src/core/compiler/view_manager"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      Compiler,
      AppViewManager,
      ComponentRef,
      DynamicComponentLoader;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      Compiler = $__m.Compiler;
    }, function($__m) {
      AppViewManager = $__m.AppViewManager;
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
      ComponentRef = function() {
        function ComponentRef(location, instance, dispose) {
          this.location = location;
          this.instance = instance;
          this.dispose = dispose;
        }
        return ($traceurRuntime.createClass)(ComponentRef, {get hostView() {
            return this.location.parentView;
          }}, {});
      }();
      $__export("ComponentRef", ComponentRef);
      DynamicComponentLoader = ($traceurRuntime.createClass)(function(_compiler, _viewManager) {
        this._compiler = _compiler;
        this._viewManager = _viewManager;
      }, {
        loadAsRoot: function(typeOrBinding) {
          var overrideSelector = arguments[1] !== (void 0) ? arguments[1] : null;
          var injector = arguments[2] !== (void 0) ? arguments[2] : null;
          var $__0 = this;
          return this._compiler.compileInHost(typeOrBinding).then(function(hostProtoViewRef) {
            var hostViewRef = $__0._viewManager.createRootHostView(hostProtoViewRef, overrideSelector, injector);
            var newLocation = $__0._viewManager.getHostElement(hostViewRef);
            var component = $__0._viewManager.getComponent(newLocation);
            var dispose = function() {
              $__0._viewManager.destroyRootHostView(hostViewRef);
            };
            return new ComponentRef(newLocation, component, dispose);
          });
        },
        loadIntoLocation: function(typeOrBinding, hostLocation, anchorName) {
          var injector = arguments[3] !== (void 0) ? arguments[3] : null;
          return this.loadNextToLocation(typeOrBinding, this._viewManager.getNamedElementInComponentView(hostLocation, anchorName), injector);
        },
        loadNextToLocation: function(typeOrBinding, location) {
          var injector = arguments[2] !== (void 0) ? arguments[2] : null;
          var $__0 = this;
          return this._compiler.compileInHost(typeOrBinding).then(function(hostProtoViewRef) {
            var viewContainer = $__0._viewManager.getViewContainer(location);
            var hostViewRef = viewContainer.create(hostProtoViewRef, viewContainer.length, null, injector);
            var newLocation = $__0._viewManager.getHostElement(hostViewRef);
            var component = $__0._viewManager.getComponent(newLocation);
            var dispose = function() {
              var index = viewContainer.indexOf(hostViewRef);
              viewContainer.remove(index);
            };
            return new ComponentRef(newLocation, component, dispose);
          });
        }
      }, {});
      $__export("DynamicComponentLoader", DynamicComponentLoader);
      $__export("DynamicComponentLoader", DynamicComponentLoader = __decorate([Injectable(), __metadata('design:paramtypes', [Compiler, AppViewManager])], DynamicComponentLoader));
    }
  };
});
//# sourceMappingURL=dynamic_component_loader.js.map

//# sourceMappingURL=../../../src/core/compiler/dynamic_component_loader.js.map