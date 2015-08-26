class KabochaStatus {
    constructor ( $http ) {
        this.http = $http;

        this.endpoint = '/kabocha/api.php/logs/kabocha/status';
        this.result = undefined;
    }

    get ( app ) {
        if ( this.isSharecare( app ) ) {
            if ( typeof( this.result ) === 'undefined' ) {
                this.result = this.http.get( this.endpoint )
                    .then( this.collectSummaries )
                    .then( this.collectSuites );
            }

            return this.result;
        }
        else {
            return {};
        }
    }

    collectSummaries ( res ) {
        let statuses = {};
        Object.keys(res.data.data).forEach( env => {
            statuses[env] = {
                summary: res.data.data[env].status !== 'not ok'
            };
        });

        return { res, statuses };
    }


    collectSuites ({ res, statuses }) {
        Object.keys( res.data.data ).forEach( ( env ) => {
            statuses[env].success = [];
            statuses[env].failure = [];

            if ( res.data.data[env].hasOwnProperty('suites') ) {
                let suiteData = res.data.data[env].suites;
                Object.keys( suiteData ).forEach( ( suite ) => {
                    if ( suiteData[suite].status === 'not ok' ) {
                        statuses[env].failure.push(suite);
                    }
                    else {
                        statuses[env].success.push(suite);
                    }
                });
            }
        });

        return statuses;
    }

    isSharecare( app ) {
        return app === 'SC';
    }
}

angular.module('honeydew').service('KabochaStatus', KabochaStatus);
