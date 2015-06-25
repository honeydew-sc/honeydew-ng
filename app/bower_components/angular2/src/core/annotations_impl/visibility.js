System.register(["angular2/src/facade/lang", "angular2/src/di/annotations_impl"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      CONST,
      isBlank,
      DependencyAnnotation,
      Visibility,
      Self,
      self,
      Parent,
      Ancestor,
      Unbounded;
  return {
    setters: [function($__m) {
      CONST = $__m.CONST;
      isBlank = $__m.isBlank;
    }, function($__m) {
      DependencyAnnotation = $__m.DependencyAnnotation;
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
      Visibility = function($__super) {
        function $__0(depth, crossComponentBoundaries, _includeSelf) {
          $traceurRuntime.superConstructor($__0).call(this);
          this.depth = depth;
          this.crossComponentBoundaries = crossComponentBoundaries;
          this._includeSelf = _includeSelf;
        }
        return ($traceurRuntime.createClass)($__0, {
          get includeSelf() {
            return isBlank(this._includeSelf) ? false : this._includeSelf;
          },
          toString: function() {
            return ("@Visibility(depth: " + this.depth + ", crossComponentBoundaries: " + this.crossComponentBoundaries + ", includeSelf: " + this.includeSelf + "})");
          }
        }, {}, $__super);
      }(DependencyAnnotation);
      $__export("Visibility", Visibility);
      $__export("Visibility", Visibility = __decorate([CONST(), __metadata('design:paramtypes', [Number, Boolean, Boolean])], Visibility));
      Self = function($__super) {
        function $__0() {
          $traceurRuntime.superConstructor($__0).call(this, 0, false, true);
        }
        return ($traceurRuntime.createClass)($__0, {toString: function() {
            return "@Self()";
          }}, {}, $__super);
      }(Visibility);
      $__export("Self", Self);
      $__export("Self", Self = __decorate([CONST(), __metadata('design:paramtypes', [])], Self));
      self = new Self();
      $__export("self", self);
      Parent = function($__super) {
        function $__0() {
          var self = (arguments[0] !== (void 0) ? arguments[0] : {}).self;
          $traceurRuntime.superConstructor($__0).call(this, 1, false, self);
        }
        return ($traceurRuntime.createClass)($__0, {toString: function() {
            return ("@Parent(self: " + this.includeSelf + "})");
          }}, {}, $__super);
      }(Visibility);
      $__export("Parent", Parent);
      $__export("Parent", Parent = __decorate([CONST(), __metadata('design:paramtypes', [Object])], Parent));
      Ancestor = function($__super) {
        function $__0() {
          var self = (arguments[0] !== (void 0) ? arguments[0] : {}).self;
          $traceurRuntime.superConstructor($__0).call(this, 999999, false, self);
        }
        return ($traceurRuntime.createClass)($__0, {toString: function() {
            return ("@Ancestor(self: " + this.includeSelf + "})");
          }}, {}, $__super);
      }(Visibility);
      $__export("Ancestor", Ancestor);
      $__export("Ancestor", Ancestor = __decorate([CONST(), __metadata('design:paramtypes', [Object])], Ancestor));
      Unbounded = function($__super) {
        function $__0() {
          var self = (arguments[0] !== (void 0) ? arguments[0] : {}).self;
          $traceurRuntime.superConstructor($__0).call(this, 999999, true, self);
        }
        return ($traceurRuntime.createClass)($__0, {toString: function() {
            return ("@Unbounded(self: " + this.includeSelf + "})");
          }}, {}, $__super);
      }(Visibility);
      $__export("Unbounded", Unbounded);
      $__export("Unbounded", Unbounded = __decorate([CONST(), __metadata('design:paramtypes', [Object])], Unbounded));
    }
  };
});
//# sourceMappingURL=visibility.js.map

//# sourceMappingURL=../../../src/core/annotations_impl/visibility.js.map