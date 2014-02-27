'use strict';

angular.module('honeydew')
    .service('alerts', function () {
        this.globalAlerts =  [];

        this.addAlert = function(res) {
            this.globalAlerts.push({
                type: res.success === 'true' ? 'success' : 'danger',
                msg: typeof(res.data) === 'undefined' ? res.notes : res.data.reason
            });
        };

        this.closeAlert = function(index) {
            this.globalAlerts.splice(index, 1);
        };
    });
