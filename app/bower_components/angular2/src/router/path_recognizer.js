System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "./url"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      RegExpWrapper,
      StringWrapper,
      isPresent,
      BaseException,
      normalizeBlank,
      StringMapWrapper,
      ListWrapper,
      IMPLEMENTS,
      escapeRegex,
      Segment,
      ContinuationSegment,
      StaticSegment,
      DynamicSegment,
      StarSegment,
      paramMatcher,
      wildcardMatcher,
      PathRecognizer;
  function parsePathString(route) {
    if (StringWrapper.startsWith(route, "/")) {
      route = StringWrapper.substring(route, 1);
    }
    var segments = splitBySlash(route);
    var results = [];
    var specificity = 0;
    if (segments.length > 98) {
      throw new BaseException(("'" + route + "' has more than the maximum supported number of segments."));
    }
    var limit = segments.length - 1;
    for (var i = 0; i <= limit; i++) {
      var segment = segments[i],
          match = void 0;
      if (isPresent(match = RegExpWrapper.firstMatch(paramMatcher, segment))) {
        results.push(new DynamicSegment(match[1]));
        specificity += (100 - i);
      } else if (isPresent(match = RegExpWrapper.firstMatch(wildcardMatcher, segment))) {
        results.push(new StarSegment(match[1]));
      } else if (segment == '...') {
        if (i < limit) {
          throw new BaseException(("Unexpected \"...\" before the end of the path for \"" + route + "\"."));
        }
        results.push(new ContinuationSegment());
      } else if (segment.length > 0) {
        results.push(new StaticSegment(segment));
        specificity += 100 * (100 - i);
      }
    }
    return {
      segments: results,
      specificity: specificity
    };
  }
  function splitBySlash(url) {
    return url.split('/');
  }
  return {
    setters: [function($__m) {
      RegExpWrapper = $__m.RegExpWrapper;
      StringWrapper = $__m.StringWrapper;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      normalizeBlank = $__m.normalizeBlank;
      IMPLEMENTS = $__m.IMPLEMENTS;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      escapeRegex = $__m.escapeRegex;
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
      Segment = function() {
        function Segment() {}
        return ($traceurRuntime.createClass)(Segment, {}, {});
      }();
      $__export("Segment", Segment);
      ContinuationSegment = function($__super) {
        function ContinuationSegment() {
          $traceurRuntime.superConstructor(ContinuationSegment).apply(this, arguments);
        }
        return ($traceurRuntime.createClass)(ContinuationSegment, {generate: function(params) {
            return '';
          }}, {}, $__super);
      }(Segment);
      $__export("ContinuationSegment", ContinuationSegment);
      StaticSegment = function($__super) {
        function StaticSegment(string) {
          $traceurRuntime.superConstructor(StaticSegment).call(this);
          this.string = string;
          this.name = '';
          this.regex = escapeRegex(string);
        }
        return ($traceurRuntime.createClass)(StaticSegment, {generate: function(params) {
            return this.string;
          }}, {}, $__super);
      }(Segment);
      DynamicSegment = ($traceurRuntime.createClass)(function(name) {
        this.name = name;
        this.regex = "([^/]+)";
      }, {generate: function(params) {
          if (!StringMapWrapper.contains(params, this.name)) {
            throw new BaseException(("Route generator for '" + this.name + "' was not included in parameters passed."));
          }
          return normalizeBlank(StringMapWrapper.get(params, this.name));
        }}, {});
      DynamicSegment = __decorate([IMPLEMENTS(Segment), __metadata('design:paramtypes', [String])], DynamicSegment);
      StarSegment = function() {
        function StarSegment(name) {
          this.name = name;
          this.regex = "(.+)";
        }
        return ($traceurRuntime.createClass)(StarSegment, {generate: function(params) {
            return normalizeBlank(StringMapWrapper.get(params, this.name));
          }}, {});
      }();
      paramMatcher = RegExpWrapper.create("^:([^\/]+)$");
      wildcardMatcher = RegExpWrapper.create("^\\*([^\/]+)$");
      PathRecognizer = function() {
        function PathRecognizer(path, handler) {
          var $__0 = this;
          this.path = path;
          this.handler = handler;
          this.terminal = true;
          this.segments = [];
          var parsed = parsePathString(path);
          var specificity = parsed['specificity'];
          var segments = parsed['segments'];
          var regexString = '^';
          ListWrapper.forEach(segments, function(segment) {
            if (segment instanceof ContinuationSegment) {
              $__0.terminal = false;
            } else {
              regexString += '/' + segment.regex;
            }
          });
          if (this.terminal) {
            regexString += '$';
          }
          this.regex = RegExpWrapper.create(regexString);
          this.segments = segments;
          this.specificity = specificity;
        }
        return ($traceurRuntime.createClass)(PathRecognizer, {
          parseParams: function(url) {
            var params = StringMapWrapper.create();
            var urlPart = url;
            for (var i = 0; i < this.segments.length; i++) {
              var segment = this.segments[i];
              if (segment instanceof ContinuationSegment) {
                continue;
              }
              var match = RegExpWrapper.firstMatch(RegExpWrapper.create('/' + segment.regex), urlPart);
              urlPart = StringWrapper.substring(urlPart, match[0].length);
              if (segment.name.length > 0) {
                StringMapWrapper.set(params, segment.name, match[1]);
              }
            }
            return params;
          },
          generate: function(params) {
            return ListWrapper.join(ListWrapper.map(this.segments, function(segment) {
              return '/' + segment.generate(params);
            }), '');
          }
        }, {});
      }();
      $__export("PathRecognizer", PathRecognizer);
    }
  };
});
//# sourceMappingURL=path_recognizer.js.map

//# sourceMappingURL=../../src/router/path_recognizer.js.map