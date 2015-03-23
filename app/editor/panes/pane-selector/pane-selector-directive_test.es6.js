'use strict';

describe('Pane Selector directive', () => {
    var elm,
        scope,
        compile;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( ($compile, $rootScope) => {
        elm = angular.element('<pane-selector></pane-selector');
        scope = $rootScope;
        compile = $compile;

        compile(elm)(scope);
        scope.$digest();
    }));

    it('should do repeat through the different panes', () => {
        var panes = elm.find('nav ul li');
        expect(panes.length).toBe(scope.panes.panes.length);
    });

    it('should reset a report status', () => {
        elm.scope().report.failure = 'failure';
        scope.$broadcast('report:reset');
        scope.$digest();
        expect(elm.scope().report.failure).toBe('');
        expect(elm.find('.active.failure').length).toBe(0);
    });

    it('should reset a report status', () => {
        elm.scope().report.failure = '';
        scope.$broadcast('report:failure');
        scope.$digest();
        expect(elm.scope().report.failure).toBe('failure');
        expect(elm.find('.active.failure').length).toBe(1);
    });
});
