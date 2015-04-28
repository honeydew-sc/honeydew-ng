'use strict';

describe('MonitorCtrl', function () {
    var scope,
        monitors,
        httpMock,
        MonitorCtrl;

    beforeEach(module('honeydew'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        httpMock = $httpBackend;
        scope = $rootScope.$new();
        httpMock = $httpBackend;

        MonitorCtrl = $controller('MonitorCtrl', {
            $scope: scope
        });

        monitors = JSON.stringify([{
            id: "1",
            set: "sc2-monitor.set",
            browser: "Windows 2012 - IE 10",
            host: "http:\/\/www.sharecare.com",
            on: false
        }, {
            id: "2",
            set: "sc2-wall.set",
            browser: "Windows 2008 - IE 9",
            host: "http:\/\/www.stage.sharecare.com",
            on: true
        }]);
    }));

    it('should query the backend and put the monitors on the vm', () => {
        httpMock.expectGET('/rest.php/monitor').respond(monitors);
        var promise = MonitorCtrl.query();
        httpMock.flush();

        // The monitors don't actually need to be on the vm, since
        // it's available to the ng-grid via gridOptions. We access it
        // the same way the ng-grid does: via scope.monitors =/
        var queriedMonitors = scope.monitors;

        // query returns ngResource objects, so they won't be exactly
        // equal; stringifying them does away with the difference.
        expect(JSON.stringify(queriedMonitors)).toBe(monitors);
        expect(promise.then).toBeDefined();
    });

    it('should query after 3 keys in the filter', () => {
        httpMock.expectGET('/rest.php/monitor').respond(monitors);

        MonitorCtrl.filterOptions.filterText = '1';
        scope.$digest();
        MonitorCtrl.filterOptions.filterText = 'two';
        httpMock.flush();
    });

    it('should only use user input to query once ', () => {
        httpMock.expectGET('/rest.php/monitor').respond(monitors);

        MonitorCtrl.filterOptions.filterText = 'this should trigger it';
        scope.$digest();
        MonitorCtrl.filterOptions.filterText = 'and this should not';

        httpMock.flush();
    });

});
