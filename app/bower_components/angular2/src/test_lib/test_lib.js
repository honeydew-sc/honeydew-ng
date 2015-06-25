System.register(["angular2/src/dom/dom_adapter", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/di", "./test_injector"], function($__export) {
  "use strict";
  var DOM,
      StringMapWrapper,
      global,
      bind,
      createTestInjector,
      FunctionWithParamTokens,
      inject,
      _global,
      afterEach,
      expect,
      IS_DARTIUM,
      AsyncTestCompleter,
      jsmBeforeEach,
      jsmDescribe,
      jsmDDescribe,
      jsmXDescribe,
      jsmIt,
      jsmIIt,
      jsmXIt,
      runnerStack,
      inIt,
      testBindings,
      BeforeEachRunner,
      SpyObject;
  function proxy() {}
  function _describe(jsmFn) {
    for (var args = [],
        $__1 = 1; $__1 < arguments.length; $__1++)
      args[$__1 - 1] = arguments[$__1];
    var parentRunner = runnerStack.length === 0 ? null : runnerStack[runnerStack.length - 1];
    var runner = new BeforeEachRunner(parentRunner);
    runnerStack.push(runner);
    var suite = jsmFn.apply((void 0), $traceurRuntime.spread(args));
    runnerStack.pop();
    return suite;
  }
  function describe() {
    for (var args = [],
        $__2 = 0; $__2 < arguments.length; $__2++)
      args[$__2] = arguments[$__2];
    return _describe.apply((void 0), $traceurRuntime.spread([jsmDescribe], args));
  }
  function ddescribe() {
    for (var args = [],
        $__3 = 0; $__3 < arguments.length; $__3++)
      args[$__3] = arguments[$__3];
    return _describe.apply((void 0), $traceurRuntime.spread([jsmDDescribe], args));
  }
  function xdescribe() {
    for (var args = [],
        $__4 = 0; $__4 < arguments.length; $__4++)
      args[$__4] = arguments[$__4];
    return _describe.apply((void 0), $traceurRuntime.spread([jsmXDescribe], args));
  }
  function beforeEach(fn) {
    if (runnerStack.length > 0) {
      var runner = runnerStack[runnerStack.length - 1];
      if (!(fn instanceof FunctionWithParamTokens)) {
        fn = inject([], fn);
      }
      runner.beforeEach(fn);
    } else {
      jsmBeforeEach(fn);
    }
  }
  function beforeEachBindings(fn) {
    jsmBeforeEach(function() {
      var bindings = fn();
      if (!bindings)
        return;
      testBindings = $traceurRuntime.spread(testBindings, bindings);
    });
  }
  function _it(jsmFn, name, fn) {
    var runner = runnerStack[runnerStack.length - 1];
    jsmFn(name, function(done) {
      var async = false;
      var completerBinding = bind(AsyncTestCompleter).toFactory(function() {
        if (!inIt)
          throw new Error('AsyncTestCompleter can only be injected in an "it()"');
        async = true;
        return new AsyncTestCompleter(done);
      });
      var injector = createTestInjector($traceurRuntime.spread(testBindings, [completerBinding]));
      runner.run(injector);
      if (!(fn instanceof FunctionWithParamTokens)) {
        fn = inject([], fn);
      }
      inIt = true;
      fn.execute(injector);
      inIt = false;
      if (!async)
        done();
    });
  }
  function it(name, fn) {
    return _it(jsmIt, name, fn);
  }
  function xit(name, fn) {
    return _it(jsmXIt, name, fn);
  }
  function iit(name, fn) {
    return _it(jsmIIt, name, fn);
  }
  function elementText(n) {
    var hasNodes = function(n) {
      var children = DOM.childNodes(n);
      return children && children.length > 0;
    };
    if (n instanceof Array) {
      return n.map(function(nn) {
        return elementText(nn);
      }).join("");
    }
    if (DOM.isCommentNode(n)) {
      return '';
    }
    if (DOM.isElementNode(n) && DOM.tagName(n) == 'CONTENT') {
      return elementText(Array.prototype.slice.apply(DOM.getDistributedNodes(n)));
    }
    if (DOM.hasShadowRoot(n)) {
      return elementText(DOM.childNodesAsList(DOM.getShadowRoot(n)));
    }
    if (hasNodes(n)) {
      return elementText(DOM.childNodesAsList(n));
    }
    return DOM.getText(n);
  }
  function isInInnerZone() {
    return global.zone._innerZone === true;
  }
  $__export("proxy", proxy);
  $__export("describe", describe);
  $__export("ddescribe", ddescribe);
  $__export("xdescribe", xdescribe);
  $__export("beforeEach", beforeEach);
  $__export("beforeEachBindings", beforeEachBindings);
  $__export("it", it);
  $__export("xit", xit);
  $__export("iit", iit);
  $__export("isInInnerZone", isInInnerZone);
  return {
    setters: [function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      global = $__m.global;
    }, function($__m) {
      bind = $__m.bind;
    }, function($__m) {
      createTestInjector = $__m.createTestInjector;
      FunctionWithParamTokens = $__m.FunctionWithParamTokens;
      inject = $__m.inject;
      $__export("inject", $__m.inject);
    }],
    execute: function() {
      _global = (typeof window === 'undefined' ? global : window);
      afterEach = _global.afterEach;
      $__export("afterEach", afterEach);
      expect = _global.expect;
      $__export("expect", expect);
      IS_DARTIUM = false;
      $__export("IS_DARTIUM", IS_DARTIUM);
      AsyncTestCompleter = function() {
        function AsyncTestCompleter(done) {
          this._done = done;
        }
        return ($traceurRuntime.createClass)(AsyncTestCompleter, {done: function() {
            this._done();
          }}, {});
      }();
      $__export("AsyncTestCompleter", AsyncTestCompleter);
      jsmBeforeEach = _global.beforeEach;
      jsmDescribe = _global.describe;
      jsmDDescribe = _global.fdescribe;
      jsmXDescribe = _global.xdescribe;
      jsmIt = _global.it;
      jsmIIt = _global.fit;
      jsmXIt = _global.xit;
      runnerStack = [];
      inIt = false;
      BeforeEachRunner = function() {
        function BeforeEachRunner(parent) {
          this._fns = [];
          this._parent = parent;
        }
        return ($traceurRuntime.createClass)(BeforeEachRunner, {
          beforeEach: function(fn) {
            this._fns.push(fn);
          },
          run: function(injector) {
            if (this._parent)
              this._parent.run(injector);
            this._fns.forEach(function(fn) {
              return fn.execute(injector);
            });
          }
        }, {});
      }();
      jsmBeforeEach(function() {
        testBindings = [];
      });
      Map.prototype['jasmineToString'] = function() {
        var m = this;
        if (!m) {
          return '' + m;
        }
        var res = [];
        m.forEach(function(v, k) {
          res.push((k + ":" + v));
        });
        return ("{ " + res.join(',') + " }");
      };
      _global.beforeEach(function() {
        jasmine.addMatchers({
          toEqual: function(util, customEqualityTesters) {
            return {compare: function(actual, expected) {
                return {pass: util.equals(actual, expected, [compareMap])};
              }};
            function compareMap(actual, expected) {
              if (actual instanceof Map) {
                var pass = actual.size === expected.size;
                if (pass) {
                  actual.forEach(function(v, k) {
                    pass = pass && util.equals(v, expected.get(k));
                  });
                }
                return pass;
              } else {
                return undefined;
              }
            }
          },
          toBePromise: function() {
            return {compare: function(actual, expectedClass) {
                var pass = typeof actual === 'object' && typeof actual.then === 'function';
                return {
                  pass: pass,
                  get message() {
                    return 'Expected ' + actual + ' to be a promise';
                  }
                };
              }};
          },
          toBeAnInstanceOf: function() {
            return {compare: function(actual, expectedClass) {
                var pass = typeof actual === 'object' && actual instanceof expectedClass;
                return {
                  pass: pass,
                  get message() {
                    return 'Expected ' + actual + ' to be an instance of ' + expectedClass;
                  }
                };
              }};
          },
          toHaveText: function() {
            return {compare: function(actual, expectedText) {
                var actualText = elementText(actual);
                return {
                  pass: actualText == expectedText,
                  get message() {
                    return 'Expected ' + actualText + ' to be equal to ' + expectedText;
                  }
                };
              }};
          },
          toImplement: function() {
            return {compare: function(actualObject, expectedInterface) {
                var objProps = Object.keys(actualObject.constructor.prototype);
                var intProps = Object.keys(expectedInterface.prototype);
                var missedMethods = [];
                intProps.forEach(function(k) {
                  if (!actualObject.constructor.prototype[k])
                    missedMethods.push(k);
                });
                return {
                  pass: missedMethods.length == 0,
                  get message() {
                    return 'Expected ' + actualObject + ' to have the following methods: ' + missedMethods.join(", ");
                  }
                };
              }};
          }
        });
      });
      SpyObject = function() {
        function SpyObject() {
          var type = arguments[0] !== (void 0) ? arguments[0] : null;
          if (type) {
            for (var prop in type.prototype) {
              var m = null;
              try {
                m = type.prototype[prop];
              } catch (e) {}
              if (typeof m === 'function') {
                this.spy(prop);
              }
            }
          }
        }
        return ($traceurRuntime.createClass)(SpyObject, {
          noSuchMethod: function(args) {},
          spy: function(name) {
            if (!this[name]) {
              this[name] = this._createGuinnessCompatibleSpy(name);
            }
            return this[name];
          },
          rttsAssert: function(value) {
            return true;
          },
          _createGuinnessCompatibleSpy: function(name) {
            var newSpy = jasmine.createSpy(name);
            newSpy.andCallFake = newSpy.and.callFake;
            newSpy.andReturn = newSpy.and.returnValue;
            newSpy.and.returnValue(null);
            return newSpy;
          }
        }, {stub: function() {
            var object = arguments[0] !== (void 0) ? arguments[0] : null;
            var config = arguments[1] !== (void 0) ? arguments[1] : null;
            var overrides = arguments[2] !== (void 0) ? arguments[2] : null;
            if (!(object instanceof SpyObject)) {
              overrides = config;
              config = object;
              object = new SpyObject();
            }
            var m = StringMapWrapper.merge(config, overrides);
            StringMapWrapper.forEach(m, function(value, key) {
              object.spy(key).andReturn(value);
            });
            return object;
          }});
      }();
      $__export("SpyObject", SpyObject);
    }
  };
});
//# sourceMappingURL=test_lib.js.map

//# sourceMappingURL=../../src/test_lib/test_lib.js.map