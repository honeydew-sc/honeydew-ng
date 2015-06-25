System.register(["angular2/annotations", "angular2/core", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Directive,
      ViewContainerRef,
      ProtoViewRef,
      isBlank,
      NgIf;
  return {
    setters: [function($__m) {
      Directive = $__m.Directive;
    }, function($__m) {
      ViewContainerRef = $__m.ViewContainerRef;
      ProtoViewRef = $__m.ProtoViewRef;
    }, function($__m) {
      isBlank = $__m.isBlank;
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
      NgIf = ($traceurRuntime.createClass)(function(viewContainer, protoViewRef) {
        this.viewContainer = viewContainer;
        this.prevCondition = null;
        this.protoViewRef = protoViewRef;
      }, {set ngIf(newCondition) {
          if (newCondition && (isBlank(this.prevCondition) || !this.prevCondition)) {
            this.prevCondition = true;
            this.viewContainer.create(this.protoViewRef);
          } else if (!newCondition && (isBlank(this.prevCondition) || this.prevCondition)) {
            this.prevCondition = false;
            this.viewContainer.clear();
          }
        }}, {});
      $__export("NgIf", NgIf);
      $__export("NgIf", NgIf = __decorate([Directive({
        selector: '[ng-if]',
        properties: ['ngIf']
      }), __metadata('design:paramtypes', [ViewContainerRef, ProtoViewRef])], NgIf));
    }
  };
});
//# sourceMappingURL=ng_if.js.map

//# sourceMappingURL=../../src/directives/ng_if.js.map