class EnvStatus {
    constructor ($resource, $http, Environment) {
        this.backend = $resource( '/rest.php/envstatus/app/:app/env/:env', {
            app: '@app',
            env: '@env'
        });
        this.http = $http;

        this.envs = Environment.envs;

        // Eventually, we'll want to do all Apps. For now, just Sharecare.
        // this.apps = Object.keys(Environment.apps);
        this.apps = [ 'SC' ];
    }

    query () {
        let statuses = {};
        this.apps.forEach( app => {
            this.backend.get({ app: app, env: 'prod' })
                .$promise.then( res => {
                    statuses[app] = res;
                });
        });

        return statuses;
    }
};

EnvStatus.$inject = [ '$resource', '$http', 'Environment' ];

angular.module('honeydew')
    .service('EnvStatus', EnvStatus);
