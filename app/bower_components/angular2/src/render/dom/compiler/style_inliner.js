System.register(["angular2/di", "angular2/src/render/xhr", "angular2/src/facade/collection", "angular2/src/services/url_resolver", "./style_url_resolver", "angular2/src/facade/lang", "angular2/src/facade/async"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      XHR,
      ListWrapper,
      UrlResolver,
      StyleUrlResolver,
      isBlank,
      isPresent,
      RegExpWrapper,
      StringWrapper,
      isPromise,
      PromiseWrapper,
      StyleInliner,
      _importRe,
      _urlRe,
      _mediaQueryRe;
  function _extractUrl(importRule) {
    var match = RegExpWrapper.firstMatch(_urlRe, importRule);
    if (isBlank(match))
      return null;
    return isPresent(match[1]) ? match[1] : match[2];
  }
  function _extractMediaQuery(importRule) {
    var match = RegExpWrapper.firstMatch(_mediaQueryRe, importRule);
    if (isBlank(match))
      return null;
    var mediaQuery = match[1].trim();
    return (mediaQuery.length > 0) ? mediaQuery : null;
  }
  function _wrapInMediaRule(css, query) {
    return (isBlank(query)) ? css : ("@media " + query + " {\n" + css + "\n}");
  }
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      XHR = $__m.XHR;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      RegExpWrapper = $__m.RegExpWrapper;
      StringWrapper = $__m.StringWrapper;
      isPromise = $__m.isPromise;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
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
      StyleInliner = ($traceurRuntime.createClass)(function(_xhr, _styleUrlResolver, _urlResolver) {
        this._xhr = _xhr;
        this._styleUrlResolver = _styleUrlResolver;
        this._urlResolver = _urlResolver;
      }, {
        inlineImports: function(cssText, baseUrl) {
          return this._inlineImports(cssText, baseUrl, []);
        },
        _inlineImports: function(cssText, baseUrl, inlinedUrls) {
          var $__0 = this;
          var partIndex = 0;
          var parts = StringWrapper.split(cssText, _importRe);
          if (parts.length === 1) {
            return cssText;
          }
          var promises = [];
          while (partIndex < parts.length - 1) {
            var prefix = parts[partIndex];
            var rule = parts[partIndex + 1];
            var url = _extractUrl(rule);
            if (isPresent(url)) {
              url = this._urlResolver.resolve(baseUrl, url);
            }
            var mediaQuery = _extractMediaQuery(rule);
            var promise = void 0;
            if (isBlank(url)) {
              promise = PromiseWrapper.resolve(("/* Invalid import rule: \"@import " + rule + ";\" */"));
            } else if (ListWrapper.contains(inlinedUrls, url)) {
              promise = PromiseWrapper.resolve(prefix);
            } else {
              inlinedUrls.push(url);
              promise = PromiseWrapper.then(this._xhr.get(url), function(rawCss) {
                var inlinedCss = $__0._inlineImports(rawCss, url, inlinedUrls);
                if (isPromise(inlinedCss)) {
                  return inlinedCss.then(function(css) {
                    return prefix + $__0._transformImportedCss(css, mediaQuery, url) + '\n';
                  });
                } else {
                  return prefix + $__0._transformImportedCss(inlinedCss, mediaQuery, url) + '\n';
                }
              }, function(error) {
                return ("/* failed to import " + url + " */\n");
              });
            }
            promises.push(promise);
            partIndex += 2;
          }
          return PromiseWrapper.all(promises).then(function(cssParts) {
            var cssText = cssParts.join('');
            if (partIndex < parts.length) {
              cssText += parts[partIndex];
            }
            return cssText;
          });
        },
        _transformImportedCss: function(css, mediaQuery, url) {
          css = this._styleUrlResolver.resolveUrls(css, url);
          return _wrapInMediaRule(css, mediaQuery);
        }
      }, {});
      $__export("StyleInliner", StyleInliner);
      $__export("StyleInliner", StyleInliner = __decorate([Injectable(), __metadata('design:paramtypes', [XHR, StyleUrlResolver, UrlResolver])], StyleInliner));
      _importRe = RegExpWrapper.create('@import\\s+([^;]+);');
      _urlRe = RegExpWrapper.create('url\\(\\s*?[\'"]?([^\'")]+)[\'"]?|' + '[\'"]([^\'")]+)[\'"]');
      _mediaQueryRe = RegExpWrapper.create('[\'"][^\'"]+[\'"]\\s*\\)?\\s*(.*)');
    }
  };
});
//# sourceMappingURL=style_inliner.js.map

//# sourceMappingURL=../../../../src/render/dom/compiler/style_inliner.js.map