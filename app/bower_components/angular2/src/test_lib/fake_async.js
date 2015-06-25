System.register(["angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var BaseException,
      global,
      ListWrapper,
      _scheduler,
      _microtasks,
      _pendingPeriodicTimers,
      _pendingTimers,
      _error;
  function fakeAsync(fn) {
    if (global.zone._inFakeAsyncZone) {
      throw new Error('fakeAsync() calls can not be nested');
    }
    var fakeAsyncZone = global.zone.fork({
      setTimeout: _setTimeout,
      clearTimeout: _clearTimeout,
      setInterval: _setInterval,
      clearInterval: _clearInterval,
      scheduleMicrotask: _scheduleMicrotask,
      _inFakeAsyncZone: true
    });
    return function() {
      for (var args = [],
          $__0 = 0; $__0 < arguments.length; $__0++)
        args[$__0] = arguments[$__0];
      _scheduler = new jasmine.DelayedFunctionScheduler();
      ListWrapper.clear(_microtasks);
      ListWrapper.clear(_pendingPeriodicTimers);
      ListWrapper.clear(_pendingTimers);
      var res = fakeAsyncZone.run(function() {
        var res = fn.apply((void 0), $traceurRuntime.spread(args));
        flushMicrotasks();
        return res;
      });
      if (_pendingPeriodicTimers.length > 0) {
        throw new BaseException((_pendingPeriodicTimers.length + " periodic timer(s) still in the queue."));
      }
      if (_pendingTimers.length > 0) {
        throw new BaseException((_pendingTimers.length + " timer(s) still in the queue."));
      }
      _scheduler = null;
      ListWrapper.clear(_microtasks);
      return res;
    };
  }
  function tick() {
    var millis = arguments[0] !== (void 0) ? arguments[0] : 0;
    _assertInFakeAsyncZone();
    flushMicrotasks();
    _scheduler.tick(millis);
  }
  function flushMicrotasks() {
    _assertInFakeAsyncZone();
    while (_microtasks.length > 0) {
      var microtask = ListWrapper.removeAt(_microtasks, 0);
      microtask();
    }
  }
  function _setTimeout(fn, delay) {
    for (var args = [],
        $__0 = 2; $__0 < arguments.length; $__0++)
      args[$__0 - 2] = arguments[$__0];
    var cb = _fnAndFlush(fn);
    var id = _scheduler.scheduleFunction(cb, delay, args);
    _pendingTimers.push(id);
    _scheduler.scheduleFunction(_dequeueTimer(id), delay);
    return id;
  }
  function _clearTimeout(id) {
    _dequeueTimer(id);
    return _scheduler.removeFunctionWithId(id);
  }
  function _setInterval(fn, interval) {
    for (var args = [],
        $__1 = 2; $__1 < arguments.length; $__1++)
      args[$__1 - 2] = arguments[$__1];
    var cb = _fnAndFlush(fn);
    var id = _scheduler.scheduleFunction(cb, interval, args, true);
    _pendingPeriodicTimers.push(id);
    return id;
  }
  function _clearInterval(id) {
    ListWrapper.remove(_pendingPeriodicTimers, id);
    return _scheduler.removeFunctionWithId(id);
  }
  function _fnAndFlush(fn) {
    return function() {
      for (var args = [],
          $__2 = 0; $__2 < arguments.length; $__2++)
        args[$__2] = arguments[$__2];
      fn.apply(global, args);
      flushMicrotasks();
    };
  }
  function _scheduleMicrotask(microtask) {
    _microtasks.push(microtask);
  }
  function _dequeueTimer(id) {
    return function() {
      ListWrapper.remove(_pendingTimers, id);
    };
  }
  function _assertInFakeAsyncZone() {
    if (!global.zone || !global.zone._inFakeAsyncZone) {
      throw new Error('The code should be running in the fakeAsync zone to call this function');
    }
  }
  $__export("fakeAsync", fakeAsync);
  $__export("tick", tick);
  $__export("flushMicrotasks", flushMicrotasks);
  return {
    setters: [function($__m) {
      BaseException = $__m.BaseException;
      global = $__m.global;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }],
    execute: function() {
      _microtasks = [];
      _pendingPeriodicTimers = [];
      _pendingTimers = [];
      _error = null;
    }
  };
});
//# sourceMappingURL=fake_async.js.map

//# sourceMappingURL=../../src/test_lib/fake_async.js.map