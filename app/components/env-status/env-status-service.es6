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
            let envs = this.envs[app].filter( envFilter ),
                kabochaStatuses = this._getKabochaStatuses( app );

            envs.forEach( env => {
                let key = `${app}, ${env}`,
                    checkUrl = this.Environment.getHealthcheckUrl( app, env );

                let p = this.backend.get({
                        app: app,
                        env: env,
                        check: checkUrl
                    }).$promise;
                results[key] = results[key] || {};

                p.then( initializeHoneydew )
                    .then( status => addHoneydewSummary.call( this, app, status ) )
                    .then( status => addHoneydewDashboard.call( this, app, env, status ) )

                    .then( initializeKabocha )
                    .then( status => addKabochaSummary.call( this, app, env, status ) )
                    .then( addKabochaDashboard )

                    .then( status => addHealthcheckLinks.call( this, app, checkUrl, status ) )

                    .then( status => collectResults( key, status ) );

                promises.push(p);
            });

            function initializeHoneydew ( status ) {
                status.honeydew = status.honeydew || {};
                return status;
            }

            function addHoneydewSummary ( app, status ) {
                let arbitraryHoneydewSuccess = getHoneydewSuccessFor( app );
                if ( status.hasOwnProperty('honeydew') && status.honeydew.total != 0 ) {
                    status.honeydew.summary = Math.round(
                        status.honeydew.success / status.honeydew.total * 100
                    ) > arbitraryHoneydewSuccess;
                }

                return status;
            }

            function getHoneydewSuccessFor( app ) {
                if ( app === 'DROZ' ) {
                    return 95;
                }
                else {
                    return 75;
                }
            }

            function addHoneydewDashboard ( app, env, res ) {
                let envUrl = encodeURIComponent(
                    this.Environment.getEnvUrl( app, env )
                ),
                    build =  res.build.webpub,
                    endpoint = '/dashboard/index.html';

                res.honeydew.url = `${endpoint}?build=${build}&hostname=${envUrl}`;

                return res;
            }

            function initializeKabocha ( status ) {
                status.kabocha = status.kabocha || {};
                return status;
            }

            function addKabochaSummary ( app, env, status ) {
                if ( this.isSharecare( app ) ) {
                    kabochaStatuses
                        .then( reformatKabochaStatuses )
                        .then( statuses => {
                            status.kabocha.summary = statuses[env];
                        });
                }

                return status;

                function reformatKabochaStatuses ( res ) {
                    let statuses = {};
                    Object.keys(res.data.data).forEach( env => {
                        statuses[env] = res.data.data[env].status !== 'not ok';
                    });

                    return statuses;
                }
            }

            function addKabochaDashboard ( status ) {
                status.kabocha.url = '/kabocha/dashboard.html';
                return status;
            }

            function addHealthcheckLinks ( app, checkUrl, status ) {
                status.healthcheck = status.healthcheck || {};

                if ( this.isSharecare( app ) ) {
                    // sharecare has author and data boxes that also
                    // have healthchecks.
                    [ 'author', 'data'].forEach( box => {
                        status.healthcheck[box] = status.healthcheck[box] || {};
                        status.healthcheck[box].url = checkUrl.replace(/www/, box);
                    });
                }

                status.healthcheck.webpub = status.healthcheck.webpub || {};

                status.healthcheck.webpub.url = checkUrl;
                return status;
            }

            function collectResults( key, status ) {
                results[key] = status;
                return status;
            }

        });

        results.$promise = this.q.all(promises);
        return results;
    }

    _getKabochaStatuses ( app ) {
        if ( this.isSharecare( app ) ) {
            let p = this.http.get('/kabocha/api.php/logs/kabocha/status');

            return p;
        }
        else {
            return {};
        }
    }

    isSharecare( app ) {
        return app === 'SC';
    }
};

angular.module('honeydew')
    .service('EnvStatus', EnvStatus);
