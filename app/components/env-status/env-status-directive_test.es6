describe('EnvStatus directive', () => {
    var elm,
        elm2,
        ctrl,
        scope,
        $compile,
        EnvStatus;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( (_$compile_, $rootScope, _EnvStatus_) => {
        $compile = _$compile_;
        EnvStatus = _EnvStatus_;

        var mockStatuses = {
            'SC, prod': {
                healthcheck: { summary: true },
                honeydew: {
                    summary: true,
                    success: 1,
                    total: 2
                }
            }
        };

        spyOn(EnvStatus, 'query').and.returnValue(mockStatuses);

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

    it('should have table headers with kabocha for SC', () => {
        let headers = elm.find('table.table th').text();
        expect(headers).toBe([
            'SC: env',
            'healthcheck',
            'honeydew',
            'kabocha'
        ].join(''));
    });

    it('should not have kabocha for other apps', () => {
        elm = angular.element('<env-status app="DROZ"></env-status>');
        $compile(elm)(scope);
        scope.$digest();

        let headers = elm.find('table.table th').text();
        expect(headers).toBe([
            'DROZ: env',
            'healthcheck',
            'honeydew'
        ].join(''));
    });

    it('should properly split the name and env out', () => {
        let env = elm.find('td.env').text().trim();
        expect(env).toBe('prod');
    });

    it('should make a green checkmark for successful healthchecks', () => {
        let successfulHealthcheck = elm.find('td.healthcheck span').attr('class');
        expect(successfulHealthcheck).toMatch(/check.*green/);
    });

    it('should make a red X for successful healthchecks', () => {
        ctrl.statuses['SC, prod'].healthcheck.summary = false;
        scope.$digest();

        let successfulHealthcheck = elm.find('td.healthcheck span').attr('class');
        expect(successfulHealthcheck).toMatch(/times.*red/);
    });

    it('should make a red X for failed healthchecks', () => {
        ctrl.statuses['SC, prod'].healthcheck.summary = false;
        scope.$digest();

        let successfulHealthcheck = elm.find('td.healthcheck span').attr('class');
        expect(successfulHealthcheck).toMatch(/times.*red/);
    });

    it('should make a silver X for pending healthchecks', () => {
        ctrl.statuses['SC, prod'] = {};
        scope.$digest();

        let pendingHealthcheck = elm.find('td.healthcheck span').attr('class');
        expect(pendingHealthcheck).toMatch(/times.*silver/);
    });

    it('should allow for tables to have different data', () => {
        let elm2 = angular.element('<env-status app="DROZ"></env-status>');
        EnvStatus.query.and.returnValue({
            'DROZ, prod': {
                healthcheck: { summary: true },
                honeydew: { summary: true }
            }
        });
        $compile(elm2)(scope.$new());
        scope.$digest();

        let firstTableHeader = 'th:nth-child(1)';
        expect(elm.find(firstTableHeader).text()).toMatch(/SC/);
        expect(elm2.find(firstTableHeader).text()).toMatch(/DROZ/);
    });

    it('should display detailed information on click', () => {
        let row = elm.find('tr');
        row.click();

        expect(ctrl.statuses['SC, prod'].detailedView).toBe(true);
        expect(elm.find('[env-status-detail]').length).toBe(1);
    });

    it('should display a link to the actual environment', () => {
        let link = elm.find('.env a');
        expect(link.text()).toMatch('prod');
    });
});
