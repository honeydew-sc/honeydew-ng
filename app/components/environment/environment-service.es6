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
                'prod'
            ],
            DROZ: defaultEnvs,
            DS: defaultEnvs,
            HCA: defaultEnvs,
            Army: ['dev', 'stage', 'test', 'prod'],
            TMA: ['dev', 'stage', 'test', 'prod']
        };

        this.apps = {
            SC: 'sharecare.com',
            DROZ: 'doctoroz.com',
            HCA: 'hca.sharecare.com',
            DS: 'dailystrength.org',
            Army: '',
            TMA: ''
        };
    }

    getEnvUrl ( app, env ) {
        if ( this._isArmyApp( app ) ) {
            return this.getArmyUrl( app, env );
        }
        else {
            let isProd = this._isProd( env );

            let q = isProd ? '' : '.',
                literalEnv = isProd ? '' : env,
                protocol = this._isSharecare( app ) ? 'https://' : 'http://';

            return protocol + 'www.' + literalEnv + q + this.apps[app];
        }
    }

    // We want to keep the army URLs in the config.js file so that we
    // don't unnecessarily advertise them.
    getArmyUrl ( app, env ) {
        let project = app.toLowerCase();

        return this.dotmilConfig[`${project}_${env}`];
    }

    _isArmyApp ( env ) {
        let lowerEnv = env.toLowerCase();

        return lowerEnv === 'army' || lowerEnv === 'tma';
    }

    _isProd ( env ) {
        return env === 'prod';
    }

    _isSharecare ( app ) {
        return app === 'SC';
    }
}


Environment.$inject = [ 'dotmilConfig' ];

angular.module('config')
    .service('Environment', Environment);
