describe('Environment', function () {
    var Environment;

    const SC_ENV_COUNT = 16,
          DEFAULT_ENV_COUNT = 3,
          APP_COUNT = 8;

    beforeEach(module('honeydew'));
    beforeEach(inject(function (_Environment_) {
        Environment = _Environment_;
    }));

    it('should have the proper number of sharecare envs', () => {
        expect(Environment.envs.SC.length).toBe(SC_ENV_COUNT);
    });

    it('should have the requisite number of apps', () => {
        expect(Object.keys(Environment.apps).length).toBe(APP_COUNT);
    });

    it('should have the proper number of default envs', () => {
        expect(Environment.envs.DROZ.length).toBe(DEFAULT_ENV_COUNT);
        expect(Environment.envs.DS.length).toBe(DEFAULT_ENV_COUNT);
        expect(Environment.envs.HCA.length).toBe(DEFAULT_ENV_COUNT);
    });

    it('should construct a normal baby environment', () => {
        let stageUrl = Environment.getEnvUrl( 'SC', 'stage' );
        expect(stageUrl).toBe('https://www.stage.sharecare.com');
    });

    it('should construct a normal production environment', () => {
        let prodUrl = Environment.getEnvUrl( 'DROZ', 'prod' );
        expect(prodUrl).toBe('http://www.doctoroz.com');
    });

    it('should construct an army environment', () => {
        Environment.dotmilConfig.tma_prod = 'fakeUrl';
        let tmaUrl = Environment.getEnvUrl( 'TMA', 'prod' );
        expect(tmaUrl).toBe('fakeUrl');
    });

    it('should construct a mobile environment', () => {
        let mobileUrl = Environment.getEnvUrl( 'Mobile', 'Android' );
        expect(mobileUrl).toBe('http://s.qa.origin.sharecare.com/honeydew/sc-android.apk');
    });

    it('should construct a healthcheck', () => {
        let healthcheck = Environment.getHealthcheckUrl( 'SC', 'prod' );
        expect(healthcheck).toBe('http://www.sharecare.com/healthcheck?details=true');
    });

    it('should construct a droz healthcheck', () => {
        let drozCheck = Environment.getHealthcheckUrl( 'DROZ', 'prod' );
        expect(drozCheck).toBe('http://www.origin.doctoroz.com/healthcheck.php?details=true');
    });

    it('should construct a droz healthcheck', () => {
        let check = Environment.getHealthcheckUrl( 'Army', 'prod' );
        expect(check).toBe('/healthcheck?details=true&healthcheckKey=');
    });

    it('should do reverse url lookups', () => {
        let url = 'https://www.sharecare.com';
        let { app, env } = Environment.lookup(url);
        expect(app).toBe('SC');
        expect(env).toBe('prod');
    });

    it('should construct an appropriate QA DS', () => {
        let url = Environment.getEnvUrl( 'DS', 'qa' );
        expect(url).toBe('https://www-qa.dailystrength.org');
    });

    it('should construct the correct DS prod url', () => {
        let url = Environment.getEnvUrl( 'DS', 'prod' );
        expect(url).toBe('https://www.dailystrength.org');
    });

    it('should construct a proper DS healthcheck', () => {
        let hc = Environment.getHealthcheckUrl( 'DS', 'prod' );
        expect(hc).toMatch('/healthcheck.php');
    });

    it('should construct CNN urls correctly', () => {
        let url = Environment.getEnvUrl( 'CNN', 'stage2' );
        expect(url).toBe('https://cnn.stage2.sharecare.com');
    });
});
