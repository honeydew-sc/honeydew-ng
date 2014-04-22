'use strict';

angular.module('honeydew')
    .service('alerts', function ($timeout) {
        this.globalAlerts =  [];

        this.addAlert = function(res, timeout) {
            var alerts = this;
            var alert = res;

            if (typeof(alert.type) === 'undefined') {
                alert = {
                    type: res.success === 'true' ? 'success' : 'danger',
                    msg: typeof(res.data) === 'undefined' ? res.notes : res.data.reason
                };
            }
            this.globalAlerts.push(alert);

            if (timeout) {
                $timeout(function () {
                    alerts.closeAlert(alerts.globalAlerts.indexOf(alert));
                }, timeout);
            }
        };

        this.closeAlert = function(index) {
            this.globalAlerts.splice(index, 1);
        };
    });
