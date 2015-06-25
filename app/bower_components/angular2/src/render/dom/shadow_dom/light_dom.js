System.register(["angular2/src/dom/dom_adapter", "angular2/src/facade/collection", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var DOM,
      ListWrapper,
      isPresent,
      DestinationLightDom,
      _Root,
      LightDom;
  function redistributeNodes(contents, nodes) {
    for (var i = 0; i < contents.length; ++i) {
      var content = contents[i];
      var select = content.select;
      if (select.length === 0) {
        content.insert(ListWrapper.clone(nodes));
        ListWrapper.clear(nodes);
      } else {
        var matchSelector = function(n) {
          return DOM.elementMatches(n, select);
        };
        var matchingNodes = ListWrapper.filter(nodes, matchSelector);
        content.insert(matchingNodes);
        ListWrapper.removeAll(nodes, matchingNodes);
      }
    }
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (isPresent(node.parentNode)) {
        DOM.remove(nodes[i]);
      }
    }
  }
  return {
    setters: [function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }],
    execute: function() {
      DestinationLightDom = function() {
        function DestinationLightDom() {}
        return ($traceurRuntime.createClass)(DestinationLightDom, {}, {});
      }();
      $__export("DestinationLightDom", DestinationLightDom);
      _Root = function() {
        function _Root(node, boundElement) {
          this.node = node;
          this.boundElement = boundElement;
        }
        return ($traceurRuntime.createClass)(_Root, {}, {});
      }();
      LightDom = function() {
        function LightDom(lightDomView, element) {
          this.shadowDomView = null;
          this._roots = null;
          this.lightDomView = lightDomView;
          this.nodes = DOM.childNodesAsList(element);
        }
        return ($traceurRuntime.createClass)(LightDom, {
          attachShadowDomView: function(shadowDomView) {
            this.shadowDomView = shadowDomView;
          },
          detachShadowDomView: function() {
            this.shadowDomView = null;
          },
          redistribute: function() {
            redistributeNodes(this.contentTags(), this.expandedDomNodes());
          },
          contentTags: function() {
            if (isPresent(this.shadowDomView)) {
              return this._collectAllContentTags(this.shadowDomView, []);
            } else {
              return [];
            }
          },
          _collectAllContentTags: function(view, acc) {
            var $__0 = this;
            if (view.proto.transitiveContentTagCount === 0) {
              return acc;
            }
            var els = view.boundElements;
            for (var i = 0; i < els.length; i++) {
              var el = els[i];
              if (isPresent(el.contentTag)) {
                acc.push(el.contentTag);
              }
              if (isPresent(el.viewContainer)) {
                ListWrapper.forEach(el.viewContainer.contentTagContainers(), function(view) {
                  $__0._collectAllContentTags(view, acc);
                });
              }
            }
            return acc;
          },
          expandedDomNodes: function() {
            var res = [];
            var roots = this._findRoots();
            for (var i = 0; i < roots.length; ++i) {
              var root = roots[i];
              if (isPresent(root.boundElement)) {
                var vc = root.boundElement.viewContainer;
                var content = root.boundElement.contentTag;
                if (isPresent(vc)) {
                  res = ListWrapper.concat(res, vc.nodes());
                } else if (isPresent(content)) {
                  res = ListWrapper.concat(res, content.nodes());
                } else {
                  res.push(root.node);
                }
              } else {
                res.push(root.node);
              }
            }
            return res;
          },
          _findRoots: function() {
            if (isPresent(this._roots))
              return this._roots;
            var boundElements = this.lightDomView.boundElements;
            this._roots = ListWrapper.map(this.nodes, function(n) {
              var boundElement = null;
              for (var i = 0; i < boundElements.length; i++) {
                var boundEl = boundElements[i];
                if (isPresent(boundEl) && boundEl.element === n) {
                  boundElement = boundEl;
                  break;
                }
              }
              return new _Root(n, boundElement);
            });
            return this._roots;
          }
        }, {});
      }();
      $__export("LightDom", LightDom);
    }
  };
});
//# sourceMappingURL=light_dom.js.map

//# sourceMappingURL=../../../../src/render/dom/shadow_dom/light_dom.js.map