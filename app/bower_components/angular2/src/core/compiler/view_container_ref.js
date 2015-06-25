System.register(["angular2/src/facade/collection", "angular2/src/facade/lang", "./view_ref"], function($__export) {
  "use strict";
  var ListWrapper,
      isPresent,
      internalView,
      ViewContainerRef;
  return {
    setters: [function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      internalView = $__m.internalView;
    }],
    execute: function() {
      ViewContainerRef = function() {
        function ViewContainerRef(viewManager, element) {
          this.viewManager = viewManager;
          this.element = element;
        }
        return ($traceurRuntime.createClass)(ViewContainerRef, {
          _getViews: function() {
            var vc = internalView(this.element.parentView).viewContainers[this.element.boundElementIndex];
            return isPresent(vc) ? vc.views : [];
          },
          clear: function() {
            for (var i = this.length - 1; i >= 0; i--) {
              this.remove(i);
            }
          },
          get: function(index) {
            return this._getViews()[index].ref;
          },
          get length() {
            return this._getViews().length;
          },
          create: function() {
            var protoViewRef = arguments[0] !== (void 0) ? arguments[0] : null;
            var atIndex = arguments[1] !== (void 0) ? arguments[1] : -1;
            var context = arguments[2] !== (void 0) ? arguments[2] : null;
            var injector = arguments[3] !== (void 0) ? arguments[3] : null;
            if (atIndex == -1)
              atIndex = this.length;
            return this.viewManager.createViewInContainer(this.element, atIndex, protoViewRef, context, injector);
          },
          insert: function(viewRef) {
            var atIndex = arguments[1] !== (void 0) ? arguments[1] : -1;
            if (atIndex == -1)
              atIndex = this.length;
            return this.viewManager.attachViewInContainer(this.element, atIndex, viewRef);
          },
          indexOf: function(viewRef) {
            return ListWrapper.indexOf(this._getViews(), internalView(viewRef));
          },
          remove: function() {
            var atIndex = arguments[0] !== (void 0) ? arguments[0] : -1;
            if (atIndex == -1)
              atIndex = this.length - 1;
            this.viewManager.destroyViewInContainer(this.element, atIndex);
          },
          detach: function() {
            var atIndex = arguments[0] !== (void 0) ? arguments[0] : -1;
            if (atIndex == -1)
              atIndex = this.length - 1;
            return this.viewManager.detachViewInContainer(this.element, atIndex);
          }
        }, {});
      }();
      $__export("ViewContainerRef", ViewContainerRef);
    }
  };
});
//# sourceMappingURL=view_container_ref.js.map

//# sourceMappingURL=../../../src/core/compiler/view_container_ref.js.map