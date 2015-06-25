System.register(["angular2/annotations", "angular2/core", "angular2/src/change_detection/pipes/pipe_registry", "angular2/src/render/api", "angular2/src/change_detection/pipes/iterable_changes", "angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Directive,
      onCheck,
      ElementRef,
      PipeRegistry,
      Renderer,
      IterableChanges,
      isPresent,
      isString,
      ListWrapper,
      StringMapWrapper,
      isListLikeIterable,
      CSSClass;
  return {
    setters: [function($__m) {
      Directive = $__m.Directive;
      onCheck = $__m.onCheck;
    }, function($__m) {
      ElementRef = $__m.ElementRef;
    }, function($__m) {
      PipeRegistry = $__m.PipeRegistry;
    }, function($__m) {
      Renderer = $__m.Renderer;
    }, function($__m) {
      IterableChanges = $__m.IterableChanges;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isString = $__m.isString;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
      isListLikeIterable = $__m.isListLikeIterable;
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
      CSSClass = ($traceurRuntime.createClass)(function(_pipeRegistry, _ngEl, _renderer) {
        this._pipeRegistry = _pipeRegistry;
        this._ngEl = _ngEl;
        this._renderer = _renderer;
      }, {
        set rawClass(v) {
          this._cleanupClasses(this._rawClass);
          if (isString(v)) {
            v = v.split(' ');
          }
          this._rawClass = v;
          this._pipe = this._pipeRegistry.get(isListLikeIterable(v) ? 'iterableDiff' : 'keyValDiff', v);
        },
        onCheck: function() {
          var diff = this._pipe.transform(this._rawClass);
          if (isPresent(diff) && isPresent(diff.wrapped)) {
            if (diff.wrapped instanceof IterableChanges) {
              this._applyArrayChanges(diff.wrapped);
            } else {
              this._applyObjectChanges(diff.wrapped);
            }
          }
        },
        _cleanupClasses: function(rawClassVal) {
          var $__0 = this;
          if (isPresent(rawClassVal)) {
            if (isListLikeIterable(rawClassVal)) {
              ListWrapper.forEach(rawClassVal, function(className) {
                $__0._toggleClass(className, false);
              });
            } else {
              StringMapWrapper.forEach(rawClassVal, function(expVal, className) {
                if (expVal)
                  $__0._toggleClass(className, false);
              });
            }
          }
        },
        _applyObjectChanges: function(diff) {
          var $__0 = this;
          diff.forEachAddedItem(function(record) {
            $__0._toggleClass(record.key, record.currentValue);
          });
          diff.forEachChangedItem(function(record) {
            $__0._toggleClass(record.key, record.currentValue);
          });
          diff.forEachRemovedItem(function(record) {
            if (record.previousValue) {
              $__0._toggleClass(record.key, false);
            }
          });
        },
        _applyArrayChanges: function(diff) {
          var $__0 = this;
          diff.forEachAddedItem(function(record) {
            $__0._toggleClass(record.item, true);
          });
          diff.forEachRemovedItem(function(record) {
            $__0._toggleClass(record.item, false);
          });
        },
        _toggleClass: function(className, enabled) {
          this._renderer.setElementClass(this._ngEl, className, enabled);
        }
      }, {});
      $__export("CSSClass", CSSClass);
      $__export("CSSClass", CSSClass = __decorate([Directive({
        selector: '[class]',
        lifecycle: [onCheck],
        properties: ['rawClass: class']
      }), __metadata('design:paramtypes', [PipeRegistry, ElementRef, Renderer])], CSSClass));
    }
  };
});
//# sourceMappingURL=class.js.map

//# sourceMappingURL=../../src/directives/class.js.map