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

        // Eventually, we'll want to do all Apps. For now, just Sharecare.
        // this.apps = Object.keys(Environment.apps);
        this.apps = [ 'SC', 'HCA' ];

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
                    this.statuses[key] = results[key] = res;
                });

                promises.push(p);
            });
        });

        results.$promise = this.q.all(promises);
        return results;
    }
};

EnvStatus.$inject = [ '$resource', '$http', '$q', 'Environment' ];

angular.module('honeydew')
    .service('EnvStatus', EnvStatus);
