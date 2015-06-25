System.register(["angular2/src/facade/async"], function($__export) {
  "use strict";
  var PromiseWrapper,
      Pipeline;
  return {
    setters: [function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }],
    execute: function() {
      Pipeline = function() {
        function Pipeline() {
          this.steps = [function(instruction) {
            return instruction.router.activateOutlets(instruction);
          }];
        }
        return ($traceurRuntime.createClass)(Pipeline, {process: function(instruction) {
            var steps = this.steps,
                currentStep = 0;
            function processOne() {
              var result = arguments[0] !== (void 0) ? arguments[0] : true;
              if (currentStep >= steps.length) {
                return PromiseWrapper.resolve(result);
              }
              var step = steps[currentStep];
              currentStep += 1;
              return PromiseWrapper.resolve(step(instruction)).then(processOne);
            }
            return processOne();
          }}, {});
      }();
      $__export("Pipeline", Pipeline);
    }
  };
});
//# sourceMappingURL=pipeline.js.map

//# sourceMappingURL=../../src/router/pipeline.js.map