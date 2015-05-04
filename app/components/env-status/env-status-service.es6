class HealthcheckStatus {
    constructor ($resource, $http) {
        this.backend = $resource( '/rest.php/envstatus/:env/:type', {
            type: '@type',
            env: '@env'
        });
        this.http = $http;
    }

    query () {
        const envs  = [ 'stage', 'prod' ];

        return envs.map( env => {
            return {
                [env]: this.backend.get({ type: 'healthcheck', env: env })
                    .$promise.then( res => {
                        console.log(res);
                    })
            };
        });
    }
};

HealthcheckStatus.$inject = [ '$resource', '$http' ];

angular.module('honeydew')
    .service('HealthcheckStatus', HealthcheckStatus);
