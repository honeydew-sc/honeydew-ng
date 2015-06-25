System.register(["angular2/di", "angular2/src/facade/async", "angular2/src/facade/lang", "angular2/src/dom/dom_adapter", "../../api", "./compile_pipeline", "angular2/src/render/dom/compiler/view_loader", "./compile_step_factory", "angular2/change_detection", "../shadow_dom/shadow_dom_strategy"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      PromiseWrapper,
      BaseException,
      DOM,
      ViewDefinition,
      ViewType,
      RenderCompiler,
      CompilePipeline,
      ViewLoader,
      DefaultStepFactory,
      Parser,
      ShadowDomStrategy,
      DomCompiler,
      DefaultDomCompiler;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      BaseException = $__m.BaseException;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      ViewDefinition = $__m.ViewDefinition;
      ViewType = $__m.ViewType;
      RenderCompiler = $__m.RenderCompiler;
    }, function($__m) {
      CompilePipeline = $__m.CompilePipeline;
    }, function($__m) {
      ViewLoader = $__m.ViewLoader;
    }, function($__m) {
      DefaultStepFactory = $__m.DefaultStepFactory;
    }, function($__m) {
      Parser = $__m.Parser;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
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
      DomCompiler = function($__super) {
        function DomCompiler(_stepFactory, _viewLoader) {
          $traceurRuntime.superConstructor(DomCompiler).call(this);
          this._stepFactory = _stepFactory;
          this._viewLoader = _viewLoader;
        }
        return ($traceurRuntime.createClass)(DomCompiler, {
          compile: function(view) {
            var $__0 = this;
            var tplPromise = this._viewLoader.load(view);
            return PromiseWrapper.then(tplPromise, function(el) {
              return $__0._compileTemplate(view, el, ViewType.COMPONENT);
            }, function(e) {
              throw new BaseException(("Failed to load the template for \"" + view.componentId + "\" : " + e));
            });
          },
          compileHost: function(directiveMetadata) {
            var hostViewDef = new ViewDefinition({
              componentId: directiveMetadata.id,
              templateAbsUrl: null,
              template: null,
              styles: null,
              styleAbsUrls: null,
              directives: [directiveMetadata]
            });
            var element = DOM.createElement(directiveMetadata.selector);
            return this._compileTemplate(hostViewDef, element, ViewType.HOST);
          },
          _compileTemplate: function(viewDef, tplElement, protoViewType) {
            var pipeline = new CompilePipeline(this._stepFactory.createSteps(viewDef));
            var compileElements = pipeline.process(tplElement, protoViewType, viewDef.componentId);
            return PromiseWrapper.resolve(compileElements[0].inheritedProtoView.build());
          }
        }, {}, $__super);
      }(RenderCompiler);
      $__export("DomCompiler", DomCompiler);
      DefaultDomCompiler = function($__super) {
        function $__1(parser, shadowDomStrategy, viewLoader) {
          $traceurRuntime.superConstructor($__1).call(this, new DefaultStepFactory(parser, shadowDomStrategy), viewLoader);
        }
        return ($traceurRuntime.createClass)($__1, {}, {}, $__super);
      }(DomCompiler);
      $__export("DefaultDomCompiler", DefaultDomCompiler);
      $__export("DefaultDomCompiler", DefaultDomCompiler = __decorate([Injectable(), __metadata('design:paramtypes', [Parser, ShadowDomStrategy, ViewLoader])], DefaultDomCompiler));
    }
  };
});
//# sourceMappingURL=compiler.js.map

//# sourceMappingURL=../../../../src/render/dom/compiler/compiler.js.map