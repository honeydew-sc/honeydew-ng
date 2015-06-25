System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "./change_detector_ref", "./constants"], function($__export) {
  "use strict";
  var isPresent,
      ListWrapper,
      ChangeDetectorRef,
      CHECK_ONCE,
      CHECKED,
      DETACHED,
      AbstractChangeDetector;
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      ChangeDetectorRef = $__m.ChangeDetectorRef;
    }, function($__m) {
      CHECK_ONCE = $__m.CHECK_ONCE;
      CHECKED = $__m.CHECKED;
      DETACHED = $__m.DETACHED;
    }],
    execute: function() {
      AbstractChangeDetector = function() {
        function AbstractChangeDetector(id) {
          this.id = id;
          this.lightDomChildren = [];
          this.shadowDomChildren = [];
          this.mode = null;
          this.ref = new ChangeDetectorRef(this);
        }
        return ($traceurRuntime.createClass)(AbstractChangeDetector, {
          addChild: function(cd) {
            this.lightDomChildren.push(cd);
            cd.parent = this;
          },
          removeChild: function(cd) {
            ListWrapper.remove(this.lightDomChildren, cd);
          },
          addShadowDomChild: function(cd) {
            this.shadowDomChildren.push(cd);
            cd.parent = this;
          },
          removeShadowDomChild: function(cd) {
            ListWrapper.remove(this.shadowDomChildren, cd);
          },
          remove: function() {
            this.parent.removeChild(this);
          },
          detectChanges: function() {
            this._detectChanges(false);
          },
          checkNoChanges: function() {
            this._detectChanges(true);
          },
          _detectChanges: function(throwOnChange) {
            if (this.mode === DETACHED || this.mode === CHECKED)
              return;
            this.detectChangesInRecords(throwOnChange);
            this._detectChangesInLightDomChildren(throwOnChange);
            if (throwOnChange === false)
              this.callOnAllChangesDone();
            this._detectChangesInShadowDomChildren(throwOnChange);
            if (this.mode === CHECK_ONCE)
              this.mode = CHECKED;
          },
          detectChangesInRecords: function(throwOnChange) {},
          hydrate: function(context, locals, directives) {},
          dehydrate: function() {},
          callOnAllChangesDone: function() {},
          _detectChangesInLightDomChildren: function(throwOnChange) {
            var c = this.lightDomChildren;
            for (var i = 0; i < c.length; ++i) {
              c[i]._detectChanges(throwOnChange);
            }
          },
          _detectChangesInShadowDomChildren: function(throwOnChange) {
            var c = this.shadowDomChildren;
            for (var i = 0; i < c.length; ++i) {
              c[i]._detectChanges(throwOnChange);
            }
          },
          markAsCheckOnce: function() {
            this.mode = CHECK_ONCE;
          },
          markPathToRootAsCheckOnce: function() {
            var c = this;
            while (isPresent(c) && c.mode != DETACHED) {
              if (c.mode === CHECKED)
                c.mode = CHECK_ONCE;
              c = c.parent;
            }
          }
        }, {});
      }();
      $__export("AbstractChangeDetector", AbstractChangeDetector);
    }
  };
});
//# sourceMappingURL=abstract_change_detector.js.map

//# sourceMappingURL=../../src/change_detection/abstract_change_detector.js.map