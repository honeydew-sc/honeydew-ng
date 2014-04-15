'use strict';

angular.module('honeydew')
    .service('hostname', function () {
        return {
            host: 'https://www.sharecare.com',
            env: 'stage',
            app: 'SC',

            envs: {
                DROZ: ['qa', 'stage', 'prod'],
                SC: ['al', 'cm', 'dw', 'stage', 'prod']
            },

            envOptions: ['qa', 'stage', 'prod'],

            apps: {
                SC: 'sharecare.com',
                DROZ: 'doctoroz.com',
                DS: 'dailystrength.org'
            },

            setEnv: function (env) {
                this.env = env;
                this.resolve();
            },

            setApp: function (app) {
                this.app = app;
                this.envOptions = this.envs[app];
                this.resolve();
            },

            resolve: function () {
                var q = this.env === 'prod' ? '' : '.';
                this.host = 'https://www.' + this.env + q + this.apps[this.app];
            }
        };
    });
