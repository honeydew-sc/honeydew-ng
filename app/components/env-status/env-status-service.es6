class EnvStatus {
    constructor ($resource, $http, $q, Environment) {
        this.backend = $resource( '/rest.php/envstatus/app/:app/env/:env', {
            app: '@app',
            env: '@env'
        }, {
            get: { method: 'GET', cache: true }
        });
        this.http = $http;
        this.q = $q;

        this.Environment = Environment;
        this.envs = Environment.envs;
        this.apps = Object.keys(Environment.apps);

        this.statuses = this.statuses || {};
    }

    query ( appFilter = () => true, envFilter = () => true ) {
        let promises = [],
            apps = this.apps.filter( appFilter ),
            results = {};

        apps.forEach( app => {
            let envs = this.envs[app].filter( envFilter );

            envs.forEach( env => {
                let key = `${app}, ${env}`;

                this.statuses[key] = results[key] = {};

                let p = this.backend.get({
                    app: app,
                    env: env,
                    check: this.Environment.getHealthcheckUrl( app, env )
                }).$promise;

                p.then( res => {
                    let ARBITRARY_HONEYDEW_SUCCESS = 75;
                    if ( res.hasOwnProperty('honeydew') && res.honeydew.total != 0 ) {
                        res.honeydew.summary = Math.round(
                            res.honeydew.success / res.honeydew.total * 100
                        ) > ARBITRARY_HONEYDEW_SUCCESS;
                    }

                    let envUrl = this.Environment.getEnvUrl( app, env ),
                        build = res.build.webpub,
                        endpoint = '/dashboard/index.html';
                    res.honeydew.url = `${endpoint}?build=${build}&hostname=${envUrl}&fail-filter=true`;

                    return res;
                }).then( res => {
                    // ehhhh let's keep all the results around on
                    // statuses? shrug.
                    this.statuses[key] = results[key] = res;
                });

                promises.push(p);
            });
        });

        results.$promise = this.q.all(promises);
        return results;
    }
};

angular.module('honeydew')
    .service('EnvStatus', EnvStatus);
