System.register(["angular2/di", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/src/dom/dom_adapter", "angular2/src/render/xhr", "./style_inliner", "./style_url_resolver"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      isBlank,
      isPresent,
      BaseException,
      isPromise,
      Map,
      ListWrapper,
      PromiseWrapper,
      DOM,
      XHR,
      StyleInliner,
      StyleUrlResolver,
      ViewLoader;
  function _insertCssTexts(element, cssTexts) {
    if (cssTexts.length == 0)
      return;
    var insertBefore = DOM.firstChild(element);
    for (var i = cssTexts.length - 1; i >= 0; i--) {
      var styleEl = DOM.createStyleElement(cssTexts[i]);
      if (isPresent(insertBefore)) {
        DOM.insertBefore(insertBefore, styleEl);
      } else {
        DOM.appendChild(element, styleEl);
      }
      insertBefore = styleEl;
    }
  }
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      isPromise = $__m.isPromise;
    }, function($__m) {
      Map = $__m.Map;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      XHR = $__m.XHR;
    }, function($__m) {
      StyleInliner = $__m.StyleInliner;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
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
      ViewLoader = ($traceurRuntime.createClass)(function(_xhr, _styleInliner, _styleUrlResolver) {
        this._xhr = _xhr;
        this._styleInliner = _styleInliner;
        this._styleUrlResolver = _styleUrlResolver;
        this._cache = new Map();
      }, {
        load: function(view) {
          var $__0 = this;
          var tplElAndStyles = [this._loadHtml(view)];
          if (isPresent(view.styles)) {
            view.styles.forEach(function(cssText) {
              var textOrPromise = $__0._resolveAndInlineCssText(cssText, view.templateAbsUrl);
              tplElAndStyles.push(textOrPromise);
            });
          }
          if (isPresent(view.styleAbsUrls)) {
            view.styleAbsUrls.forEach(function(url) {
              var promise = $__0._loadText(url).then(function(cssText) {
                return $__0._resolveAndInlineCssText(cssText, view.templateAbsUrl);
              });
              tplElAndStyles.push(promise);
            });
          }
          return PromiseWrapper.all(tplElAndStyles).then(function(res) {
            var tplEl = res[0];
            var cssTexts = ListWrapper.slice(res, 1);
            _insertCssTexts(DOM.content(tplEl), cssTexts);
            return tplEl;
          });
        },
        _loadText: function(url) {
          var response = this._cache.get(url);
          if (isBlank(response)) {
            response = PromiseWrapper.catchError(this._xhr.get(url), function(_) {
              return PromiseWrapper.reject(new BaseException(("Failed to fetch url \"" + url + "\"")), null);
            });
            this._cache.set(url, response);
          }
          return response;
        },
        _loadHtml: function(view) {
          var $__0 = this;
          var html;
          if (isPresent(view.template)) {
            html = PromiseWrapper.resolve(view.template);
          } else if (isPresent(view.templateAbsUrl)) {
            html = this._loadText(view.templateAbsUrl);
          } else {
            throw new BaseException('View should have either the templateUrl or template property set');
          }
          return html.then(function(html) {
            var tplEl = DOM.createTemplate(html);
            var styleEls = DOM.querySelectorAll(DOM.content(tplEl), 'STYLE');
            var promises = [];
            for (var i = 0; i < styleEls.length; i++) {
              var promise = $__0._resolveAndInlineElement(styleEls[i], view.templateAbsUrl);
              if (isPromise(promise)) {
                promises.push(promise);
              }
            }
            return promises.length > 0 ? PromiseWrapper.all(promises).then(function(_) {
              return tplEl;
            }) : tplEl;
          });
        },
        _resolveAndInlineElement: function(styleEl, baseUrl) {
          var textOrPromise = this._resolveAndInlineCssText(DOM.getText(styleEl), baseUrl);
          if (isPromise(textOrPromise)) {
            return textOrPromise.then(function(css) {
              DOM.setText(styleEl, css);
            });
          } else {
            DOM.setText(styleEl, textOrPromise);
            return null;
          }
        },
        _resolveAndInlineCssText: function(cssText, baseUrl) {
          cssText = this._styleUrlResolver.resolveUrls(cssText, baseUrl);
          return this._styleInliner.inlineImports(cssText, baseUrl);
        }
      }, {});
      $__export("ViewLoader", ViewLoader);
      $__export("ViewLoader", ViewLoader = __decorate([Injectable(), __metadata('design:paramtypes', [XHR, StyleInliner, StyleUrlResolver])], ViewLoader));
    }
  };
});
//# sourceMappingURL=view_loader.js.map

//# sourceMappingURL=../../../../src/render/dom/compiler/view_loader.js.map