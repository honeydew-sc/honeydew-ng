System.register(["angular2/src/facade/collection", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var StringMapWrapper,
      isPresent,
      normalizeBlank,
      RouteParams,
      Instruction;
  function shouldReuseComponent(instr1, instr2) {
    return instr1.component == instr2.component && StringMapWrapper.equals(instr1.params, instr2.params);
  }
  return {
    setters: [function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
      normalizeBlank = $__m.normalizeBlank;
    }],
    execute: function() {
      RouteParams = function() {
        function RouteParams(params) {
          this.params = params;
        }
        return ($traceurRuntime.createClass)(RouteParams, {get: function(param) {
            return normalizeBlank(StringMapWrapper.get(this.params, param));
          }}, {});
      }();
      $__export("RouteParams", RouteParams);
      Instruction = function() {
        function Instruction() {
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              params = $__1.params,
              component = $__1.component,
              child = $__1.child,
              matchedUrl = $__1.matchedUrl,
              parentSpecificity = $__1.parentSpecificity;
          this.reuse = false;
          this.capturedUrl = matchedUrl;
          this.accumulatedUrl = matchedUrl;
          this.specificity = parentSpecificity;
          if (isPresent(child)) {
            this.child = child;
            this.specificity += child.specificity;
            var childUrl = child.accumulatedUrl;
            if (isPresent(childUrl)) {
              this.accumulatedUrl += childUrl;
            }
          } else {
            this.child = null;
          }
          this.component = component;
          this.params = params;
        }
        return ($traceurRuntime.createClass)(Instruction, {
          hasChild: function() {
            return isPresent(this.child);
          },
          reuseComponentsFrom: function(oldInstruction) {
            var nextInstruction = this;
            while (nextInstruction.reuse = shouldReuseComponent(nextInstruction, oldInstruction) && isPresent(oldInstruction = oldInstruction.child) && isPresent(nextInstruction = nextInstruction.child))
              ;
          }
        }, {});
      }();
      $__export("Instruction", Instruction);
    }
  };
});
//# sourceMappingURL=instruction.js.map

//# sourceMappingURL=../../src/router/instruction.js.map