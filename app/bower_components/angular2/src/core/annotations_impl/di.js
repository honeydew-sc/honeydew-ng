System.register(["angular2/src/facade/lang", "angular2/src/di/annotations_impl", "angular2/di"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      CONST,
      stringify,
      StringWrapper,
      isString,
      DependencyAnnotation,
      resolveForwardRef,
      Attribute,
      Query;
  return {
    setters: [function($__m) {
      CONST = $__m.CONST;
      stringify = $__m.stringify;
      StringWrapper = $__m.StringWrapper;
      isString = $__m.isString;
    }, function($__m) {
      DependencyAnnotation = $__m.DependencyAnnotation;
    }, function($__m) {
      resolveForwardRef = $__m.resolveForwardRef;
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
      Attribute = function($__super) {
        function $__0(attributeName) {
          $traceurRuntime.superConstructor($__0).call(this);
          this.attributeName = attributeName;
        }
        return ($traceurRuntime.createClass)($__0, {
          get token() {
            return this;
          },
          toString: function() {
            return ("@Attribute(" + stringify(this.attributeName) + ")");
          }
        }, {}, $__super);
      }(DependencyAnnotation);
      $__export("Attribute", Attribute);
      $__export("Attribute", Attribute = __decorate([CONST(), __metadata('design:paramtypes', [String])], Attribute));
      Query = function($__super) {
        function $__0(_selector) {
          var $__3;
          var $__2 = arguments[1] !== (void 0) ? arguments[1] : {},
              descendants = ($__3 = $__2.descendants) === void 0 ? false : $__3;
          $traceurRuntime.superConstructor($__0).call(this);
          this._selector = _selector;
          this.descendants = descendants;
        }
        return ($traceurRuntime.createClass)($__0, {
          get selector() {
            return resolveForwardRef(this._selector);
          },
          get isVarBindingQuery() {
            return isString(this.selector);
          },
          get varBindings() {
            return StringWrapper.split(this.selector, new RegExp(","));
          },
          toString: function() {
            return ("@Query(" + stringify(this.selector) + ")");
          }
        }, {}, $__super);
      }(DependencyAnnotation);
      $__export("Query", Query);
      $__export("Query", Query = __decorate([CONST(), __metadata('design:paramtypes', [Object, Object])], Query));
    }
  };
});
//# sourceMappingURL=di.js.map

//# sourceMappingURL=../../../src/core/annotations_impl/di.js.map