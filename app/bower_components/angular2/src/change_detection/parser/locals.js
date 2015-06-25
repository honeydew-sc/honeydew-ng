System.register(["angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var isPresent,
      BaseException,
      MapWrapper,
      Locals;
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
    }],
    execute: function() {
      Locals = function() {
        function Locals(parent, current) {
          this.parent = parent;
          this.current = current;
        }
        return ($traceurRuntime.createClass)(Locals, {
          contains: function(name) {
            if (this.current.has(name)) {
              return true;
            }
            if (isPresent(this.parent)) {
              return this.parent.contains(name);
            }
            return false;
          },
          get: function(name) {
            if (this.current.has(name)) {
              return this.current.get(name);
            }
            if (isPresent(this.parent)) {
              return this.parent.get(name);
            }
            throw new BaseException(("Cannot find '" + name + "'"));
          },
          set: function(name, value) {
            if (this.current.has(name)) {
              this.current.set(name, value);
            } else {
              throw new BaseException(("Setting of new keys post-construction is not supported. Key: " + name + "."));
            }
          },
          clearValues: function() {
            MapWrapper.clearValues(this.current);
          }
        }, {});
      }();
      $__export("Locals", Locals);
    }
  };
});
//# sourceMappingURL=locals.js.map

//# sourceMappingURL=../../../src/change_detection/parser/locals.js.map