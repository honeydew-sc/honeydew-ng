System.register(["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var isBlank,
      CompileControl;
  return {
    setters: [function($__m) {
      isBlank = $__m.isBlank;
    }],
    execute: function() {
      CompileControl = function() {
        function CompileControl(_steps) {
          this._steps = _steps;
          this._currentStepIndex = 0;
          this._parent = null;
          this._results = null;
          this._additionalChildren = null;
        }
        return ($traceurRuntime.createClass)(CompileControl, {
          internalProcess: function(results, startStepIndex, parent, current) {
            this._results = results;
            var previousStepIndex = this._currentStepIndex;
            var previousParent = this._parent;
            this._ignoreCurrentElement = false;
            for (var i = startStepIndex; i < this._steps.length && !this._ignoreCurrentElement; i++) {
              var step = this._steps[i];
              this._parent = parent;
              this._currentStepIndex = i;
              step.process(parent, current, this);
              parent = this._parent;
            }
            if (!this._ignoreCurrentElement) {
              results.push(current);
            }
            this._currentStepIndex = previousStepIndex;
            this._parent = previousParent;
            var localAdditionalChildren = this._additionalChildren;
            this._additionalChildren = null;
            return localAdditionalChildren;
          },
          addParent: function(newElement) {
            this.internalProcess(this._results, this._currentStepIndex + 1, this._parent, newElement);
            this._parent = newElement;
          },
          addChild: function(element) {
            if (isBlank(this._additionalChildren)) {
              this._additionalChildren = [];
            }
            this._additionalChildren.push(element);
          },
          ignoreCurrentElement: function() {
            this._ignoreCurrentElement = true;
          }
        }, {});
      }();
      $__export("CompileControl", CompileControl);
    }
  };
});
//# sourceMappingURL=compile_control.js.map

//# sourceMappingURL=../../../../src/render/dom/compiler/compile_control.js.map