System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/di", "angular2/src/core/compiler/view_listener", "angular2/src/dom/dom_adapter", "angular2/src/render/api", "./debug_element"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      isPresent,
      NumberWrapper,
      StringWrapper,
      RegExpWrapper,
      MapWrapper,
      Map,
      ListWrapper,
      Injectable,
      bind,
      AppViewListener,
      DOM,
      Renderer,
      DebugElement,
      NG_ID_PROPERTY,
      INSPECT_GLOBAL_NAME,
      NG_ID_SEPARATOR_RE,
      NG_ID_SEPARATOR,
      _allIdsByView,
      _allViewsById,
      _nextId,
      DebugElementViewListener,
      ELEMENT_PROBE_CONFIG;
  function _setElementId(element, indices) {
    if (isPresent(element)) {
      DOM.setData(element, NG_ID_PROPERTY, ListWrapper.join(indices, NG_ID_SEPARATOR));
    }
  }
  function _getElementId(element) {
    var elId = DOM.getData(element, NG_ID_PROPERTY);
    if (isPresent(elId)) {
      return ListWrapper.map(StringWrapper.split(elId, NG_ID_SEPARATOR_RE), function(partStr) {
        return NumberWrapper.parseInt(partStr, 10);
      });
    } else {
      return null;
    }
  }
  function inspectNativeElement(element) {
    var elId = _getElementId(element);
    if (isPresent(elId)) {
      var view = _allViewsById.get(elId[0]);
      if (isPresent(view)) {
        return new DebugElement(view, elId[1]);
      }
    }
    return null;
  }
  $__export("inspectNativeElement", inspectNativeElement);
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
      NumberWrapper = $__m.NumberWrapper;
      StringWrapper = $__m.StringWrapper;
      RegExpWrapper = $__m.RegExpWrapper;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
      Map = $__m.Map;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      Injectable = $__m.Injectable;
      bind = $__m.bind;
    }, function($__m) {
      AppViewListener = $__m.AppViewListener;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Renderer = $__m.Renderer;
    }, function($__m) {
      DebugElement = $__m.DebugElement;
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
      NG_ID_PROPERTY = 'ngid';
      INSPECT_GLOBAL_NAME = 'ngProbe';
      NG_ID_SEPARATOR_RE = RegExpWrapper.create('#');
      NG_ID_SEPARATOR = '#';
      _allIdsByView = new Map();
      _allViewsById = new Map();
      _nextId = 0;
      DebugElementViewListener = ($traceurRuntime.createClass)(function(_renderer) {
        this._renderer = _renderer;
        DOM.setGlobalVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
      }, {
        viewCreated: function(view) {
          var viewId = _nextId++;
          _allViewsById.set(viewId, view);
          _allIdsByView.set(view, viewId);
          for (var i = 0; i < view.elementRefs.length; i++) {
            _setElementId(this._renderer.getNativeElementSync(view.elementRefs[i]), [viewId, i]);
          }
        },
        viewDestroyed: function(view) {
          var viewId = _allIdsByView.get(view);
          MapWrapper.delete(_allIdsByView, view);
          MapWrapper.delete(_allViewsById, viewId);
        }
      }, {});
      $__export("DebugElementViewListener", DebugElementViewListener);
      $__export("DebugElementViewListener", DebugElementViewListener = __decorate([Injectable(), __metadata('design:paramtypes', [Renderer])], DebugElementViewListener));
      ELEMENT_PROBE_CONFIG = [DebugElementViewListener, bind(AppViewListener).toAlias(DebugElementViewListener)];
      $__export("ELEMENT_PROBE_CONFIG", ELEMENT_PROBE_CONFIG);
    }
  };
});
//# sourceMappingURL=debug_element_view_listener.js.map

//# sourceMappingURL=../../src/debug/debug_element_view_listener.js.map