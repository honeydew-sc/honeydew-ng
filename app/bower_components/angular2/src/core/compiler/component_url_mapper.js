System.register(["angular2/di", "angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      isPresent,
      Map,
      ComponentUrlMapper,
      RuntimeComponentUrlMapper;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      Map = $__m.Map;
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
      ComponentUrlMapper = ($traceurRuntime.createClass)(function() {}, {getUrl: function(component) {
          return './';
        }}, {});
      $__export("ComponentUrlMapper", ComponentUrlMapper);
      $__export("ComponentUrlMapper", ComponentUrlMapper = __decorate([Injectable(), __metadata('design:paramtypes', [])], ComponentUrlMapper));
      RuntimeComponentUrlMapper = function($__super) {
        function RuntimeComponentUrlMapper() {
          $traceurRuntime.superConstructor(RuntimeComponentUrlMapper).call(this);
          this._componentUrls = new Map();
        }
        return ($traceurRuntime.createClass)(RuntimeComponentUrlMapper, {
          setComponentUrl: function(component, url) {
            this._componentUrls.set(component, url);
          },
          getUrl: function(component) {
            var url = this._componentUrls.get(component);
            if (isPresent(url))
              return url;
            return $traceurRuntime.superGet(this, RuntimeComponentUrlMapper.prototype, "getUrl").call(this, component);
          }
        }, {}, $__super);
      }(ComponentUrlMapper);
      $__export("RuntimeComponentUrlMapper", RuntimeComponentUrlMapper);
    }
  };
});
//# sourceMappingURL=component_url_mapper.js.map

//# sourceMappingURL=../../../src/core/compiler/component_url_mapper.js.map