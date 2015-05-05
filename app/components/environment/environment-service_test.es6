describe('Environment', function () {
    var Environment;

    const SC_ENV_COUNT = 15,
          DEFAULT_ENV_COUNT = 3,
          APP_COUNT = 6;

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
});
