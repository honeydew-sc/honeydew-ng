'use strict';

angular.module('sc.hostname')
    .service('hostname', function (hostnamePickerDomains, $rootScope, $localStorage) {
        var store = $localStorage;
        var hostnameService = {
            envs: {
                SC: ['al', 'cm', 'dw', 'al2', 'cm2', 'dw2', 'stage', 'prod'],
                DROZ: ['qa', 'stage', 'prod'],
                DS: ['qa', 'stage', 'prod'],
                Mobile: ['iOS', 'Android'],
                Army: ['dev', 'stage', 'test', 'prod'],
                TMA: ['dev', 'stage', 'test', 'prod']
            },

            apps: {
                SC: 'sharecare.com',
                DROZ: 'doctoroz.com',
                DS: 'dailystrength.org',
                Mobile: '',
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
                    if (this.app === 'Mobile') {
                        var base = 'http://s.qa.origin.sharecare.com/honeydew/';
                        var app = this.env === 'Android' ? 'sc-android.apk' : 'app.zip';
                        store.host = base + app;
                    }
                    else if (this.app === 'Army' || this.app === 'TMA') {
                        store.host = hostnamePickerDomains[this.app.toLowerCase()][this.env];
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

        (function initializeHostnameService () {
            hostnameService.appOptions = Object.keys(hostnameService.apps);

            if (store.host) {
                hostnameService.host = store.host;
            }
            else {
                hostnameService.host = 'https://www.stage.sharecare.com';
            }

            if (store.hostname) {
                if (store.hostname.app) {
                    setEnvOptions(store.hostname.app);
                    if (store.hostname.env) {
                        hostnameService.env = store.hostname.env;
                    }
                }
                else {
                    setEnvOptions('SC');
                }
            }
            else {
                store.hostname = {};
                setEnvOptions('SC');
            }
        })();

        function setEnvOptions(app, resetEnv) {
            hostnameService.app = store.hostname.app = app;
            hostnameService.envOptions = hostnameService.envs[app];

            if (resetEnv) {
                hostnameService.env = undefined;
            }
        }

        $rootScope.$on('hostname:update', function (event, app, env) {
            if (app) {
                setEnvOptions(app, true);
            }

            if (env) {
                store.hostname.env = hostnameService.env = env;
            }

            hostnameService.resolve();
        });

        // we want to update localStorage when there are manual changes to the hostname
        $rootScope.$watch(function() {
            return hostnameService.host;
        }, function () {
            store.host = hostnameService.host;
        });

        return hostnameService;
    });
