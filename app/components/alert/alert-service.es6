angular.module('honeydew')
    .service('alerts', function ($timeout) {
        var self = this;
        self.globalAlerts =  [];

        self.addAlert = function(res, timeout) {
            var alert = res;

            if (typeof(alert.type) === 'undefined') {
                alert = {
                    type: res.success === 'true' ? 'success' : 'danger',
                    msg: typeof(res.data) === 'undefined' ? res.notes : res.data.reason
                };
            }
            self.globalAlerts.push(alert);

            if (timeout) {
                $timeout(function () {
                    self.closeAlert(self.globalAlerts.indexOf(alert));
                }, timeout);
            }
        };

        self.catcher = function ( res ) {
            self.addAlert(res);
            return res;
        };

        self.closeAlert = function(index) {
            this.globalAlerts.splice(index, 1);
        };
    });
