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
        else if ( this._isMobile( app ) ) {
            return this.getMobileUrl( app, env );
        }
        else {
            return this.getStandardUrl( app, env );
        }
    }

    getStandardUrl ( app, env ) {
        let isProd = this._isProd( env );

        let q = isProd ? '' : '.',
            literalEnv = isProd ? '' : env,
            protocol = this._isSharecare( app ) ? 'https://' : 'http://';

        return protocol + 'www.' + literalEnv + q + this.apps[app];
    }

    // We want to keep the army URLs in the config.js file so that we
    // don't unnecessarily advertise them.
    getArmyUrl ( app, env ) {
        let project = app.toLowerCase();

        return this.dotmilConfig[`${project}_${env}`];
    }

    getMobileUrl ( app, env ) {
        let base = 'http://s.qa.origin.sharecare.com/honeydew/',
            appEndpoint = this._isAndroid( env )
                ? 'sc-android.apk'
                : 'app.zip';

        return base + appEndpoint;
    }

    getHealthcheckUrl ( app, env ) {
        let url = this.getEnvUrl( app, env );

        url = url.replace(/https:\/\//, 'http://');
        url += '/healthcheck';
        if (this._isDroz(app) ) {
            url += '.php';
        }

        return url;
    }

    _isMobile ( app ) {
        return app === 'Mobile';
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

    _isDroz ( app ) {
        return app === 'DROZ';
    }

    _isAndroid ( env ) {
        return env === 'Android';
    }
}


Environment.$inject = [ 'dotmilConfig' ];

angular.module('config')
    .service('Environment', Environment);
