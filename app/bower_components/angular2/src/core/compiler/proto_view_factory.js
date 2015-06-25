System.register(["angular2/di", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/reflection/reflection", "angular2/change_detection", "angular2/src/render/api", "./view", "./element_injector"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      ListWrapper,
      MapWrapper,
      isPresent,
      isBlank,
      BaseException,
      reflector,
      ChangeDetection,
      DirectiveIndex,
      BindingRecord,
      DirectiveRecord,
      DEFAULT,
      ChangeDetectorDefinition,
      renderApi,
      AppProtoView,
      ProtoElementInjector,
      BindingRecordsCreator,
      ProtoViewFactory,
      RenderProtoViewWithIndex,
      ParentProtoElementInjectorWithDistance;
  function getChangeDetectorDefinitions(hostComponentMetadata, rootRenderProtoView, allRenderDirectiveMetadata) {
    var nestedPvsWithIndex = _collectNestedProtoViews(rootRenderProtoView);
    var nestedPvVariableNames = _collectNestedProtoViewsVariableNames(nestedPvsWithIndex);
    return _getChangeDetectorDefinitions(hostComponentMetadata, nestedPvsWithIndex, nestedPvVariableNames, allRenderDirectiveMetadata);
  }
  function _collectNestedProtoViews(renderProtoView) {
    var parentIndex = arguments[1] !== (void 0) ? arguments[1] : null;
    var boundElementIndex = arguments[2] !== (void 0) ? arguments[2] : null;
    var result = arguments[3] !== (void 0) ? arguments[3] : null;
    if (isBlank(result)) {
      result = [];
    }
    result.push(new RenderProtoViewWithIndex(renderProtoView, result.length, parentIndex, boundElementIndex));
    var currentIndex = result.length - 1;
    var childBoundElementIndex = 0;
    ListWrapper.forEach(renderProtoView.elementBinders, function(elementBinder) {
      if (isPresent(elementBinder.nestedProtoView)) {
        _collectNestedProtoViews(elementBinder.nestedProtoView, currentIndex, childBoundElementIndex, result);
      }
      childBoundElementIndex++;
    });
    return result;
  }
  function _getChangeDetectorDefinitions(hostComponentMetadata, nestedPvsWithIndex, nestedPvVariableNames, allRenderDirectiveMetadata) {
    return ListWrapper.map(nestedPvsWithIndex, function(pvWithIndex) {
      var elementBinders = pvWithIndex.renderProtoView.elementBinders;
      var bindingRecordsCreator = new BindingRecordsCreator();
      var bindingRecords = bindingRecordsCreator.getBindingRecords(elementBinders, allRenderDirectiveMetadata);
      var directiveRecords = bindingRecordsCreator.getDirectiveRecords(elementBinders, allRenderDirectiveMetadata);
      var strategyName = DEFAULT;
      var typeString;
      if (pvWithIndex.renderProtoView.type === renderApi.ViewType.COMPONENT) {
        strategyName = hostComponentMetadata.changeDetection;
        typeString = 'comp';
      } else if (pvWithIndex.renderProtoView.type === renderApi.ViewType.HOST) {
        typeString = 'host';
      } else {
        typeString = 'embedded';
      }
      var id = (hostComponentMetadata.id + "_" + typeString + "_" + pvWithIndex.index);
      var variableNames = nestedPvVariableNames[pvWithIndex.index];
      return new ChangeDetectorDefinition(id, strategyName, variableNames, bindingRecords, directiveRecords);
    });
  }
  function _createAppProtoView(renderProtoView, protoChangeDetector, variableBindings, allDirectives) {
    var elementBinders = renderProtoView.elementBinders;
    var protoView = new AppProtoView(renderProtoView.render, protoChangeDetector, variableBindings, createVariableLocations(elementBinders));
    _createElementBinders(protoView, elementBinders, allDirectives);
    _bindDirectiveEvents(protoView, elementBinders);
    return protoView;
  }
  function _collectNestedProtoViewsVariableBindings(nestedPvsWithIndex) {
    return ListWrapper.map(nestedPvsWithIndex, function(pvWithIndex) {
      return _createVariableBindings(pvWithIndex.renderProtoView);
    });
  }
  function _createVariableBindings(renderProtoView) {
    var variableBindings = new Map();
    MapWrapper.forEach(renderProtoView.variableBindings, function(mappedName, varName) {
      variableBindings.set(varName, mappedName);
    });
    return variableBindings;
  }
  function _collectNestedProtoViewsVariableNames(nestedPvsWithIndex) {
    var nestedPvVariableNames = ListWrapper.createFixedSize(nestedPvsWithIndex.length);
    ListWrapper.forEach(nestedPvsWithIndex, function(pvWithIndex) {
      var parentVariableNames = isPresent(pvWithIndex.parentIndex) ? nestedPvVariableNames[pvWithIndex.parentIndex] : null;
      nestedPvVariableNames[pvWithIndex.index] = _createVariableNames(parentVariableNames, pvWithIndex.renderProtoView);
    });
    return nestedPvVariableNames;
  }
  function _createVariableNames(parentVariableNames, renderProtoView) {
    var res = isBlank(parentVariableNames) ? [] : ListWrapper.clone(parentVariableNames);
    MapWrapper.forEach(renderProtoView.variableBindings, function(mappedName, varName) {
      res.push(mappedName);
    });
    ListWrapper.forEach(renderProtoView.elementBinders, function(binder) {
      MapWrapper.forEach(binder.variableBindings, function(mappedName, varName) {
        res.push(mappedName);
      });
    });
    return res;
  }
  function createVariableLocations(elementBinders) {
    var variableLocations = new Map();
    for (var i = 0; i < elementBinders.length; i++) {
      var binder = elementBinders[i];
      MapWrapper.forEach(binder.variableBindings, function(mappedName, varName) {
        variableLocations.set(mappedName, i);
      });
    }
    return variableLocations;
  }
  function _createElementBinders(protoView, elementBinders, allDirectiveBindings) {
    for (var i = 0; i < elementBinders.length; i++) {
      var renderElementBinder = elementBinders[i];
      var dirs = elementBinders[i].directives;
      var parentPeiWithDistance = _findParentProtoElementInjectorWithDistance(i, protoView.elementBinders, elementBinders);
      var directiveBindings = ListWrapper.map(dirs, function(dir) {
        return allDirectiveBindings[dir.directiveIndex];
      });
      var componentDirectiveBinding = null;
      if (directiveBindings.length > 0) {
        if (directiveBindings[0].metadata.type === renderApi.DirectiveMetadata.COMPONENT_TYPE) {
          componentDirectiveBinding = directiveBindings[0];
        }
      }
      var protoElementInjector = _createProtoElementInjector(i, parentPeiWithDistance, renderElementBinder, componentDirectiveBinding, directiveBindings);
      _createElementBinder(protoView, i, renderElementBinder, protoElementInjector, componentDirectiveBinding, directiveBindings);
    }
  }
  function _findParentProtoElementInjectorWithDistance(binderIndex, elementBinders, renderElementBinders) {
    var distance = 0;
    do {
      var renderElementBinder = renderElementBinders[binderIndex];
      binderIndex = renderElementBinder.parentIndex;
      if (binderIndex !== -1) {
        distance += renderElementBinder.distanceToParent;
        var elementBinder = elementBinders[binderIndex];
        if (isPresent(elementBinder.protoElementInjector)) {
          return new ParentProtoElementInjectorWithDistance(elementBinder.protoElementInjector, distance);
        }
      }
    } while (binderIndex !== -1);
    return new ParentProtoElementInjectorWithDistance(null, -1);
  }
  function _createProtoElementInjector(binderIndex, parentPeiWithDistance, renderElementBinder, componentDirectiveBinding, directiveBindings) {
    var protoElementInjector = null;
    var hasVariables = MapWrapper.size(renderElementBinder.variableBindings) > 0;
    if (directiveBindings.length > 0 || hasVariables) {
      var directiveVariableBindings = createDirectiveVariableBindings(renderElementBinder, directiveBindings);
      protoElementInjector = ProtoElementInjector.create(parentPeiWithDistance.protoElementInjector, binderIndex, directiveBindings, isPresent(componentDirectiveBinding), parentPeiWithDistance.distance, directiveVariableBindings);
      protoElementInjector.attributes = renderElementBinder.readAttributes;
    }
    return protoElementInjector;
  }
  function _createElementBinder(protoView, boundElementIndex, renderElementBinder, protoElementInjector, componentDirectiveBinding, directiveBindings) {
    var parent = null;
    if (renderElementBinder.parentIndex !== -1) {
      parent = protoView.elementBinders[renderElementBinder.parentIndex];
    }
    var elBinder = protoView.bindElement(parent, renderElementBinder.distanceToParent, protoElementInjector, componentDirectiveBinding);
    protoView.bindEvent(renderElementBinder.eventBindings, boundElementIndex, -1);
    MapWrapper.forEach(renderElementBinder.variableBindings, function(mappedName, varName) {
      protoView.protoLocals.set(mappedName, null);
    });
    return elBinder;
  }
  function createDirectiveVariableBindings(renderElementBinder, directiveBindings) {
    var directiveVariableBindings = new Map();
    MapWrapper.forEach(renderElementBinder.variableBindings, function(templateName, exportAs) {
      var dirIndex = _findDirectiveIndexByExportAs(renderElementBinder, directiveBindings, exportAs);
      directiveVariableBindings.set(templateName, dirIndex);
    });
    return directiveVariableBindings;
  }
  function _findDirectiveIndexByExportAs(renderElementBinder, directiveBindings, exportAs) {
    var matchedDirectiveIndex = null;
    var matchedDirective;
    for (var i = 0; i < directiveBindings.length; ++i) {
      var directive = directiveBindings[i];
      if (_directiveExportAs(directive) == exportAs) {
        if (isPresent(matchedDirective)) {
          throw new BaseException(("More than one directive have exportAs = '" + exportAs + "'. Directives: [" + matchedDirective.displayName + ", " + directive.displayName + "]"));
        }
        matchedDirectiveIndex = i;
        matchedDirective = directive;
      }
    }
    if (isBlank(matchedDirective) && exportAs !== "$implicit") {
      throw new BaseException(("Cannot find directive with exportAs = '" + exportAs + "'"));
    }
    return matchedDirectiveIndex;
  }
  function _directiveExportAs(directive) {
    var directiveExportAs = directive.metadata.exportAs;
    if (isBlank(directiveExportAs) && directive.metadata.type === renderApi.DirectiveMetadata.COMPONENT_TYPE) {
      return "$implicit";
    } else {
      return directiveExportAs;
    }
  }
  function _bindDirectiveEvents(protoView, elementBinders) {
    for (var boundElementIndex = 0; boundElementIndex < elementBinders.length; ++boundElementIndex) {
      var dirs = elementBinders[boundElementIndex].directives;
      for (var i = 0; i < dirs.length; i++) {
        var directiveBinder = dirs[i];
        protoView.bindEvent(directiveBinder.eventBindings, boundElementIndex, i);
      }
    }
  }
  $__export("getChangeDetectorDefinitions", getChangeDetectorDefinitions);
  $__export("createVariableLocations", createVariableLocations);
  $__export("createDirectiveVariableBindings", createDirectiveVariableBindings);
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
    }, function($__m) {
      reflector = $__m.reflector;
    }, function($__m) {
      ChangeDetection = $__m.ChangeDetection;
      DirectiveIndex = $__m.DirectiveIndex;
      BindingRecord = $__m.BindingRecord;
      DirectiveRecord = $__m.DirectiveRecord;
      DEFAULT = $__m.DEFAULT;
      ChangeDetectorDefinition = $__m.ChangeDetectorDefinition;
    }, function($__m) {
      renderApi = $__m;
    }, function($__m) {
      AppProtoView = $__m.AppProtoView;
    }, function($__m) {
      ProtoElementInjector = $__m.ProtoElementInjector;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      BindingRecordsCreator = function() {
        function BindingRecordsCreator() {
          this._directiveRecordsMap = new Map();
          this._textNodeIndex = 0;
        }
        return ($traceurRuntime.createClass)(BindingRecordsCreator, {
          getBindingRecords: function(elementBinders, allDirectiveMetadatas) {
            var bindings = [];
            for (var boundElementIndex = 0; boundElementIndex < elementBinders.length; boundElementIndex++) {
              var renderElementBinder = elementBinders[boundElementIndex];
              this._createTextNodeRecords(bindings, renderElementBinder);
              this._createElementPropertyRecords(bindings, boundElementIndex, renderElementBinder);
              this._createDirectiveRecords(bindings, boundElementIndex, renderElementBinder.directives, allDirectiveMetadatas);
            }
            return bindings;
          },
          getDirectiveRecords: function(elementBinders, allDirectiveMetadatas) {
            var directiveRecords = [];
            for (var elementIndex = 0; elementIndex < elementBinders.length; ++elementIndex) {
              var dirs = elementBinders[elementIndex].directives;
              for (var dirIndex = 0; dirIndex < dirs.length; ++dirIndex) {
                directiveRecords.push(this._getDirectiveRecord(elementIndex, dirIndex, allDirectiveMetadatas[dirs[dirIndex].directiveIndex]));
              }
            }
            return directiveRecords;
          },
          _createTextNodeRecords: function(bindings, renderElementBinder) {
            var $__0 = this;
            if (isBlank(renderElementBinder.textBindings))
              return;
            ListWrapper.forEach(renderElementBinder.textBindings, function(b) {
              bindings.push(BindingRecord.createForTextNode(b, $__0._textNodeIndex++));
            });
          },
          _createElementPropertyRecords: function(bindings, boundElementIndex, renderElementBinder) {
            ListWrapper.forEach(renderElementBinder.propertyBindings, function(binding) {
              if (binding.type === renderApi.PropertyBindingType.PROPERTY) {
                bindings.push(BindingRecord.createForElementProperty(binding.astWithSource, boundElementIndex, binding.property));
              } else if (binding.type === renderApi.PropertyBindingType.ATTRIBUTE) {
                bindings.push(BindingRecord.createForElementAttribute(binding.astWithSource, boundElementIndex, binding.property));
              } else if (binding.type === renderApi.PropertyBindingType.CLASS) {
                bindings.push(BindingRecord.createForElementClass(binding.astWithSource, boundElementIndex, binding.property));
              } else if (binding.type === renderApi.PropertyBindingType.STYLE) {
                bindings.push(BindingRecord.createForElementStyle(binding.astWithSource, boundElementIndex, binding.property, binding.unit));
              }
            });
          },
          _createDirectiveRecords: function(bindings, boundElementIndex, directiveBinders, allDirectiveMetadatas) {
            for (var i = 0; i < directiveBinders.length; i++) {
              var directiveBinder = directiveBinders[i];
              var directiveMetadata = allDirectiveMetadatas[directiveBinder.directiveIndex];
              var directiveRecord = this._getDirectiveRecord(boundElementIndex, i, directiveMetadata);
              MapWrapper.forEach(directiveBinder.propertyBindings, function(astWithSource, propertyName) {
                var setter = reflector.setter(propertyName);
                bindings.push(BindingRecord.createForDirective(astWithSource, propertyName, setter, directiveRecord));
              });
              if (directiveRecord.callOnChange) {
                bindings.push(BindingRecord.createDirectiveOnChange(directiveRecord));
              }
              if (directiveRecord.callOnInit) {
                bindings.push(BindingRecord.createDirectiveOnInit(directiveRecord));
              }
              if (directiveRecord.callOnCheck) {
                bindings.push(BindingRecord.createDirectiveOnCheck(directiveRecord));
              }
            }
            for (var i = 0; i < directiveBinders.length; i++) {
              var directiveBinder = directiveBinders[i];
              ListWrapper.forEach(directiveBinder.hostPropertyBindings, function(binding) {
                var dirIndex = new DirectiveIndex(boundElementIndex, i);
                if (binding.type === renderApi.PropertyBindingType.PROPERTY) {
                  bindings.push(BindingRecord.createForHostProperty(dirIndex, binding.astWithSource, binding.property));
                } else if (binding.type === renderApi.PropertyBindingType.ATTRIBUTE) {
                  bindings.push(BindingRecord.createForHostAttribute(dirIndex, binding.astWithSource, binding.property));
                } else if (binding.type === renderApi.PropertyBindingType.CLASS) {
                  bindings.push(BindingRecord.createForHostClass(dirIndex, binding.astWithSource, binding.property));
                } else if (binding.type === renderApi.PropertyBindingType.STYLE) {
                  bindings.push(BindingRecord.createForHostStyle(dirIndex, binding.astWithSource, binding.property, binding.unit));
                }
              });
            }
          },
          _getDirectiveRecord: function(boundElementIndex, directiveIndex, directiveMetadata) {
            var id = boundElementIndex * 100 + directiveIndex;
            if (!this._directiveRecordsMap.has(id)) {
              this._directiveRecordsMap.set(id, new DirectiveRecord({
                directiveIndex: new DirectiveIndex(boundElementIndex, directiveIndex),
                callOnAllChangesDone: directiveMetadata.callOnAllChangesDone,
                callOnChange: directiveMetadata.callOnChange,
                callOnCheck: directiveMetadata.callOnCheck,
                callOnInit: directiveMetadata.callOnInit,
                changeDetection: directiveMetadata.changeDetection
              }));
            }
            return this._directiveRecordsMap.get(id);
          }
        }, {});
      }();
      ProtoViewFactory = ($traceurRuntime.createClass)(function(_changeDetection) {
        this._changeDetection = _changeDetection;
      }, {createAppProtoViews: function(hostComponentBinding, rootRenderProtoView, allDirectives) {
          var $__0 = this;
          var allRenderDirectiveMetadata = ListWrapper.map(allDirectives, function(directiveBinding) {
            return directiveBinding.metadata;
          });
          var nestedPvsWithIndex = _collectNestedProtoViews(rootRenderProtoView);
          var nestedPvVariableBindings = _collectNestedProtoViewsVariableBindings(nestedPvsWithIndex);
          var nestedPvVariableNames = _collectNestedProtoViewsVariableNames(nestedPvsWithIndex);
          var changeDetectorDefs = _getChangeDetectorDefinitions(hostComponentBinding.metadata, nestedPvsWithIndex, nestedPvVariableNames, allRenderDirectiveMetadata);
          var protoChangeDetectors = ListWrapper.map(changeDetectorDefs, function(changeDetectorDef) {
            return $__0._changeDetection.createProtoChangeDetector(changeDetectorDef);
          });
          var appProtoViews = ListWrapper.createFixedSize(nestedPvsWithIndex.length);
          ListWrapper.forEach(nestedPvsWithIndex, function(pvWithIndex) {
            var appProtoView = _createAppProtoView(pvWithIndex.renderProtoView, protoChangeDetectors[pvWithIndex.index], nestedPvVariableBindings[pvWithIndex.index], allDirectives);
            if (isPresent(pvWithIndex.parentIndex)) {
              var parentView = appProtoViews[pvWithIndex.parentIndex];
              parentView.elementBinders[pvWithIndex.boundElementIndex].nestedProtoView = appProtoView;
            }
            appProtoViews[pvWithIndex.index] = appProtoView;
          });
          return appProtoViews;
        }}, {});
      $__export("ProtoViewFactory", ProtoViewFactory);
      $__export("ProtoViewFactory", ProtoViewFactory = __decorate([Injectable(), __metadata('design:paramtypes', [ChangeDetection])], ProtoViewFactory));
      RenderProtoViewWithIndex = function() {
        function RenderProtoViewWithIndex(renderProtoView, index, parentIndex, boundElementIndex) {
          this.renderProtoView = renderProtoView;
          this.index = index;
          this.parentIndex = parentIndex;
          this.boundElementIndex = boundElementIndex;
        }
        return ($traceurRuntime.createClass)(RenderProtoViewWithIndex, {}, {});
      }();
      ParentProtoElementInjectorWithDistance = function() {
        function ParentProtoElementInjectorWithDistance(protoElementInjector, distance) {
          this.protoElementInjector = protoElementInjector;
          this.distance = distance;
        }
        return ($traceurRuntime.createClass)(ParentProtoElementInjectorWithDistance, {}, {});
      }();
    }
  };
});
//# sourceMappingURL=proto_view_factory.js.map

//# sourceMappingURL=../../../src/core/compiler/proto_view_factory.js.map