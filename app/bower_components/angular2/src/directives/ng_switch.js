System.register(["angular2/annotations", "angular2/core", "angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      __param,
      Directive,
      Parent,
      ViewContainerRef,
      ProtoViewRef,
      isPresent,
      isBlank,
      normalizeBlank,
      ListWrapper,
      MapWrapper,
      Map,
      SwitchView,
      NgSwitch,
      NgSwitchWhen,
      NgSwitchDefault,
      _whenDefault;
  return {
    setters: [function($__m) {
      Directive = $__m.Directive;
      Parent = $__m.Parent;
    }, function($__m) {
      ViewContainerRef = $__m.ViewContainerRef;
      ProtoViewRef = $__m.ProtoViewRef;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      normalizeBlank = $__m.normalizeBlank;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
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
      __param = (this && this.__param) || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      SwitchView = function() {
        function SwitchView(viewContainerRef, protoViewRef) {
          this._protoViewRef = protoViewRef;
          this._viewContainerRef = viewContainerRef;
        }
        return ($traceurRuntime.createClass)(SwitchView, {
          create: function() {
            this._viewContainerRef.create(this._protoViewRef);
          },
          destroy: function() {
            this._viewContainerRef.clear();
          }
        }, {});
      }();
      $__export("SwitchView", SwitchView);
      NgSwitch = ($traceurRuntime.createClass)(function() {
        this._valueViews = new Map();
        this._activeViews = [];
        this._useDefault = false;
      }, {
        set ngSwitch(value) {
          this._emptyAllActiveViews();
          this._useDefault = false;
          var views = this._valueViews.get(value);
          if (isBlank(views)) {
            this._useDefault = true;
            views = normalizeBlank(this._valueViews.get(_whenDefault));
          }
          this._activateViews(views);
          this._switchValue = value;
        },
        _onWhenValueChanged: function(oldWhen, newWhen, view) {
          this._deregisterView(oldWhen, view);
          this._registerView(newWhen, view);
          if (oldWhen === this._switchValue) {
            view.destroy();
            ListWrapper.remove(this._activeViews, view);
          } else if (newWhen === this._switchValue) {
            if (this._useDefault) {
              this._useDefault = false;
              this._emptyAllActiveViews();
            }
            view.create();
            this._activeViews.push(view);
          }
          if (this._activeViews.length === 0 && !this._useDefault) {
            this._useDefault = true;
            this._activateViews(this._valueViews.get(_whenDefault));
          }
        },
        _emptyAllActiveViews: function() {
          var activeContainers = this._activeViews;
          for (var i = 0; i < activeContainers.length; i++) {
            activeContainers[i].destroy();
          }
          this._activeViews = [];
        },
        _activateViews: function(views) {
          if (isPresent(views)) {
            for (var i = 0; i < views.length; i++) {
              views[i].create();
            }
            this._activeViews = views;
          }
        },
        _registerView: function(value, view) {
          var views = this._valueViews.get(value);
          if (isBlank(views)) {
            views = [];
            this._valueViews.set(value, views);
          }
          views.push(view);
        },
        _deregisterView: function(value, view) {
          if (value == _whenDefault)
            return;
          var views = this._valueViews.get(value);
          if (views.length == 1) {
            MapWrapper.delete(this._valueViews, value);
          } else {
            ListWrapper.remove(views, view);
          }
        }
      }, {});
      $__export("NgSwitch", NgSwitch);
      $__export("NgSwitch", NgSwitch = __decorate([Directive({
        selector: '[ng-switch]',
        properties: ['ngSwitch']
      }), __metadata('design:paramtypes', [])], NgSwitch));
      NgSwitchWhen = ($traceurRuntime.createClass)(function(viewContainer, protoViewRef, sswitch) {
        this._value = _whenDefault;
        this._switch = sswitch;
        this._view = new SwitchView(viewContainer, protoViewRef);
      }, {
        onDestroy: function() {
          this._switch;
        },
        set ngSwitchWhen(value) {
          this._switch._onWhenValueChanged(this._value, value, this._view);
          this._value = value;
        }
      }, {});
      $__export("NgSwitchWhen", NgSwitchWhen);
      $__export("NgSwitchWhen", NgSwitchWhen = __decorate([Directive({
        selector: '[ng-switch-when]',
        properties: ['ngSwitchWhen']
      }), __param(2, Parent()), __metadata('design:paramtypes', [ViewContainerRef, ProtoViewRef, NgSwitch])], NgSwitchWhen));
      NgSwitchDefault = ($traceurRuntime.createClass)(function(viewContainer, protoViewRef, sswitch) {
        sswitch._registerView(_whenDefault, new SwitchView(viewContainer, protoViewRef));
      }, {}, {});
      $__export("NgSwitchDefault", NgSwitchDefault);
      $__export("NgSwitchDefault", NgSwitchDefault = __decorate([Directive({selector: '[ng-switch-default]'}), __param(2, Parent()), __metadata('design:paramtypes', [ViewContainerRef, ProtoViewRef, NgSwitch])], NgSwitchDefault));
      _whenDefault = new Object();
    }
  };
});
//# sourceMappingURL=ng_switch.js.map

//# sourceMappingURL=../../src/directives/ng_switch.js.map