System.register(["angular2/src/dom/dom_adapter", "angular2/src/facade/lang", "angular2/src/facade/collection", "./event_manager"], function($__export) {
  "use strict";
  var DOM,
      isPresent,
      StringWrapper,
      StringMapWrapper,
      ListWrapper,
      EventManagerPlugin,
      modifierKeys,
      modifierKeyGetters,
      KeyEventsPlugin;
  return {
    setters: [function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      isPresent = $__m.isPresent;
      StringWrapper = $__m.StringWrapper;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      EventManagerPlugin = $__m.EventManagerPlugin;
    }],
    execute: function() {
      modifierKeys = ['alt', 'control', 'meta', 'shift'];
      modifierKeyGetters = {
        'alt': function(event) {
          return event.altKey;
        },
        'control': function(event) {
          return event.ctrlKey;
        },
        'meta': function(event) {
          return event.metaKey;
        },
        'shift': function(event) {
          return event.shiftKey;
        }
      };
      KeyEventsPlugin = function($__super) {
        function KeyEventsPlugin() {
          $traceurRuntime.superConstructor(KeyEventsPlugin).call(this);
        }
        return ($traceurRuntime.createClass)(KeyEventsPlugin, {
          supports: function(eventName) {
            return isPresent(KeyEventsPlugin.parseEventName(eventName));
          },
          addEventListener: function(element, eventName, handler, shouldSupportBubble) {
            var parsedEvent = KeyEventsPlugin.parseEventName(eventName);
            var outsideHandler = KeyEventsPlugin.eventCallback(element, shouldSupportBubble, StringMapWrapper.get(parsedEvent, 'fullKey'), handler, this.manager.getZone());
            this.manager.getZone().runOutsideAngular(function() {
              DOM.on(element, StringMapWrapper.get(parsedEvent, 'domEventName'), outsideHandler);
            });
          }
        }, {
          parseEventName: function(eventName) {
            var parts = eventName.toLowerCase().split('.');
            var domEventName = ListWrapper.removeAt(parts, 0);
            if ((parts.length === 0) || !(StringWrapper.equals(domEventName, 'keydown') || StringWrapper.equals(domEventName, 'keyup'))) {
              return null;
            }
            var key = KeyEventsPlugin._normalizeKey(ListWrapper.removeLast(parts));
            var fullKey = '';
            ListWrapper.forEach(modifierKeys, function(modifierName) {
              if (ListWrapper.contains(parts, modifierName)) {
                ListWrapper.remove(parts, modifierName);
                fullKey += modifierName + '.';
              }
            });
            fullKey += key;
            if (parts.length != 0 || key.length === 0) {
              return null;
            }
            return {
              'domEventName': domEventName,
              'fullKey': fullKey
            };
          },
          getEventFullKey: function(event) {
            var fullKey = '';
            var key = DOM.getEventKey(event);
            key = key.toLowerCase();
            if (StringWrapper.equals(key, ' ')) {
              key = 'space';
            } else if (StringWrapper.equals(key, '.')) {
              key = 'dot';
            }
            ListWrapper.forEach(modifierKeys, function(modifierName) {
              if (modifierName != key) {
                var modifierGetter = StringMapWrapper.get(modifierKeyGetters, modifierName);
                if (modifierGetter(event)) {
                  fullKey += modifierName + '.';
                }
              }
            });
            fullKey += key;
            return fullKey;
          },
          eventCallback: function(element, shouldSupportBubble, fullKey, handler, zone) {
            return function(event) {
              var correctElement = shouldSupportBubble || event.target === element;
              if (correctElement && StringWrapper.equals(KeyEventsPlugin.getEventFullKey(event), fullKey)) {
                zone.run(function() {
                  return handler(event);
                });
              }
            };
          },
          _normalizeKey: function(keyName) {
            switch (keyName) {
              case 'esc':
                return 'escape';
              default:
                return keyName;
            }
          }
        }, $__super);
      }(EventManagerPlugin);
      $__export("KeyEventsPlugin", KeyEventsPlugin);
    }
  };
});
//# sourceMappingURL=key_events.js.map

//# sourceMappingURL=../../../../src/render/dom/events/key_events.js.map