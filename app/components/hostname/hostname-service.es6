angular.module('sc.hostname')
    .service('hostname', function (dotmilConfig, $rootScope, $localStorage, Environment) {
        var store = $localStorage;

        let apps = Environment.apps,
            envs = Environment.envs;
        envs.Mobile = [ 'iOS', 'Android' ];
        apps.Mobile = '';

        var hostnameService = {
            envs: Environment.envs,
            apps: Environment.apps,

            envOptions: [],
            appOptions: [],

            highlight: [],

            resolve: function () {
                // when restoring from localStorage, we undefine the
                // env to prevent from overwriting the stored value.
                if (this.env) {
                    store.host = Environment.getEnvUrl( this.app, this.env );
                    this.host = store.host;

                    $rootScope.$broadcast('hostname:changed', this.host);
                }
            },

            highlightEnvs( appEnvPairs ) {
                this.highlight = appEnvPairs;
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
