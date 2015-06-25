System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "./path_recognizer"], function($__export) {
  "use strict";
  var RegExpWrapper,
      StringWrapper,
      isPresent,
      BaseException,
      Map,
      MapWrapper,
      PathRecognizer,
      RouteRecognizer,
      RouteMatch;
  return {
    setters: [function($__m) {
      RegExpWrapper = $__m.RegExpWrapper;
      StringWrapper = $__m.StringWrapper;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
    }, function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      PathRecognizer = $__m.PathRecognizer;
    }],
    execute: function() {
      RouteRecognizer = function() {
        function RouteRecognizer() {
          this.names = new Map();
          this.matchers = new Map();
          this.redirects = new Map();
        }
        return ($traceurRuntime.createClass)(RouteRecognizer, {
          addRedirect: function(path, target) {
            if (path == '/') {
              path = '';
            }
            this.redirects.set(path, target);
          },
          addConfig: function(path, handler) {
            var alias = arguments[2] !== (void 0) ? arguments[2] : null;
            var recognizer = new PathRecognizer(path, handler);
            MapWrapper.forEach(this.matchers, function(matcher, _) {
              if (recognizer.regex.toString() == matcher.regex.toString()) {
                throw new BaseException(("Configuration '" + path + "' conflicts with existing route '" + matcher.path + "'"));
              }
            });
            this.matchers.set(recognizer.regex, recognizer);
            if (isPresent(alias)) {
              this.names.set(alias, recognizer);
            }
            return recognizer.terminal;
          },
          recognize: function(url) {
            var solutions = [];
            if (url.length > 0 && url[url.length - 1] == '/') {
              url = url.substring(0, url.length - 1);
            }
            MapWrapper.forEach(this.redirects, function(target, path) {
              if (path == '/' || path == '') {
                if (path == url) {
                  url = target;
                }
              } else if (StringWrapper.startsWith(url, path)) {
                url = target + StringWrapper.substring(url, path.length);
              }
            });
            MapWrapper.forEach(this.matchers, function(pathRecognizer, regex) {
              var match;
              if (isPresent(match = RegExpWrapper.firstMatch(regex, url))) {
                var matchedUrl = '/';
                var unmatchedUrl = '';
                if (url != '/') {
                  matchedUrl = match[0];
                  unmatchedUrl = StringWrapper.substring(url, match[0].length);
                }
                solutions.push(new RouteMatch({
                  specificity: pathRecognizer.specificity,
                  handler: pathRecognizer.handler,
                  params: pathRecognizer.parseParams(url),
                  matchedUrl: matchedUrl,
                  unmatchedUrl: unmatchedUrl
                }));
              }
            });
            return solutions;
          },
          hasRoute: function(name) {
            return this.names.has(name);
          },
          generate: function(name, params) {
            var pathRecognizer = this.names.get(name);
            return isPresent(pathRecognizer) ? pathRecognizer.generate(params) : null;
          }
        }, {});
      }();
      $__export("RouteRecognizer", RouteRecognizer);
      RouteMatch = function() {
        function RouteMatch() {
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              specificity = $__1.specificity,
              handler = $__1.handler,
              params = $__1.params,
              matchedUrl = $__1.matchedUrl,
              unmatchedUrl = $__1.unmatchedUrl;
          this.specificity = specificity;
          this.handler = handler;
          this.params = params;
          this.matchedUrl = matchedUrl;
          this.unmatchedUrl = unmatchedUrl;
        }
        return ($traceurRuntime.createClass)(RouteMatch, {}, {});
      }();
      $__export("RouteMatch", RouteMatch);
    }
  };
});
//# sourceMappingURL=route_recognizer.js.map

//# sourceMappingURL=../../src/router/route_recognizer.js.map