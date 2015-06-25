System.register(["angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/facade/collection", "angular2/di", "angular2/src/core/annotations_impl/visibility", "angular2/src/core/annotations_impl/di", "./view_manager", "./view_container_ref", "./element_ref", "./view_ref", "angular2/src/core/annotations_impl/annotations", "./directive_lifecycle_reflector", "angular2/change_detection", "./query_list", "angular2/src/reflection/reflection", "angular2/src/render/api"], function($__export) {
  "use strict";
  var isPresent,
      isBlank,
      BaseException,
      stringify,
      CONST_EXPR,
      StringWrapper,
      ObservableWrapper,
      ListWrapper,
      MapWrapper,
      Injector,
      Key,
      Dependency,
      Binding,
      ResolvedBinding,
      NoBindingError,
      AbstractBindingError,
      CyclicDependencyError,
      resolveBindings,
      Visibility,
      self,
      Attribute,
      Query,
      avmModule,
      ViewContainerRef,
      ElementRef,
      ProtoViewRef,
      Directive,
      Component,
      onChange,
      onDestroy,
      onCheck,
      onInit,
      onAllChangesDone,
      hasLifecycleHook,
      ChangeDetectorRef,
      QueryList,
      reflector,
      DirectiveMetadata,
      _MAX_DIRECTIVE_CONSTRUCTION_COUNTER,
      _undefined,
      _staticKeys,
      StaticKeys,
      TreeNode,
      DependencyWithVisibility,
      DirectiveDependency,
      DirectiveBinding,
      PreBuiltObjects,
      EventEmitterAccessor,
      HostActionAccessor,
      LIGHT_DOM,
      SHADOW_DOM,
      LIGHT_DOM_AND_SHADOW_DOM,
      BindingData,
      ProtoElementInjector,
      _ProtoElementInjectorInlineStrategy,
      _ProtoElementInjectorDynamicStrategy,
      ElementInjector,
      ElementInjectorInlineStrategy,
      ElementInjectorDynamicStrategy,
      OutOfBoundsAccess,
      QueryError,
      QueryRef;
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
      stringify = $__m.stringify;
      CONST_EXPR = $__m.CONST_EXPR;
      StringWrapper = $__m.StringWrapper;
    }, function($__m) {
      ObservableWrapper = $__m.ObservableWrapper;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      Injector = $__m.Injector;
      Key = $__m.Key;
      Dependency = $__m.Dependency;
      Binding = $__m.Binding;
      ResolvedBinding = $__m.ResolvedBinding;
      NoBindingError = $__m.NoBindingError;
      AbstractBindingError = $__m.AbstractBindingError;
      CyclicDependencyError = $__m.CyclicDependencyError;
      resolveBindings = $__m.resolveBindings;
    }, function($__m) {
      Visibility = $__m.Visibility;
      self = $__m.self;
    }, function($__m) {
      Attribute = $__m.Attribute;
      Query = $__m.Query;
    }, function($__m) {
      avmModule = $__m;
    }, function($__m) {
      ViewContainerRef = $__m.ViewContainerRef;
    }, function($__m) {
      ElementRef = $__m.ElementRef;
    }, function($__m) {
      ProtoViewRef = $__m.ProtoViewRef;
    }, function($__m) {
      Directive = $__m.Directive;
      Component = $__m.Component;
      onChange = $__m.onChange;
      onDestroy = $__m.onDestroy;
      onCheck = $__m.onCheck;
      onInit = $__m.onInit;
      onAllChangesDone = $__m.onAllChangesDone;
    }, function($__m) {
      hasLifecycleHook = $__m.hasLifecycleHook;
    }, function($__m) {
      ChangeDetectorRef = $__m.ChangeDetectorRef;
    }, function($__m) {
      QueryList = $__m.QueryList;
    }, function($__m) {
      reflector = $__m.reflector;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }],
    execute: function() {
      _MAX_DIRECTIVE_CONSTRUCTION_COUNTER = 10;
      _undefined = CONST_EXPR(new Object());
      StaticKeys = function() {
        function StaticKeys() {
          this.viewManagerId = Key.get(avmModule.AppViewManager).id;
          this.protoViewId = Key.get(ProtoViewRef).id;
          this.viewContainerId = Key.get(ViewContainerRef).id;
          this.changeDetectorRefId = Key.get(ChangeDetectorRef).id;
          this.elementRefId = Key.get(ElementRef).id;
        }
        return ($traceurRuntime.createClass)(StaticKeys, {}, {instance: function() {
            if (isBlank(_staticKeys))
              _staticKeys = new StaticKeys();
            return _staticKeys;
          }});
      }();
      TreeNode = function() {
        function TreeNode(parent) {
          this._head = null;
          this._tail = null;
          this._next = null;
          if (isPresent(parent))
            parent.addChild(this);
        }
        return ($traceurRuntime.createClass)(TreeNode, {
          addChild: function(child) {
            if (isPresent(this._tail)) {
              this._tail._next = child;
              this._tail = child;
            } else {
              this._tail = this._head = child;
            }
            child._next = null;
            child._parent = this;
          },
          addChildAfter: function(child, prevSibling) {
            if (isBlank(prevSibling)) {
              var prevHead = this._head;
              this._head = child;
              child._next = prevHead;
              if (isBlank(this._tail))
                this._tail = child;
            } else if (isBlank(prevSibling._next)) {
              this.addChild(child);
              return;
            } else {
              child._next = prevSibling._next;
              prevSibling._next = child;
            }
            child._parent = this;
          },
          remove: function() {
            if (isBlank(this.parent))
              return;
            var nextSibling = this._next;
            var prevSibling = this._findPrev();
            if (isBlank(prevSibling)) {
              this.parent._head = this._next;
            } else {
              prevSibling._next = this._next;
            }
            if (isBlank(nextSibling)) {
              this._parent._tail = prevSibling;
            }
            this._parent = null;
            this._next = null;
          },
          _findPrev: function() {
            var node = this.parent._head;
            if (node == this)
              return null;
            while (node._next !== this)
              node = node._next;
            return node;
          },
          get parent() {
            return this._parent;
          },
          get children() {
            var res = [];
            var child = this._head;
            while (child != null) {
              res.push(child);
              child = child._next;
            }
            return res;
          }
        }, {});
      }();
      $__export("TreeNode", TreeNode);
      DependencyWithVisibility = function($__super) {
        function DependencyWithVisibility(key, asPromise, lazy, optional, properties, visibility) {
          $traceurRuntime.superConstructor(DependencyWithVisibility).call(this, key, asPromise, lazy, optional, properties);
          this.visibility = visibility;
        }
        return ($traceurRuntime.createClass)(DependencyWithVisibility, {}, {
          createFrom: function(d) {
            return new DependencyWithVisibility(d.key, d.asPromise, d.lazy, d.optional, d.properties, DependencyWithVisibility._visibility(d.properties));
          },
          _visibility: function(properties) {
            if (properties.length == 0)
              return self;
            var p = ListWrapper.find(properties, function(p) {
              return p instanceof Visibility;
            });
            return isPresent(p) ? p : self;
          }
        }, $__super);
      }(Dependency);
      $__export("DependencyWithVisibility", DependencyWithVisibility);
      DirectiveDependency = function($__super) {
        function DirectiveDependency(key, asPromise, lazy, optional, properties, visibility, attributeName, queryDecorator) {
          $traceurRuntime.superConstructor(DirectiveDependency).call(this, key, asPromise, lazy, optional, properties, visibility);
          this.attributeName = attributeName;
          this.queryDecorator = queryDecorator;
          this._verify();
        }
        return ($traceurRuntime.createClass)(DirectiveDependency, {_verify: function() {
            var count = 0;
            if (isPresent(this.queryDecorator))
              count++;
            if (isPresent(this.attributeName))
              count++;
            if (count > 1)
              throw new BaseException('A directive injectable can contain only one of the following @Attribute or @Query.');
          }}, {
          createFrom: function(d) {
            return new DirectiveDependency(d.key, d.asPromise, d.lazy, d.optional, d.properties, DependencyWithVisibility._visibility(d.properties), DirectiveDependency._attributeName(d.properties), DirectiveDependency._query(d.properties));
          },
          _attributeName: function(properties) {
            var p = ListWrapper.find(properties, function(p) {
              return p instanceof Attribute;
            });
            return isPresent(p) ? p.attributeName : null;
          },
          _query: function(properties) {
            return ListWrapper.find(properties, function(p) {
              return p instanceof Query;
            });
          }
        }, $__super);
      }(DependencyWithVisibility);
      $__export("DirectiveDependency", DirectiveDependency);
      DirectiveBinding = function($__super) {
        function DirectiveBinding(key, factory, dependencies, providedAsPromise, resolvedAppInjectables, resolvedHostInjectables, resolvedViewInjectables, metadata) {
          $traceurRuntime.superConstructor(DirectiveBinding).call(this, key, factory, dependencies, providedAsPromise);
          this.resolvedAppInjectables = resolvedAppInjectables;
          this.resolvedHostInjectables = resolvedHostInjectables;
          this.resolvedViewInjectables = resolvedViewInjectables;
          this.metadata = metadata;
        }
        return ($traceurRuntime.createClass)(DirectiveBinding, {
          get callOnDestroy() {
            return this.metadata.callOnDestroy;
          },
          get callOnChange() {
            return this.metadata.callOnChange;
          },
          get callOnAllChangesDone() {
            return this.metadata.callOnAllChangesDone;
          },
          get displayName() {
            return this.key.displayName;
          },
          get eventEmitters() {
            return isPresent(this.metadata) && isPresent(this.metadata.events) ? this.metadata.events : [];
          },
          get hostActions() {
            return isPresent(this.metadata) && isPresent(this.metadata.hostActions) ? this.metadata.hostActions : new Map();
          },
          get changeDetection() {
            return this.metadata.changeDetection;
          }
        }, {
          createFromBinding: function(binding, ann) {
            if (isBlank(ann)) {
              ann = new Directive();
            }
            var rb = binding.resolve();
            var deps = ListWrapper.map(rb.dependencies, DirectiveDependency.createFrom);
            var resolvedAppInjectables = ann instanceof Component && isPresent(ann.appInjector) ? Injector.resolve(ann.appInjector) : [];
            var resolvedHostInjectables = isPresent(ann.hostInjector) ? resolveBindings(ann.hostInjector) : [];
            var resolvedViewInjectables = ann instanceof Component && isPresent(ann.viewInjector) ? resolveBindings(ann.viewInjector) : [];
            var metadata = DirectiveMetadata.create({
              id: stringify(rb.key.token),
              type: ann instanceof Component ? DirectiveMetadata.COMPONENT_TYPE : DirectiveMetadata.DIRECTIVE_TYPE,
              selector: ann.selector,
              compileChildren: ann.compileChildren,
              events: ann.events,
              host: isPresent(ann.host) ? MapWrapper.createFromStringMap(ann.host) : null,
              properties: ann.properties,
              readAttributes: DirectiveBinding._readAttributes(deps),
              callOnDestroy: hasLifecycleHook(onDestroy, rb.key.token, ann),
              callOnChange: hasLifecycleHook(onChange, rb.key.token, ann),
              callOnCheck: hasLifecycleHook(onCheck, rb.key.token, ann),
              callOnInit: hasLifecycleHook(onInit, rb.key.token, ann),
              callOnAllChangesDone: hasLifecycleHook(onAllChangesDone, rb.key.token, ann),
              changeDetection: ann instanceof Component ? ann.changeDetection : null,
              exportAs: ann.exportAs
            });
            return new DirectiveBinding(rb.key, rb.factory, deps, rb.providedAsPromise, resolvedAppInjectables, resolvedHostInjectables, resolvedViewInjectables, metadata);
          },
          _readAttributes: function(deps) {
            var readAttributes = [];
            ListWrapper.forEach(deps, function(dep) {
              if (isPresent(dep.attributeName)) {
                readAttributes.push(dep.attributeName);
              }
            });
            return readAttributes;
          },
          createFromType: function(type, annotation) {
            var binding = new Binding(type, {toClass: type});
            return DirectiveBinding.createFromBinding(binding, annotation);
          }
        }, $__super);
      }(ResolvedBinding);
      $__export("DirectiveBinding", DirectiveBinding);
      PreBuiltObjects = function() {
        function PreBuiltObjects(viewManager, view, protoView) {
          this.viewManager = viewManager;
          this.view = view;
          this.protoView = protoView;
        }
        return ($traceurRuntime.createClass)(PreBuiltObjects, {}, {});
      }();
      $__export("PreBuiltObjects", PreBuiltObjects);
      EventEmitterAccessor = function() {
        function EventEmitterAccessor(eventName, getter) {
          this.eventName = eventName;
          this.getter = getter;
        }
        return ($traceurRuntime.createClass)(EventEmitterAccessor, {subscribe: function(view, boundElementIndex, directive) {
            var $__0 = this;
            var eventEmitter = this.getter(directive);
            return ObservableWrapper.subscribe(eventEmitter, function(eventObj) {
              return view.triggerEventHandlers($__0.eventName, eventObj, boundElementIndex);
            });
          }}, {});
      }();
      $__export("EventEmitterAccessor", EventEmitterAccessor);
      HostActionAccessor = function() {
        function HostActionAccessor(methodName, getter) {
          this.methodName = methodName;
          this.getter = getter;
        }
        return ($traceurRuntime.createClass)(HostActionAccessor, {subscribe: function(view, boundElementIndex, directive) {
            var $__0 = this;
            var eventEmitter = this.getter(directive);
            return ObservableWrapper.subscribe(eventEmitter, function(actionArgs) {
              return view.invokeElementMethod(boundElementIndex, $__0.methodName, actionArgs);
            });
          }}, {});
      }();
      $__export("HostActionAccessor", HostActionAccessor);
      LIGHT_DOM = 1;
      SHADOW_DOM = 2;
      LIGHT_DOM_AND_SHADOW_DOM = 3;
      BindingData = function() {
        function BindingData(binding, visibility) {
          this.binding = binding;
          this.visibility = visibility;
        }
        return ($traceurRuntime.createClass)(BindingData, {
          getKeyId: function() {
            return this.binding.key.id;
          },
          createEventEmitterAccessors: function() {
            if (!(this.binding instanceof DirectiveBinding))
              return [];
            var db = this.binding;
            return ListWrapper.map(db.eventEmitters, function(eventConfig) {
              var fieldName;
              var eventName;
              var colonIdx = eventConfig.indexOf(':');
              if (colonIdx > -1) {
                fieldName = StringWrapper.substring(eventConfig, 0, colonIdx).trim();
                eventName = StringWrapper.substring(eventConfig, colonIdx + 1).trim();
              } else {
                fieldName = eventName = eventConfig;
              }
              return new EventEmitterAccessor(eventName, reflector.getter(fieldName));
            });
          },
          createHostActionAccessors: function() {
            if (!(this.binding instanceof DirectiveBinding))
              return [];
            var res = [];
            var db = this.binding;
            MapWrapper.forEach(db.hostActions, function(actionExpression, actionName) {
              res.push(new HostActionAccessor(actionExpression, reflector.getter(actionName)));
            });
            return res;
          }
        }, {});
      }();
      $__export("BindingData", BindingData);
      ProtoElementInjector = function() {
        function ProtoElementInjector(parent, index, bd, distanceToParent, _firstBindingIsComponent, directiveVariableBindings) {
          this.parent = parent;
          this.index = index;
          this.distanceToParent = distanceToParent;
          this._firstBindingIsComponent = _firstBindingIsComponent;
          this.directiveVariableBindings = directiveVariableBindings;
          var length = bd.length;
          this.eventEmitterAccessors = ListWrapper.createFixedSize(length);
          this.hostActionAccessors = ListWrapper.createFixedSize(length);
          this._strategy = length > _MAX_DIRECTIVE_CONSTRUCTION_COUNTER ? new _ProtoElementInjectorDynamicStrategy(this, bd) : new _ProtoElementInjectorInlineStrategy(this, bd);
        }
        return ($traceurRuntime.createClass)(ProtoElementInjector, {
          instantiate: function(parent) {
            return new ElementInjector(this, parent);
          },
          directParent: function() {
            return this.distanceToParent < 2 ? this.parent : null;
          },
          get hasBindings() {
            return this._strategy.hasBindings();
          },
          getBindingAtIndex: function(index) {
            return this._strategy.getBindingAtIndex(index);
          }
        }, {
          create: function(parent, index, bindings, firstBindingIsComponent, distanceToParent, directiveVariableBindings) {
            var bd = [];
            ProtoElementInjector._createDirectiveBindingData(bindings, bd, firstBindingIsComponent);
            if (firstBindingIsComponent) {
              ProtoElementInjector._createViewInjectorBindingData(bindings, bd);
            }
            ProtoElementInjector._createHostInjectorBindingData(bindings, bd, firstBindingIsComponent);
            return new ProtoElementInjector(parent, index, bd, distanceToParent, firstBindingIsComponent, directiveVariableBindings);
          },
          _createDirectiveBindingData: function(dirBindings, bd, firstBindingIsComponent) {
            ListWrapper.forEach(dirBindings, function(dirBinding) {
              bd.push(ProtoElementInjector._createBindingData(firstBindingIsComponent, dirBinding, dirBindings, dirBinding));
            });
          },
          _createHostInjectorBindingData: function(dirBindings, bd, firstBindingIsComponent) {
            ListWrapper.forEach(dirBindings, function(dirBinding) {
              ListWrapper.forEach(dirBinding.resolvedHostInjectables, function(b) {
                bd.push(ProtoElementInjector._createBindingData(firstBindingIsComponent, dirBinding, dirBindings, ProtoElementInjector._createBinding(b)));
              });
            });
          },
          _createBindingData: function(firstBindingIsComponent, dirBinding, dirBindings, binding) {
            var isComponent = firstBindingIsComponent && dirBindings[0] === dirBinding;
            return new BindingData(binding, isComponent ? LIGHT_DOM_AND_SHADOW_DOM : LIGHT_DOM);
          },
          _createViewInjectorBindingData: function(bindings, bd) {
            var db = bindings[0];
            ListWrapper.forEach(db.resolvedViewInjectables, function(b) {
              return bd.push(new BindingData(ProtoElementInjector._createBinding(b), SHADOW_DOM));
            });
          },
          _createBinding: function(b) {
            var deps = ListWrapper.map(b.dependencies, function(d) {
              return DependencyWithVisibility.createFrom(d);
            });
            return new ResolvedBinding(b.key, b.factory, deps, b.providedAsPromise);
          }
        });
      }();
      $__export("ProtoElementInjector", ProtoElementInjector);
      _ProtoElementInjectorInlineStrategy = function() {
        function _ProtoElementInjectorInlineStrategy(protoEI, bd) {
          this._binding0 = null;
          this._binding1 = null;
          this._binding2 = null;
          this._binding3 = null;
          this._binding4 = null;
          this._binding5 = null;
          this._binding6 = null;
          this._binding7 = null;
          this._binding8 = null;
          this._binding9 = null;
          this._keyId0 = null;
          this._keyId1 = null;
          this._keyId2 = null;
          this._keyId3 = null;
          this._keyId4 = null;
          this._keyId5 = null;
          this._keyId6 = null;
          this._keyId7 = null;
          this._keyId8 = null;
          this._keyId9 = null;
          this._visibility0 = null;
          this._visibility1 = null;
          this._visibility2 = null;
          this._visibility3 = null;
          this._visibility4 = null;
          this._visibility5 = null;
          this._visibility6 = null;
          this._visibility7 = null;
          this._visibility8 = null;
          this._visibility9 = null;
          var length = bd.length;
          if (length > 0) {
            this._binding0 = bd[0].binding;
            this._keyId0 = bd[0].getKeyId();
            this._visibility0 = bd[0].visibility;
            protoEI.eventEmitterAccessors[0] = bd[0].createEventEmitterAccessors();
            protoEI.hostActionAccessors[0] = bd[0].createHostActionAccessors();
          }
          if (length > 1) {
            this._binding1 = bd[1].binding;
            this._keyId1 = bd[1].getKeyId();
            this._visibility1 = bd[1].visibility;
            protoEI.eventEmitterAccessors[1] = bd[1].createEventEmitterAccessors();
            protoEI.hostActionAccessors[1] = bd[1].createHostActionAccessors();
          }
          if (length > 2) {
            this._binding2 = bd[2].binding;
            this._keyId2 = bd[2].getKeyId();
            this._visibility2 = bd[2].visibility;
            protoEI.eventEmitterAccessors[2] = bd[2].createEventEmitterAccessors();
            protoEI.hostActionAccessors[2] = bd[2].createHostActionAccessors();
          }
          if (length > 3) {
            this._binding3 = bd[3].binding;
            this._keyId3 = bd[3].getKeyId();
            this._visibility3 = bd[3].visibility;
            protoEI.eventEmitterAccessors[3] = bd[3].createEventEmitterAccessors();
            protoEI.hostActionAccessors[3] = bd[3].createHostActionAccessors();
          }
          if (length > 4) {
            this._binding4 = bd[4].binding;
            this._keyId4 = bd[4].getKeyId();
            this._visibility4 = bd[4].visibility;
            protoEI.eventEmitterAccessors[4] = bd[4].createEventEmitterAccessors();
            protoEI.hostActionAccessors[4] = bd[4].createHostActionAccessors();
          }
          if (length > 5) {
            this._binding5 = bd[5].binding;
            this._keyId5 = bd[5].getKeyId();
            this._visibility5 = bd[5].visibility;
            protoEI.eventEmitterAccessors[5] = bd[5].createEventEmitterAccessors();
            protoEI.hostActionAccessors[5] = bd[5].createHostActionAccessors();
          }
          if (length > 6) {
            this._binding6 = bd[6].binding;
            this._keyId6 = bd[6].getKeyId();
            this._visibility6 = bd[6].visibility;
            protoEI.eventEmitterAccessors[6] = bd[6].createEventEmitterAccessors();
            protoEI.hostActionAccessors[6] = bd[6].createHostActionAccessors();
          }
          if (length > 7) {
            this._binding7 = bd[7].binding;
            this._keyId7 = bd[7].getKeyId();
            this._visibility7 = bd[7].visibility;
            protoEI.eventEmitterAccessors[7] = bd[7].createEventEmitterAccessors();
            protoEI.hostActionAccessors[7] = bd[7].createHostActionAccessors();
          }
          if (length > 8) {
            this._binding8 = bd[8].binding;
            this._keyId8 = bd[8].getKeyId();
            this._visibility8 = bd[8].visibility;
            protoEI.eventEmitterAccessors[8] = bd[8].createEventEmitterAccessors();
            protoEI.hostActionAccessors[8] = bd[8].createHostActionAccessors();
          }
          if (length > 9) {
            this._binding9 = bd[9].binding;
            this._keyId9 = bd[9].getKeyId();
            this._visibility9 = bd[9].visibility;
            protoEI.eventEmitterAccessors[9] = bd[9].createEventEmitterAccessors();
            protoEI.hostActionAccessors[9] = bd[9].createHostActionAccessors();
          }
        }
        return ($traceurRuntime.createClass)(_ProtoElementInjectorInlineStrategy, {
          hasBindings: function() {
            return isPresent(this._binding0);
          },
          getBindingAtIndex: function(index) {
            if (index == 0)
              return this._binding0;
            if (index == 1)
              return this._binding1;
            if (index == 2)
              return this._binding2;
            if (index == 3)
              return this._binding3;
            if (index == 4)
              return this._binding4;
            if (index == 5)
              return this._binding5;
            if (index == 6)
              return this._binding6;
            if (index == 7)
              return this._binding7;
            if (index == 8)
              return this._binding8;
            if (index == 9)
              return this._binding9;
            throw new OutOfBoundsAccess(index);
          },
          createElementInjectorStrategy: function(ei) {
            return new ElementInjectorInlineStrategy(this, ei);
          }
        }, {});
      }();
      _ProtoElementInjectorDynamicStrategy = function() {
        function _ProtoElementInjectorDynamicStrategy(protoInj, bd) {
          var len = bd.length;
          this._bindings = ListWrapper.createFixedSize(len);
          this._keyIds = ListWrapper.createFixedSize(len);
          this._visibilities = ListWrapper.createFixedSize(len);
          for (var i = 0; i < len; i++) {
            this._bindings[i] = bd[i].binding;
            this._keyIds[i] = bd[i].getKeyId();
            this._visibilities[i] = bd[i].visibility;
            protoInj.eventEmitterAccessors[i] = bd[i].createEventEmitterAccessors();
            protoInj.hostActionAccessors[i] = bd[i].createHostActionAccessors();
          }
        }
        return ($traceurRuntime.createClass)(_ProtoElementInjectorDynamicStrategy, {
          hasBindings: function() {
            return isPresent(this._bindings[0]);
          },
          getBindingAtIndex: function(index) {
            if (index < 0 || index >= this._bindings.length) {
              throw new OutOfBoundsAccess(index);
            }
            return this._bindings[index];
          },
          createElementInjectorStrategy: function(ei) {
            return new ElementInjectorDynamicStrategy(this, ei);
          }
        }, {});
      }();
      ElementInjector = function($__super) {
        function ElementInjector(_proto, parent) {
          $traceurRuntime.superConstructor(ElementInjector).call(this, parent);
          this._proto = _proto;
          this._lightDomAppInjector = null;
          this._shadowDomAppInjector = null;
          this._preBuiltObjects = null;
          this._constructionCounter = 0;
          this._strategy = _proto._strategy.createElementInjectorStrategy(this);
          this._constructionCounter = 0;
          this.hydrated = false;
          this._buildQueries();
          this._addParentQueries();
        }
        return ($traceurRuntime.createClass)(ElementInjector, {
          dehydrate: function() {
            this.hydrated = false;
            this._host = null;
            this._preBuiltObjects = null;
            this._lightDomAppInjector = null;
            this._shadowDomAppInjector = null;
            this._strategy.callOnDestroy();
            this._strategy.clearInstances();
            this._constructionCounter = 0;
          },
          onAllChangesDone: function() {
            if (isPresent(this._query0) && this._query0.originator === this) {
              this._query0.list.fireCallbacks();
            }
            if (isPresent(this._query1) && this._query1.originator === this) {
              this._query1.list.fireCallbacks();
            }
            if (isPresent(this._query2) && this._query2.originator === this) {
              this._query2.list.fireCallbacks();
            }
          },
          hydrate: function(injector, host, preBuiltObjects) {
            var p = this._proto;
            this._host = host;
            this._lightDomAppInjector = injector;
            this._preBuiltObjects = preBuiltObjects;
            if (p._firstBindingIsComponent) {
              this._shadowDomAppInjector = this._createShadowDomAppInjector(this._strategy.getComponentBinding(), injector);
            }
            this._checkShadowDomAppInjector(this._shadowDomAppInjector);
            this._strategy.hydrate();
            this._addVarBindingsToQueries();
            this.hydrated = true;
          },
          hasVariableBinding: function(name) {
            var vb = this._proto.directiveVariableBindings;
            return isPresent(vb) && vb.has(name);
          },
          getVariableBinding: function(name) {
            var index = this._proto.directiveVariableBindings.get(name);
            return isPresent(index) ? this.getDirectiveAtIndex(index) : this.getElementRef();
          },
          _createShadowDomAppInjector: function(componentDirective, appInjector) {
            if (!ListWrapper.isEmpty(componentDirective.resolvedAppInjectables)) {
              return appInjector.createChildFromResolved(componentDirective.resolvedAppInjectables);
            } else {
              return appInjector;
            }
          },
          _checkShadowDomAppInjector: function(shadowDomAppInjector) {
            if (this._proto._firstBindingIsComponent && isBlank(shadowDomAppInjector)) {
              throw new BaseException('A shadowDomAppInjector is required as this ElementInjector contains a component');
            } else if (!this._proto._firstBindingIsComponent && isPresent(shadowDomAppInjector)) {
              throw new BaseException('No shadowDomAppInjector allowed as there is not component stored in this ElementInjector');
            }
          },
          get: function(token) {
            return this._getByKey(Key.get(token), self, false, null);
          },
          hasDirective: function(type) {
            return this._strategy.getObjByKeyId(Key.get(type).id, LIGHT_DOM_AND_SHADOW_DOM) !== _undefined;
          },
          getEventEmitterAccessors: function() {
            return this._proto.eventEmitterAccessors;
          },
          getHostActionAccessors: function() {
            return this._proto.hostActionAccessors;
          },
          getDirectiveVariableBindings: function() {
            return this._proto.directiveVariableBindings;
          },
          getComponent: function() {
            return this._strategy.getComponent();
          },
          getElementRef: function() {
            return this._preBuiltObjects.view.elementRefs[this._proto.index];
          },
          getViewContainerRef: function() {
            return new ViewContainerRef(this._preBuiltObjects.viewManager, this.getElementRef());
          },
          directParent: function() {
            return this._proto.distanceToParent < 2 ? this.parent : null;
          },
          _isComponentKey: function(key) {
            return this._strategy.isComponentKey(key);
          },
          _new: function(binding) {
            if (this._constructionCounter++ > this._strategy.getMaxDirectives()) {
              throw new CyclicDependencyError(binding.key);
            }
            var factory = binding.factory;
            var deps = binding.dependencies;
            var length = deps.length;
            var d0,
                d1,
                d2,
                d3,
                d4,
                d5,
                d6,
                d7,
                d8,
                d9;
            try {
              d0 = length > 0 ? this._getByDependency(deps[0], binding.key) : null;
              d1 = length > 1 ? this._getByDependency(deps[1], binding.key) : null;
              d2 = length > 2 ? this._getByDependency(deps[2], binding.key) : null;
              d3 = length > 3 ? this._getByDependency(deps[3], binding.key) : null;
              d4 = length > 4 ? this._getByDependency(deps[4], binding.key) : null;
              d5 = length > 5 ? this._getByDependency(deps[5], binding.key) : null;
              d6 = length > 6 ? this._getByDependency(deps[6], binding.key) : null;
              d7 = length > 7 ? this._getByDependency(deps[7], binding.key) : null;
              d8 = length > 8 ? this._getByDependency(deps[8], binding.key) : null;
              d9 = length > 9 ? this._getByDependency(deps[9], binding.key) : null;
            } catch (e) {
              if (e instanceof AbstractBindingError)
                e.addKey(binding.key);
              throw e;
            }
            var obj;
            switch (length) {
              case 0:
                obj = factory();
                break;
              case 1:
                obj = factory(d0);
                break;
              case 2:
                obj = factory(d0, d1);
                break;
              case 3:
                obj = factory(d0, d1, d2);
                break;
              case 4:
                obj = factory(d0, d1, d2, d3);
                break;
              case 5:
                obj = factory(d0, d1, d2, d3, d4);
                break;
              case 6:
                obj = factory(d0, d1, d2, d3, d4, d5);
                break;
              case 7:
                obj = factory(d0, d1, d2, d3, d4, d5, d6);
                break;
              case 8:
                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7);
                break;
              case 9:
                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8);
                break;
              case 10:
                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9);
                break;
            }
            this._addToQueries(obj, binding.key.token);
            return obj;
          },
          _getByDependency: function(dep, requestor) {
            if (!(dep instanceof DirectiveDependency)) {
              return this._getByKey(dep.key, dep.visibility, dep.optional, requestor);
            }
            var dirDep = dep;
            if (isPresent(dirDep.attributeName))
              return this._buildAttribute(dirDep);
            if (isPresent(dirDep.queryDecorator))
              return this._findQuery(dirDep.queryDecorator).list;
            if (dirDep.key.id === StaticKeys.instance().changeDetectorRefId) {
              var componentView = this._preBuiltObjects.view.componentChildViews[this._proto.index];
              return componentView.changeDetector.ref;
            }
            if (dirDep.key.id === StaticKeys.instance().elementRefId) {
              return this.getElementRef();
            }
            if (dirDep.key.id === StaticKeys.instance().viewContainerId) {
              return this.getViewContainerRef();
            }
            if (dirDep.key.id === StaticKeys.instance().protoViewId) {
              if (isBlank(this._preBuiltObjects.protoView)) {
                if (dirDep.optional) {
                  return null;
                }
                throw new NoBindingError(dirDep.key);
              }
              return new ProtoViewRef(this._preBuiltObjects.protoView);
            }
            return this._getByKey(dirDep.key, dirDep.visibility, dirDep.optional, requestor);
          },
          _buildAttribute: function(dep) {
            var attributes = this._proto.attributes;
            if (isPresent(attributes) && attributes.has(dep.attributeName)) {
              return attributes.get(dep.attributeName);
            } else {
              return null;
            }
          },
          _buildQueriesForDeps: function(deps) {
            for (var i = 0; i < deps.length; i++) {
              var dep = deps[i];
              if (isPresent(dep.queryDecorator)) {
                this._createQueryRef(dep.queryDecorator);
              }
            }
          },
          _addVarBindingsToQueries: function() {
            this._addVarBindingsToQuery(this._query0);
            this._addVarBindingsToQuery(this._query1);
            this._addVarBindingsToQuery(this._query2);
          },
          _addVarBindingsToQuery: function(queryRef) {
            if (isBlank(queryRef) || !queryRef.query.isVarBindingQuery)
              return;
            var vb = queryRef.query.varBindings;
            for (var i = 0; i < vb.length; ++i) {
              if (this.hasVariableBinding(vb[i])) {
                queryRef.list.add(this.getVariableBinding(vb[i]));
              }
            }
          },
          _createQueryRef: function(query) {
            var queryList = new QueryList();
            if (isBlank(this._query0)) {
              this._query0 = new QueryRef(query, queryList, this);
            } else if (isBlank(this._query1)) {
              this._query1 = new QueryRef(query, queryList, this);
            } else if (isBlank(this._query2)) {
              this._query2 = new QueryRef(query, queryList, this);
            } else
              throw new QueryError();
          },
          _addToQueries: function(obj, token) {
            if (isPresent(this._query0) && (this._query0.query.selector === token)) {
              this._query0.list.add(obj);
            }
            if (isPresent(this._query1) && (this._query1.query.selector === token)) {
              this._query1.list.add(obj);
            }
            if (isPresent(this._query2) && (this._query2.query.selector === token)) {
              this._query2.list.add(obj);
            }
          },
          addDirectivesMatchingQuery: function(query, list) {
            this._strategy.addDirectivesMatchingQuery(query, list);
          },
          _buildQueries: function() {
            if (isPresent(this._proto)) {
              this._strategy.buildQueries();
            }
          },
          _findQuery: function(query) {
            if (isPresent(this._query0) && this._query0.query === query) {
              return this._query0;
            }
            if (isPresent(this._query1) && this._query1.query === query) {
              return this._query1;
            }
            if (isPresent(this._query2) && this._query2.query === query) {
              return this._query2;
            }
            throw new BaseException(("Cannot find query for directive " + query + "."));
          },
          _hasQuery: function(query) {
            return this._query0 == query || this._query1 == query || this._query2 == query;
          },
          link: function(parent) {
            parent.addChild(this);
            this._addParentQueries();
          },
          linkAfter: function(parent, prevSibling) {
            parent.addChildAfter(this, prevSibling);
            this._addParentQueries();
          },
          _addParentQueries: function() {
            if (isBlank(this.parent))
              return;
            if (isPresent(this.parent._query0)) {
              this._addQueryToTree(this.parent._query0);
              if (this.hydrated)
                this.parent._query0.update();
            }
            if (isPresent(this.parent._query1)) {
              this._addQueryToTree(this.parent._query1);
              if (this.hydrated)
                this.parent._query1.update();
            }
            if (isPresent(this.parent._query2)) {
              this._addQueryToTree(this.parent._query2);
              if (this.hydrated)
                this.parent._query2.update();
            }
          },
          unlink: function() {
            var queriesToUpdate = [];
            if (isPresent(this.parent._query0)) {
              this._pruneQueryFromTree(this.parent._query0);
              queriesToUpdate.push(this.parent._query0);
            }
            if (isPresent(this.parent._query1)) {
              this._pruneQueryFromTree(this.parent._query1);
              queriesToUpdate.push(this.parent._query1);
            }
            if (isPresent(this.parent._query2)) {
              this._pruneQueryFromTree(this.parent._query2);
              queriesToUpdate.push(this.parent._query2);
            }
            this.remove();
            ListWrapper.forEach(queriesToUpdate, function(q) {
              return q.update();
            });
          },
          _pruneQueryFromTree: function(query) {
            this._removeQueryRef(query);
            var child = this._head;
            while (isPresent(child)) {
              child._pruneQueryFromTree(query);
              child = child._next;
            }
          },
          _addQueryToTree: function(queryRef) {
            if (queryRef.query.descendants == false) {
              if (this == queryRef.originator) {
                this._addQueryToTreeSelfAndRecurse(queryRef);
              } else if (this.parent == queryRef.originator) {
                this._assignQueryRef(queryRef);
              }
            } else {
              this._addQueryToTreeSelfAndRecurse(queryRef);
            }
          },
          _addQueryToTreeSelfAndRecurse: function(queryRef) {
            this._assignQueryRef(queryRef);
            var child = this._head;
            while (isPresent(child)) {
              child._addQueryToTree(queryRef);
              child = child._next;
            }
          },
          _assignQueryRef: function(query) {
            if (isBlank(this._query0)) {
              this._query0 = query;
              return;
            } else if (isBlank(this._query1)) {
              this._query1 = query;
              return;
            } else if (isBlank(this._query2)) {
              this._query2 = query;
              return;
            }
            throw new QueryError();
          },
          _removeQueryRef: function(query) {
            if (this._query0 == query)
              this._query0 = null;
            if (this._query1 == query)
              this._query1 = null;
            if (this._query2 == query)
              this._query2 = null;
          },
          _getByKey: function(key, visibility, optional, requestor) {
            var ei = this;
            var currentVisibility = this._isComponentKey(requestor) ? LIGHT_DOM_AND_SHADOW_DOM : LIGHT_DOM;
            var depth = visibility.depth;
            if (!visibility.includeSelf) {
              depth -= ei._proto.distanceToParent;
              if (isPresent(ei._parent)) {
                ei = ei._parent;
              } else {
                ei = ei._host;
                currentVisibility = visibility.crossComponentBoundaries ? LIGHT_DOM : SHADOW_DOM;
              }
            }
            while (ei != null && depth >= 0) {
              var preBuiltObj = ei._getPreBuiltObjectByKeyId(key.id);
              if (preBuiltObj !== _undefined)
                return preBuiltObj;
              var dir = ei._getObjByKeyId(key.id, currentVisibility);
              if (dir !== _undefined)
                return dir;
              depth -= ei._proto.distanceToParent;
              if (currentVisibility === SHADOW_DOM)
                break;
              if (isPresent(ei._parent)) {
                ei = ei._parent;
              } else {
                ei = ei._host;
                currentVisibility = visibility.crossComponentBoundaries ? LIGHT_DOM : SHADOW_DOM;
              }
            }
            if (isPresent(this._host) && this._host._isComponentKey(key)) {
              return this._host.getComponent();
            } else if (optional) {
              return this._appInjector(requestor).getOptional(key);
            } else {
              return this._appInjector(requestor).get(key);
            }
          },
          _appInjector: function(requestor) {
            if (isPresent(requestor) && this._isComponentKey(requestor)) {
              return this._shadowDomAppInjector;
            } else {
              return this._lightDomAppInjector;
            }
          },
          _getPreBuiltObjectByKeyId: function(keyId) {
            var staticKeys = StaticKeys.instance();
            if (keyId === staticKeys.viewManagerId)
              return this._preBuiltObjects.viewManager;
            return _undefined;
          },
          _getObjByKeyId: function(keyId, visibility) {
            return this._strategy.getObjByKeyId(keyId, visibility);
          },
          getDirectiveAtIndex: function(index) {
            return this._strategy.getDirectiveAtIndex(index);
          },
          hasInstances: function() {
            return this._constructionCounter > 0;
          },
          getLightDomAppInjector: function() {
            return this._lightDomAppInjector;
          },
          getShadowDomAppInjector: function() {
            return this._shadowDomAppInjector;
          },
          getHost: function() {
            return this._host;
          },
          getBoundElementIndex: function() {
            return this._proto.index;
          }
        }, {}, $__super);
      }(TreeNode);
      $__export("ElementInjector", ElementInjector);
      ElementInjectorInlineStrategy = function() {
        function ElementInjectorInlineStrategy(_protoStrategy, _ei) {
          this._protoStrategy = _protoStrategy;
          this._ei = _ei;
          this._obj0 = null;
          this._obj1 = null;
          this._obj2 = null;
          this._obj3 = null;
          this._obj4 = null;
          this._obj5 = null;
          this._obj6 = null;
          this._obj7 = null;
          this._obj8 = null;
          this._obj9 = null;
        }
        return ($traceurRuntime.createClass)(ElementInjectorInlineStrategy, {
          callOnDestroy: function() {
            var p = this._protoStrategy;
            if (p._binding0 instanceof DirectiveBinding && p._binding0.callOnDestroy) {
              this._obj0.onDestroy();
            }
            if (p._binding1 instanceof DirectiveBinding && p._binding1.callOnDestroy) {
              this._obj1.onDestroy();
            }
            if (p._binding2 instanceof DirectiveBinding && p._binding2.callOnDestroy) {
              this._obj2.onDestroy();
            }
            if (p._binding3 instanceof DirectiveBinding && p._binding3.callOnDestroy) {
              this._obj3.onDestroy();
            }
            if (p._binding4 instanceof DirectiveBinding && p._binding4.callOnDestroy) {
              this._obj4.onDestroy();
            }
            if (p._binding5 instanceof DirectiveBinding && p._binding5.callOnDestroy) {
              this._obj5.onDestroy();
            }
            if (p._binding6 instanceof DirectiveBinding && p._binding6.callOnDestroy) {
              this._obj6.onDestroy();
            }
            if (p._binding7 instanceof DirectiveBinding && p._binding7.callOnDestroy) {
              this._obj7.onDestroy();
            }
            if (p._binding8 instanceof DirectiveBinding && p._binding8.callOnDestroy) {
              this._obj8.onDestroy();
            }
            if (p._binding9 instanceof DirectiveBinding && p._binding9.callOnDestroy) {
              this._obj9.onDestroy();
            }
          },
          clearInstances: function() {
            this._obj0 = null;
            this._obj1 = null;
            this._obj2 = null;
            this._obj3 = null;
            this._obj4 = null;
            this._obj5 = null;
            this._obj6 = null;
            this._obj7 = null;
            this._obj8 = null;
            this._obj9 = null;
          },
          hydrate: function() {
            var p = this._protoStrategy;
            var e = this._ei;
            if (isPresent(p._keyId0) && isBlank(this._obj0))
              this._obj0 = e._new(p._binding0);
            if (isPresent(p._keyId1) && isBlank(this._obj1))
              this._obj1 = e._new(p._binding1);
            if (isPresent(p._keyId2) && isBlank(this._obj2))
              this._obj2 = e._new(p._binding2);
            if (isPresent(p._keyId3) && isBlank(this._obj3))
              this._obj3 = e._new(p._binding3);
            if (isPresent(p._keyId4) && isBlank(this._obj4))
              this._obj4 = e._new(p._binding4);
            if (isPresent(p._keyId5) && isBlank(this._obj5))
              this._obj5 = e._new(p._binding5);
            if (isPresent(p._keyId6) && isBlank(this._obj6))
              this._obj6 = e._new(p._binding6);
            if (isPresent(p._keyId7) && isBlank(this._obj7))
              this._obj7 = e._new(p._binding7);
            if (isPresent(p._keyId8) && isBlank(this._obj8))
              this._obj8 = e._new(p._binding8);
            if (isPresent(p._keyId9) && isBlank(this._obj9))
              this._obj9 = e._new(p._binding9);
          },
          getComponent: function() {
            return this._obj0;
          },
          isComponentKey: function(key) {
            return this._ei._proto._firstBindingIsComponent && isPresent(key) && key.id === this._protoStrategy._keyId0;
          },
          buildQueries: function() {
            var p = this._protoStrategy;
            if (p._binding0 instanceof DirectiveBinding) {
              this._ei._buildQueriesForDeps(p._binding0.dependencies);
            }
            if (p._binding1 instanceof DirectiveBinding) {
              this._ei._buildQueriesForDeps(p._binding1.dependencies);
            }
            if (p._binding2 instanceof DirectiveBinding) {
              this._ei._buildQueriesForDeps(p._binding2.dependencies);
            }
            if (p._binding3 instanceof DirectiveBinding) {
              this._ei._buildQueriesForDeps(p._binding3.dependencies);
            }
            if (p._binding4 instanceof DirectiveBinding) {
              this._ei._buildQueriesForDeps(p._binding4.dependencies);
            }
            if (p._binding5 instanceof DirectiveBinding) {
              this._ei._buildQueriesForDeps(p._binding5.dependencies);
            }
            if (p._binding6 instanceof DirectiveBinding) {
              this._ei._buildQueriesForDeps(p._binding6.dependencies);
            }
            if (p._binding7 instanceof DirectiveBinding) {
              this._ei._buildQueriesForDeps(p._binding7.dependencies);
            }
            if (p._binding8 instanceof DirectiveBinding) {
              this._ei._buildQueriesForDeps(p._binding8.dependencies);
            }
            if (p._binding9 instanceof DirectiveBinding) {
              this._ei._buildQueriesForDeps(p._binding9.dependencies);
            }
          },
          addDirectivesMatchingQuery: function(query, list) {
            var p = this._protoStrategy;
            if (isPresent(p._binding0) && p._binding0.key.token === query.selector)
              list.push(this._obj0);
            if (isPresent(p._binding1) && p._binding1.key.token === query.selector)
              list.push(this._obj1);
            if (isPresent(p._binding2) && p._binding2.key.token === query.selector)
              list.push(this._obj2);
            if (isPresent(p._binding3) && p._binding3.key.token === query.selector)
              list.push(this._obj3);
            if (isPresent(p._binding4) && p._binding4.key.token === query.selector)
              list.push(this._obj4);
            if (isPresent(p._binding5) && p._binding5.key.token === query.selector)
              list.push(this._obj5);
            if (isPresent(p._binding6) && p._binding6.key.token === query.selector)
              list.push(this._obj6);
            if (isPresent(p._binding7) && p._binding7.key.token === query.selector)
              list.push(this._obj7);
            if (isPresent(p._binding8) && p._binding8.key.token === query.selector)
              list.push(this._obj8);
            if (isPresent(p._binding9) && p._binding9.key.token === query.selector)
              list.push(this._obj9);
          },
          getObjByKeyId: function(keyId, visibility) {
            var p = this._protoStrategy;
            if (p._keyId0 === keyId && (p._visibility0 & visibility) > 0) {
              if (isBlank(this._obj0)) {
                this._obj0 = this._ei._new(p._binding0);
              }
              return this._obj0;
            }
            if (p._keyId1 === keyId && (p._visibility1 & visibility) > 0) {
              if (isBlank(this._obj1)) {
                this._obj1 = this._ei._new(p._binding1);
              }
              return this._obj1;
            }
            if (p._keyId2 === keyId && (p._visibility2 & visibility) > 0) {
              if (isBlank(this._obj2)) {
                this._obj2 = this._ei._new(p._binding2);
              }
              return this._obj2;
            }
            if (p._keyId3 === keyId && (p._visibility3 & visibility) > 0) {
              if (isBlank(this._obj3)) {
                this._obj3 = this._ei._new(p._binding3);
              }
              return this._obj3;
            }
            if (p._keyId4 === keyId && (p._visibility4 & visibility) > 0) {
              if (isBlank(this._obj4)) {
                this._obj4 = this._ei._new(p._binding4);
              }
              return this._obj4;
            }
            if (p._keyId5 === keyId && (p._visibility5 & visibility) > 0) {
              if (isBlank(this._obj5)) {
                this._obj5 = this._ei._new(p._binding5);
              }
              return this._obj5;
            }
            if (p._keyId6 === keyId && (p._visibility6 & visibility) > 0) {
              if (isBlank(this._obj6)) {
                this._obj6 = this._ei._new(p._binding6);
              }
              return this._obj6;
            }
            if (p._keyId7 === keyId && (p._visibility7 & visibility) > 0) {
              if (isBlank(this._obj7)) {
                this._obj7 = this._ei._new(p._binding7);
              }
              return this._obj7;
            }
            if (p._keyId8 === keyId && (p._visibility8 & visibility) > 0) {
              if (isBlank(this._obj8)) {
                this._obj8 = this._ei._new(p._binding8);
              }
              return this._obj8;
            }
            if (p._keyId9 === keyId && (p._visibility9 & visibility) > 0) {
              if (isBlank(this._obj9)) {
                this._obj9 = this._ei._new(p._binding9);
              }
              return this._obj9;
            }
            return _undefined;
          },
          getDirectiveAtIndex: function(index) {
            if (index == 0)
              return this._obj0;
            if (index == 1)
              return this._obj1;
            if (index == 2)
              return this._obj2;
            if (index == 3)
              return this._obj3;
            if (index == 4)
              return this._obj4;
            if (index == 5)
              return this._obj5;
            if (index == 6)
              return this._obj6;
            if (index == 7)
              return this._obj7;
            if (index == 8)
              return this._obj8;
            if (index == 9)
              return this._obj9;
            throw new OutOfBoundsAccess(index);
          },
          getComponentBinding: function() {
            return this._protoStrategy._binding0;
          },
          getMaxDirectives: function() {
            return _MAX_DIRECTIVE_CONSTRUCTION_COUNTER;
          }
        }, {});
      }();
      ElementInjectorDynamicStrategy = function() {
        function ElementInjectorDynamicStrategy(_protoStrategy, _ei) {
          this._protoStrategy = _protoStrategy;
          this._ei = _ei;
          this._objs = ListWrapper.createFixedSize(_protoStrategy._bindings.length);
        }
        return ($traceurRuntime.createClass)(ElementInjectorDynamicStrategy, {
          callOnDestroy: function() {
            var p = this._protoStrategy;
            for (var i = 0; i < p._bindings.length; i++) {
              if (p._bindings[i] instanceof DirectiveBinding && p._bindings[i].callOnDestroy) {
                this._objs[i].onDestroy();
              }
            }
          },
          clearInstances: function() {
            ListWrapper.fill(this._objs, null);
          },
          hydrate: function() {
            var p = this._protoStrategy;
            for (var i = 0; i < p._keyIds.length; i++) {
              if (isPresent(p._keyIds[i]) && isBlank(this._objs[i])) {
                this._objs[i] = this._ei._new(p._bindings[i]);
              }
            }
          },
          getComponent: function() {
            return this._objs[0];
          },
          isComponentKey: function(key) {
            return this._ei._proto._firstBindingIsComponent && isPresent(key) && key.id === this._protoStrategy._keyIds[0];
          },
          buildQueries: function() {
            var p = this._protoStrategy;
            for (var i = 0; i < p._bindings.length; i++) {
              if (p._bindings[i] instanceof DirectiveBinding) {
                this._ei._buildQueriesForDeps(p._bindings[i].dependencies);
              }
            }
          },
          addDirectivesMatchingQuery: function(query, list) {
            var p = this._protoStrategy;
            for (var i = 0; i < p._bindings.length; i++) {
              if (p._bindings[i].key.token === query.selector)
                list.push(this._objs[i]);
            }
          },
          getObjByKeyId: function(keyId, visibility) {
            var p = this._protoStrategy;
            for (var i = 0; i < p._keyIds.length; i++) {
              if (p._keyIds[i] === keyId && (p._visibilities[i] & visibility) > 0) {
                if (isBlank(this._objs[i])) {
                  this._objs[i] = this._ei._new(p._bindings[i]);
                }
                return this._objs[i];
              }
            }
            return _undefined;
          },
          getDirectiveAtIndex: function(index) {
            if (index < 0 || index >= this._objs.length) {
              throw new OutOfBoundsAccess(index);
            }
            return this._objs[index];
          },
          getComponentBinding: function() {
            return this._protoStrategy._bindings[0];
          },
          getMaxDirectives: function() {
            return this._objs.length;
          }
        }, {});
      }();
      OutOfBoundsAccess = function($__super) {
        function OutOfBoundsAccess(index) {
          $traceurRuntime.superConstructor(OutOfBoundsAccess).call(this);
          this.message = ("Index " + index + " is out-of-bounds.");
        }
        return ($traceurRuntime.createClass)(OutOfBoundsAccess, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(BaseException);
      QueryError = function($__super) {
        function QueryError() {
          $traceurRuntime.superConstructor(QueryError).call(this);
          this.message = 'Only 3 queries can be concurrently active in a template.';
        }
        return ($traceurRuntime.createClass)(QueryError, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(BaseException);
      QueryRef = function() {
        function QueryRef(query, list, originator) {
          this.query = query;
          this.list = list;
          this.originator = originator;
        }
        return ($traceurRuntime.createClass)(QueryRef, {
          update: function() {
            var aggregator = [];
            this.visit(this.originator, aggregator);
            this.list.reset(aggregator);
          },
          visit: function(inj, aggregator) {
            if (isBlank(inj) || !inj._hasQuery(this))
              return;
            if (this.query.isVarBindingQuery) {
              this._aggregateVariableBindings(inj, aggregator);
            } else {
              this._aggregateDirective(inj, aggregator);
            }
            var child = inj._head;
            while (isPresent(child)) {
              this.visit(child, aggregator);
              child = child._next;
            }
          },
          _aggregateVariableBindings: function(inj, aggregator) {
            var vb = this.query.varBindings;
            for (var i = 0; i < vb.length; ++i) {
              if (inj.hasVariableBinding(vb[i])) {
                aggregator.push(inj.getVariableBinding(vb[i]));
              }
            }
          },
          _aggregateDirective: function(inj, aggregator) {
            inj.addDirectivesMatchingQuery(this.query, aggregator);
          }
        }, {});
      }();
    }
  };
});
//# sourceMappingURL=element_injector.js.map

//# sourceMappingURL=../../../src/core/compiler/element_injector.js.map