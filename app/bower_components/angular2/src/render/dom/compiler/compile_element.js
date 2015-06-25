System.register(["angular2/src/facade/collection", "angular2/src/dom/dom_adapter", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var MapWrapper,
      DOM,
      isBlank,
      isPresent,
      StringJoiner,
      assertionsEnabled,
      CompileElement;
  function getElementDescription(domElement) {
    var buf = new StringJoiner();
    var atts = DOM.attributeMap(domElement);
    buf.add("<");
    buf.add(DOM.tagName(domElement).toLowerCase());
    addDescriptionAttribute(buf, "id", atts.get("id"));
    addDescriptionAttribute(buf, "class", atts.get("class"));
    MapWrapper.forEach(atts, function(attValue, attName) {
      if (attName !== "id" && attName !== "class") {
        addDescriptionAttribute(buf, attName, attValue);
      }
    });
    buf.add(">");
    return buf.toString();
  }
  function addDescriptionAttribute(buffer, attName, attValue) {
    if (isPresent(attValue)) {
      if (attValue.length === 0) {
        buffer.add(' ' + attName);
      } else {
        buffer.add(' ' + attName + '="' + attValue + '"');
      }
    }
  }
  return {
    setters: [function($__m) {
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      StringJoiner = $__m.StringJoiner;
      assertionsEnabled = $__m.assertionsEnabled;
    }],
    execute: function() {
      CompileElement = function() {
        function CompileElement(element) {
          var compilationUnit = arguments[1] !== (void 0) ? arguments[1] : '';
          this.element = element;
          this._attrs = null;
          this._classList = null;
          this.isViewRoot = false;
          this.inheritedProtoView = null;
          this.distanceToInheritedBinder = 0;
          this.inheritedElementBinder = null;
          this.compileChildren = true;
          var tplDesc = assertionsEnabled() ? getElementDescription(element) : null;
          if (compilationUnit !== '') {
            this.elementDescription = compilationUnit;
            if (isPresent(tplDesc))
              this.elementDescription += ": " + tplDesc;
          } else {
            this.elementDescription = tplDesc;
          }
        }
        return ($traceurRuntime.createClass)(CompileElement, {
          isBound: function() {
            return isPresent(this.inheritedElementBinder) && this.distanceToInheritedBinder === 0;
          },
          bindElement: function() {
            if (!this.isBound()) {
              var parentBinder = this.inheritedElementBinder;
              this.inheritedElementBinder = this.inheritedProtoView.bindElement(this.element, this.elementDescription);
              if (isPresent(parentBinder)) {
                this.inheritedElementBinder.setParent(parentBinder, this.distanceToInheritedBinder);
              }
              this.distanceToInheritedBinder = 0;
            }
            return this.inheritedElementBinder;
          },
          refreshAttrs: function() {
            this._attrs = null;
          },
          attrs: function() {
            if (isBlank(this._attrs)) {
              this._attrs = DOM.attributeMap(this.element);
            }
            return this._attrs;
          },
          refreshClassList: function() {
            this._classList = null;
          },
          classList: function() {
            if (isBlank(this._classList)) {
              this._classList = [];
              var elClassList = DOM.classList(this.element);
              for (var i = 0; i < elClassList.length; i++) {
                this._classList.push(elClassList[i]);
              }
            }
            return this._classList;
          }
        }, {});
      }();
      $__export("CompileElement", CompileElement);
    }
  };
});
//# sourceMappingURL=compile_element.js.map

//# sourceMappingURL=../../../../src/render/dom/compiler/compile_element.js.map