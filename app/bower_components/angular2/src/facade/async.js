System.register(["angular2/src/facade/lang", "rx"], function($__export) {
  "use strict";
  var global,
      Rx,
      Promise,
      PromiseWrapper,
      TimerWrapper,
      ObservableWrapper,
      Observable,
      EventEmitter;
  return {
    setters: [function($__m) {
      global = $__m.global;
    }, function($__m) {
      Rx = $__m;
    }],
    execute: function() {
      Promise = global.Promise;
      $__export("Promise", Promise);
      PromiseWrapper = function() {
        function PromiseWrapper() {}
        return ($traceurRuntime.createClass)(PromiseWrapper, {}, {
          resolve: function(obj) {
            return Promise.resolve(obj);
          },
          reject: function(obj, _) {
            return Promise.reject(obj);
          },
          catchError: function(promise, onError) {
            return promise.catch(onError);
          },
          all: function(promises) {
            if (promises.length == 0)
              return Promise.resolve([]);
            return Promise.all(promises);
          },
          then: function(promise, success, rejection) {
            return promise.then(success, rejection);
          },
          completer: function() {
            var resolve;
            var reject;
            var p = new Promise(function(res, rej) {
              resolve = res;
              reject = rej;
            });
            return {
              promise: p,
              resolve: resolve,
              reject: reject
            };
          }
        });
      }();
      $__export("PromiseWrapper", PromiseWrapper);
      TimerWrapper = function() {
        function TimerWrapper() {}
        return ($traceurRuntime.createClass)(TimerWrapper, {}, {
          setTimeout: function(fn, millis) {
            return global.setTimeout(fn, millis);
          },
          clearTimeout: function(id) {
            global.clearTimeout(id);
          },
          setInterval: function(fn, millis) {
            return global.setInterval(fn, millis);
          },
          clearInterval: function(id) {
            global.clearInterval(id);
          }
        });
      }();
      $__export("TimerWrapper", TimerWrapper);
      ObservableWrapper = function() {
        function ObservableWrapper() {}
        return ($traceurRuntime.createClass)(ObservableWrapper, {}, {
          subscribe: function(emitter, onNext) {
            var onThrow = arguments[2] !== (void 0) ? arguments[2] : null;
            var onReturn = arguments[3] !== (void 0) ? arguments[3] : null;
            return emitter.observer({
              next: onNext,
              throw: onThrow,
              return: onReturn
            });
          },
          isObservable: function(obs) {
            return obs instanceof Observable;
          },
          dispose: function(subscription) {
            subscription.dispose();
          },
          callNext: function(emitter, value) {
            emitter.next(value);
          },
          callThrow: function(emitter, error) {
            emitter.throw(error);
          },
          callReturn: function(emitter) {
            emitter.return(null);
          }
        });
      }();
      $__export("ObservableWrapper", ObservableWrapper);
      Observable = function() {
        function Observable() {}
        return ($traceurRuntime.createClass)(Observable, {observer: function(generator) {
            return null;
          }}, {});
      }();
      $__export("Observable", Observable);
      EventEmitter = function($__super) {
        function EventEmitter() {
          $traceurRuntime.superConstructor(EventEmitter).call(this);
          if (Rx.hasOwnProperty('default')) {
            this._subject = new Rx.default.Rx.Subject();
            this._immediateScheduler = Rx.default.Rx.Scheduler.immediate;
          } else {
            this._subject = new Rx.Subject();
            this._immediateScheduler = Rx.Scheduler.immediate;
          }
        }
        return ($traceurRuntime.createClass)(EventEmitter, {
          observer: function(generator) {
            return this._subject.observeOn(this._immediateScheduler).subscribe(function(value) {
              setTimeout(function() {
                return generator.next(value);
              });
            }, function(error) {
              return generator.throw ? generator.throw(error) : null;
            }, function() {
              return generator.return ? generator.return() : null;
            });
          },
          toRx: function() {
            return this._subject;
          },
          next: function(value) {
            this._subject.onNext(value);
          },
          throw: function(error) {
            this._subject.onError(error);
          },
          return: function(value) {
            this._subject.onCompleted();
          }
        }, {}, $__super);
      }(Observable);
      $__export("EventEmitter", EventEmitter);
    }
  };
});
//# sourceMappingURL=async.js.map

//# sourceMappingURL=../../src/facade/async.js.map