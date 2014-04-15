ddescribe('HostnamePickerDirective', function () {
    var scope, $compile, hostname, element, hostValue;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($rootScope, _$compile_, _hostname_) {
        scope = $rootScope.$new();
        $compile = _$compile_;
        hostname = _hostname_;

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
        expect(element.find('.env').length).toBe(5);
        console.log(element);
    });
});
