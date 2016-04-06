class Environment {
    constructor (dotmilConfig) {
        this.dotmilConfig = dotmilConfig;

        const defaultEnvs = [ 'qa', 'stage', 'prod' ];
        this.envs = {
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
                'stage2',
                'prod'
            ],
            DROZ: defaultEnvs,
            DS: defaultEnvs,
            HCA: defaultEnvs,
            QH: defaultEnvs,
            CNN: ['sg2', 'stage2', 'prod'],
            Army: ['dev', 'stage', 'test', 'prod'],
            TMA: ['dev', 'stage', 'test', 'prod']
        };

        this.apps = {
            SC: 'sharecare.com',
            DROZ: 'doctoroz.com',
            HCA: 'hca.sharecare.com',
            DS: 'dailystrength.org',
            Army: '',
            TMA: '',
            QH: 'qualityhealth.com',
            CNN: 'sharecare.com'
        };

        this.urlLookup = [];
    }

    getEnvUrl ( app, env ) {
        if ( this._isArmy( app ) ) {
            return this.getArmyUrl( app, env );
        }
        else if ( this._isDs( app ) ) {
            return this.getDailyStrengthUrl( app, env );
        }
        else if ( this._isQh( app ) ) {
            return this.getQualityHealthUrl( app, env );
        }
        else {
            return this.getStandardUrl( app, env );
        }
    }

    getStandardUrl ( app, env ) {
        let isProd = this._isProd( env );
        let subdomain = this._isCnn( app ) ? 'cnn.' : 'www.';

        let q = isProd ? '' : '.',
            literalEnv = isProd ? '' : env,
            protocol = this._isSharecare( app ) ? 'https://' : 'http://';

        return protocol + subdomain + literalEnv + q + this.apps[app];
    }

    // We want to keep the army URLs in the config.js file so that we
    // don't unnecessarily advertise them.
    getArmyUrl ( app, env ) {
        let project = app.toLowerCase();

        return this.dotmilConfig[`${project}_${env}`];
    }

    getDailyStrengthUrl ( app, env ) {
        let subdomainSuffix = /^prod$/.test( env ) ? '' : `-${env}`;
        let subdomain = `www${subdomainSuffix}.`;
        let protocol = 'https://';

        return protocol + subdomain + this.apps[app];
    }

    getHealthcheckUrl ( app, env ) {
        let url = this.getEnvUrl( app, env ) || '';

        url = url.replace(/https:\/\//, 'http://');
        url += '/healthcheck';

        if (this._isDs( app ) ) {
            url += '.php';
        }
        else if (this._isDroz( app ) ) {
            url = url.replace(/doctoroz\.com/, 'origin.doctoroz.com');
            url += '.php';
        }

        if (this._isArmy( app ) ) {
            return this._armyHealthcheckPass( url );
        }
        else {
            return url += '?details=true';
        }
    }

    getQualityHealthUrl ( app, env ) {
        let protocol = 'https://';
        if ( env === 'stage' ) {
            return protocol + 'stage.' + this.apps[app];
        }
        else if ( env === 'qa' ) {
            return protocol + 'qa-stg.' + this.apps[app];
        }
        else {
            return protocol + 'www.' + this.apps[app];
        }
    }

    lookup ( url ) {
        let lookup = this._getUrlLookup();

        if ( lookup.hasOwnProperty( url ) ) {
            return lookup[url];
        }
        else {
            return '';
        }
    }

    _getUrlLookup() {
        if ( this.urlLookup.length === 0 ) {
            this.urlLookup = Object.keys(this.envs)
                .map( app => {
                    return this.envs[app].map( env => {
                        return { app, env };
                    });
                })
                .reduce( (acc, pairs) => {
                    return acc.concat(pairs);
                }, [])
                .reduce( (acc, { app, env }) => {
                    acc[this.getEnvUrl(app, env)] = { app, env };
                    return acc;
                }, []);
        }

        return this.urlLookup;
    }

    _isArmy ( env ) {
        let lowerEnv = env.toLowerCase();

        return lowerEnv === 'army' || lowerEnv === 'tma';
    }

    _armyHealthcheckPass ( url ) {
        let healthcheckKey = this.dotmilConfig['healthcheckKey'] || '';
        let armyCheck = url
                .replace('http', 'https')
                .replace('//healthcheck', '/healthcheck')
                + '?details=true'
                + `&healthcheckKey=${healthcheckKey}`;

        return armyCheck;
    }

    _isProd ( env ) {
        return env === 'prod';
    }

    _isSharecare ( app ) {
        return app === 'SC' || this.apps[app] === 'sharecare.com';
    }

    _isDroz ( app ) {
        return app === 'DROZ';
    }

    _isDs ( app ) {
        return app === 'DS';
    }

    _isQh ( app ) {
        return app === 'QH';
    }

    _isCnn ( app ) {
        return app === 'CNN';
    }

    _isAndroid ( env ) {
        return env === 'Android';
    }
}

angular.module('config')
    .service('Environment', Environment);
