'use strict';

describe('scBindHtmlApp directive', () => {
    var elm,
        scope;

    beforeEach(module('honeydew'));
    beforeEach(module('tpl'));

    beforeEach(inject( ($compile, $rootScope) => {
        elm = angular.element('<pre sc-bind-html-append="liveReport:append"></pre>');
        scope = $rootScope;
        $compile(elm)(scope);
        scope.$digest();
    }));

    it('should append elements from the event to itself', () => {
        scope.$broadcast('liveReport:append', '<span class="appended">hi</span>');
        var appended = elm.find('span.appended');
        expect(appended).toBeDefined();
    });
});
