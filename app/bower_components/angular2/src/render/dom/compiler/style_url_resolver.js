System.register(["angular2/di", "angular2/src/facade/lang", "angular2/src/services/url_resolver"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      RegExpWrapper,
      StringWrapper,
      UrlResolver,
      StyleUrlResolver,
      _cssUrlRe,
      _cssImportRe,
      _quoteRe;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      RegExpWrapper = $__m.RegExpWrapper;
      StringWrapper = $__m.StringWrapper;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
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
      StyleUrlResolver = ($traceurRuntime.createClass)(function(_resolver) {
        this._resolver = _resolver;
      }, {
        resolveUrls: function(cssText, baseUrl) {
          cssText = this._replaceUrls(cssText, _cssUrlRe, baseUrl);
          cssText = this._replaceUrls(cssText, _cssImportRe, baseUrl);
          return cssText;
        },
        _replaceUrls: function(cssText, re, baseUrl) {
          var $__0 = this;
          return StringWrapper.replaceAllMapped(cssText, re, function(m) {
            var pre = m[1];
            var url = StringWrapper.replaceAll(m[2], _quoteRe, '');
            var post = m[3];
            var resolvedUrl = $__0._resolver.resolve(baseUrl, url);
            return pre + "'" + resolvedUrl + "'" + post;
          });
        }
      }, {});
      $__export("StyleUrlResolver", StyleUrlResolver);
      $__export("StyleUrlResolver", StyleUrlResolver = __decorate([Injectable(), __metadata('design:paramtypes', [UrlResolver])], StyleUrlResolver));
      _cssUrlRe = RegExpWrapper.create('(url\\()([^)]*)(\\))');
      _cssImportRe = RegExpWrapper.create('(@import[\\s]+(?!url\\())[\'"]([^\'"]*)[\'"](.*;)');
      _quoteRe = RegExpWrapper.create('[\'"]');
    }
  };
});
//# sourceMappingURL=style_url_resolver.js.map

//# sourceMappingURL=../../../../src/render/dom/compiler/style_url_resolver.js.map