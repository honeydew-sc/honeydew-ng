System.register(["angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var isBlank,
      isPresent,
      FunctionWrapper,
      BaseException,
      ListWrapper,
      StringMapWrapper,
      AST,
      EmptyExpr,
      ImplicitReceiver,
      Chain,
      Conditional,
      If,
      AccessMember,
      SafeAccessMember,
      KeyedAccess,
      BindingPipe,
      LiteralPrimitive,
      LiteralArray,
      LiteralMap,
      Interpolation,
      Binary,
      PrefixNot,
      Assignment,
      MethodCall,
      SafeMethodCall,
      FunctionCall,
      ASTWithSource,
      TemplateBinding,
      AstTransformer,
      _evalListCache;
  function evalList(context, locals, exps) {
    var length = exps.length;
    if (length > 10) {
      throw new BaseException("Cannot have more than 10 argument");
    }
    var result = _evalListCache[length];
    for (var i = 0; i < length; i++) {
      result[i] = exps[i].eval(context, locals);
    }
    return result;
  }
  return {
    setters: [function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      FunctionWrapper = $__m.FunctionWrapper;
      BaseException = $__m.BaseException;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }],
    execute: function() {
      AST = function() {
        function AST() {}
        return ($traceurRuntime.createClass)(AST, {
          eval: function(context, locals) {
            throw new BaseException("Not supported");
          },
          get isAssignable() {
            return false;
          },
          assign: function(context, locals, value) {
            throw new BaseException("Not supported");
          },
          visit: function(visitor) {
            return null;
          },
          toString: function() {
            return "AST";
          }
        }, {});
      }();
      $__export("AST", AST);
      EmptyExpr = function($__super) {
        function EmptyExpr() {
          $traceurRuntime.superConstructor(EmptyExpr).apply(this, arguments);
        }
        return ($traceurRuntime.createClass)(EmptyExpr, {
          eval: function(context, locals) {
            return null;
          },
          visit: function(visitor) {}
        }, {}, $__super);
      }(AST);
      $__export("EmptyExpr", EmptyExpr);
      ImplicitReceiver = function($__super) {
        function ImplicitReceiver() {
          $traceurRuntime.superConstructor(ImplicitReceiver).apply(this, arguments);
        }
        return ($traceurRuntime.createClass)(ImplicitReceiver, {
          eval: function(context, locals) {
            return context;
          },
          visit: function(visitor) {
            return visitor.visitImplicitReceiver(this);
          }
        }, {}, $__super);
      }(AST);
      $__export("ImplicitReceiver", ImplicitReceiver);
      Chain = function($__super) {
        function Chain(expressions) {
          $traceurRuntime.superConstructor(Chain).call(this);
          this.expressions = expressions;
        }
        return ($traceurRuntime.createClass)(Chain, {
          eval: function(context, locals) {
            var result;
            for (var i = 0; i < this.expressions.length; i++) {
              var last = this.expressions[i].eval(context, locals);
              if (isPresent(last))
                result = last;
            }
            return result;
          },
          visit: function(visitor) {
            return visitor.visitChain(this);
          }
        }, {}, $__super);
      }(AST);
      $__export("Chain", Chain);
      Conditional = function($__super) {
        function Conditional(condition, trueExp, falseExp) {
          $traceurRuntime.superConstructor(Conditional).call(this);
          this.condition = condition;
          this.trueExp = trueExp;
          this.falseExp = falseExp;
        }
        return ($traceurRuntime.createClass)(Conditional, {
          eval: function(context, locals) {
            if (this.condition.eval(context, locals)) {
              return this.trueExp.eval(context, locals);
            } else {
              return this.falseExp.eval(context, locals);
            }
          },
          visit: function(visitor) {
            return visitor.visitConditional(this);
          }
        }, {}, $__super);
      }(AST);
      $__export("Conditional", Conditional);
      If = function($__super) {
        function If(condition, trueExp, falseExp) {
          $traceurRuntime.superConstructor(If).call(this);
          this.condition = condition;
          this.trueExp = trueExp;
          this.falseExp = falseExp;
        }
        return ($traceurRuntime.createClass)(If, {
          eval: function(context, locals) {
            if (this.condition.eval(context, locals)) {
              this.trueExp.eval(context, locals);
            } else if (isPresent(this.falseExp)) {
              this.falseExp.eval(context, locals);
            }
          },
          visit: function(visitor) {
            return visitor.visitIf(this);
          }
        }, {}, $__super);
      }(AST);
      $__export("If", If);
      AccessMember = function($__super) {
        function AccessMember(receiver, name, getter, setter) {
          $traceurRuntime.superConstructor(AccessMember).call(this);
          this.receiver = receiver;
          this.name = name;
          this.getter = getter;
          this.setter = setter;
        }
        return ($traceurRuntime.createClass)(AccessMember, {
          eval: function(context, locals) {
            if (this.receiver instanceof ImplicitReceiver && isPresent(locals) && locals.contains(this.name)) {
              return locals.get(this.name);
            } else {
              var evaluatedReceiver = this.receiver.eval(context, locals);
              return this.getter(evaluatedReceiver);
            }
          },
          get isAssignable() {
            return true;
          },
          assign: function(context, locals, value) {
            var evaluatedContext = this.receiver.eval(context, locals);
            if (this.receiver instanceof ImplicitReceiver && isPresent(locals) && locals.contains(this.name)) {
              throw new BaseException(("Cannot reassign a variable binding " + this.name));
            } else {
              return this.setter(evaluatedContext, value);
            }
          },
          visit: function(visitor) {
            return visitor.visitAccessMember(this);
          }
        }, {}, $__super);
      }(AST);
      $__export("AccessMember", AccessMember);
      SafeAccessMember = function($__super) {
        function SafeAccessMember(receiver, name, getter, setter) {
          $traceurRuntime.superConstructor(SafeAccessMember).call(this);
          this.receiver = receiver;
          this.name = name;
          this.getter = getter;
          this.setter = setter;
        }
        return ($traceurRuntime.createClass)(SafeAccessMember, {
          eval: function(context, locals) {
            var evaluatedReceiver = this.receiver.eval(context, locals);
            return isBlank(evaluatedReceiver) ? null : this.getter(evaluatedReceiver);
          },
          visit: function(visitor) {
            return visitor.visitSafeAccessMember(this);
          }
        }, {}, $__super);
      }(AST);
      $__export("SafeAccessMember", SafeAccessMember);
      KeyedAccess = function($__super) {
        function KeyedAccess(obj, key) {
          $traceurRuntime.superConstructor(KeyedAccess).call(this);
          this.obj = obj;
          this.key = key;
        }
        return ($traceurRuntime.createClass)(KeyedAccess, {
          eval: function(context, locals) {
            var obj = this.obj.eval(context, locals);
            var key = this.key.eval(context, locals);
            return obj[key];
          },
          get isAssignable() {
            return true;
          },
          assign: function(context, locals, value) {
            var obj = this.obj.eval(context, locals);
            var key = this.key.eval(context, locals);
            obj[key] = value;
            return value;
          },
          visit: function(visitor) {
            return visitor.visitKeyedAccess(this);
          }
        }, {}, $__super);
      }(AST);
      $__export("KeyedAccess", KeyedAccess);
      BindingPipe = function($__super) {
        function BindingPipe(exp, name, args) {
          $traceurRuntime.superConstructor(BindingPipe).call(this);
          this.exp = exp;
          this.name = name;
          this.args = args;
        }
        return ($traceurRuntime.createClass)(BindingPipe, {visit: function(visitor) {
            return visitor.visitPipe(this);
          }}, {}, $__super);
      }(AST);
      $__export("BindingPipe", BindingPipe);
      LiteralPrimitive = function($__super) {
        function LiteralPrimitive(value) {
          $traceurRuntime.superConstructor(LiteralPrimitive).call(this);
          this.value = value;
        }
        return ($traceurRuntime.createClass)(LiteralPrimitive, {
          eval: function(context, locals) {
            return this.value;
          },
          visit: function(visitor) {
            return visitor.visitLiteralPrimitive(this);
          }
        }, {}, $__super);
      }(AST);
      $__export("LiteralPrimitive", LiteralPrimitive);
      LiteralArray = function($__super) {
        function LiteralArray(expressions) {
          $traceurRuntime.superConstructor(LiteralArray).call(this);
          this.expressions = expressions;
        }
        return ($traceurRuntime.createClass)(LiteralArray, {
          eval: function(context, locals) {
            return ListWrapper.map(this.expressions, function(e) {
              return e.eval(context, locals);
            });
          },
          visit: function(visitor) {
            return visitor.visitLiteralArray(this);
          }
        }, {}, $__super);
      }(AST);
      $__export("LiteralArray", LiteralArray);
      LiteralMap = function($__super) {
        function LiteralMap(keys, values) {
          $traceurRuntime.superConstructor(LiteralMap).call(this);
          this.keys = keys;
          this.values = values;
        }
        return ($traceurRuntime.createClass)(LiteralMap, {
          eval: function(context, locals) {
            var res = StringMapWrapper.create();
            for (var i = 0; i < this.keys.length; ++i) {
              StringMapWrapper.set(res, this.keys[i], this.values[i].eval(context, locals));
            }
            return res;
          },
          visit: function(visitor) {
            return visitor.visitLiteralMap(this);
          }
        }, {}, $__super);
      }(AST);
      $__export("LiteralMap", LiteralMap);
      Interpolation = function($__super) {
        function Interpolation(strings, expressions) {
          $traceurRuntime.superConstructor(Interpolation).call(this);
          this.strings = strings;
          this.expressions = expressions;
        }
        return ($traceurRuntime.createClass)(Interpolation, {
          eval: function(context, locals) {
            throw new BaseException("evaluating an Interpolation is not supported");
          },
          visit: function(visitor) {
            visitor.visitInterpolation(this);
          }
        }, {}, $__super);
      }(AST);
      $__export("Interpolation", Interpolation);
      Binary = function($__super) {
        function Binary(operation, left, right) {
          $traceurRuntime.superConstructor(Binary).call(this);
          this.operation = operation;
          this.left = left;
          this.right = right;
        }
        return ($traceurRuntime.createClass)(Binary, {
          eval: function(context, locals) {
            var left = this.left.eval(context, locals);
            switch (this.operation) {
              case '&&':
                return left && this.right.eval(context, locals);
              case '||':
                return left || this.right.eval(context, locals);
            }
            var right = this.right.eval(context, locals);
            switch (this.operation) {
              case '+':
                return left + right;
              case '-':
                return left - right;
              case '*':
                return left * right;
              case '/':
                return left / right;
              case '%':
                return left % right;
              case '==':
                return left == right;
              case '!=':
                return left != right;
              case '===':
                return left === right;
              case '!==':
                return left !== right;
              case '<':
                return left < right;
              case '>':
                return left > right;
              case '<=':
                return left <= right;
              case '>=':
                return left >= right;
              case '^':
                return left ^ right;
              case '&':
                return left & right;
            }
            throw 'Internal error [$operation] not handled';
          },
          visit: function(visitor) {
            return visitor.visitBinary(this);
          }
        }, {}, $__super);
      }(AST);
      $__export("Binary", Binary);
      PrefixNot = function($__super) {
        function PrefixNot(expression) {
          $traceurRuntime.superConstructor(PrefixNot).call(this);
          this.expression = expression;
        }
        return ($traceurRuntime.createClass)(PrefixNot, {
          eval: function(context, locals) {
            return !this.expression.eval(context, locals);
          },
          visit: function(visitor) {
            return visitor.visitPrefixNot(this);
          }
        }, {}, $__super);
      }(AST);
      $__export("PrefixNot", PrefixNot);
      Assignment = function($__super) {
        function Assignment(target, value) {
          $traceurRuntime.superConstructor(Assignment).call(this);
          this.target = target;
          this.value = value;
        }
        return ($traceurRuntime.createClass)(Assignment, {
          eval: function(context, locals) {
            return this.target.assign(context, locals, this.value.eval(context, locals));
          },
          visit: function(visitor) {
            return visitor.visitAssignment(this);
          }
        }, {}, $__super);
      }(AST);
      $__export("Assignment", Assignment);
      MethodCall = function($__super) {
        function MethodCall(receiver, name, fn, args) {
          $traceurRuntime.superConstructor(MethodCall).call(this);
          this.receiver = receiver;
          this.name = name;
          this.fn = fn;
          this.args = args;
        }
        return ($traceurRuntime.createClass)(MethodCall, {
          eval: function(context, locals) {
            var evaluatedArgs = evalList(context, locals, this.args);
            if (this.receiver instanceof ImplicitReceiver && isPresent(locals) && locals.contains(this.name)) {
              var fn = locals.get(this.name);
              return FunctionWrapper.apply(fn, evaluatedArgs);
            } else {
              var evaluatedReceiver = this.receiver.eval(context, locals);
              return this.fn(evaluatedReceiver, evaluatedArgs);
            }
          },
          visit: function(visitor) {
            return visitor.visitMethodCall(this);
          }
        }, {}, $__super);
      }(AST);
      $__export("MethodCall", MethodCall);
      SafeMethodCall = function($__super) {
        function SafeMethodCall(receiver, name, fn, args) {
          $traceurRuntime.superConstructor(SafeMethodCall).call(this);
          this.receiver = receiver;
          this.name = name;
          this.fn = fn;
          this.args = args;
        }
        return ($traceurRuntime.createClass)(SafeMethodCall, {
          eval: function(context, locals) {
            var evaluatedReceiver = this.receiver.eval(context, locals);
            if (isBlank(evaluatedReceiver))
              return null;
            var evaluatedArgs = evalList(context, locals, this.args);
            return this.fn(evaluatedReceiver, evaluatedArgs);
          },
          visit: function(visitor) {
            return visitor.visitSafeMethodCall(this);
          }
        }, {}, $__super);
      }(AST);
      $__export("SafeMethodCall", SafeMethodCall);
      FunctionCall = function($__super) {
        function FunctionCall(target, args) {
          $traceurRuntime.superConstructor(FunctionCall).call(this);
          this.target = target;
          this.args = args;
        }
        return ($traceurRuntime.createClass)(FunctionCall, {
          eval: function(context, locals) {
            var obj = this.target.eval(context, locals);
            if (!(obj instanceof Function)) {
              throw new BaseException((obj + " is not a function"));
            }
            return FunctionWrapper.apply(obj, evalList(context, locals, this.args));
          },
          visit: function(visitor) {
            return visitor.visitFunctionCall(this);
          }
        }, {}, $__super);
      }(AST);
      $__export("FunctionCall", FunctionCall);
      ASTWithSource = function($__super) {
        function ASTWithSource(ast, source, location) {
          $traceurRuntime.superConstructor(ASTWithSource).call(this);
          this.ast = ast;
          this.source = source;
          this.location = location;
        }
        return ($traceurRuntime.createClass)(ASTWithSource, {
          eval: function(context, locals) {
            return this.ast.eval(context, locals);
          },
          get isAssignable() {
            return this.ast.isAssignable;
          },
          assign: function(context, locals, value) {
            return this.ast.assign(context, locals, value);
          },
          visit: function(visitor) {
            return this.ast.visit(visitor);
          },
          toString: function() {
            return (this.source + " in " + this.location);
          }
        }, {}, $__super);
      }(AST);
      $__export("ASTWithSource", ASTWithSource);
      TemplateBinding = function() {
        function TemplateBinding(key, keyIsVar, name, expression) {
          this.key = key;
          this.keyIsVar = keyIsVar;
          this.name = name;
          this.expression = expression;
        }
        return ($traceurRuntime.createClass)(TemplateBinding, {}, {});
      }();
      $__export("TemplateBinding", TemplateBinding);
      AstTransformer = function() {
        function AstTransformer() {}
        return ($traceurRuntime.createClass)(AstTransformer, {
          visitImplicitReceiver: function(ast) {
            return ast;
          },
          visitInterpolation: function(ast) {
            return new Interpolation(ast.strings, this.visitAll(ast.expressions));
          },
          visitLiteralPrimitive: function(ast) {
            return new LiteralPrimitive(ast.value);
          },
          visitAccessMember: function(ast) {
            return new AccessMember(ast.receiver.visit(this), ast.name, ast.getter, ast.setter);
          },
          visitSafeAccessMember: function(ast) {
            return new SafeAccessMember(ast.receiver.visit(this), ast.name, ast.getter, ast.setter);
          },
          visitMethodCall: function(ast) {
            return new MethodCall(ast.receiver.visit(this), ast.name, ast.fn, this.visitAll(ast.args));
          },
          visitSafeMethodCall: function(ast) {
            return new SafeMethodCall(ast.receiver.visit(this), ast.name, ast.fn, this.visitAll(ast.args));
          },
          visitFunctionCall: function(ast) {
            return new FunctionCall(ast.target.visit(this), this.visitAll(ast.args));
          },
          visitLiteralArray: function(ast) {
            return new LiteralArray(this.visitAll(ast.expressions));
          },
          visitLiteralMap: function(ast) {
            return new LiteralMap(ast.keys, this.visitAll(ast.values));
          },
          visitBinary: function(ast) {
            return new Binary(ast.operation, ast.left.visit(this), ast.right.visit(this));
          },
          visitPrefixNot: function(ast) {
            return new PrefixNot(ast.expression.visit(this));
          },
          visitConditional: function(ast) {
            return new Conditional(ast.condition.visit(this), ast.trueExp.visit(this), ast.falseExp.visit(this));
          },
          visitPipe: function(ast) {
            return new BindingPipe(ast.exp.visit(this), ast.name, this.visitAll(ast.args));
          },
          visitKeyedAccess: function(ast) {
            return new KeyedAccess(ast.obj.visit(this), ast.key.visit(this));
          },
          visitAll: function(asts) {
            var res = ListWrapper.createFixedSize(asts.length);
            for (var i = 0; i < asts.length; ++i) {
              res[i] = asts[i].visit(this);
            }
            return res;
          },
          visitChain: function(ast) {
            return new Chain(this.visitAll(ast.expressions));
          },
          visitAssignment: function(ast) {
            return new Assignment(ast.target.visit(this), ast.value.visit(this));
          },
          visitIf: function(ast) {
            var falseExp = isPresent(ast.falseExp) ? ast.falseExp.visit(this) : null;
            return new If(ast.condition.visit(this), ast.trueExp.visit(this), falseExp);
          }
        }, {});
      }();
      $__export("AstTransformer", AstTransformer);
      _evalListCache = [[], [0], [0, 0], [0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    }
  };
});
//# sourceMappingURL=ast.js.map

//# sourceMappingURL=../../../src/change_detection/parser/ast.js.map