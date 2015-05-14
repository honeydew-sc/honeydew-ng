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
    }

    query ( appFilter = () => true, envFilter = () => true ) {
        let promises = [],
            apps = this.apps.filter( appFilter ),
            results = {};

        apps.forEach( app => {
            let envs = this.envs[app].filter( envFilter );

            envs.forEach( env => {
                let key = `${app}, ${env}`;


                let p = this.backend.get({
                    app: app,
                    env: env,
                    check: this.Environment.getHealthcheckUrl( app, env )
                }).$promise;

                p.then( addHoneydewSummary )
                    .then( addHoneydewDashboard.bind(this) )
                    .then( collectResults );

                promises.push(p);

                function addHoneydewSummary ( res ) {
                    let ARBITRARY_HONEYDEW_SUCCESS = 75;
                    if ( res.hasOwnProperty('honeydew') && res.honeydew.total != 0 ) {
                        res.honeydew.summary = Math.round(
                            res.honeydew.success / res.honeydew.total * 100
                        ) > ARBITRARY_HONEYDEW_SUCCESS;
                    }

                    return res;
                }

                function addHoneydewDashboard ( res ) {
                    let envUrl = encodeURIComponent(
                        this.Environment.getEnvUrl( app, env )
                    ),
                        build =  res.build.webpub,
                        endpoint = '/dashboard/index.html';

                    res.honeydew.url = `${endpoint}?build=${build}&hostname=${envUrl}`;

                    return res;
                }

                function collectResults( res ) {
                    results[key] = res;
                    return res;
                }
            });
        });

        results.$promise = this.q.all(promises);
        return results;
    }
};

angular.module('honeydew')
    .service('EnvStatus', EnvStatus);
