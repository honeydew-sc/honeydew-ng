System.register(["angular2/src/facade/lang", "angular2/src/dom/dom_adapter", "angular2/src/facade/collection", "./compile_element", "../util"], function($__export) {
  "use strict";
  var isPresent,
      BaseException,
      StringWrapper,
      DOM,
      MapWrapper,
      CompileElement,
      dashCaseToCamelCase,
      ViewSplitter;
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      StringWrapper = $__m.StringWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      dashCaseToCamelCase = $__m.dashCaseToCamelCase;
    }],
    execute: function() {
      ViewSplitter = function() {
        function ViewSplitter(_parser) {
          this._parser = _parser;
        }
        return ($traceurRuntime.createClass)(ViewSplitter, {
          process: function(parent, current, control) {
            var attrs = current.attrs();
            var templateBindings = attrs.get('template');
            var hasTemplateBinding = isPresent(templateBindings);
            MapWrapper.forEach(attrs, function(attrValue, attrName) {
              if (StringWrapper.startsWith(attrName, '*')) {
                var key = StringWrapper.substring(attrName, 1);
                if (hasTemplateBinding) {
                  throw new BaseException("Only one template directive per element is allowed: " + (templateBindings + " and " + key + " cannot be used simultaneously ") + ("in " + current.elementDescription));
                } else {
                  templateBindings = (attrValue.length == 0) ? key : key + ' ' + attrValue;
                  hasTemplateBinding = true;
                }
              }
            });
            if (isPresent(parent)) {
              if (DOM.isTemplateElement(current.element)) {
                if (!current.isViewRoot) {
                  var viewRoot = new CompileElement(DOM.createTemplate(''));
                  viewRoot.inheritedProtoView = current.bindElement().bindNestedProtoView(viewRoot.element);
                  viewRoot.elementDescription = current.elementDescription;
                  viewRoot.isViewRoot = true;
                  this._moveChildNodes(DOM.content(current.element), DOM.content(viewRoot.element));
                  control.addChild(viewRoot);
                }
              }
              if (hasTemplateBinding) {
                var newParent = new CompileElement(DOM.createTemplate(''));
                newParent.inheritedProtoView = current.inheritedProtoView;
                newParent.inheritedElementBinder = current.inheritedElementBinder;
                newParent.distanceToInheritedBinder = current.distanceToInheritedBinder;
                newParent.elementDescription = current.elementDescription;
                current.inheritedProtoView = newParent.bindElement().bindNestedProtoView(current.element);
                current.inheritedElementBinder = null;
                current.distanceToInheritedBinder = 0;
                current.isViewRoot = true;
                this._parseTemplateBindings(templateBindings, newParent);
                this._addParentElement(current.element, newParent.element);
                control.addParent(newParent);
                DOM.remove(current.element);
              }
            }
          },
          _moveChildNodes: function(source, target) {
            var next = DOM.firstChild(source);
            while (isPresent(next)) {
              DOM.appendChild(target, next);
              next = DOM.firstChild(source);
            }
          },
          _addParentElement: function(currentElement, newParentElement) {
            DOM.insertBefore(currentElement, newParentElement);
            DOM.appendChild(newParentElement, currentElement);
          },
          _parseTemplateBindings: function(templateBindings, compileElement) {
            var bindings = this._parser.parseTemplateBindings(templateBindings, compileElement.elementDescription);
            for (var i = 0; i < bindings.length; i++) {
              var binding = bindings[i];
              if (binding.keyIsVar) {
                compileElement.bindElement().bindVariable(dashCaseToCamelCase(binding.key), binding.name);
                compileElement.attrs().set(binding.key, binding.name);
              } else if (isPresent(binding.expression)) {
                compileElement.bindElement().bindProperty(dashCaseToCamelCase(binding.key), binding.expression);
                compileElement.attrs().set(binding.key, binding.expression.source);
              } else {
                DOM.setAttribute(compileElement.element, binding.key, '');
              }
            }
          }
        }, {});
      }();
      $__export("ViewSplitter", ViewSplitter);
    }
  };
});
//# sourceMappingURL=view_splitter.js.map

//# sourceMappingURL=../../../../src/render/dom/compiler/view_splitter.js.map