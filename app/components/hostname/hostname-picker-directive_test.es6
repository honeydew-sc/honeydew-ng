describe('HostnamePickerDirective', function () {
    var scope, $compile, $location, hostname, element, hostValue, ctrl;
    var ENV_COUNT = 15,
        APP_COUNT = 8;

    beforeEach(module('sc.hostname'));
    beforeEach(module('tpl'));

    beforeEach(inject(function ($rootScope, _$compile_, _hostname_, _$location_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
        $location = _$location_;
        hostname = _hostname_;
        scope.name = hostname;

        var tpl = '<hostname-picker></hostname-picker>';
        element = angular.element(tpl);
        var elm = $compile(element)(scope);
        scope.$digest();
        ctrl = element.controller('hostnamePicker');
        ctrl.open = true;
        scope.$digest();
        hostValue = element.find('.hostname');
    }));

    afterEach(function() {
        element.remove();
        hostValue = undefined;
    });

    it('should ng-if out of the DOM when closed', () => {
        ctrl.open = false;
        scope.$digest();
        expect(element.find('.hostname button').length).toBe(0);
    });

    it('should create a hostname input', function () {
        expect(hostValue.length).toBe(1);
    });

    it('should list the environments', function () {
        ctrl.emit('SC');
        scope.$apply();
        expect(element.find('.env').length).toBeGreaterThan(ENV_COUNT);
    });

    it('should list the apps', function () {
        expect(element.find('.app').length).toBeGreaterThan(APP_COUNT);
    });

    it('should change the hostname', function () {
        ctrl.emit('SC', 'qa');
        expect(scope.name.host).toMatch(/qa.*sharecare/);
    });

    it('should emit an event when the hostname is manually changed', () => {
        let input = element.find('input'),
            changed = 0;

        spyOn( ctrl, 'userChangedHostname' ).and.callThrough();
        scope.$on( 'hostname:changed', () => changed++ );

        input.triggerHandler('blur');

        expect( ctrl.userChangedHostname ).toHaveBeenCalled();
        expect( changed ).toBe( 1 );
    });

    it('should automatically close the dropdown when choosing an env', () => {
        ctrl.open = true;
        let env = element.find('.btn-hdew.env:first-child');
        env.click();
        expect(ctrl.open).toBe(false);
    });
});
