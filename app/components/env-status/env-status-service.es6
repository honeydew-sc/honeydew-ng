class EnvStatus {
    constructor ($resource, $http, $q, Environment, KabochaStatus) {
        this.backend = $resource( '/rest.php/envstatus/app/:app/env/:env', {
            app: '@app',
            env: '@env'
        }, {
            get: { method: 'GET', cache: true }
        });
        this.http = $http;
        this.q = $q;

        this.Environment = Environment;
        this.KabochaStatus = KabochaStatus;
        this.isSharecare = this.KabochaStatus.isSharecare;
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
                    .then( filterHoneydewDetails )
                    .then( accumulateHoneydewDetails )
                    .then( status => addHoneydewSummary.call( this, app, status ) )
                    .then( status => addHoneydewDashboard.call( this, app, env, status ) )

                    .then( initializeKabocha )
                    .then( status => addKabochaSummary.call( this, app, env, status ) )
                    .then( addKabochaDashboard )

                    .then( status => addHealthcheckLinks.call( this, app, checkUrl, status ) )

                    .then( status => addEnvUrl.call( this, app, env, status ) )

                    .then( status => collectResults( key, status ) )

                    .catch( console.log.bind(console) );

                promises.push(p);
            });

            function initializeHoneydew ( status ) {
                status.honeydew = status.honeydew || {};
                return status;
            }

            function filterHoneydewDetails ( status ) {
                let details = status.honeydew.details || [],
                    mostRecentSets = {};

                // Unique the existing sets so we only count the most
                // recent run of the set - if a set runs multiple
                // times, the backend gives us the information for
                // each run, but we're only interested in the most
                // recent occasion.

                details.forEach( set => {
                    let { id, setName } = set;
                    if ( !mostRecentSets.hasOwnProperty( setName ) ||
                         mostRecentSets[setName].id < id ) {
                             mostRecentSets[setName] = set;
                         }
                });

                status.honeydew.mostRecentSets = mostRecentSets;

                return status;
            }

            function accumulateHoneydewDetails ( status ) {
                // Now that we have the most recent sets, we just need
                // to accumulate the totals.
                let mostRecentSets = status.honeydew.mostRecentSets || {},
                    hdewStatus = { success: 0, total: 0 };

                for ( let key in mostRecentSets ) {
                    let { success, total } = mostRecentSets[key];
                    hdewStatus.success += parseInt(success);
                    hdewStatus.total += parseInt(total);
                }

                status.honeydew.success = hdewStatus.success;
                status.honeydew.total = hdewStatus.total;

                return status;
            }

            function addHoneydewSummary ( app, status ) {
                if ( status.hasOwnProperty('honeydew') && status.honeydew.total != 0 ) {
                    let { success, total } = status.honeydew;
                    if ( app === 'DROZ' ) {
                        status.honeydew.summary = getHoneydewDrozStatus( success, total );
                    }
                    else {
                        status.honeydew.summary = getHoneydewGenericStatus( success, total );
                    }
                }

                return status;
            }

            function getHoneydewDrozStatus( success, total ) {
                let DROZ_ACCEPTABLE_FAILURE = 15;
                return total - success < DROZ_ACCEPTABLE_FAILURE;
            }

            function getHoneydewGenericStatus( success, total ) {
                let SUCCESS_RATIO = 75;
                return Math.floor(success / total * 100) > SUCCESS_RATIO;
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
                        .then( statuses => {
                            status.kabocha = Object.assign( status.kabocha, statuses[env] );
                        });
                }

                return status;
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

            function addEnvUrl ( app, env, status ) {
                status.url = this.Environment.getEnvUrl( app, env );
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
};

angular.module('honeydew')
    .service('EnvStatus', EnvStatus);
