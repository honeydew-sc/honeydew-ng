System.register(["angular2/src/facade/collection"], function($__export) {
  "use strict";
  var ListWrapper,
      DomViewContainer;
  return {
    setters: [function($__m) {
      ListWrapper = $__m.ListWrapper;
    }],
    execute: function() {
      DomViewContainer = function() {
        function DomViewContainer() {
          this.views = [];
        }
        return ($traceurRuntime.createClass)(DomViewContainer, {
          contentTagContainers: function() {
            return this.views;
          },
          nodes: function() {
            var r = [];
            for (var i = 0; i < this.views.length; ++i) {
              r = ListWrapper.concat(r, this.views[i].rootNodes);
            }
            return r;
          }
        }, {});
      }();
      $__export("DomViewContainer", DomViewContainer);
    }
  };
});
//# sourceMappingURL=view_container.js.map

//# sourceMappingURL=../../../../src/render/dom/view/view_container.js.map