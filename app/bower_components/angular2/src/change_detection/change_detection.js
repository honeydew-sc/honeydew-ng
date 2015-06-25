System.register(["./jit_proto_change_detector", "./pregen_proto_change_detector", "./proto_change_detector", "./pipes/pipe_registry", "./pipes/iterable_changes", "./pipes/keyvalue_changes", "./pipes/observable_pipe", "./pipes/promise_pipe", "./pipes/uppercase_pipe", "./pipes/lowercase_pipe", "./pipes/json_pipe", "./pipes/null_pipe", "./interfaces", "angular2/di", "angular2/src/facade/collection", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      __param,
      JitProtoChangeDetector,
      PregenProtoChangeDetector,
      DynamicProtoChangeDetector,
      PipeRegistry,
      IterableChangesFactory,
      KeyValueChangesFactory,
      ObservablePipeFactory,
      PromisePipeFactory,
      UpperCaseFactory,
      LowerCaseFactory,
      JsonPipe,
      NullPipeFactory,
      ChangeDetection,
      Inject,
      Injectable,
      OpaqueToken,
      Optional,
      StringMapWrapper,
      CONST_EXPR,
      isPresent,
      keyValDiff,
      iterableDiff,
      async,
      uppercase,
      lowercase,
      json,
      defaultPipes,
      preGeneratedProtoDetectors,
      PROTO_CHANGE_DETECTOR_KEY,
      PreGeneratedChangeDetection,
      DynamicChangeDetection,
      JitChangeDetection,
      defaultPipeRegistry;
  return {
    setters: [function($__m) {
      JitProtoChangeDetector = $__m.JitProtoChangeDetector;
    }, function($__m) {
      PregenProtoChangeDetector = $__m.PregenProtoChangeDetector;
    }, function($__m) {
      DynamicProtoChangeDetector = $__m.DynamicProtoChangeDetector;
    }, function($__m) {
      PipeRegistry = $__m.PipeRegistry;
    }, function($__m) {
      IterableChangesFactory = $__m.IterableChangesFactory;
    }, function($__m) {
      KeyValueChangesFactory = $__m.KeyValueChangesFactory;
    }, function($__m) {
      ObservablePipeFactory = $__m.ObservablePipeFactory;
    }, function($__m) {
      PromisePipeFactory = $__m.PromisePipeFactory;
    }, function($__m) {
      UpperCaseFactory = $__m.UpperCaseFactory;
    }, function($__m) {
      LowerCaseFactory = $__m.LowerCaseFactory;
    }, function($__m) {
      JsonPipe = $__m.JsonPipe;
    }, function($__m) {
      NullPipeFactory = $__m.NullPipeFactory;
    }, function($__m) {
      ChangeDetection = $__m.ChangeDetection;
    }, function($__m) {
      Inject = $__m.Inject;
      Injectable = $__m.Injectable;
      OpaqueToken = $__m.OpaqueToken;
      Optional = $__m.Optional;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      CONST_EXPR = $__m.CONST_EXPR;
      isPresent = $__m.isPresent;
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
      keyValDiff = [new KeyValueChangesFactory(), new NullPipeFactory()];
      $__export("keyValDiff", keyValDiff);
      iterableDiff = [new IterableChangesFactory(), new NullPipeFactory()];
      $__export("iterableDiff", iterableDiff);
      async = [new ObservablePipeFactory(), new PromisePipeFactory(), new NullPipeFactory()];
      $__export("async", async);
      uppercase = [new UpperCaseFactory(), new NullPipeFactory()];
      $__export("uppercase", uppercase);
      lowercase = [new LowerCaseFactory(), new NullPipeFactory()];
      $__export("lowercase", lowercase);
      json = [new JsonPipe(), new NullPipeFactory()];
      $__export("json", json);
      defaultPipes = {
        "iterableDiff": iterableDiff,
        "keyValDiff": keyValDiff,
        "async": async,
        "uppercase": uppercase,
        "lowercase": lowercase,
        "json": json
      };
      $__export("defaultPipes", defaultPipes);
      preGeneratedProtoDetectors = {};
      $__export("preGeneratedProtoDetectors", preGeneratedProtoDetectors);
      PROTO_CHANGE_DETECTOR_KEY = CONST_EXPR(new OpaqueToken('ProtoChangeDetectors'));
      $__export("PROTO_CHANGE_DETECTOR_KEY", PROTO_CHANGE_DETECTOR_KEY);
      PreGeneratedChangeDetection = function($__super) {
        function $__0(registry, protoChangeDetectorsForTest) {
          $traceurRuntime.superConstructor($__0).call(this);
          this.registry = registry;
          this._dynamicChangeDetection = new DynamicChangeDetection(registry);
          this._protoChangeDetectorFactories = isPresent(protoChangeDetectorsForTest) ? protoChangeDetectorsForTest : preGeneratedProtoDetectors;
        }
        return ($traceurRuntime.createClass)($__0, {createProtoChangeDetector: function(definition) {
            var id = definition.id;
            if (StringMapWrapper.contains(this._protoChangeDetectorFactories, id)) {
              return StringMapWrapper.get(this._protoChangeDetectorFactories, id)(this.registry, definition);
            }
            return this._dynamicChangeDetection.createProtoChangeDetector(definition);
          }}, {isSupported: function() {
            return PregenProtoChangeDetector.isSupported();
          }}, $__super);
      }(ChangeDetection);
      $__export("PreGeneratedChangeDetection", PreGeneratedChangeDetection);
      $__export("PreGeneratedChangeDetection", PreGeneratedChangeDetection = __decorate([Injectable(), __param(1, Inject(PROTO_CHANGE_DETECTOR_KEY)), __param(1, Optional()), __metadata('design:paramtypes', [PipeRegistry, Object])], PreGeneratedChangeDetection));
      DynamicChangeDetection = function($__super) {
        function $__0(registry) {
          $traceurRuntime.superConstructor($__0).call(this);
          this.registry = registry;
        }
        return ($traceurRuntime.createClass)($__0, {createProtoChangeDetector: function(definition) {
            return new DynamicProtoChangeDetector(this.registry, definition);
          }}, {}, $__super);
      }(ChangeDetection);
      $__export("DynamicChangeDetection", DynamicChangeDetection);
      $__export("DynamicChangeDetection", DynamicChangeDetection = __decorate([Injectable(), __metadata('design:paramtypes', [PipeRegistry])], DynamicChangeDetection));
      JitChangeDetection = function($__super) {
        function $__0(registry) {
          $traceurRuntime.superConstructor($__0).call(this);
          this.registry = registry;
        }
        return ($traceurRuntime.createClass)($__0, {createProtoChangeDetector: function(definition) {
            return new JitProtoChangeDetector(this.registry, definition);
          }}, {isSupported: function() {
            return JitProtoChangeDetector.isSupported();
          }}, $__super);
      }(ChangeDetection);
      $__export("JitChangeDetection", JitChangeDetection);
      $__export("JitChangeDetection", JitChangeDetection = __decorate([Injectable(), __metadata('design:paramtypes', [PipeRegistry])], JitChangeDetection));
      defaultPipeRegistry = new PipeRegistry(defaultPipes);
      $__export("defaultPipeRegistry", defaultPipeRegistry);
    }
  };
});
//# sourceMappingURL=change_detection.js.map

//# sourceMappingURL=../../src/change_detection/change_detection.js.map