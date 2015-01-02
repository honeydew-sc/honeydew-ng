'use strict';

describe('BackgroundStatus directive', () => {
    var elm,
        scope,
        Status,
        compile,
        httpMock;

    var config = {
        a: '1.2.3.4'
    };

    beforeEach(module('honeydew', $provide => {
        $provide.constant('localConfig', config );
    }));

    beforeEach(module('tpl'));

    beforeEach(inject( ($compile, $rootScope, $httpBackend) => {
        scope = $rootScope;
        compile = $compile;
        httpMock = $httpBackend;


    }));

    var setupLocalStatuses = localRes => {
        elm = angular.element('<background-status></background-status>');
        compile(elm)(scope);

        httpMock.expectGET('/rest.php/status').respond([]);
        httpMock.expectGET('/rest.php/status/webdriver?local=' + config.a).respond(localRes);

        httpMock.flush();
        scope.$digest();

        Status = elm.isolateScope().Status;
    };


    it('should be isolated', () => {
        setupLocalStatuses({
            name: 'a',
            webdriverStatus: true
        });

        expect(Status).toBeDefined();
    });

    it('should not add successes to the list', () => {
        setupLocalStatuses({
            name: 'a',
            webdriverStatus: true
        });

        expect(Status.list.length).toBe(0);
    });

    it('should add failures to the list', () => {
        setupLocalStatuses({
            name: 'a',
            webdriverStatus: false
        });

        expect(Status.list.length).toBe(1);
        expect(Status.list[0].name).toBe('a');
    });
});
