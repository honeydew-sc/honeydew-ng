System.register([], function($__export) {
  "use strict";
  var _global,
      Type,
      BaseException,
      Math,
      Date,
      assertionsEnabled_,
      StringWrapper,
      StringJoiner,
      NumberParseError,
      NumberWrapper,
      RegExp,
      RegExpWrapper,
      RegExpMatcherWrapper,
      FunctionWrapper,
      Json,
      DateWrapper;
  function assertionsEnabled() {
    return assertionsEnabled_;
  }
  function CONST_EXPR(expr) {
    return expr;
  }
  function CONST() {
    return function(target) {
      return target;
    };
  }
  function ABSTRACT() {
    return function(t) {
      return t;
    };
  }
  function IMPLEMENTS(_) {
    return function(t) {
      return t;
    };
  }
  function isPresent(obj) {
    return obj !== undefined && obj !== null;
  }
  function isBlank(obj) {
    return obj === undefined || obj === null;
  }
  function isString(obj) {
    return typeof obj === "string";
  }
  function isFunction(obj) {
    return typeof obj === "function";
  }
  function isType(obj) {
    return isFunction(obj);
  }
  function isStringMap(obj) {
    return typeof obj === 'object' && obj !== null;
  }
  function isPromise(obj) {
    return obj instanceof _global.Promise;
  }
  function isArray(obj) {
    return Array.isArray(obj);
  }
  function stringify(token) {
    if (typeof token === 'string') {
      return token;
    }
    if (token === undefined || token === null) {
      return '' + token;
    }
    if (token.name) {
      return token.name;
    }
    return token.toString();
  }
  function looseIdentical(a, b) {
    return a === b || typeof a === "number" && typeof b === "number" && isNaN(a) && isNaN(b);
  }
  function getMapKey(value) {
    return value;
  }
  function normalizeBlank(obj) {
    return isBlank(obj) ? null : obj;
  }
  function normalizeBool(obj) {
    return isBlank(obj) ? false : obj;
  }
  function isJsObject(o) {
    return o !== null && (typeof o === "function" || typeof o === "object");
  }
  function print(obj) {
    if (obj instanceof Error) {
      console.log(obj.stack);
    } else {
      console.log(obj);
    }
  }
  $__export("assertionsEnabled", assertionsEnabled);
  $__export("CONST_EXPR", CONST_EXPR);
  $__export("CONST", CONST);
  $__export("ABSTRACT", ABSTRACT);
  $__export("IMPLEMENTS", IMPLEMENTS);
  $__export("isPresent", isPresent);
  $__export("isBlank", isBlank);
  $__export("isString", isString);
  $__export("isFunction", isFunction);
  $__export("isType", isType);
  $__export("isStringMap", isStringMap);
  $__export("isPromise", isPromise);
  $__export("isArray", isArray);
  $__export("stringify", stringify);
  $__export("looseIdentical", looseIdentical);
  $__export("getMapKey", getMapKey);
  $__export("normalizeBlank", normalizeBlank);
  $__export("normalizeBool", normalizeBool);
  $__export("isJsObject", isJsObject);
  $__export("print", print);
  return {
    setters: [],
    execute: function() {
      _global = (typeof window === 'undefined' ? global : window);
      $__export("global", _global);
      Type = Function;
      $__export("Type", Type);
      BaseException = function($__super) {
        function BaseException(message) {
          $traceurRuntime.superConstructor(BaseException).call(this, message);
          this.message = message;
          this.stack = (new Error(message)).stack;
        }
        return ($traceurRuntime.createClass)(BaseException, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(Error);
      $__export("BaseException", BaseException);
      Math = _global.Math;
      $__export("Math", Math);
      Date = _global.Date;
      $__export("Date", Date);
      assertionsEnabled_ = typeof _global['assert'] !== 'undefined';
      _global.assert = function assert(condition) {
        if (assertionsEnabled_) {
          _global['assert'].call(condition);
        }
      };
      StringWrapper = function() {
        function StringWrapper() {}
        return ($traceurRuntime.createClass)(StringWrapper, {}, {
          fromCharCode: function(code) {
            return String.fromCharCode(code);
          },
          charCodeAt: function(s, index) {
            return s.charCodeAt(index);
          },
          split: function(s, regExp) {
            return s.split(regExp);
          },
          equals: function(s, s2) {
            return s === s2;
          },
          replace: function(s, from, replace) {
            return s.replace(from, replace);
          },
          replaceAll: function(s, from, replace) {
            return s.replace(from, replace);
          },
          toUpperCase: function(s) {
            return s.toUpperCase();
          },
          toLowerCase: function(s) {
            return s.toLowerCase();
          },
          startsWith: function(s, start) {
            return s.startsWith(start);
          },
          substring: function(s, start) {
            var end = arguments[2] !== (void 0) ? arguments[2] : null;
            return s.substring(start, end === null ? undefined : end);
          },
          replaceAllMapped: function(s, from, cb) {
            return s.replace(from, function() {
              for (var matches = [],
                  $__1 = 0; $__1 < arguments.length; $__1++)
                matches[$__1] = arguments[$__1];
              matches.splice(-2, 2);
              return cb(matches);
            });
          },
          contains: function(s, substr) {
            return s.indexOf(substr) != -1;
          }
        });
      }();
      $__export("StringWrapper", StringWrapper);
      StringJoiner = function() {
        function StringJoiner() {
          var parts = arguments[0] !== (void 0) ? arguments[0] : [];
          this.parts = parts;
        }
        return ($traceurRuntime.createClass)(StringJoiner, {
          add: function(part) {
            this.parts.push(part);
          },
          toString: function() {
            return this.parts.join("");
          }
        }, {});
      }();
      $__export("StringJoiner", StringJoiner);
      NumberParseError = function($__super) {
        function NumberParseError(message) {
          $traceurRuntime.superConstructor(NumberParseError).call(this);
          this.message = message;
        }
        return ($traceurRuntime.createClass)(NumberParseError, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(BaseException);
      $__export("NumberParseError", NumberParseError);
      NumberWrapper = function() {
        function NumberWrapper() {}
        return ($traceurRuntime.createClass)(NumberWrapper, {}, {
          toFixed: function(n, fractionDigits) {
            return n.toFixed(fractionDigits);
          },
          equal: function(a, b) {
            return a === b;
          },
          parseIntAutoRadix: function(text) {
            var result = parseInt(text);
            if (isNaN(result)) {
              throw new NumberParseError("Invalid integer literal when parsing " + text);
            }
            return result;
          },
          parseInt: function(text, radix) {
            if (radix == 10) {
              if (/^(\-|\+)?[0-9]+$/.test(text)) {
                return parseInt(text, radix);
              }
            } else if (radix == 16) {
              if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
                return parseInt(text, radix);
              }
            } else {
              var result = parseInt(text, radix);
              if (!isNaN(result)) {
                return result;
              }
            }
            throw new NumberParseError("Invalid integer literal when parsing " + text + " in base " + radix);
          },
          parseFloat: function(text) {
            return parseFloat(text);
          },
          get NaN() {
            return NaN;
          },
          isNaN: function(value) {
            return isNaN(value);
          },
          isInteger: function(value) {
            return Number.isInteger(value);
          }
        });
      }();
      $__export("NumberWrapper", NumberWrapper);
      RegExp = _global.RegExp;
      $__export("RegExp", RegExp);
      RegExpWrapper = function() {
        function RegExpWrapper() {}
        return ($traceurRuntime.createClass)(RegExpWrapper, {}, {
          create: function(regExpStr) {
            var flags = arguments[1] !== (void 0) ? arguments[1] : '';
            flags = flags.replace(/g/g, '');
            return new _global.RegExp(regExpStr, flags + 'g');
          },
          firstMatch: function(regExp, input) {
            regExp.lastIndex = 0;
            return regExp.exec(input);
          },
          test: function(regExp, input) {
            return regExp.test(input);
          },
          matcher: function(regExp, input) {
            regExp.lastIndex = 0;
            return {
              re: regExp,
              input: input
            };
          }
        });
      }();
      $__export("RegExpWrapper", RegExpWrapper);
      RegExpMatcherWrapper = function() {
        function RegExpMatcherWrapper() {}
        return ($traceurRuntime.createClass)(RegExpMatcherWrapper, {}, {next: function(matcher) {
            return matcher.re.exec(matcher.input);
          }});
      }();
      $__export("RegExpMatcherWrapper", RegExpMatcherWrapper);
      FunctionWrapper = function() {
        function FunctionWrapper() {}
        return ($traceurRuntime.createClass)(FunctionWrapper, {}, {apply: function(fn, posArgs) {
            return fn.apply(null, posArgs);
          }});
      }();
      $__export("FunctionWrapper", FunctionWrapper);
      Json = function() {
        function Json() {}
        return ($traceurRuntime.createClass)(Json, {}, {
          parse: function(s) {
            return _global.JSON.parse(s);
          },
          stringify: function(data) {
            return _global.JSON.stringify(data, null, 2);
          }
        });
      }();
      $__export("Json", Json);
      DateWrapper = function() {
        function DateWrapper() {}
        return ($traceurRuntime.createClass)(DateWrapper, {}, {
          fromMillis: function(ms) {
            return new Date(ms);
          },
          toMillis: function(date) {
            return date.getTime();
          },
          now: function() {
            return new Date();
          },
          toJson: function(date) {
            return date.toJSON();
          }
        });
      }();
      $__export("DateWrapper", DateWrapper);
    }
  };
});
//# sourceMappingURL=lang.js.map

//# sourceMappingURL=../../src/facade/lang.js.map