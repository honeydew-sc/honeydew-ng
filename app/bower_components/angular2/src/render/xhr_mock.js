System.register(["angular2/src/render/xhr", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/facade/async"], function($__export) {
  "use strict";
  var XHR,
      ListWrapper,
      Map,
      isBlank,
      normalizeBlank,
      BaseException,
      PromiseWrapper,
      MockXHR,
      _PendingRequest,
      _Expectation;
  return {
    setters: [function($__m) {
      XHR = $__m.XHR;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      Map = $__m.Map;
    }, function($__m) {
      isBlank = $__m.isBlank;
      normalizeBlank = $__m.normalizeBlank;
      BaseException = $__m.BaseException;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }],
    execute: function() {
      MockXHR = function($__super) {
        function MockXHR() {
          $traceurRuntime.superConstructor(MockXHR).call(this);
          this._expectations = [];
          this._definitions = new Map();
          this._requests = [];
        }
        return ($traceurRuntime.createClass)(MockXHR, {
          get: function(url) {
            var request = new _PendingRequest(url);
            this._requests.push(request);
            return request.getPromise();
          },
          expect: function(url, response) {
            var expectation = new _Expectation(url, response);
            this._expectations.push(expectation);
          },
          when: function(url, response) {
            this._definitions.set(url, response);
          },
          flush: function() {
            if (this._requests.length === 0) {
              throw new BaseException('No pending requests to flush');
            }
            do {
              var request = ListWrapper.removeAt(this._requests, 0);
              this._processRequest(request);
            } while (this._requests.length > 0);
            this.verifyNoOustandingExpectations();
          },
          verifyNoOustandingExpectations: function() {
            if (this._expectations.length === 0)
              return;
            var urls = [];
            for (var i = 0; i < this._expectations.length; i++) {
              var expectation = this._expectations[i];
              urls.push(expectation.url);
            }
            throw new BaseException(("Unsatisfied requests: " + ListWrapper.join(urls, ', ')));
          },
          _processRequest: function(request) {
            var url = request.url;
            if (this._expectations.length > 0) {
              var expectation = this._expectations[0];
              if (expectation.url == url) {
                ListWrapper.remove(this._expectations, expectation);
                request.complete(expectation.response);
                return;
              }
            }
            if (this._definitions.has(url)) {
              var response = this._definitions.get(url);
              request.complete(normalizeBlank(response));
              return;
            }
            throw new BaseException(("Unexpected request " + url));
          }
        }, {}, $__super);
      }(XHR);
      $__export("MockXHR", MockXHR);
      _PendingRequest = function() {
        function _PendingRequest(url) {
          this.url = url;
          this.completer = PromiseWrapper.completer();
        }
        return ($traceurRuntime.createClass)(_PendingRequest, {
          complete: function(response) {
            if (isBlank(response)) {
              this.completer.reject(("Failed to load " + this.url), null);
            } else {
              this.completer.resolve(response);
            }
          },
          getPromise: function() {
            return this.completer.promise;
          }
        }, {});
      }();
      _Expectation = function() {
        function _Expectation(url, response) {
          this.url = url;
          this.response = response;
        }
        return ($traceurRuntime.createClass)(_Expectation, {}, {});
      }();
    }
  };
});
//# sourceMappingURL=xhr_mock.js.map

//# sourceMappingURL=../../src/render/xhr_mock.js.map