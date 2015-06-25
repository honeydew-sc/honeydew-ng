System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/dom/dom_adapter", "angular2/src/core/compiler/view_ref"], function($__export) {
  "use strict";
  var isPresent,
      ListWrapper,
      DOM,
      internalView,
      DebugElement,
      Scope,
      By;
  function inspectElement(elementRef) {
    return DebugElement.create(elementRef);
  }
  $__export("inspectElement", inspectElement);
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      internalView = $__m.internalView;
    }],
    execute: function() {
      DebugElement = function() {
        function DebugElement(_parentView, _boundElementIndex) {
          this._parentView = _parentView;
          this._boundElementIndex = _boundElementIndex;
          this._elementInjector = this._parentView.elementInjectors[this._boundElementIndex];
        }
        return ($traceurRuntime.createClass)(DebugElement, {
          get componentInstance() {
            if (!isPresent(this._elementInjector)) {
              return null;
            }
            return this._elementInjector.getComponent();
          },
          get nativeElement() {
            return this.elementRef.nativeElement;
          },
          get elementRef() {
            return this._parentView.elementRefs[this._boundElementIndex];
          },
          getDirectiveInstance: function(directiveIndex) {
            return this._elementInjector.getDirectiveAtIndex(directiveIndex);
          },
          get children() {
            var thisElementBinder = this._parentView.proto.elementBinders[this._boundElementIndex];
            return this._getChildElements(this._parentView, thisElementBinder.index);
          },
          get componentViewChildren() {
            var shadowView = this._parentView.componentChildViews[this._boundElementIndex];
            if (!isPresent(shadowView)) {
              return [];
            }
            return this._getChildElements(shadowView, null);
          },
          triggerEventHandler: function(eventName, eventObj) {
            this._parentView.triggerEventHandlers(eventName, eventObj, this._boundElementIndex);
          },
          hasDirective: function(type) {
            if (!isPresent(this._elementInjector)) {
              return false;
            }
            return this._elementInjector.hasDirective(type);
          },
          inject: function(type) {
            if (!isPresent(this._elementInjector)) {
              return null;
            }
            return this._elementInjector.get(type);
          },
          getLocal: function(name) {
            return this._parentView.locals.get(name);
          },
          query: function(predicate) {
            var scope = arguments[1] !== (void 0) ? arguments[1] : Scope.all;
            var results = this.queryAll(predicate, scope);
            return results.length > 0 ? results[0] : null;
          },
          queryAll: function(predicate) {
            var scope = arguments[1] !== (void 0) ? arguments[1] : Scope.all;
            var elementsInScope = scope(this);
            return ListWrapper.filter(elementsInScope, predicate);
          },
          _getChildElements: function(view, parentBoundElementIndex) {
            var $__0 = this;
            var els = [];
            var parentElementBinder = null;
            if (isPresent(parentBoundElementIndex)) {
              parentElementBinder = view.proto.elementBinders[parentBoundElementIndex];
            }
            for (var i = 0; i < view.proto.elementBinders.length; ++i) {
              var binder = view.proto.elementBinders[i];
              if (binder.parent == parentElementBinder) {
                els.push(new DebugElement(view, i));
                var views = view.viewContainers[i];
                if (isPresent(views)) {
                  ListWrapper.forEach(views.views, function(nextView) {
                    els = ListWrapper.concat(els, $__0._getChildElements(nextView, null));
                  });
                }
              }
            }
            return els;
          }
        }, {create: function(elementRef) {
            return new DebugElement(internalView(elementRef.parentView), elementRef.boundElementIndex);
          }});
      }();
      $__export("DebugElement", DebugElement);
      Scope = function() {
        function Scope() {}
        return ($traceurRuntime.createClass)(Scope, {}, {
          all: function(debugElement) {
            var scope = [];
            scope.push(debugElement);
            ListWrapper.forEach(debugElement.children, function(child) {
              scope = ListWrapper.concat(scope, Scope.all(child));
            });
            ListWrapper.forEach(debugElement.componentViewChildren, function(child) {
              scope = ListWrapper.concat(scope, Scope.all(child));
            });
            return scope;
          },
          light: function(debugElement) {
            var scope = [];
            ListWrapper.forEach(debugElement.children, function(child) {
              scope.push(child);
              scope = ListWrapper.concat(scope, Scope.light(child));
            });
            return scope;
          },
          view: function(debugElement) {
            var scope = [];
            ListWrapper.forEach(debugElement.componentViewChildren, function(child) {
              scope.push(child);
              scope = ListWrapper.concat(scope, Scope.light(child));
            });
            return scope;
          }
        });
      }();
      $__export("Scope", Scope);
      By = function() {
        function By() {}
        return ($traceurRuntime.createClass)(By, {}, {
          all: function() {
            return function(debugElement) {
              return true;
            };
          },
          css: function(selector) {
            return function(debugElement) {
              return DOM.elementMatches(debugElement.nativeElement, selector);
            };
          },
          directive: function(type) {
            return function(debugElement) {
              return debugElement.hasDirective(type);
            };
          }
        });
      }();
      $__export("By", By);
    }
  };
});
//# sourceMappingURL=debug_element.js.map

//# sourceMappingURL=../../src/debug/debug_element.js.map