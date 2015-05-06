ddescribe('EnvStatus directive', () => {
    var elm,
        ctrl,
        scope,
        EnvStatus;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( ($compile, $rootScope, _EnvStatus_) => {
        EnvStatus = _EnvStatus_;
        // EnvStatus.statuses = {};
        EnvStatus.statuses['SC, prod'] = {
            healthcheck: { summary: true },
            honeydew: { summary: true }
        };

        spyOn(EnvStatus, 'query');

        elm = angular.element('<env-status app="SC"></env-status>');
        scope = $rootScope;
        $compile(elm)(scope);
        scope.$digest();

        ctrl = elm.isolateScope().EnvStatus;
    }));

    it('should make the statuses available on the vm', () => {
        expect(ctrl.statuses['SC, prod']
               .healthcheck.summary).toBe(true);
        expect(ctrl.statuses['SC, prod']
               .honeydew.summary).toBe(true);
    });

    it('should query the backend for statuses', () => {
        expect(EnvStatus.query).toHaveBeenCalled();
    });

    it('should have table headers ', () => {
        let headers = elm.find('table.table th').text();
        expect(headers).toBe('appenvhealthcheck');
    });

    it('should properly split the name and env out', () => {
        let name = elm.find('td.name').text().trim();
        expect(name).toBe('SC');

        let env = elm.find('td.env').text().trim();
        expect(env).toBe('prod');
    });

    it('should make a green checkmark for successful healthchecks', () => {
        let successfulHealthcheck = elm.find('td.healthcheck span').attr('class');
        expect(successfulHealthcheck).toMatch(/check.*green/);
    });

    it('should make a red X for successful healthchecks', () => {
        EnvStatus.statuses['SC, prod'].healthcheck.summary = false;
        scope.$digest();

        let successfulHealthcheck = elm.find('td.healthcheck span').attr('class');
        expect(successfulHealthcheck).toMatch(/times.*red/);
    });

    it('should make a red X for failed healthchecks', () => {
        EnvStatus.statuses['SC, prod'].healthcheck.summary = false;
        scope.$digest();

        let successfulHealthcheck = elm.find('td.healthcheck span').attr('class');
        expect(successfulHealthcheck).toMatch(/times.*red/);
    });

    it('should make a silver X for pending healthchecks', () => {
        EnvStatus.statuses['SC, prod'] = {};
        scope.$digest();

        let pendingHealthcheck = elm.find('td.healthcheck span').attr('class');
        expect(pendingHealthcheck).toMatch(/times.*silver/);
    });
});
