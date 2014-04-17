'use strict';

angular.module('honeydew')
    .service('hostname', function ($rootScope, $localStorage) {
        var store = $localStorage;
        var hostnameService = {
            env: 'stage',
            app: 'SC',

            envs: {
                SC: ['al', 'cm', 'dw', 'stage', 'prod'],
                DROZ: ['qa', 'stage', 'prod'],
                DS: ['qa', 'stage', 'prod'],
                iOS: ['AskMD', 'SCPrototype'],
                Army: ['dev', 'stage', 'test', 'prod'],
                TMA: ['dev', 'stage', 'test', 'prod']
            },

            apps: {
                SC: 'sharecare.com',
                DROZ: 'doctoroz.com',
                DS: 'dailystrength.org',
                iOS: '',
                Army: '',
                TMA: ''
            },

            envOptions: [],
            appOptions: [],

            resolve: function () {
                // when restoring from localStorage, we undefine the
                // env to prevent from overwriting the stored value.
                if (this.env) {

                    // the mobile hostnames look different
                    if (this.app === 'iOS') {
                        var base = 'http://s.qa.origin.sharecare.com/honeydew/';
                        var app = this.env === 'AskMD' ? 'askmd.zip' : 'app.zip';
                        store.host = base + app;
                    }
                    else if (this.app === 'Army' || this.app === 'TMA') {
                        store.host = domains[this.app.toLowerCase()][this.env];
                    }
                    else {
                        var q = this.env === 'prod' ? '' : '.';
                        var literalEnv = this.env === 'prod' ? '' : this.env;
                        var protocol = this.app === 'SC' ? 'https://' : 'http://';
                        store.host = protocol + 'www.' + literalEnv + q + this.apps[this.app];
                    }

                    this.host = store.host;
                }
            }
        };

        $rootScope.$watch(function() {
            return hostnameService.env;
        }, function (newValue, oldValue) {
            hostnameService.resolve();
        });

        $rootScope.$watch(function() {
            return hostnameService.app;
        }, function () {
            var app = hostnameService.app;
            hostnameService.envOptions = hostnameService.envs[app];
            hostnameService.resolve();
        });

        hostnameService.appOptions = Object.keys(hostnameService.apps);
        hostnameService.envOptions = ['qa', 'stage', 'prod'];

        if (store.host) {
            hostnameService.env = undefined;
            hostnameService.host = store.host;
        }
        else {
            hostnameService.host = 'https://www.stage.sharecare.com';
        }

        return hostnameService;
    });
