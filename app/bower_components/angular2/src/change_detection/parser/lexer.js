System.register(["angular2/src/di/decorators", "angular2/src/facade/collection", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      SetWrapper,
      NumberWrapper,
      StringJoiner,
      StringWrapper,
      BaseException,
      isPresent,
      TokenType,
      Lexer,
      Token,
      EOF,
      $EOF,
      $TAB,
      $LF,
      $VTAB,
      $FF,
      $CR,
      $SPACE,
      $BANG,
      $DQ,
      $HASH,
      $$,
      $PERCENT,
      $AMPERSAND,
      $SQ,
      $LPAREN,
      $RPAREN,
      $STAR,
      $PLUS,
      $COMMA,
      $MINUS,
      $PERIOD,
      $SLASH,
      $COLON,
      $SEMICOLON,
      $LT,
      $EQ,
      $GT,
      $QUESTION,
      $0,
      $9,
      $A,
      $E,
      $Z,
      $LBRACKET,
      $BACKSLASH,
      $RBRACKET,
      $CARET,
      $_,
      $a,
      $e,
      $f,
      $n,
      $r,
      $t,
      $u,
      $v,
      $z,
      $LBRACE,
      $BAR,
      $RBRACE,
      $NBSP,
      ScannerError,
      _Scanner,
      OPERATORS,
      KEYWORDS;
  function newCharacterToken(index, code) {
    return new Token(index, TokenType.CHARACTER, code, StringWrapper.fromCharCode(code));
  }
  function newIdentifierToken(index, text) {
    return new Token(index, TokenType.IDENTIFIER, 0, text);
  }
  function newKeywordToken(index, text) {
    return new Token(index, TokenType.KEYWORD, 0, text);
  }
  function newOperatorToken(index, text) {
    return new Token(index, TokenType.OPERATOR, 0, text);
  }
  function newStringToken(index, text) {
    return new Token(index, TokenType.STRING, 0, text);
  }
  function newNumberToken(index, n) {
    return new Token(index, TokenType.NUMBER, n, "");
  }
  function isWhitespace(code) {
    return (code >= $TAB && code <= $SPACE) || (code == $NBSP);
  }
  function isIdentifierStart(code) {
    return ($a <= code && code <= $z) || ($A <= code && code <= $Z) || (code == $_) || (code == $$);
  }
  function isIdentifierPart(code) {
    return ($a <= code && code <= $z) || ($A <= code && code <= $Z) || ($0 <= code && code <= $9) || (code == $_) || (code == $$);
  }
  function isDigit(code) {
    return $0 <= code && code <= $9;
  }
  function isExponentStart(code) {
    return code == $e || code == $E;
  }
  function isExponentSign(code) {
    return code == $MINUS || code == $PLUS;
  }
  function unescape(code) {
    switch (code) {
      case $n:
        return $LF;
      case $f:
        return $FF;
      case $r:
        return $CR;
      case $t:
        return $TAB;
      case $v:
        return $VTAB;
      default:
        return code;
    }
  }
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      SetWrapper = $__m.SetWrapper;
    }, function($__m) {
      NumberWrapper = $__m.NumberWrapper;
      StringJoiner = $__m.StringJoiner;
      StringWrapper = $__m.StringWrapper;
      BaseException = $__m.BaseException;
      isPresent = $__m.isPresent;
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
      (function(TokenType) {
        TokenType[TokenType["CHARACTER"] = 0] = "CHARACTER";
        TokenType[TokenType["IDENTIFIER"] = 1] = "IDENTIFIER";
        TokenType[TokenType["KEYWORD"] = 2] = "KEYWORD";
        TokenType[TokenType["STRING"] = 3] = "STRING";
        TokenType[TokenType["OPERATOR"] = 4] = "OPERATOR";
        TokenType[TokenType["NUMBER"] = 5] = "NUMBER";
      })(TokenType || (TokenType = {}));
      Lexer = ($traceurRuntime.createClass)(function() {}, {tokenize: function(text) {
          var scanner = new _Scanner(text);
          var tokens = [];
          var token = scanner.scanToken();
          while (token != null) {
            tokens.push(token);
            token = scanner.scanToken();
          }
          return tokens;
        }}, {});
      $__export("Lexer", Lexer);
      $__export("Lexer", Lexer = __decorate([Injectable(), __metadata('design:paramtypes', [])], Lexer));
      Token = function() {
        function Token(index, type, numValue, strValue) {
          this.index = index;
          this.type = type;
          this.numValue = numValue;
          this.strValue = strValue;
        }
        return ($traceurRuntime.createClass)(Token, {
          isCharacter: function(code) {
            return (this.type == TokenType.CHARACTER && this.numValue == code);
          },
          isNumber: function() {
            return (this.type == TokenType.NUMBER);
          },
          isString: function() {
            return (this.type == TokenType.STRING);
          },
          isOperator: function(operater) {
            return (this.type == TokenType.OPERATOR && this.strValue == operater);
          },
          isIdentifier: function() {
            return (this.type == TokenType.IDENTIFIER);
          },
          isKeyword: function() {
            return (this.type == TokenType.KEYWORD);
          },
          isKeywordVar: function() {
            return (this.type == TokenType.KEYWORD && this.strValue == "var");
          },
          isKeywordNull: function() {
            return (this.type == TokenType.KEYWORD && this.strValue == "null");
          },
          isKeywordUndefined: function() {
            return (this.type == TokenType.KEYWORD && this.strValue == "undefined");
          },
          isKeywordTrue: function() {
            return (this.type == TokenType.KEYWORD && this.strValue == "true");
          },
          isKeywordIf: function() {
            return (this.type == TokenType.KEYWORD && this.strValue == "if");
          },
          isKeywordElse: function() {
            return (this.type == TokenType.KEYWORD && this.strValue == "else");
          },
          isKeywordFalse: function() {
            return (this.type == TokenType.KEYWORD && this.strValue == "false");
          },
          toNumber: function() {
            return (this.type == TokenType.NUMBER) ? this.numValue : -1;
          },
          toString: function() {
            switch (this.type) {
              case TokenType.CHARACTER:
              case TokenType.STRING:
              case TokenType.IDENTIFIER:
              case TokenType.KEYWORD:
                return this.strValue;
              case TokenType.NUMBER:
                return this.numValue.toString();
              default:
                return null;
            }
          }
        }, {});
      }();
      $__export("Token", Token);
      EOF = new Token(-1, TokenType.CHARACTER, 0, "");
      $__export("EOF", EOF);
      $EOF = 0;
      $__export("$EOF", $EOF);
      $TAB = 9;
      $__export("$TAB", $TAB);
      $LF = 10;
      $__export("$LF", $LF);
      $VTAB = 11;
      $__export("$VTAB", $VTAB);
      $FF = 12;
      $__export("$FF", $FF);
      $CR = 13;
      $__export("$CR", $CR);
      $SPACE = 32;
      $__export("$SPACE", $SPACE);
      $BANG = 33;
      $__export("$BANG", $BANG);
      $DQ = 34;
      $__export("$DQ", $DQ);
      $HASH = 35;
      $__export("$HASH", $HASH);
      $$ = 36;
      $__export("$$", $$);
      $PERCENT = 37;
      $__export("$PERCENT", $PERCENT);
      $AMPERSAND = 38;
      $__export("$AMPERSAND", $AMPERSAND);
      $SQ = 39;
      $__export("$SQ", $SQ);
      $LPAREN = 40;
      $__export("$LPAREN", $LPAREN);
      $RPAREN = 41;
      $__export("$RPAREN", $RPAREN);
      $STAR = 42;
      $__export("$STAR", $STAR);
      $PLUS = 43;
      $__export("$PLUS", $PLUS);
      $COMMA = 44;
      $__export("$COMMA", $COMMA);
      $MINUS = 45;
      $__export("$MINUS", $MINUS);
      $PERIOD = 46;
      $__export("$PERIOD", $PERIOD);
      $SLASH = 47;
      $__export("$SLASH", $SLASH);
      $COLON = 58;
      $__export("$COLON", $COLON);
      $SEMICOLON = 59;
      $__export("$SEMICOLON", $SEMICOLON);
      $LT = 60;
      $__export("$LT", $LT);
      $EQ = 61;
      $__export("$EQ", $EQ);
      $GT = 62;
      $__export("$GT", $GT);
      $QUESTION = 63;
      $__export("$QUESTION", $QUESTION);
      $0 = 48;
      $9 = 57;
      $A = 65, $E = 69, $Z = 90;
      $LBRACKET = 91;
      $__export("$LBRACKET", $LBRACKET);
      $BACKSLASH = 92;
      $__export("$BACKSLASH", $BACKSLASH);
      $RBRACKET = 93;
      $__export("$RBRACKET", $RBRACKET);
      $CARET = 94;
      $_ = 95;
      $a = 97, $e = 101, $f = 102, $n = 110, $r = 114, $t = 116, $u = 117, $v = 118, $z = 122;
      $LBRACE = 123;
      $__export("$LBRACE", $LBRACE);
      $BAR = 124;
      $__export("$BAR", $BAR);
      $RBRACE = 125;
      $__export("$RBRACE", $RBRACE);
      $NBSP = 160;
      ScannerError = function($__super) {
        function ScannerError(message) {
          $traceurRuntime.superConstructor(ScannerError).call(this);
          this.message = message;
        }
        return ($traceurRuntime.createClass)(ScannerError, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(BaseException);
      $__export("ScannerError", ScannerError);
      _Scanner = function() {
        function _Scanner(input) {
          this.input = input;
          this.peek = 0;
          this.index = -1;
          this.length = input.length;
          this.advance();
        }
        return ($traceurRuntime.createClass)(_Scanner, {
          advance: function() {
            this.peek = ++this.index >= this.length ? $EOF : StringWrapper.charCodeAt(this.input, this.index);
          },
          scanToken: function() {
            var input = this.input,
                length = this.length,
                peek = this.peek,
                index = this.index;
            while (peek <= $SPACE) {
              if (++index >= length) {
                peek = $EOF;
                break;
              } else {
                peek = StringWrapper.charCodeAt(input, index);
              }
            }
            this.peek = peek;
            this.index = index;
            if (index >= length) {
              return null;
            }
            if (isIdentifierStart(peek))
              return this.scanIdentifier();
            if (isDigit(peek))
              return this.scanNumber(index);
            var start = index;
            switch (peek) {
              case $PERIOD:
                this.advance();
                return isDigit(this.peek) ? this.scanNumber(start) : newCharacterToken(start, $PERIOD);
              case $LPAREN:
              case $RPAREN:
              case $LBRACE:
              case $RBRACE:
              case $LBRACKET:
              case $RBRACKET:
              case $COMMA:
              case $COLON:
              case $SEMICOLON:
                return this.scanCharacter(start, peek);
              case $SQ:
              case $DQ:
                return this.scanString();
              case $HASH:
              case $PLUS:
              case $MINUS:
              case $STAR:
              case $SLASH:
              case $PERCENT:
              case $CARET:
                return this.scanOperator(start, StringWrapper.fromCharCode(peek));
              case $QUESTION:
                return this.scanComplexOperator(start, '?', $PERIOD, '.');
              case $LT:
              case $GT:
                return this.scanComplexOperator(start, StringWrapper.fromCharCode(peek), $EQ, '=');
              case $BANG:
              case $EQ:
                return this.scanComplexOperator(start, StringWrapper.fromCharCode(peek), $EQ, '=', $EQ, '=');
              case $AMPERSAND:
                return this.scanComplexOperator(start, '&', $AMPERSAND, '&');
              case $BAR:
                return this.scanComplexOperator(start, '|', $BAR, '|');
              case $NBSP:
                while (isWhitespace(this.peek))
                  this.advance();
                return this.scanToken();
            }
            this.error(("Unexpected character [" + StringWrapper.fromCharCode(peek) + "]"), 0);
            return null;
          },
          scanCharacter: function(start, code) {
            assert(this.peek == code);
            this.advance();
            return newCharacterToken(start, code);
          },
          scanOperator: function(start, str) {
            assert(this.peek == StringWrapper.charCodeAt(str, 0));
            assert(SetWrapper.has(OPERATORS, str));
            this.advance();
            return newOperatorToken(start, str);
          },
          scanComplexOperator: function(start, one, twoCode, two, threeCode, three) {
            assert(this.peek == StringWrapper.charCodeAt(one, 0));
            this.advance();
            var str = one;
            if (this.peek == twoCode) {
              this.advance();
              str += two;
            }
            if (isPresent(threeCode) && this.peek == threeCode) {
              this.advance();
              str += three;
            }
            assert(SetWrapper.has(OPERATORS, str));
            return newOperatorToken(start, str);
          },
          scanIdentifier: function() {
            assert(isIdentifierStart(this.peek));
            var start = this.index;
            this.advance();
            while (isIdentifierPart(this.peek))
              this.advance();
            var str = this.input.substring(start, this.index);
            if (SetWrapper.has(KEYWORDS, str)) {
              return newKeywordToken(start, str);
            } else {
              return newIdentifierToken(start, str);
            }
          },
          scanNumber: function(start) {
            assert(isDigit(this.peek));
            var simple = (this.index === start);
            this.advance();
            while (true) {
              if (isDigit(this.peek)) {} else if (this.peek == $PERIOD) {
                simple = false;
              } else if (isExponentStart(this.peek)) {
                this.advance();
                if (isExponentSign(this.peek))
                  this.advance();
                if (!isDigit(this.peek))
                  this.error('Invalid exponent', -1);
                simple = false;
              } else {
                break;
              }
              this.advance();
            }
            var str = this.input.substring(start, this.index);
            var value = simple ? NumberWrapper.parseIntAutoRadix(str) : NumberWrapper.parseFloat(str);
            return newNumberToken(start, value);
          },
          scanString: function() {
            assert(this.peek == $SQ || this.peek == $DQ);
            var start = this.index;
            var quote = this.peek;
            this.advance();
            var buffer;
            var marker = this.index;
            var input = this.input;
            while (this.peek != quote) {
              if (this.peek == $BACKSLASH) {
                if (buffer == null)
                  buffer = new StringJoiner();
                buffer.add(input.substring(marker, this.index));
                this.advance();
                var unescapedCode = void 0;
                if (this.peek == $u) {
                  var hex = input.substring(this.index + 1, this.index + 5);
                  try {
                    unescapedCode = NumberWrapper.parseInt(hex, 16);
                  } catch (e) {
                    this.error(("Invalid unicode escape [\\u" + hex + "]"), 0);
                  }
                  for (var i = 0; i < 5; i++) {
                    this.advance();
                  }
                } else {
                  unescapedCode = unescape(this.peek);
                  this.advance();
                }
                buffer.add(StringWrapper.fromCharCode(unescapedCode));
                marker = this.index;
              } else if (this.peek == $EOF) {
                this.error('Unterminated quote', 0);
              } else {
                this.advance();
              }
            }
            var last = input.substring(marker, this.index);
            this.advance();
            var unescaped = last;
            if (buffer != null) {
              buffer.add(last);
              unescaped = buffer.toString();
            }
            return newStringToken(start, unescaped);
          },
          error: function(message, offset) {
            var position = this.index + offset;
            throw new ScannerError(("Lexer Error: " + message + " at column " + position + " in expression [" + this.input + "]"));
          }
        }, {});
      }();
      OPERATORS = SetWrapper.createFromList(['+', '-', '*', '/', '%', '^', '=', '==', '!=', '===', '!==', '<', '>', '<=', '>=', '&&', '||', '&', '|', '!', '?', '#', '?.']);
      KEYWORDS = SetWrapper.createFromList(['var', 'null', 'undefined', 'true', 'false', 'if', 'else']);
    }
  };
});
//# sourceMappingURL=lexer.js.map

//# sourceMappingURL=../../../src/change_detection/parser/lexer.js.map