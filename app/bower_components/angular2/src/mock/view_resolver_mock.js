System.register(["angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/core/annotations_impl/view", "angular2/src/core/compiler/view_resolver"], function($__export) {
  "use strict";
  var Map,
      MapWrapper,
      ListWrapper,
      isPresent,
      BaseException,
      stringify,
      isBlank,
      View,
      ViewResolver,
      MockViewResolver;
  return {
    setters: [function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      stringify = $__m.stringify;
      isBlank = $__m.isBlank;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      ViewResolver = $__m.ViewResolver;
    }],
    execute: function() {
      MockViewResolver = function($__super) {
        function MockViewResolver() {
          $traceurRuntime.superConstructor(MockViewResolver).call(this);
          this._views = new Map();
          this._inlineTemplates = new Map();
          this._viewCache = new Map();
          this._directiveOverrides = new Map();
        }
        return ($traceurRuntime.createClass)(MockViewResolver, {
          setView: function(component, view) {
            this._checkOverrideable(component);
            this._views.set(component, view);
          },
          setInlineTemplate: function(component, template) {
            this._checkOverrideable(component);
            this._inlineTemplates.set(component, template);
          },
          overrideViewDirective: function(component, from, to) {
            this._checkOverrideable(component);
            var overrides = this._directiveOverrides.get(component);
            if (isBlank(overrides)) {
              overrides = new Map();
              this._directiveOverrides.set(component, overrides);
            }
            overrides.set(from, to);
          },
          resolve: function(component) {
            var view = this._viewCache.get(component);
            if (isPresent(view))
              return view;
            view = this._views.get(component);
            if (isBlank(view)) {
              view = $traceurRuntime.superGet(this, MockViewResolver.prototype, "resolve").call(this, component);
            }
            var directives = view.directives;
            var overrides = this._directiveOverrides.get(component);
            if (isPresent(overrides) && isPresent(directives)) {
              directives = ListWrapper.clone(view.directives);
              MapWrapper.forEach(overrides, function(to, from) {
                var srcIndex = directives.indexOf(from);
                if (srcIndex == -1) {
                  throw new BaseException(("Overriden directive " + stringify(from) + " not found in the template of " + stringify(component)));
                }
                directives[srcIndex] = to;
              });
              view = new View({
                template: view.template,
                templateUrl: view.templateUrl,
                directives: directives
              });
            }
            var inlineTemplate = this._inlineTemplates.get(component);
            if (isPresent(inlineTemplate)) {
              view = new View({
                template: inlineTemplate,
                templateUrl: null,
                directives: view.directives
              });
            }
            this._viewCache.set(component, view);
            return view;
          },
          _checkOverrideable: function(component) {
            var cached = this._viewCache.get(component);
            if (isPresent(cached)) {
              throw new BaseException(("The component " + stringify(component) + " has already been compiled, its configuration can not be changed"));
            }
          }
        }, {}, $__super);
      }(ViewResolver);
      $__export("MockViewResolver", MockViewResolver);
    }
  };
});
//# sourceMappingURL=view_resolver_mock.js.map

//# sourceMappingURL=../../src/mock/view_resolver_mock.js.map