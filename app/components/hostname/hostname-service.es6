'use strict';

angular.module('sc.hostname')
    .service('hostname', function (dotmilConfig, $rootScope, $localStorage) {
        var store = $localStorage;
        var defaultEnvs = ['qa', 'stage', 'prod' ];
        var hostnameService = {
            envs: {
                SC: [
                    'al',
                    'al2',
                    'cm',
                    'cm2',
                    'dw',
                    'dw2',
                    'jd',
                    'jd2',
                    'kms',
                    'kms2',
                    'sg',
                    'mservices',
                    'preview',
                    'stage',
                    'prod'
                ],
                DROZ: defaultEnvs,
                DS: defaultEnvs,
                HCA: defaultEnvs,
                Mobile: ['iOS', 'Android'],
                Army: ['dev', 'stage', 'test', 'prod'],
                TMA: ['dev', 'stage', 'test', 'prod']
            },

            apps: {
                SC: 'sharecare.com',
                DROZ: 'doctoroz.com',
                HCA: 'hca.sharecare.com',
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
                        store.host = dotmilConfig[this.app.toLowerCase() + '_' + this.env];
                    }
                    else {
                        var q = this.env === 'prod' ? '' : '.';
                        var literalEnv = this.env === 'prod' ? '' : this.env;
                        var protocol = this.app === 'SC' ? 'https://' : 'http://';
                        store.host = protocol + 'www.' + literalEnv + q + this.apps[this.app];
                    }

                    this.host = store.host;

                    $rootScope.$broadcast('hostname:changed', this.host);
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
