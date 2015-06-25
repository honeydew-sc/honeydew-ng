System.register(["angular2/src/facade/lang", "./pipe"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      isBlank,
      CONST,
      BasePipe,
      WrappedValue,
      NullPipeFactory,
      NullPipe;
  return {
    setters: [function($__m) {
      isBlank = $__m.isBlank;
      CONST = $__m.CONST;
    }, function($__m) {
      BasePipe = $__m.BasePipe;
      WrappedValue = $__m.WrappedValue;
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
      NullPipeFactory = ($traceurRuntime.createClass)(function() {}, {
        supports: function(obj) {
          return NullPipe.supportsObj(obj);
        },
        create: function(cdRef) {
          return new NullPipe();
        }
      }, {});
      $__export("NullPipeFactory", NullPipeFactory);
      $__export("NullPipeFactory", NullPipeFactory = __decorate([CONST(), __metadata('design:paramtypes', [])], NullPipeFactory));
      NullPipe = function($__super) {
        function NullPipe() {
          var $__3;
          for (var args = [],
              $__2 = 0; $__2 < arguments.length; $__2++)
            args[$__2] = arguments[$__2];
          ($__3 = $traceurRuntime.superConstructor(NullPipe)).call.apply($__3, $traceurRuntime.spread([this], args));
          this.called = false;
        }
        return ($traceurRuntime.createClass)(NullPipe, {
          supports: function(obj) {
            return NullPipe.supportsObj(obj);
          },
          transform: function(value) {
            if (!this.called) {
              this.called = true;
              return WrappedValue.wrap(null);
            } else {
              return null;
            }
          }
        }, {supportsObj: function(obj) {
            return isBlank(obj);
          }}, $__super);
      }(BasePipe);
      $__export("NullPipe", NullPipe);
    }
  };
});
//# sourceMappingURL=null_pipe.js.map

//# sourceMappingURL=../../../src/change_detection/pipes/null_pipe.js.map