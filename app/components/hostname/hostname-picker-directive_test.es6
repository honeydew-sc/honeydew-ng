describe('HostnamePickerDirective', function () {
    var scope, $compile, hostname, element, hostValue, ctrl;
    var ENV_COUNT = 13,
        APP_COUNT = 7;

    beforeEach(module('sc.hostname'));

    beforeEach(inject(function ($rootScope, _$compile_, _hostname_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
        hostname = _hostname_;
        scope.name = hostname;

        var tpl = '<hostname-picker></hostname-picker>';
        element = angular.element(tpl);
        var elm = $compile(element)(scope);
        ctrl = element.controller('hostnamePicker');
        scope.$digest();
        hostValue = element.find('.hostname');
    }));

    afterEach(function() {
        element.remove();
        hostValue = undefined;
    });

    it('should create a hostname input', function () {
        expect(hostValue.length).toBe(1);
    });

    it('should list the environments', function () {
        ctrl.emit('SC');
        scope.$apply();
        expect(element.find('.env').length).toBe(ENV_COUNT);
    });

    it('should list the apps', function () {
        expect(element.find('.app').length).toBe(APP_COUNT);
    });

    it('should change the hostname', function () {
        ctrl.emit('SC', 'qa');
        expect(scope.name.host).toMatch(/qa.*sharecare/);
    });
});
