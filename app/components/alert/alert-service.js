'use strict';

angular.module('honeydew')
    .service('alerts', function () {
        this.globalAlerts =  [];

        this.addAlert = function(res) {
            var type = res.success === 'true' ? 'success' : 'danger';
            var msg = res.data.reason;
            this.globalAlerts.push({type: type, msg: msg});
        };

        this.closeAlert = function(index) {
            this.globalAlerts.splice(index, 1);
        };
    });
