System.register(["angular2/angular2", "angular2/di", "angular2/src/facade/lang", "./control_container", "./shared"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      __param,
      Directive,
      Ancestor,
      onDestroy,
      onInit,
      forwardRef,
      Binding,
      CONST_EXPR,
      ControlContainer,
      controlPath,
      controlGroupBinding,
      NgControlGroup;
  return {
    setters: [function($__m) {
      Directive = $__m.Directive;
      Ancestor = $__m.Ancestor;
      onDestroy = $__m.onDestroy;
      onInit = $__m.onInit;
    }, function($__m) {
      forwardRef = $__m.forwardRef;
      Binding = $__m.Binding;
    }, function($__m) {
      CONST_EXPR = $__m.CONST_EXPR;
    }, function($__m) {
      ControlContainer = $__m.ControlContainer;
    }, function($__m) {
      controlPath = $__m.controlPath;
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
      controlGroupBinding = CONST_EXPR(new Binding(ControlContainer, {toAlias: forwardRef(function() {
          return NgControlGroup;
        })}));
      NgControlGroup = function($__super) {
        function $__0(_parent) {
          $traceurRuntime.superConstructor($__0).call(this);
          this._parent = _parent;
        }
        return ($traceurRuntime.createClass)($__0, {
          onInit: function() {
            this.formDirective.addControlGroup(this);
          },
          onDestroy: function() {
            this.formDirective.removeControlGroup(this);
          },
          get path() {
            return controlPath(this.name, this._parent);
          },
          get formDirective() {
            return this._parent.formDirective;
          }
        }, {}, $__super);
      }(ControlContainer);
      $__export("NgControlGroup", NgControlGroup);
      $__export("NgControlGroup", NgControlGroup = __decorate([Directive({
        selector: '[ng-control-group]',
        hostInjector: [controlGroupBinding],
        properties: ['name: ng-control-group'],
        lifecycle: [onInit, onDestroy],
        exportAs: 'form'
      }), __param(0, Ancestor()), __metadata('design:paramtypes', [ControlContainer])], NgControlGroup));
    }
  };
});
//# sourceMappingURL=ng_control_group.js.map

//# sourceMappingURL=../../../src/forms/directives/ng_control_group.js.map