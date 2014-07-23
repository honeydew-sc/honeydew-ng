describe('HostnamePickerDirective', function () {
    var scope, $compile, hostname, element, hostValue;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($rootScope, _$compile_, _hostname_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
        hostname = _hostname_;
        scope.hostname = hostname;

        var tpl = '<hostname-picker></hostname-picker>';
        element = angular.element(tpl);
        var elm = $compile(element)(scope);
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
        expect(element.find('.env').length).toBe(3);
        hostname.app = 'SC';
        scope.$apply();
        expect(element.find('.env').length).toBe(8);
    });

    it('should list the apps', function () {
        expect(element.find('.app').length).toBe(6);
    });

    it('should change the hostname', function () {
        scope.hostname.app = 'SC';
        scope.hostname.env = 'qa';
        scope.$apply();
        expect(scope.hostname.host).toMatch(/qa.*sharecare/);
    });
});
