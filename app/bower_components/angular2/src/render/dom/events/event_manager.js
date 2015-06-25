System.register(["angular2/src/facade/lang", "angular2/src/dom/dom_adapter"], function($__export) {
  "use strict";
  var BaseException,
      StringWrapper,
      DOM,
      BUBBLE_SYMBOL,
      EventManager,
      EventManagerPlugin,
      DomEventsPlugin;
  return {
    setters: [function($__m) {
      BaseException = $__m.BaseException;
      StringWrapper = $__m.StringWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }],
    execute: function() {
      BUBBLE_SYMBOL = '^';
      EventManager = function() {
        function EventManager(_plugins, _zone) {
          this._plugins = _plugins;
          this._zone = _zone;
          for (var i = 0; i < _plugins.length; i++) {
            _plugins[i].manager = this;
          }
        }
        return ($traceurRuntime.createClass)(EventManager, {
          addEventListener: function(element, eventName, handler) {
            var withoutBubbleSymbol = this._removeBubbleSymbol(eventName);
            var plugin = this._findPluginFor(withoutBubbleSymbol);
            plugin.addEventListener(element, withoutBubbleSymbol, handler, withoutBubbleSymbol != eventName);
          },
          addGlobalEventListener: function(target, eventName, handler) {
            var withoutBubbleSymbol = this._removeBubbleSymbol(eventName);
            var plugin = this._findPluginFor(withoutBubbleSymbol);
            return plugin.addGlobalEventListener(target, withoutBubbleSymbol, handler, withoutBubbleSymbol != eventName);
          },
          getZone: function() {
            return this._zone;
          },
          _findPluginFor: function(eventName) {
            var plugins = this._plugins;
            for (var i = 0; i < plugins.length; i++) {
              var plugin = plugins[i];
              if (plugin.supports(eventName)) {
                return plugin;
              }
            }
            throw new BaseException(("No event manager plugin found for event " + eventName));
          },
          _removeBubbleSymbol: function(eventName) {
            return eventName[0] == BUBBLE_SYMBOL ? StringWrapper.substring(eventName, 1) : eventName;
          }
        }, {});
      }();
      $__export("EventManager", EventManager);
      EventManagerPlugin = function() {
        function EventManagerPlugin() {}
        return ($traceurRuntime.createClass)(EventManagerPlugin, {
          supports: function(eventName) {
            return false;
          },
          addEventListener: function(element, eventName, handler, shouldSupportBubble) {
            throw "not implemented";
          },
          addGlobalEventListener: function(element, eventName, handler, shouldSupportBubble) {
            throw "not implemented";
          }
        }, {});
      }();
      $__export("EventManagerPlugin", EventManagerPlugin);
      DomEventsPlugin = function($__super) {
        function DomEventsPlugin() {
          $traceurRuntime.superConstructor(DomEventsPlugin).apply(this, arguments);
        }
        return ($traceurRuntime.createClass)(DomEventsPlugin, {
          supports: function(eventName) {
            return true;
          },
          addEventListener: function(element, eventName, handler, shouldSupportBubble) {
            var outsideHandler = this._getOutsideHandler(shouldSupportBubble, element, handler, this.manager._zone);
            this.manager._zone.runOutsideAngular(function() {
              DOM.on(element, eventName, outsideHandler);
            });
          },
          addGlobalEventListener: function(target, eventName, handler, shouldSupportBubble) {
            var element = DOM.getGlobalEventTarget(target);
            var outsideHandler = this._getOutsideHandler(shouldSupportBubble, element, handler, this.manager._zone);
            return this.manager._zone.runOutsideAngular(function() {
              return DOM.onAndCancel(element, eventName, outsideHandler);
            });
          },
          _getOutsideHandler: function(shouldSupportBubble, element, handler, zone) {
            return shouldSupportBubble ? DomEventsPlugin.bubbleCallback(element, handler, zone) : DomEventsPlugin.sameElementCallback(element, handler, zone);
          }
        }, {
          sameElementCallback: function(element, handler, zone) {
            return function(event) {
              if (event.target === element) {
                zone.run(function() {
                  return handler(event);
                });
              }
            };
          },
          bubbleCallback: function(element, handler, zone) {
            return function(event) {
              return zone.run(function() {
                return handler(event);
              });
            };
          }
        }, $__super);
      }(EventManagerPlugin);
      $__export("DomEventsPlugin", DomEventsPlugin);
    }
  };
});
//# sourceMappingURL=event_manager.js.map

//# sourceMappingURL=../../../../src/render/dom/events/event_manager.js.map