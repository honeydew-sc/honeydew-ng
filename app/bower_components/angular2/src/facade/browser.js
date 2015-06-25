System.register([], function($__export) {
  "use strict";
  var win,
      document,
      location,
      gc,
      Event,
      MouseEvent,
      KeyboardEvent,
      EventTarget,
      History,
      Location,
      EventListener;
  return {
    setters: [],
    execute: function() {
      win = window;
      $__export("window", win);
      document = window.document;
      $__export("document", document);
      location = window.location;
      $__export("location", location);
      gc = window['gc'] ? function() {
        return window['gc']();
      } : function() {
        return null;
      };
      $__export("gc", gc);
      Event = Event;
      $__export("Event", Event);
      MouseEvent = MouseEvent;
      $__export("MouseEvent", MouseEvent);
      KeyboardEvent = KeyboardEvent;
      $__export("KeyboardEvent", KeyboardEvent);
      EventTarget = EventTarget;
      $__export("EventTarget", EventTarget);
      History = History;
      $__export("History", History);
      Location = Location;
      $__export("Location", Location);
      EventListener = EventListener;
      $__export("EventListener", EventListener);
    }
  };
});
//# sourceMappingURL=browser.js.map

//# sourceMappingURL=../../src/facade/browser.js.map