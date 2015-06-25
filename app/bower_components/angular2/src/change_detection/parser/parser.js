System.register(["angular2/src/di/decorators", "angular2/src/facade/lang", "angular2/src/facade/collection", "./lexer", "angular2/src/reflection/reflection", "./ast"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      isBlank,
      isPresent,
      BaseException,
      StringWrapper,
      RegExpWrapper,
      ListWrapper,
      Lexer,
      EOF,
      $PERIOD,
      $COLON,
      $SEMICOLON,
      $LBRACKET,
      $RBRACKET,
      $COMMA,
      $LBRACE,
      $RBRACE,
      $LPAREN,
      $RPAREN,
      reflector,
      Reflector,
      EmptyExpr,
      ImplicitReceiver,
      AccessMember,
      SafeAccessMember,
      LiteralPrimitive,
      Binary,
      PrefixNot,
      Conditional,
      If,
      BindingPipe,
      Assignment,
      Chain,
      KeyedAccess,
      LiteralArray,
      LiteralMap,
      Interpolation,
      MethodCall,
      SafeMethodCall,
      FunctionCall,
      TemplateBinding,
      ASTWithSource,
      _implicitReceiver,
      INTERPOLATION_REGEXP,
      Parser,
      _ParseAST,
      SimpleExpressionChecker;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      StringWrapper = $__m.StringWrapper;
      RegExpWrapper = $__m.RegExpWrapper;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      Lexer = $__m.Lexer;
      EOF = $__m.EOF;
      $PERIOD = $__m.$PERIOD;
      $COLON = $__m.$COLON;
      $SEMICOLON = $__m.$SEMICOLON;
      $LBRACKET = $__m.$LBRACKET;
      $RBRACKET = $__m.$RBRACKET;
      $COMMA = $__m.$COMMA;
      $LBRACE = $__m.$LBRACE;
      $RBRACE = $__m.$RBRACE;
      $LPAREN = $__m.$LPAREN;
      $RPAREN = $__m.$RPAREN;
    }, function($__m) {
      reflector = $__m.reflector;
      Reflector = $__m.Reflector;
    }, function($__m) {
      EmptyExpr = $__m.EmptyExpr;
      ImplicitReceiver = $__m.ImplicitReceiver;
      AccessMember = $__m.AccessMember;
      SafeAccessMember = $__m.SafeAccessMember;
      LiteralPrimitive = $__m.LiteralPrimitive;
      Binary = $__m.Binary;
      PrefixNot = $__m.PrefixNot;
      Conditional = $__m.Conditional;
      If = $__m.If;
      BindingPipe = $__m.BindingPipe;
      Assignment = $__m.Assignment;
      Chain = $__m.Chain;
      KeyedAccess = $__m.KeyedAccess;
      LiteralArray = $__m.LiteralArray;
      LiteralMap = $__m.LiteralMap;
      Interpolation = $__m.Interpolation;
      MethodCall = $__m.MethodCall;
      SafeMethodCall = $__m.SafeMethodCall;
      FunctionCall = $__m.FunctionCall;
      TemplateBinding = $__m.TemplateBinding;
      ASTWithSource = $__m.ASTWithSource;
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
      _implicitReceiver = new ImplicitReceiver();
      INTERPOLATION_REGEXP = RegExpWrapper.create('\\{\\{(.*?)\\}\\}');
      Parser = ($traceurRuntime.createClass)(function(_lexer) {
        var providedReflector = arguments[1] !== (void 0) ? arguments[1] : null;
        this._lexer = _lexer;
        this._reflector = isPresent(providedReflector) ? providedReflector : reflector;
      }, {
        parseAction: function(input, location) {
          var tokens = this._lexer.tokenize(input);
          var ast = new _ParseAST(input, location, tokens, this._reflector, true).parseChain();
          return new ASTWithSource(ast, input, location);
        },
        parseBinding: function(input, location) {
          var tokens = this._lexer.tokenize(input);
          var ast = new _ParseAST(input, location, tokens, this._reflector, false).parseChain();
          return new ASTWithSource(ast, input, location);
        },
        parseSimpleBinding: function(input, location) {
          var tokens = this._lexer.tokenize(input);
          var ast = new _ParseAST(input, location, tokens, this._reflector, false).parseSimpleBinding();
          return new ASTWithSource(ast, input, location);
        },
        parseTemplateBindings: function(input, location) {
          var tokens = this._lexer.tokenize(input);
          return new _ParseAST(input, location, tokens, this._reflector, false).parseTemplateBindings();
        },
        parseInterpolation: function(input, location) {
          var parts = StringWrapper.split(input, INTERPOLATION_REGEXP);
          if (parts.length <= 1) {
            return null;
          }
          var strings = [];
          var expressions = [];
          for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (i % 2 === 0) {
              strings.push(part);
            } else {
              var tokens = this._lexer.tokenize(part);
              var ast = new _ParseAST(input, location, tokens, this._reflector, false).parseChain();
              expressions.push(ast);
            }
          }
          return new ASTWithSource(new Interpolation(strings, expressions), input, location);
        },
        wrapLiteralPrimitive: function(input, location) {
          return new ASTWithSource(new LiteralPrimitive(input), input, location);
        }
      }, {});
      $__export("Parser", Parser);
      $__export("Parser", Parser = __decorate([Injectable(), __metadata('design:paramtypes', [Lexer, Reflector])], Parser));
      _ParseAST = function() {
        function _ParseAST(input, location, tokens, reflector, parseAction) {
          this.input = input;
          this.location = location;
          this.tokens = tokens;
          this.reflector = reflector;
          this.parseAction = parseAction;
          this.index = 0;
        }
        return ($traceurRuntime.createClass)(_ParseAST, {
          peek: function(offset) {
            var i = this.index + offset;
            return i < this.tokens.length ? this.tokens[i] : EOF;
          },
          get next() {
            return this.peek(0);
          },
          get inputIndex() {
            return (this.index < this.tokens.length) ? this.next.index : this.input.length;
          },
          advance: function() {
            this.index++;
          },
          optionalCharacter: function(code) {
            if (this.next.isCharacter(code)) {
              this.advance();
              return true;
            } else {
              return false;
            }
          },
          optionalKeywordVar: function() {
            if (this.peekKeywordVar()) {
              this.advance();
              return true;
            } else {
              return false;
            }
          },
          peekKeywordVar: function() {
            return this.next.isKeywordVar() || this.next.isOperator('#');
          },
          expectCharacter: function(code) {
            if (this.optionalCharacter(code))
              return;
            this.error(("Missing expected " + StringWrapper.fromCharCode(code)));
          },
          optionalOperator: function(op) {
            if (this.next.isOperator(op)) {
              this.advance();
              return true;
            } else {
              return false;
            }
          },
          expectOperator: function(operator) {
            if (this.optionalOperator(operator))
              return;
            this.error(("Missing expected operator " + operator));
          },
          expectIdentifierOrKeyword: function() {
            var n = this.next;
            if (!n.isIdentifier() && !n.isKeyword()) {
              this.error(("Unexpected token " + n + ", expected identifier or keyword"));
            }
            this.advance();
            return n.toString();
          },
          expectIdentifierOrKeywordOrString: function() {
            var n = this.next;
            if (!n.isIdentifier() && !n.isKeyword() && !n.isString()) {
              this.error(("Unexpected token " + n + ", expected identifier, keyword, or string"));
            }
            this.advance();
            return n.toString();
          },
          parseChain: function() {
            var exprs = [];
            while (this.index < this.tokens.length) {
              var expr = this.parsePipe();
              exprs.push(expr);
              if (this.optionalCharacter($SEMICOLON)) {
                if (!this.parseAction) {
                  this.error("Binding expression cannot contain chained expression");
                }
                while (this.optionalCharacter($SEMICOLON)) {}
              } else if (this.index < this.tokens.length) {
                this.error(("Unexpected token '" + this.next + "'"));
              }
            }
            if (exprs.length == 0)
              return new EmptyExpr();
            if (exprs.length == 1)
              return exprs[0];
            return new Chain(exprs);
          },
          parseSimpleBinding: function() {
            var ast = this.parseChain();
            if (!SimpleExpressionChecker.check(ast)) {
              this.error("Simple binding expression can only contain field access and constants'");
            }
            return ast;
          },
          parsePipe: function() {
            var result = this.parseExpression();
            if (this.optionalOperator("|")) {
              if (this.parseAction) {
                this.error("Cannot have a pipe in an action expression");
              }
              do {
                var name = this.expectIdentifierOrKeyword();
                var args = [];
                while (this.optionalCharacter($COLON)) {
                  args.push(this.parsePipe());
                }
                result = new BindingPipe(result, name, args);
              } while (this.optionalOperator("|"));
            }
            return result;
          },
          parseExpression: function() {
            var start = this.inputIndex;
            var result = this.parseConditional();
            while (this.next.isOperator('=')) {
              if (!result.isAssignable) {
                var end = this.inputIndex;
                var expression = this.input.substring(start, end);
                this.error(("Expression " + expression + " is not assignable"));
              }
              if (!this.parseAction) {
                this.error("Binding expression cannot contain assignments");
              }
              this.expectOperator('=');
              result = new Assignment(result, this.parseConditional());
            }
            return result;
          },
          parseConditional: function() {
            var start = this.inputIndex;
            var result = this.parseLogicalOr();
            if (this.optionalOperator('?')) {
              var yes = this.parsePipe();
              if (!this.optionalCharacter($COLON)) {
                var end = this.inputIndex;
                var expression = this.input.substring(start, end);
                this.error(("Conditional expression " + expression + " requires all 3 expressions"));
              }
              var no = this.parsePipe();
              return new Conditional(result, yes, no);
            } else {
              return result;
            }
          },
          parseLogicalOr: function() {
            var result = this.parseLogicalAnd();
            while (this.optionalOperator('||')) {
              result = new Binary('||', result, this.parseLogicalAnd());
            }
            return result;
          },
          parseLogicalAnd: function() {
            var result = this.parseEquality();
            while (this.optionalOperator('&&')) {
              result = new Binary('&&', result, this.parseEquality());
            }
            return result;
          },
          parseEquality: function() {
            var result = this.parseRelational();
            while (true) {
              if (this.optionalOperator('==')) {
                result = new Binary('==', result, this.parseRelational());
              } else if (this.optionalOperator('===')) {
                result = new Binary('===', result, this.parseRelational());
              } else if (this.optionalOperator('!=')) {
                result = new Binary('!=', result, this.parseRelational());
              } else if (this.optionalOperator('!==')) {
                result = new Binary('!==', result, this.parseRelational());
              } else {
                return result;
              }
            }
          },
          parseRelational: function() {
            var result = this.parseAdditive();
            while (true) {
              if (this.optionalOperator('<')) {
                result = new Binary('<', result, this.parseAdditive());
              } else if (this.optionalOperator('>')) {
                result = new Binary('>', result, this.parseAdditive());
              } else if (this.optionalOperator('<=')) {
                result = new Binary('<=', result, this.parseAdditive());
              } else if (this.optionalOperator('>=')) {
                result = new Binary('>=', result, this.parseAdditive());
              } else {
                return result;
              }
            }
          },
          parseAdditive: function() {
            var result = this.parseMultiplicative();
            while (true) {
              if (this.optionalOperator('+')) {
                result = new Binary('+', result, this.parseMultiplicative());
              } else if (this.optionalOperator('-')) {
                result = new Binary('-', result, this.parseMultiplicative());
              } else {
                return result;
              }
            }
          },
          parseMultiplicative: function() {
            var result = this.parsePrefix();
            while (true) {
              if (this.optionalOperator('*')) {
                result = new Binary('*', result, this.parsePrefix());
              } else if (this.optionalOperator('%')) {
                result = new Binary('%', result, this.parsePrefix());
              } else if (this.optionalOperator('/')) {
                result = new Binary('/', result, this.parsePrefix());
              } else {
                return result;
              }
            }
          },
          parsePrefix: function() {
            if (this.optionalOperator('+')) {
              return this.parsePrefix();
            } else if (this.optionalOperator('-')) {
              return new Binary('-', new LiteralPrimitive(0), this.parsePrefix());
            } else if (this.optionalOperator('!')) {
              return new PrefixNot(this.parsePrefix());
            } else {
              return this.parseCallChain();
            }
          },
          parseCallChain: function() {
            var result = this.parsePrimary();
            while (true) {
              if (this.optionalCharacter($PERIOD)) {
                result = this.parseAccessMemberOrMethodCall(result, false);
              } else if (this.optionalOperator('?.')) {
                result = this.parseAccessMemberOrMethodCall(result, true);
              } else if (this.optionalCharacter($LBRACKET)) {
                var key = this.parsePipe();
                this.expectCharacter($RBRACKET);
                result = new KeyedAccess(result, key);
              } else if (this.optionalCharacter($LPAREN)) {
                var args = this.parseCallArguments();
                this.expectCharacter($RPAREN);
                result = new FunctionCall(result, args);
              } else {
                return result;
              }
            }
          },
          parsePrimary: function() {
            if (this.optionalCharacter($LPAREN)) {
              var result = this.parsePipe();
              this.expectCharacter($RPAREN);
              return result;
            } else if (this.next.isKeywordNull() || this.next.isKeywordUndefined()) {
              this.advance();
              return new LiteralPrimitive(null);
            } else if (this.next.isKeywordTrue()) {
              this.advance();
              return new LiteralPrimitive(true);
            } else if (this.next.isKeywordFalse()) {
              this.advance();
              return new LiteralPrimitive(false);
            } else if (this.parseAction && this.next.isKeywordIf()) {
              this.advance();
              this.expectCharacter($LPAREN);
              var condition = this.parseExpression();
              this.expectCharacter($RPAREN);
              var ifExp = this.parseExpressionOrBlock();
              var elseExp;
              if (this.next.isKeywordElse()) {
                this.advance();
                elseExp = this.parseExpressionOrBlock();
              }
              return new If(condition, ifExp, elseExp);
            } else if (this.optionalCharacter($LBRACKET)) {
              var elements = this.parseExpressionList($RBRACKET);
              this.expectCharacter($RBRACKET);
              return new LiteralArray(elements);
            } else if (this.next.isCharacter($LBRACE)) {
              return this.parseLiteralMap();
            } else if (this.next.isIdentifier()) {
              return this.parseAccessMemberOrMethodCall(_implicitReceiver, false);
            } else if (this.next.isNumber()) {
              var value = this.next.toNumber();
              this.advance();
              return new LiteralPrimitive(value);
            } else if (this.next.isString()) {
              var literalValue = this.next.toString();
              this.advance();
              return new LiteralPrimitive(literalValue);
            } else if (this.index >= this.tokens.length) {
              this.error(("Unexpected end of expression: " + this.input));
            } else {
              this.error(("Unexpected token " + this.next));
            }
          },
          parseExpressionList: function(terminator) {
            var result = [];
            if (!this.next.isCharacter(terminator)) {
              do {
                result.push(this.parsePipe());
              } while (this.optionalCharacter($COMMA));
            }
            return result;
          },
          parseLiteralMap: function() {
            var keys = [];
            var values = [];
            this.expectCharacter($LBRACE);
            if (!this.optionalCharacter($RBRACE)) {
              do {
                var key = this.expectIdentifierOrKeywordOrString();
                keys.push(key);
                this.expectCharacter($COLON);
                values.push(this.parsePipe());
              } while (this.optionalCharacter($COMMA));
              this.expectCharacter($RBRACE);
            }
            return new LiteralMap(keys, values);
          },
          parseAccessMemberOrMethodCall: function(receiver) {
            var isSafe = arguments[1] !== (void 0) ? arguments[1] : false;
            var id = this.expectIdentifierOrKeyword();
            if (this.optionalCharacter($LPAREN)) {
              var args = this.parseCallArguments();
              this.expectCharacter($RPAREN);
              var fn = this.reflector.method(id);
              return isSafe ? new SafeMethodCall(receiver, id, fn, args) : new MethodCall(receiver, id, fn, args);
            } else {
              var getter = this.reflector.getter(id);
              var setter = this.reflector.setter(id);
              return isSafe ? new SafeAccessMember(receiver, id, getter, setter) : new AccessMember(receiver, id, getter, setter);
            }
          },
          parseCallArguments: function() {
            if (this.next.isCharacter($RPAREN))
              return [];
            var positionals = [];
            do {
              positionals.push(this.parsePipe());
            } while (this.optionalCharacter($COMMA));
            return positionals;
          },
          parseExpressionOrBlock: function() {
            if (this.optionalCharacter($LBRACE)) {
              var block = this.parseBlockContent();
              this.expectCharacter($RBRACE);
              return block;
            }
            return this.parseExpression();
          },
          parseBlockContent: function() {
            if (!this.parseAction) {
              this.error("Binding expression cannot contain chained expression");
            }
            var exprs = [];
            while (this.index < this.tokens.length && !this.next.isCharacter($RBRACE)) {
              var expr = this.parseExpression();
              exprs.push(expr);
              if (this.optionalCharacter($SEMICOLON)) {
                while (this.optionalCharacter($SEMICOLON)) {}
              }
            }
            if (exprs.length == 0)
              return new EmptyExpr();
            if (exprs.length == 1)
              return exprs[0];
            return new Chain(exprs);
          },
          expectTemplateBindingKey: function() {
            var result = '';
            var operatorFound = false;
            do {
              result += this.expectIdentifierOrKeywordOrString();
              operatorFound = this.optionalOperator('-');
              if (operatorFound) {
                result += '-';
              }
            } while (operatorFound);
            return result.toString();
          },
          parseTemplateBindings: function() {
            var bindings = [];
            var prefix = null;
            while (this.index < this.tokens.length) {
              var keyIsVar = this.optionalKeywordVar();
              var key = this.expectTemplateBindingKey();
              if (!keyIsVar) {
                if (prefix == null) {
                  prefix = key;
                } else {
                  key = prefix + '-' + key;
                }
              }
              this.optionalCharacter($COLON);
              var name = null;
              var expression = null;
              if (keyIsVar) {
                if (this.optionalOperator("=")) {
                  name = this.expectTemplateBindingKey();
                } else {
                  name = '\$implicit';
                }
              } else if (this.next !== EOF && !this.peekKeywordVar()) {
                var start = this.inputIndex;
                var ast = this.parsePipe();
                var source = this.input.substring(start, this.inputIndex);
                expression = new ASTWithSource(ast, source, this.location);
              }
              bindings.push(new TemplateBinding(key, keyIsVar, name, expression));
              if (!this.optionalCharacter($SEMICOLON)) {
                this.optionalCharacter($COMMA);
              }
            }
            return bindings;
          },
          error: function(message) {
            var index = arguments[1] !== (void 0) ? arguments[1] : null;
            if (isBlank(index))
              index = this.index;
            var location = (index < this.tokens.length) ? ("at column " + (this.tokens[index].index + 1) + " in") : "at the end of the expression";
            throw new BaseException(("Parser Error: " + message + " " + location + " [" + this.input + "] in " + this.location));
          }
        }, {});
      }();
      SimpleExpressionChecker = function() {
        function SimpleExpressionChecker() {
          this.simple = true;
        }
        return ($traceurRuntime.createClass)(SimpleExpressionChecker, {
          visitImplicitReceiver: function(ast) {},
          visitInterpolation: function(ast) {
            this.simple = false;
          },
          visitLiteralPrimitive: function(ast) {},
          visitAccessMember: function(ast) {},
          visitSafeAccessMember: function(ast) {
            this.simple = false;
          },
          visitMethodCall: function(ast) {
            this.simple = false;
          },
          visitSafeMethodCall: function(ast) {
            this.simple = false;
          },
          visitFunctionCall: function(ast) {
            this.simple = false;
          },
          visitLiteralArray: function(ast) {
            this.visitAll(ast.expressions);
          },
          visitLiteralMap: function(ast) {
            this.visitAll(ast.values);
          },
          visitBinary: function(ast) {
            this.simple = false;
          },
          visitPrefixNot: function(ast) {
            this.simple = false;
          },
          visitConditional: function(ast) {
            this.simple = false;
          },
          visitPipe: function(ast) {
            this.simple = false;
          },
          visitKeyedAccess: function(ast) {
            this.simple = false;
          },
          visitAll: function(asts) {
            var res = ListWrapper.createFixedSize(asts.length);
            for (var i = 0; i < asts.length; ++i) {
              res[i] = asts[i].visit(this);
            }
            return res;
          },
          visitChain: function(ast) {
            this.simple = false;
          },
          visitAssignment: function(ast) {
            this.simple = false;
          },
          visitIf: function(ast) {
            this.simple = false;
          }
        }, {check: function(ast) {
            var s = new SimpleExpressionChecker();
            ast.visit(s);
            return s.simple;
          }});
      }();
    }
  };
});
//# sourceMappingURL=parser.js.map

//# sourceMappingURL=../../../src/change_detection/parser/parser.js.map