describe('Environment', function () {
    var Environment;

    beforeEach(module('honeydew'));
    beforeEach(inject(function (_Environment_) {
        Environment = _Environment_;
    }));

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

    it('should construct the correct QH stage url', () => {
        let url = Environment.getEnvUrl( 'QH', 'stage' );
        expect(url).toBe('https://stage.qualityhealth.com');
    });

    it('should construct the correct QH stage url', () => {
        let url = Environment.getEnvUrl( 'QH', 'prod' );
        expect(url).toBe('https://www.qualityhealth.com');
    });

    it('should construct CNN urls correctly', () => {
        let url = Environment.getEnvUrl( 'CNN', 'stage2' );
        expect(url).toBe('https://cnn.stage2.sharecare.com');
    });

    describe('segments', () => {
        it('should construct HCA global URLs correctly', () => {
            let url = Environment.getEnvUrl( 'SG', 'hca (global)' );
            expect(url).toBe('https://hca.sg.sharecare.com');
        });

        it('should construct HCA segment URLs correctly', () => {
            let url = Environment.getEnvUrl( 'SG', 'rocktenn' );
            expect(url).toBe('https://rocktenn.hca.sg.sharecare.com');
        });

        it('should construct HCA stage2 segment URLs correctly', () => {
            let url = Environment.getEnvUrl( 'STAGE2', 'rocktenn' );
            expect(url).toBe('https://rocktenn.hca.stage2.sharecare.com');
        });
    });
});
