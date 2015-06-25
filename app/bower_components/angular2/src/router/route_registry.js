System.register(["./route_recognizer", "./instruction", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/src/facade/lang", "./route_config_impl", "angular2/src/reflection/reflection"], function($__export) {
  "use strict";
  var RouteRecognizer,
      Instruction,
      ListWrapper,
      Map,
      StringMapWrapper,
      PromiseWrapper,
      isPresent,
      isBlank,
      isType,
      isStringMap,
      BaseException,
      RouteConfig,
      reflector,
      RouteRegistry,
      ALLOWED_TARGETS,
      VALID_COMPONENT_TYPES;
  function assertValidConfig(config) {
    if (!StringMapWrapper.contains(config, 'path')) {
      throw new BaseException("Route config should contain a \"path\" property");
    }
    var targets = 0;
    ListWrapper.forEach(ALLOWED_TARGETS, function(target) {
      if (StringMapWrapper.contains(config, target)) {
        targets += 1;
      }
    });
    if (targets != 1) {
      throw new BaseException("Route config should contain exactly one 'component', or 'redirectTo' property");
    }
  }
  function normalizeComponentDeclaration(config) {
    if (isType(config)) {
      return {
        'constructor': config,
        'type': 'constructor'
      };
    } else if (isStringMap(config)) {
      if (isBlank(config['type'])) {
        throw new BaseException("Component declaration when provided as a map should include a 'type' property");
      }
      var componentType = config['type'];
      if (!ListWrapper.contains(VALID_COMPONENT_TYPES, componentType)) {
        throw new BaseException(("Invalid component type '" + componentType + "'"));
      }
      return config;
    } else {
      throw new BaseException("Component declaration should be either a Map or a Type");
    }
  }
  function componentHandlerToComponentType(handler) {
    var componentDeclaration = handler['component'],
        type = componentDeclaration['type'];
    if (type == 'constructor') {
      return PromiseWrapper.resolve(componentDeclaration['constructor']);
    } else if (type == 'loader') {
      var resolverFunction = componentDeclaration['loader'];
      return resolverFunction();
    } else {
      throw new BaseException(("Cannot extract the component type from a '" + type + "' component"));
    }
  }
  function mostSpecific(instructions) {
    var mostSpecificSolution = instructions[0];
    for (var solutionIndex = 1; solutionIndex < instructions.length; solutionIndex++) {
      var solution = instructions[solutionIndex];
      if (solution.specificity > mostSpecificSolution.specificity) {
        mostSpecificSolution = solution;
      }
    }
    return mostSpecificSolution;
  }
  function assertTerminalComponent(component, path) {
    if (!isType(component)) {
      return;
    }
    var annotations = reflector.annotations(component);
    if (isPresent(annotations)) {
      for (var i = 0; i < annotations.length; i++) {
        var annotation = annotations[i];
        if (annotation instanceof RouteConfig) {
          throw new BaseException(("Child routes are not allowed for \"" + path + "\". Use \"...\" on the parent's route path."));
        }
      }
    }
  }
  return {
    setters: [function($__m) {
      RouteRecognizer = $__m.RouteRecognizer;
    }, function($__m) {
      Instruction = $__m.Instruction;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      Map = $__m.Map;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      isType = $__m.isType;
      isStringMap = $__m.isStringMap;
      BaseException = $__m.BaseException;
    }, function($__m) {
      RouteConfig = $__m.RouteConfig;
    }, function($__m) {
      reflector = $__m.reflector;
    }],
    execute: function() {
      RouteRegistry = function() {
        function RouteRegistry() {
          this._rules = new Map();
        }
        return ($traceurRuntime.createClass)(RouteRegistry, {
          config: function(parentComponent, config) {
            assertValidConfig(config);
            var recognizer = this._rules.get(parentComponent);
            if (isBlank(recognizer)) {
              recognizer = new RouteRecognizer();
              this._rules.set(parentComponent, recognizer);
            }
            if (StringMapWrapper.contains(config, 'redirectTo')) {
              recognizer.addRedirect(config['path'], config['redirectTo']);
              return;
            }
            config = StringMapWrapper.merge(config, {'component': normalizeComponentDeclaration(config['component'])});
            var component = config['component'];
            var terminal = recognizer.addConfig(config['path'], config, config['as']);
            if (component['type'] == 'constructor') {
              if (terminal) {
                assertTerminalComponent(component['constructor'], config['path']);
              } else {
                this.configFromComponent(component['constructor']);
              }
            }
          },
          configFromComponent: function(component) {
            var $__0 = this;
            if (!isType(component)) {
              return;
            }
            if (this._rules.has(component)) {
              return;
            }
            var annotations = reflector.annotations(component);
            if (isPresent(annotations)) {
              for (var i = 0; i < annotations.length; i++) {
                var annotation = annotations[i];
                if (annotation instanceof RouteConfig) {
                  ListWrapper.forEach(annotation.configs, function(config) {
                    return $__0.config(component, config);
                  });
                }
              }
            }
          },
          recognize: function(url, parentComponent) {
            var $__0 = this;
            var componentRecognizer = this._rules.get(parentComponent);
            if (isBlank(componentRecognizer)) {
              return PromiseWrapper.resolve(null);
            }
            var possibleMatches = componentRecognizer.recognize(url);
            var matchPromises = ListWrapper.map(possibleMatches, function(candidate) {
              return $__0._completeRouteMatch(candidate);
            });
            return PromiseWrapper.all(matchPromises).then(function(solutions) {
              var fullSolutions = ListWrapper.filter(solutions, function(solution) {
                return isPresent(solution);
              });
              if (fullSolutions.length > 0) {
                return mostSpecific(fullSolutions);
              }
              return null;
            });
          },
          _completeRouteMatch: function(candidate) {
            var $__0 = this;
            return componentHandlerToComponentType(candidate.handler).then(function(componentType) {
              $__0.configFromComponent(componentType);
              if (candidate.unmatchedUrl.length == 0) {
                return new Instruction({
                  component: componentType,
                  params: candidate.params,
                  matchedUrl: candidate.matchedUrl,
                  parentSpecificity: candidate.specificity
                });
              }
              return $__0.recognize(candidate.unmatchedUrl, componentType).then(function(childInstruction) {
                if (isBlank(childInstruction)) {
                  return null;
                }
                return new Instruction({
                  component: componentType,
                  child: childInstruction,
                  params: candidate.params,
                  matchedUrl: candidate.matchedUrl,
                  parentSpecificity: candidate.specificity
                });
              });
            });
          },
          generate: function(name, params, hostComponent) {
            var componentRecognizer = this._rules.get(hostComponent);
            return isPresent(componentRecognizer) ? componentRecognizer.generate(name, params) : null;
          }
        }, {});
      }();
      $__export("RouteRegistry", RouteRegistry);
      ALLOWED_TARGETS = ['component', 'redirectTo'];
      VALID_COMPONENT_TYPES = ['constructor', 'loader'];
    }
  };
});
//# sourceMappingURL=route_registry.js.map

//# sourceMappingURL=../../src/router/route_registry.js.map