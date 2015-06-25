System.register(["angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/di/decorators"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      ListWrapper,
      isBlank,
      isPresent,
      BaseException,
      Injectable,
      PipeRegistry;
  return {
    setters: [function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
    }, function($__m) {
      Injectable = $__m.Injectable;
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
      PipeRegistry = ($traceurRuntime.createClass)(function(config) {
        this.config = config;
      }, {
        get: function(type, obj, cdRef, existingPipe) {
          if (isPresent(existingPipe) && existingPipe.supports(obj))
            return existingPipe;
          if (isPresent(existingPipe))
            existingPipe.onDestroy();
          var factories = this._getListOfFactories(type, obj);
          var factory = this._getMatchingFactory(factories, type, obj);
          return factory.create(cdRef);
        },
        _getListOfFactories: function(type, obj) {
          var listOfFactories = this.config[type];
          if (isBlank(listOfFactories)) {
            throw new BaseException(("Cannot find '" + type + "' pipe supporting object '" + obj + "'"));
          }
          return listOfFactories;
        },
        _getMatchingFactory: function(listOfFactories, type, obj) {
          var matchingFactory = ListWrapper.find(listOfFactories, function(pipeFactory) {
            return pipeFactory.supports(obj);
          });
          if (isBlank(matchingFactory)) {
            throw new BaseException(("Cannot find '" + type + "' pipe supporting object '" + obj + "'"));
          }
          return matchingFactory;
        }
      }, {});
      $__export("PipeRegistry", PipeRegistry);
      $__export("PipeRegistry", PipeRegistry = __decorate([Injectable(), __metadata('design:paramtypes', [Object])], PipeRegistry));
    }
  };
});
//# sourceMappingURL=pipe_registry.js.map

//# sourceMappingURL=../../../src/change_detection/pipes/pipe_registry.js.map