System.register(["angular2/di", "angular2/src/http/static_request", "angular2/src/http/enums", "rx"], function($__export) {
  "use strict";
  var __decorate,
      __metadata,
      Injectable,
      Request,
      ReadyStates,
      Rx,
      MockConnection,
      MockBackend;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      Request = $__m.Request;
    }, function($__m) {
      ReadyStates = $__m.ReadyStates;
    }, function($__m) {
      Rx = $__m;
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
      MockConnection = function() {
        function MockConnection(req) {
          if (Rx.hasOwnProperty('default')) {
            this.response = new (Rx.default.Rx.Subject)();
          } else {
            this.response = new Rx.Subject();
          }
          this.readyState = ReadyStates.OPEN;
          this.request = req;
          this.dispose = this.dispose.bind(this);
        }
        return ($traceurRuntime.createClass)(MockConnection, {
          dispose: function() {
            if (this.readyState !== ReadyStates.DONE) {
              this.readyState = ReadyStates.CANCELLED;
            }
          },
          mockRespond: function(res) {
            if (this.readyState >= ReadyStates.DONE) {
              throw new Error('Connection has already been resolved');
            }
            this.readyState = ReadyStates.DONE;
            this.response.onNext(res);
            this.response.onCompleted();
          },
          mockDownload: function(res) {},
          mockError: function(err) {
            this.readyState = ReadyStates.DONE;
            this.response.onError(err);
            this.response.onCompleted();
          }
        }, {});
      }();
      $__export("MockConnection", MockConnection);
      MockBackend = ($traceurRuntime.createClass)(function() {
        var $__0 = this;
        var Observable;
        this.connectionsArray = [];
        if (Rx.hasOwnProperty('default')) {
          this.connections = new Rx.default.Rx.Subject();
          Observable = Rx.default.Rx.Observable;
        } else {
          this.connections = new Rx.Subject();
          Observable = Rx.Observable;
        }
        this.connections.subscribe(function(connection) {
          return $__0.connectionsArray.push(connection);
        });
        this.pendingConnections = Observable.fromArray(this.connectionsArray).filter(function(c) {
          return c.readyState < ReadyStates.DONE;
        });
      }, {
        verifyNoPendingRequests: function() {
          var pending = 0;
          this.pendingConnections.subscribe(function(c) {
            return pending++;
          });
          if (pending > 0)
            throw new Error((pending + " pending connections to be resolved"));
        },
        resolveAllConnections: function() {
          this.connections.subscribe(function(c) {
            return c.readyState = 4;
          });
        },
        createConnection: function(req) {
          if (!req || !(req instanceof Request)) {
            throw new Error(("createConnection requires an instance of Request, got " + req));
          }
          var connection = new MockConnection(req);
          this.connections.onNext(connection);
          return connection;
        }
      }, {});
      $__export("MockBackend", MockBackend);
      $__export("MockBackend", MockBackend = __decorate([Injectable(), __metadata('design:paramtypes', [])], MockBackend));
    }
  };
});
//# sourceMappingURL=mock_backend.js.map

//# sourceMappingURL=../../../src/http/backends/mock_backend.js.map