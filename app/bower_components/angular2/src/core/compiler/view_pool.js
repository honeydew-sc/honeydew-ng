System.register(["angular2/di", "angular2/src/facade/collection", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      __param,
      Inject,
      Injectable,
      OpaqueToken,
      ListWrapper,
      Map,
      isPresent,
      isBlank,
      CONST_EXPR,
      APP_VIEW_POOL_CAPACITY,
      AppViewPool;
  return {
    setters: [function($__m) {
      Inject = $__m.Inject;
      Injectable = $__m.Injectable;
      OpaqueToken = $__m.OpaqueToken;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      Map = $__m.Map;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      CONST_EXPR = $__m.CONST_EXPR;
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
      APP_VIEW_POOL_CAPACITY = CONST_EXPR(new OpaqueToken('AppViewPool.viewPoolCapacity'));
      $__export("APP_VIEW_POOL_CAPACITY", APP_VIEW_POOL_CAPACITY);
      AppViewPool = ($traceurRuntime.createClass)(function(poolCapacityPerProtoView) {
        this._pooledViewsPerProtoView = new Map();
        this._poolCapacityPerProtoView = poolCapacityPerProtoView;
      }, {
        getView: function(protoView) {
          var pooledViews = this._pooledViewsPerProtoView.get(protoView);
          if (isPresent(pooledViews) && pooledViews.length > 0) {
            return ListWrapper.removeLast(pooledViews);
          }
          return null;
        },
        returnView: function(view) {
          var protoView = view.proto;
          var pooledViews = this._pooledViewsPerProtoView.get(protoView);
          if (isBlank(pooledViews)) {
            pooledViews = [];
            this._pooledViewsPerProtoView.set(protoView, pooledViews);
          }
          var haveRemainingCapacity = pooledViews.length < this._poolCapacityPerProtoView;
          if (haveRemainingCapacity) {
            pooledViews.push(view);
          }
          return haveRemainingCapacity;
        }
      }, {});
      $__export("AppViewPool", AppViewPool);
      $__export("AppViewPool", AppViewPool = __decorate([Injectable(), __param(0, Inject(APP_VIEW_POOL_CAPACITY)), __metadata('design:paramtypes', [Object])], AppViewPool));
    }
  };
});
//# sourceMappingURL=view_pool.js.map

//# sourceMappingURL=../../../src/core/compiler/view_pool.js.map