System.register(["angular2/src/facade/async", "angular2/src/facade/collection", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var PromiseWrapper,
      EventEmitter,
      ObservableWrapper,
      List,
      isBlank,
      isPresent,
      Router,
      RootRouter,
      ChildRouter;
  return {
    setters: [function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
      EventEmitter = $__m.EventEmitter;
      ObservableWrapper = $__m.ObservableWrapper;
    }, function($__m) {
      List = $__m.List;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
    }],
    execute: function() {
      Router = function() {
        function Router(_registry, _pipeline, parent, hostComponent) {
          this._registry = _registry;
          this._pipeline = _pipeline;
          this.parent = parent;
          this.hostComponent = hostComponent;
          this.navigating = false;
          this.previousUrl = null;
          this._outlet = null;
          this._subject = new EventEmitter();
          this._currentInstruction = null;
          this._currentNavigation = PromiseWrapper.resolve(true);
        }
        return ($traceurRuntime.createClass)(Router, {
          childRouter: function(hostComponent) {
            return new ChildRouter(this, hostComponent);
          },
          registerOutlet: function(outlet) {
            this._outlet = outlet;
            if (isPresent(this._currentInstruction)) {
              return outlet.activate(this._currentInstruction);
            }
            return PromiseWrapper.resolve(true);
          },
          config: function(config) {
            var $__0 = this;
            if (config instanceof List) {
              config.forEach(function(configObject) {
                $__0._registry.config($__0.hostComponent, configObject);
              });
            } else {
              this._registry.config(this.hostComponent, config);
            }
            return this.renavigate();
          },
          navigate: function(url) {
            var $__0 = this;
            if (this.navigating) {
              return this._currentNavigation;
            }
            this.lastNavigationAttempt = url;
            return this._currentNavigation = this.recognize(url).then(function(matchedInstruction) {
              if (isBlank(matchedInstruction)) {
                return PromiseWrapper.resolve(false);
              }
              if (isPresent($__0._currentInstruction)) {
                matchedInstruction.reuseComponentsFrom($__0._currentInstruction);
              }
              $__0._startNavigating();
              var result = $__0.commit(matchedInstruction).then(function(_) {
                $__0._finishNavigating();
                ObservableWrapper.callNext($__0._subject, matchedInstruction.accumulatedUrl);
              });
              return PromiseWrapper.catchError(result, function(err) {
                $__0._finishNavigating();
                throw err;
              });
            });
          },
          _startNavigating: function() {
            this.navigating = true;
          },
          _finishNavigating: function() {
            this.navigating = false;
          },
          subscribe: function(onNext) {
            ObservableWrapper.subscribe(this._subject, onNext);
          },
          commit: function(instruction) {
            this._currentInstruction = instruction;
            if (isPresent(this._outlet)) {
              return this._outlet.activate(instruction);
            }
            return PromiseWrapper.resolve(true);
          },
          deactivate: function() {
            if (isPresent(this._outlet)) {
              return this._outlet.deactivate();
            }
            return PromiseWrapper.resolve(true);
          },
          recognize: function(url) {
            return this._registry.recognize(url, this.hostComponent);
          },
          renavigate: function() {
            var destination = isBlank(this.previousUrl) ? this.lastNavigationAttempt : this.previousUrl;
            if (isBlank(destination)) {
              return this._currentNavigation;
            }
            return this.navigate(destination);
          },
          generate: function(name, params) {
            return this._registry.generate(name, params, this.hostComponent);
          }
        }, {});
      }();
      $__export("Router", Router);
      RootRouter = function($__super) {
        function RootRouter(registry, pipeline, location, hostComponent) {
          var $__0;
          $traceurRuntime.superConstructor(RootRouter).call(this, registry, pipeline, null, hostComponent);
          this._location = location;
          this._location.subscribe(($__0 = this, function(change) {
            return $__0.navigate(change['url']);
          }));
          this._registry.configFromComponent(hostComponent);
          this.navigate(location.path());
        }
        return ($traceurRuntime.createClass)(RootRouter, {commit: function(instruction) {
            var $__0 = this;
            return $traceurRuntime.superGet(this, RootRouter.prototype, "commit").call(this, instruction).then(function(_) {
              $__0._location.go(instruction.accumulatedUrl);
            });
          }}, {}, $__super);
      }(Router);
      $__export("RootRouter", RootRouter);
      ChildRouter = function($__super) {
        function ChildRouter(parent, hostComponent) {
          $traceurRuntime.superConstructor(ChildRouter).call(this, parent._registry, parent._pipeline, parent, hostComponent);
          this.parent = parent;
        }
        return ($traceurRuntime.createClass)(ChildRouter, {}, {}, $__super);
      }(Router);
    }
  };
});
//# sourceMappingURL=router.js.map

//# sourceMappingURL=../../src/router/router.js.map