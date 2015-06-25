System.register(["angular2/src/facade/async", "angular2/src/router/location_strategy"], function($__export) {
  "use strict";
  var EventEmitter,
      ObservableWrapper,
      LocationStrategy,
      MockLocationStrategy;
  return {
    setters: [function($__m) {
      EventEmitter = $__m.EventEmitter;
      ObservableWrapper = $__m.ObservableWrapper;
    }, function($__m) {
      LocationStrategy = $__m.LocationStrategy;
    }],
    execute: function() {
      MockLocationStrategy = function($__super) {
        function MockLocationStrategy() {
          $traceurRuntime.superConstructor(MockLocationStrategy).call(this);
          this.internalBaseHref = '/';
          this.internalPath = '/';
          this.internalTitle = '';
          this.urlChanges = [];
          this._subject = new EventEmitter();
        }
        return ($traceurRuntime.createClass)(MockLocationStrategy, {
          simulatePopState: function(url) {
            this.internalPath = url;
            ObservableWrapper.callNext(this._subject, null);
          },
          path: function() {
            return this.internalPath;
          },
          simulateUrlPop: function(pathname) {
            ObservableWrapper.callNext(this._subject, {'url': pathname});
          },
          pushState: function(ctx, title, url) {
            this.internalTitle = title;
            this.internalPath = url;
            this.urlChanges.push(url);
          },
          onPopState: function(fn) {
            ObservableWrapper.subscribe(this._subject, fn);
          },
          getBaseHref: function() {
            return this.internalBaseHref;
          }
        }, {}, $__super);
      }(LocationStrategy);
      $__export("MockLocationStrategy", MockLocationStrategy);
    }
  };
});
//# sourceMappingURL=mock_location_strategy.js.map

//# sourceMappingURL=../../src/mock/mock_location_strategy.js.map